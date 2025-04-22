import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import MsgComponent from "../../../../app/components/MsgComponent";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { createChatRoom } from "../../../../services/chats";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleChat = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [tempChatRoomId, setTempChatRoomId] = React.useState("");
  const [isOnline, setIsOnline] = React.useState(false);
  // const [groupedMessages, setGroupeMessages] = React.useState({});

  const { image, name, dob, profilePhotos, date, id, lastSeen, chatRoomId } = route?.params?.data;

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state?.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const fetchChats = React.useCallback(() => {
    if (!chatRoomId) {
      return;
    }
    try {
      const messagesRef = database().ref(`messages/chats`);
      messagesRef
        .orderByChild("chatRoomId")
        .equalTo(chatRoomId)
        .on("value", async (snapshot) => {
          const fetchedMessages = snapshot.val() ? Object.values(snapshot.val()) : [];
          let offlineMessages;
          if (!isOnline) {
            const retrievedOfflineMessages = await AsyncStorage.getItem("offlineMessages");
            if (retrievedOfflineMessages) {
              offlineMessages = JSON.parse(retrievedOfflineMessages);
            }
            offlineMessages = [];
          }
          let finalMessages = [...fetchedMessages, ...offlineMessages];
          finalMessages = await finalMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          setMessages(finalMessages);
        });
      return () => messagesRef.off("value");
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  }, [chatRoomId]);

  React.useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  React.useEffect(() => {
    const messageSeen = async () => {
      if (!currentUser?.id || !chatRoomId) return;

      try {
        const messagesRef = database().ref(`messages/chats`);
        messagesRef
          .orderByChild("chatRoomId")
          .equalTo(chatRoomId)
          .once("value", async (snapshot) => {
            const messages = snapshot.val();
            if (messages) {
              const updates = {};

              for (const messageKey of Object.keys(messages)) {
                const message = messages[messageKey];
                const currentReadBy = message.isReadBy || [];
                const currentReadTimestamps = message.readTimestamps || [];
                if (!currentReadBy.includes(currentUser.id)) {
                  currentReadBy.push(currentUser.id);
                  currentReadTimestamps.push({
                    userId: currentUser.id,
                    readAt: new Date().toISOString(),
                  });
                } else {
                  const existingEntry = currentReadTimestamps.find((entry) => entry.userId === currentUser.id);
                  if (existingEntry) {
                    existingEntry.readAt = new Date().toISOString();
                  }
                }
                updates[`messages/chats/${messageKey}/updatedAt`] = new Date().toISOString();
                updates[`messages/chats/${messageKey}/isReadBy`] = currentReadBy;
                updates[`messages/chats/${messageKey}/readTimestamps`] = currentReadTimestamps;
              }
              database()
                .ref()
                .update(updates)
                .catch((error) => console.log("Error updating seen messages:", error));
            }
          });
      } catch (error) {
        console.error("Error in messageSeen:", error);
      }
    };

    messageSeen();
  }, [currentUser?.id, chatRoomId]);

  const saveMessageOffline = async (message) => {
    try {
      // Get existing messages from AsyncStorage
      const offlineMessages = JSON.parse(await AsyncStorage.getItem("offlineMessages")) || [];

      // Add the new message
      offlineMessages.push(message);

      // Save back to AsyncStorage
      await AsyncStorage.setItem("offlineMessages", JSON.stringify(offlineMessages));
    } catch (error) {
      console.error("Error saving message offline:", error);
    }
  };

  const pushMessagesOnline = async () => {
    try {
      let offlineMessages = JSON.parse(await AsyncStorage.getItem("offlineMessages")) || [];

      if (offlineMessages.length > 0 && currentUser?.id) {
        const remainingMessages = [];

        for (const message of offlineMessages) {
          if (message.status === "offline") {
            try {
              await database()
                .ref("messages/chats")
                .push({ ...message, status: "online" });
            } catch (error) {
              console.error("Error pushing message:", error);
              remainingMessages.push(message);
            }
          }
        }

        await AsyncStorage.setItem("offlineMessages", JSON.stringify(remainingMessages));
      }
    } catch (error) {
      console.error("Error pushing messages online:", error);
    }
  };

  React.useEffect(() => {
    if (isOnline) pushMessagesOnline();
  }, [isOnline]);

  const handleSendMessage = async () => {
    if (!message?.trim()) {
      return;
    }

    const msg = message.trim();
    setMessage("");

    try {
      let newMessage = {
        senderId: currentUser?.id,
        text: msg,
        chatRoomId: chatRoomId ? chatRoomId : tempChatRoomId,
        media: [],
        readTimestamps: [{ userId: currentUser?.id, readAt: new Date().toISOString() }],
        isReadBy: [currentUser?.id],
        type: "text",
        metadata: {},
        createdAt: new Date().toISOString(),
      };
      if (!isOnline) {
        newMessage = { ...newMessage, status: "offline" };
      }
      setMessages((prev) => [...prev, newMessage]);
      if (chatRoomId || tempChatRoomId) {
        if (!isOnline) {
          saveMessageOffline({ ...newMessage, status: "offline" });
          return;
        }
        await database()
          .ref(`messages/chats`)
          .push({ ...newMessage, status: "online" });
      } else {
        if (!isOnline) {
          saveMessageOffline({
            ...newMessage,
            status: "offline",
            participants: [{ userId: currentUser?.id }, { userId: id }],
          });
          return;
        }
        const res = await createChatRoom({
          participants: [{ userId: currentUser?.id }, { userId: id }],
        });
        setTempChatRoomId(res?._id);
        if (res?._id) {
          await database()
            .ref(`messages/chats`)
            .push({ ...newMessage, chatRoomId: res._id, status: "online" });
        } else {
          throw new Error("Failed to create chat room");
        }
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      // Optionally, display an error message to the user
    }
  };

  const calculateAge = (dobString) => {
    const dobDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const hasBirthdayPassed =
      today.getMonth() > dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() && today.getDate() >= dobDate.getDate());
    if (!hasBirthdayPassed) {
      age--;
    }
    return age;
  };

  const calculateLastOnline = () => {
    const lastActiveDate =
      messages
        ?.slice()
        ?.reverse()
        .find(({ receiverId }) => receiverId === currentUser?.uid)?.createdAt || date;
    if (!lastActiveDate) {
      return "";
    }
    const lastOnline = new Date(lastActiveDate);
    const today = new Date();
    const timeDifference = today - lastOnline;
    const diffInMinutes = Math.floor(timeDifference / (1000 * 60));
    if (diffInMinutes < 5) return "";
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  const groupMessagesByTime = (msgs) => {
    return msgs?.reduce((groups, message) => {
      const messageDate = moment(message.createdAt);
      let label = "";

      if (messageDate.isSame(moment(), "day")) {
        label = "Today";
      } else if (messageDate.isSame(moment().subtract(1, "day"), "day")) {
        label = "Yesterday";
      } else if (messageDate.isSame(moment(), "week")) {
        label = "This Week";
      } else if (messageDate.isSame(moment().subtract(1, "week"), "week")) {
        label = "Last Week";
      } else if (messageDate.isSame(moment(), "month")) {
        label = "This Month";
      } else {
        label = "Older";
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(message);

      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByTime(messages);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.cardBg,
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              paddingVertical: 15,
              backgroundColor: colors.cardBg,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderColor,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 10,
                marginRight: 5,
              }}
            >
              <FeatherIcon color={colors.title} size={24} name="arrow-left" />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Image
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 40,
                  marginRight: 15,
                }}
                source={{ uri: image || profilePhotos || profilePhotos?.[0]?.url }}
              />
              <View>
                <Text
                  style={{
                    ...FONTS.h6,
                    color: colors.title,
                    lineHeight: 20,
                    marginBottom: 2,
                  }}
                >
                  {name} , {calculateAge(dob)}
                </Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 3, alignItems: "center" }}>
                  {calculateLastOnline(lastSeen) === "" && (
                    <View
                      style={{
                        height: 14,
                        width: 14,
                        borderRadius: 9,
                        backgroundColor: COLORS.success,
                        zIndex: 1,
                        borderWidth: 2,
                        borderColor: colors.cardBg,
                      }}
                    />
                  )}
                  <Text style={{ ...FONTS.font, color: colors.textLight }}>Online {calculateLastOnline(lastSeen)}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              disabled
              style={{
                height: 40,
                width: 40,
                borderRadius: 10,
                backgroundColor: COLORS.primayLight,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <FontAwesome5 size={16} color={COLORS.primary} name="phone-alt" />
            </TouchableOpacity>
            <TouchableOpacity
              disabled
              style={{
                height: 40,
                width: 40,
                borderRadius: 10,
                backgroundColor: COLORS.primayLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome size={16} color={COLORS.primary} name="video-camera" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={[GlobalStyleSheet.container, { paddingTop: 30 }]}>
                {Object.entries(groupedMessages)?.map(([timeLabel, groupMessages], index) => {
                  return (
                    <View key={index}>
                      <Text
                        style={{
                          textAlign: "center",
                          marginVertical: 10,
                          fontSize: 14,
                          fontWeight: "bold",
                          color: COLORS.placeholderColor,
                        }}
                      >
                        {timeLabel}
                      </Text>
                      {/* Render each message in the group */}
                      {groupMessages.map((message, msgIndex) => (
                        <MsgComponent
                          key={message.id || msgIndex}
                          sender={message?.senderId === currentUser?.uid}
                          item={message}
                        />
                      ))}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <View>
            <TextInput
              style={{
                ...FONTS.font,
                backgroundColor: colors.cardBg,
                borderTopWidth: 1,
                borderTopColor: colors.borderColor,
                paddingHorizontal: 20,
                paddingVertical: 15,
                paddingRight: 70,
                fontSize: 15,
              }}
              value={message}
              onChangeText={(input) => setMessage(input)}
              placeholder="Send Messages"
              placeholderTextColor={colors.textLight}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={{
                height: 45,
                width: 45,
                borderRadius: 40,
                position: "absolute",
                right: 10,
                top: 7,
                backgroundColor: COLORS.primayLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeatherIcon color={COLORS.primary} size={22} name="send" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SingleChat;
