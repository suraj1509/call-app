import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS, IMAGES } from "../../../../app/constants/theme";
import Video from "react-native-video";
import * as services from "../../../../services/story";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Status = ({ route, navigation }) => {
  const { name, image, statusData, address, age, id } = route.params;
  const nextChunkRef = useRef(null);
  // console.log("statusData", statusData);
  const [currentStatus, setCurrentStatus] = useState({
    data: statusData[0]?.url,
    id: statusData[0]?.id,
    chunkIndex: 0,
    index: 0,
    totalChunks: statusData[0]?.totalChunks,
    chunkDuration: statusData[0]?.chunkDuration,
  });

  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(3);
  const progressAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!loading) {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: width - 40,
        duration: duration * 1000,
        useNativeDriver: false,
      }).start();

      const timeout = setTimeout(() => {
        if (loading) {
          console.warn("Video loading timed out.");
          setLoading(false);
        }
      }, 10000); // 10s timeout fallback

      return () => clearTimeout(timeout);
    }
  }, [loading, currentStatus.chunkIndex, duration]);

  // Preload next chunk before the current one ends
  const preloadNextChunk = async () => {
    try {
      if (currentStatus.chunkIndex < currentStatus.totalChunks - 1) {
        const response = await services.fetchNextChunk({
          videoId: currentStatus.id,
          index: currentStatus.chunkIndex + 1,
        });
        if (response?.chunkUrl) {
          nextChunkRef.current = response.chunkUrl;
        }
      }
    } catch (error) {
      console.error("Chunk preload error:", error);
    }
  };

  // Update loadChunksOrNextStory
  const loadChunksOrNextStory = async () => {
    try {
      if (nextChunkRef.current) {
        setCurrentStatus((prev) => ({
          ...prev,
          data: nextChunkRef.current,
          chunkIndex: prev.chunkIndex + 1,
        }));
        nextChunkRef.current = null;
        setTimeout(() => setLoading(false), 100);
      } else if (currentStatus.chunkIndex < currentStatus.totalChunks - 1) {
        const response = await services.fetchNextChunk({
          videoId: currentStatus.id,
          index: currentStatus.chunkIndex + 1,
        });
        if (response?.chunkUrl) {
          setCurrentStatus((prev) => ({
            ...prev,
            data: response.chunkUrl,
            chunkIndex: response.index,
            chunkDuration: response.chunkDuration,
          }));
          setTimeout(() => setLoading(false), 100);
        } else {
          console.warn("Failed to load next chunk.");
          setLoading(false);
        }
      } else {
        loadNextStory();
      }
    } catch (error) {
      console.error("Chunk fetch error:", error);
      setLoading(false);
    }
  };

  // Ensure progress stops if loading is stuck
  useEffect(() => {
    if (loading) {
      progressAnim.stopAnimation();
    }
  }, [loading]);

  // Move to the next story
  const loadNextStory = () => {
    if (currentStatus.index < statusData.length - 1) {
      setCurrentStatus({
        data: statusData[currentStatus?.index + 1]?.url,
        index: currentStatus?.index + 1,
        chunkIndex: 0,
        totalChunks: statusData[currentStatus.index + 1]?.totalChunks || 1,
        chunkDuration: statusData[currentStatus.index + 1]?.chunkDuration,
        id: statusData[currentStatus.index + 1]?.id,
      });
    } else {
      navigation.goBack();
    }
  };

  const ProgressView = () => {
    useEffect(() => {
      if (!loading) {
        progressAnim.setValue(0);
        Animated.timing(progressAnim, {
          toValue: width - 40,
          duration: duration * 1000,
          useNativeDriver: false,
        }).start();
      }
    }, [loading, currentStatus.chunkIndex, duration]);

    return <Animated.View style={{ backgroundColor: "#fff", width: progressAnim, height: 2 }} />;
  };

  const theme = useTheme();
  const { colors } = theme;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#000"} />
      {currentStatus.data?.includes(".mp4") ? (
        <View style={styles.videoContainer}>
          <Video
            key={currentStatus.chunkIndex}
            style={styles.video}
            source={{ uri: currentStatus?.data }}
            resizeMode="contain"
            repeat={false}
            controls={false}
            paused={loading}
            onLoad={(meta) => {
              setLoading(false);
              setDuration(currentStatus.chunkDuration);
            }}
            onError={(error) => {
              console.error("Video failed to load", error);
              setLoading(false);
            }}
            onProgress={(progress) => {
              if (progress.currentTime >= duration - 1 && !loading) {
                setLoading(true);
                preloadNextChunk();
              }
            }}
            onPlaybackStateChanged={(state) => {
              if (state?.isPlaying === false && loading === true) {
                setLoading(true);
                loadChunksOrNextStory();
              }
            }}
          />
          {loading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
      ) : (
        <Image style={styles.video} source={{ uri: currentStatus?.data }} resizeMode="contain" />
      )}
      <View style={styles.overlay} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.statusTabContainer}>
            {statusData.map((_, index) => (
              <View key={index} style={styles.statusTab}>
                {!loading && currentStatus.index === index ? <ProgressView /> : null}
              </View>
            ))}
          </View>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon size={18} color={COLORS.white} name={"arrow-left"} />
            </TouchableOpacity>
            <View style={styles.profilePicContainer}>
              <Image style={styles.profilePic} source={{ uri: image }} />
            </View>
            <View>
              <Text style={styles.userName}>
                {name}, {age}
              </Text>
              <View style={styles.locationContainer}>
                <Image style={styles.pinIcon} source={IMAGES.pin2} />
                <Text style={styles.addressText} numberOfLines={1}>
                  {address}
                </Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.controller} />
          <TouchableOpacity style={[styles.controller, { right: 0 }]} />

          <View style={styles.bottomButtons}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
              <FeatherIcon color={COLORS.white} size={30} name={"x"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.heartButton}>
              <FontAwesome size={24} color={COLORS.white} name="heart" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusTabContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 10,
  },
  statusTab: {
    height: 2,
    backgroundColor: "rgba(255,255,255,.2)",
    flex: 1,
    marginHorizontal: 2,
  },
  progressBar: {
    backgroundColor: "#fff",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  controller: {
    position: "absolute",
    width: width / 2,
    height: height * 0.85,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  profilePicContainer: {
    height: 48,
    width: 48,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  userName: {
    ...FONTS.fontBold,
    fontSize: 18,
    color: COLORS.white,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
  },
  pinIcon: {
    height: 15,
    width: 9,
    resizeMode: "contain",
    tintColor: COLORS.white,
  },
  addressText: {
    ...FONTS.fontMedium,
    fontSize: 14,
    color: COLORS.white,
  },
  bottomButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    position: "absolute",
    width: "100%",
    bottom: 30,
  },
  closeButton: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  heartButton: {
    height: 50,
    width: 50,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
  },
});

export default Status;
