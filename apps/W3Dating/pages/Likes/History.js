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

const History = ({navigation}) => {
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [history, setHistory] = React.useState(currentUser?.history);
  const theme = useTheme();
  const { colors } = theme;

  function formatDateTime12h(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 to 12
    return `${date.toLocaleDateString()} ${hours}:${minutes} ${ampm}`;
  }
    

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const renderCallItem = ({ item }) => (
    <View style={styles.callItem}>
      <View style={{ flex: 1 }}>
        <View style={{flexDirection: 'row',alignItems: 'center', gap: 10}}>
        <Text style={{...FONTS.h6, color: COLORS.text}}>
         {item?.name} 
        </Text>
         <Text style={{color: COLORS.textLight}}>
      {item.type}{"    "} {formatDateTime12h(item?.time)}
        </Text>
        {/* <Text style={styles.callName}>
          {renderDirectionIcon(item?.type)}
        </Text> */}
        </View>
        {/* Type and Duration */}
        <Text style={styles.callDetails}>
          duration: {formatDuration(item?.duration)} 
        </Text>
      </View>

      
      <Text style={styles.callCost}>₹{item.cost}</Text>
    </View>
  );

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
                          style={[GlobalStyleSheet.headerBtn, { borderColor: colors.borderColor }]}
                        >
                          <Image
                            style={{
                              height: 22,
                              width: 22,
                              tintColor: colors.title,
                               display: 'none'
                            }}
                            source={IMAGES.filter}
                          />
                        </TouchableOpacity>
              </View>
    <View style={[GlobalStyleSheet.container,{flex: 1, paddingHorizontal: 20,justifyContent: 'center', flexDirection: 'row'}]}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCallItem}
        contentContainerStyle={{ paddingBottom: 20}}
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
    color:"black",
    paddingHorizontal: 10,
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

export default History;
