import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../../../app/constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMAGES } from '../../../../app/constants/theme';
import { useNavigation } from '@react-navigation/native'; 
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';

const CallHistoryScreen = () => {
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [history, setHistory] = React.useState([]);

  async function getMergedUserHistory(userId) {
    try {
      // Step 1: Fetch all channels linked to the userId
      const userRecordsSnapshot = await database().ref(`records/${userId}`).once('value');
      const userRecords = userRecordsSnapshot.val() || {};
  
      const channelNames = Object.values(userRecords);
      const mergedHistory = [];
  
      // Step 2: Loop through channels and collect all histories
      for (const channelName of channelNames) {
        if (!channelName) continue;
  
        const historySnapshot = await database().ref(`history/${channelName}`).once('value');
        const historyData = historySnapshot.val();
  
        if (historyData) {
          const historyArray = Array.isArray(historyData) 
            ? historyData 
            : Object.values(historyData);
  
          mergedHistory.push(...historyArray); // Add all entries to merged array
        }
      }
  
      // Step 3: Return a single merged array
      return mergedHistory;
    } catch (error) {
      console.error('Error fetching merged user history:', error);
      throw error;
    }
  }
  
  
  
  React.useEffect(()=>{
    getMergedUserHistory(currentUser?.id).then((data) => {
      setHistory(data)
    }).catch((error) => {
      console.error('Error:', error);
    } );
  })
  // Sample call history with names
  const callHistory = [
    { id: '1', name: 'John Doe', type: 'Audio', duration: 125, cost: 10, direction: 'Outgoing' },
    { id: '2', name: 'Jane Smith', type: 'Video', duration: 300, cost: 25, direction: 'Incoming' },
    { id: '3', name: 'Mike Johnson', type: 'Audio', duration: 45, cost: 5, direction: 'Missed' },
    { id: '4', name: 'Emily Brown', type: 'Video', duration: 180, cost: 15, direction: 'Outgoing' },
  ];

  // Convert seconds to MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Function to show a symbol for incoming/outgoing/missed
  const renderDirectionIcon = (callerName, status) => {
    let direction 
    if(status === "connecting"){
      direction = '❌'
    }else if(callerName === currentUser?.name){
      direction = '➡️'
    }else{
      direction = '⬅️'
    }
   return direction;
  };  

  const renderCallItem = ({ item }) => (
    <View style={styles.callItem}>
      <View style={{ flex: 1 }}>
        {/* Call Name with Direction Icon */}
        <Text style={styles.callName}>
         {item?.callerName}
        </Text>

        {/* Type and Duration */}
        <Text style={styles.callDetails}>
          {item.type} Call · {formatDuration(item?.duration)}
        </Text>
      </View>

      <Text style={styles.callName}>
          {renderDirectionIcon(item?.callerName, item?.status)}
        </Text>
      <Text style={styles.callCost}>₹{item.cost}</Text>
    </View>
  );
const theme = useTheme();
  const { colors } = theme;
  return (
       <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: colors.background,
                }}
              >
                 <View style={GlobalStyleSheet.homeHeader}>
                <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={[GlobalStyleSheet.headerBtn, { borderColor: colors.borderColor }]}
                >
                  <FeatherIcon color={colors.title} size={22} name={"grid"} />
                </TouchableOpacity>
                <Text
                  style={{
                    ...FONTS.h5,
                    flex: 1,
                    textAlign: "center",
                    color: colors.title,
                  }}
                >
                  History
                </Text>
                <TouchableOpacity
                                      onPress={() => navigation.navigate("Filter")}
                                      style={[GlobalStyleSheet.headerBtn, { borderColor: colors.text, justifyContent:"center", alignItems:"center", flexDirection:"row", width:80 }]}
                                    >
                                      <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.success }}>
                                                      {currentUser.wallet}
                                                    </Text>
                                       <MaterialIcons size={18} color={colors.title} style={{left:4}} name="attach-money"  />
                                    </TouchableOpacity>
              </View>
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCallItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  callName: {
    fontSize: 18,
    fontWeight: '600',
    color:"black"
  },
  callDetails: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  callCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});

export default CallHistoryScreen;
