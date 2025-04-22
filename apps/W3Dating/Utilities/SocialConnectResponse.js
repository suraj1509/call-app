import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

const SocialConnectResponse = ({ route }) => {
  const navigation = useNavigation();
  const [callerName, setCallerName] = React.useState("Unknown");
  const { mode, channelName, localUid, token, id  } = route.params.data;
  database()
  .ref(`connect/${id}`)
  .once('value')
  .then(snapshot => {
    if (!snapshot.exists()) {
      // If it does NOT exist, navigate
      navigation.navigate('DrawerNavigation');
    }else{
      setCallerName(snapshot.val().callerName);
    }
    // If it exists, do nothing
  })
  .catch(error => {
    console.error('Error checking connect:', error);
  });


const onAccept = () => {
navigation.navigate("SocialConnect", { mode, channelName, localUid, token  });  
}

const handleConnectRejection = async() => {
    if (!id) return;
  
    await database()
      .ref(`connect/${id}`)
      .remove()
      .then(() => {
        console.log('Connection request rejected and entry removed.');
      })
      .catch(error => {
        console.error('Error removing connection:', error);
      });
navigation.navigate("DrawerNavigation");
  };

  const userConnectRef = database().ref(`connect/${id}`);

  React.useEffect(() => {
    if (!id) return; 
    const onValueChange = userConnectRef.on('value', snapshot => {
      if (!snapshot.exists()) {
        navigation.goBack();
      }
    });
    return () => {
      userConnectRef.off('value', onValueChange);
    };
  }, [id, userConnectRef]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode === "video" ? "Incoming Video Call" : "Incoming Voice Call"}</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.avatar}
      />
      <Text style={styles.callerName}>{callerName}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={onAccept}>
          <Ionicons name="call" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleConnectRejection}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  callerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  button: {
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default SocialConnectResponse;
