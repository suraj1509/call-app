import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import GradientBtn from '../components/GradientBtn';
import { COLORS, FONTS } from '../../../../app/constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/Actions';
import RazorpayCheckout from 'react-native-razorpay';
import ButtonOutline from '../../../../app/components/Button/ButtonOutline';
import ButtonLight from '../../../../app/components/Button/ButtonLight';


const Credit = ({navigation}) => {
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
    <View style={[GlobalStyleSheet.container,{flex: 1, padding: 40,justifyContent: 'center', alignItems: 'center'}]}>
      <View>
      <FlatList
        data={rechargeOptions}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        renderItem={({ item }) => (
       <View style={{width: '46%', marginHorizontal: 6, marginVertical: 10}}>
        <View >
            {selectedAmount !== item ? (<ButtonOutline onPress={() => handleRecharge(item)} title={item} btnRounded />)
              : (<GradientBtn onPress={() => handleRecharge(item)} title={item} btnRounded paddingHorizontal={12} height={48}/>)}
       </View>
       </View>
        )}
      />
      </View>
    </View>
      <View style={{paddingVertical: 100, paddingHorizontal:20, gap: 40}}>
      <ButtonLight
        onPress={() => navigation.navigate("History")}
        title={"Check History"}
        btnRounded
        color={COLORS.textLight}
      />
      <ButtonOutline
        onPress={handleAddRecharge}
        title={"Proceed to Payment"}
        btnRounded
      />
      </View>
    </SafeAreaView>
  );
};


export default Credit;
