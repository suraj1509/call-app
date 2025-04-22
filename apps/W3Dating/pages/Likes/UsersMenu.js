import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import GradientBtn from '../components/GradientBtn';
import { COLORS, FONTS } from '../../../../app/constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMAGES } from '../../../../app/constants/theme';
import { useNavigation } from '@react-navigation/native'; 
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/Actions';
import RazorpayCheckout from 'react-native-razorpay';


const RechargeScreen = () => {
  const BASE_AMOUNT = 100; // You can easily change this later
  const optionsCount = 6;  // How many options you want to show
  const amount = useSelector((state) => state?.user?.currentUser?.wallet);
  const dispatch = useDispatch();
const theme = useTheme();
  const { colors } = theme;
  const [selectedAmount, setSelectedAmount] = useState(null);

  const rechargeOptions = Array.from({ length: optionsCount }, (_, i) => (i + 1) * BASE_AMOUNT);

  const handleRecharge = (amount) => {
    setSelectedAmount(amount);
  };
const handleAddRecharge = async() => {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: '<YOUR_KEY_ID>',
    amount: '5000',
    name: 'Acme Corp',
    order_id: 'order_DslnoIgkIDL8Zt',
    prefill: {
      email: 'gaurav.kumar@example.com',
      contact: '9191919191',
      name: 'Gaurav Kumar'
    },
    theme: {color: '#53a20e'}
  }
  await RazorpayCheckout.open(options).then((data) => {
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    alert(`Error: ${error.code} | ${error.description}`);
  });
   dispatch(Actions.updateCurrentUser({wallet: amount + selectedAmount}));
}
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
              Recharge
            </Text>
             <TouchableOpacity
                      onPress={() => navigation.navigate("Filter")}
                      style={[GlobalStyleSheet.headerBtn, { borderColor: colors.text, justifyContent:"center", alignItems:"center", flexDirection:"row", width:80 }]}
                    >
                      <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.success }}>
                                      {amount}
                                    </Text>
                       <MaterialIcons size={18} color={colors.title} style={{left:4}} name="attach-money"  />
                    </TouchableOpacity>
          </View>
    <View style={styles.container}>
      <Text style={styles.title}>Recharge Your Account</Text>
      <FlatList
        data={rechargeOptions}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerStyle={styles.optionsContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedAmount === item && styles.selectedButton,
            ]}
            onPress={() => handleRecharge(item)}
          >
            <Text style={styles.optionText}>₹{item}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedAmount && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Selected Amount: ₹{selectedAmount}</Text>
        </View>
      )}
      <View style={{paddingVertical: 100, paddingHorizontal:20}}>
      <GradientBtn
        onPress={handleAddRecharge}
        title={"Proceed to Payment"}
        style={{ width: "100%" }}
      />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    margin: 10,
    width: '40%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: COLORS.primary4,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 20,
    fontWeight: '600',
    color: "black"
  },
});

export default RechargeScreen;
