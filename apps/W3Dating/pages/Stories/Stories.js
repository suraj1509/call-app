import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, SIZES } from "../../../../app/constants/theme";
import * as services from "../../../../services/story";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import GradientBtn from "../components/GradientBtn";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "react-native-image-picker";
import RNFS from "react-native-fs";
import storage from "@react-native-firebase/storage";
import Video from "react-native-video";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import ButtonOutline from "../../../../app/components/Button/ButtonOutline";

const Stories = ({ navigation, route }) => {
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { colors } = useTheme();

  const selectMedia = () => {
    ImagePicker.launchImageLibrary({ mediaType: "mixed", includeBase64: false }, (response) => {
      if (response.didCancel) return;

      const asset = response.assets[0];
      setMediaUri(asset.uri);
      setMediaType(asset.type.startsWith("image") ? "image" : "video");
    });
  };

  const handleUpload = async () => {
    if (!mediaUri) return;
    setIsUploading(true);

    try {
      const fileStat = await RNFS.stat(mediaUri);
      const isVideo = mediaUri.endsWith(".mp4");

      if (!isVideo) {
        setMediaType("image");
        const fileRef = storage().ref(`/stories/images/${Date.now()}.jpg`);
        await fileRef.putFile(mediaUri);
        const imageUrl = await fileRef.getDownloadURL();

        await services.addStory({ mediaUrl: imageUrl, mediaType: "image", chunkDuration: 3 });
        setIsUploading(false);
        navigation.navigate("Home");
        return;
      }

      const chunkDuration = 5; // 5 seconds per chunk
      let videoId = null;

      // Clean up old chunks
      const existingFiles = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      for (const file of existingFiles) {
        if (file.name.startsWith("chunk_") && file.name.endsWith(".mp4")) {
          await RNFS.unlink(file.path);
        }
      }

      // Run FFmpeg command with compatible codec
      const command = `-i ${mediaUri} -c copy -segment_time ${chunkDuration} -f segment -reset_timestamps 1 ${RNFS.DocumentDirectoryPath}/chunk_%03d.mp4`;

      const ffmpegSession = await FFmpegKit.execute(command);
      const returnCode = await ffmpegSession.getReturnCode();

      if (returnCode.isValueSuccess()) {
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        const chunkFiles = files.filter((file) => file.name.startsWith("chunk_") && file.name.endsWith(".mp4"));

        // Calculate total duration more accurately
        let totalDuration = 0;
        try {
          const durationOutput = await FFmpegKit.execute(
            `-i ${mediaUri} -show_entries format=duration -v quiet -of csv="p=0"`,
          );
          const durationLogs = await durationOutput.getOutput();
          totalDuration = parseFloat(durationLogs.trim());
        } catch (err) {
          console.warn("Failed to get duration via ffprobe, falling back to estimation.");
          totalDuration = chunkFiles.length * chunkDuration;
        }

        for (let i = 0; i < chunkFiles.length; i++) {
          const chunkPath = `${RNFS.DocumentDirectoryPath}/${chunkFiles[i].name}`;
          const fileRef = storage().ref(`stories/chunks/${Date.now()}_chunk_${i}.mp4`);
          await fileRef.putFile(chunkPath);

          const chunkUrl = await fileRef.getDownloadURL();

          // Calculate correct chunk duration
          let adjustedChunkDuration = chunkDuration;
          const isLastChunk = i === chunkFiles.length - 1;

          if (isLastChunk) {
            const expectedChunks = Math.ceil(totalDuration / chunkDuration);
            const remainder = totalDuration % chunkDuration;
            adjustedChunkDuration = remainder > 0 ? remainder : chunkDuration;
          }

          const response = await services.addReel({
            videoId,
            chunkIndex: i,
            totalChunks: chunkFiles.length,
            chunkUrl,
            chunkDuration: adjustedChunkDuration,
          });

          if (!videoId) {
            videoId = response.videoId;
          }
        }

        await services.mergeReel({ videoId });

        // Clean up after processing
        const processedFiles = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        for (const file of processedFiles) {
          if (file.name.startsWith("chunk_") && file.name.endsWith(".mp4")) {
            await RNFS.unlink(file.path);
          }
        }
      } else {
        console.error("FFmpeg command failed with return code:", returnCode);
      }

      setIsUploading(false);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Upload Error:", error);
      setIsUploading(false);
    }
  };

  const height = Dimensions.get("window").height;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 10,
            top: -1,
            marginRight: 10,
          }}
        >
          <FeatherIcon size={24} color={colors.title} name="arrow-left" />
        </TouchableOpacity>
        <Text style={{ ...FONTS.h5, color: colors.title }}>Story Uploads</Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={GlobalStyleSheet.container}>
              {/* <Text style={{ ...FONTS.h4, color: colors.text, marginBottom: 10 }}>Select An Image Or Reel</Text> */}
              <View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.imageBox,
                    {
                      height: height * 0.75,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => {
                    !mediaUri && selectMedia();
                  }}
                >
                  {mediaUri ? (
                    <>
                      {mediaType === "image" ? (
                        <Image
                          source={{ uri: mediaUri }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: SIZES.radius,
                          }}
                        />
                      ) : (
                        <Video
                          source={{ uri: mediaUri }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: SIZES.radius,
                          }}
                          resizeMode="cover"
                        />
                      )}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setMediaUri(null)}
                        style={{
                          height: 25,
                          width: 25,
                          borderRadius: 20,
                          position: "absolute",
                          top: 8,
                          right: 8,
                          zIndex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: COLORS.danger,
                        }}
                      >
                        <FeatherIcon name="x" size={24} color={COLORS.white} />
                      </TouchableOpacity>
                    </>
                  ) : isUploading ? (
                    <View style={GlobalStyleSheet.spinner}>
                      <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                  ) : (
                    <FeatherIcon name="image" color={colors.borderColor} size={45} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingVertical: 35,
            paddingHorizontal: 10,
            flexDirection: "row",
            width: "100%",
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            {/* <GradientBtn title="Next" /> */}
            <ButtonOutline btnRounded title="Cancel" onPress={() => navigation.navigate("Home")} />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonOutline
              btnRounded
              title="Upload"
              onPress={() => {
                mediaUri && handleUpload();
              }}
              isLoading={isUploading}
            />
            {/* <GradientBtn title="Done" /> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    borderWidth: 1.5,
    marginVertical: 5,
    borderRadius: SIZES.radius,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});

export default Stories;
