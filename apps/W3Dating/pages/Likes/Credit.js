import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image, TextInput, Dimensions, ToastAndroid } from 'react-native';
import GradientBtn from '../components/GradientBtn';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/Actions';
import RazorpayCheckout from 'react-native-razorpay';
import ButtonOutline from '../../../../app/components/Button/ButtonOutline';
import ButtonLight from '../../../../app/components/Button/ButtonLight';
import * as services from '../../../../services/payment';


const Credit = ({navigation}) => {
  const BASE_AMOUNT = 99; // You can easily change this later
  const optionsCount = 6;  // How many options you want to show
  const amount = useSelector((state) => state?.user?.currentUser?.wallet);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const height = Dimensions.get('window').height
const theme = useTheme();
  const { colors } = theme;
  const [selectedAmount, setSelectedAmount] = useState(null);
  console.log("Selected Amount", selectedAmount);
  console.log("Selected Amount", couponCode);

  const rechargeOptions = Array.from({ length: optionsCount }, (_, i) => BASE_AMOUNT + i * 100);

  const handleRecharge = (amount) => {
    setSelectedAmount(amount);
  };
  
  const couponsCodes = {
    'WELCOME50': 50 ,
    'LOVE10' : 10 ,
    'DATE25' : 25 ,
    'FLIRT15' : 15 ,
    'ROMANCE5' : 5 ,
    'MATCH100' : 100 ,
  };

  
  const handleAddRecharge = async () => {
    try {
      const data = await services?.createOrder({
        amount: selectedAmount,
        currency: 'INR',
        receipt: 'receipt#123'  
      })
  
      const options = {
        description: 'Recharge wallet',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: data.currency,
        amount: data.amount.toString(),
        name: 'DatingKit',
        order_id: data.id, 
        key: 'rzp_test_DolnzoEJ5bnnkq',
        prefill: {
          email: 'gaurav.kumar@example.com',
          contact: '9191919191',
          name: 'Gaurav Kumar',
        },
        theme: { color: '#53a20e' }
      };
  
      const paymentData = await RazorpayCheckout.open(options);
  
      const verificationResponse = await services?.verifyPayment({
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
      });

      if (verificationResponse?.success) {
        ToastAndroid.show("Recharge Successfull", ToastAndroid.SHORT);
        dispatch(Actions.updateCurrentUser({ wallet: amount + selectedAmount }));
        setSelectedAmount(null);
        setCouponCode("");
      } else {
        ToastAndroid.show("Payment verification failed", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const onApplyCoupon = () => {
    const coupon = couponsCodes[couponCode.toUpperCase()];
  
    if (!coupon) {
      ToastAndroid.show("Invalid coupon code", ToastAndroid.SHORT);
      return;
    }
  
    const newAmount = Math.max(selectedAmount + coupon, 0);
    setSelectedAmount(newAmount);
    // alert(`Coupon ${coupon.code} applied! ₹${coupon.discount} off`);
  };

  
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
    <View style={[GlobalStyleSheet.container, {flex: 1}]}>
      <View style={{paddingHorizontal: 40,justifyContent: 'center', alignItems: 'center'}}>
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
      <View style={{flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, alignItems:'center', gap: 10,}}>
                   <View style={[styles.inputStyle, { borderColor: theme.dark ? colors.title : "#141414", width: "66%" }]}>
                                    <TextInput
                                      style={{
                                        ...FONTS.fontSemiBold,
                                        fontSize: 18,
                                        color: colors.title,
                                        flex: 1,
                                        top: 0,
                                        paddingVertical: 0,
                                        paddingLeft: 10,
                                        //backgroundColor:'red'
                                      }}
                                      value={couponCode}
                                      //autoFocus
                                      // keyboardType="number-pad"
                                      onChangeText={(text) => setCouponCode(text)}
                                      placeholder="Coupon Code"
                                      placeholderTextColor={theme.dark ? colors.title : "#141414"}
                                    />
                                  </View>
                                  <View style={{width: '30%'}}>
                                    <ButtonLight title="Apply" onPress={onApplyCoupon}/>
                                  </View>
      </View>
    </View>
      <View style={{paddingVertical: 100, paddingHorizontal:20, gap: 20}}>
      <ButtonLight
        onPress={() => navigation.navigate("Transactions")}
        title={"Check Transactions"}
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

const styles = StyleSheet.create({
  inputStyle: {
    height: 46,
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRadius: SIZES.radius,
    // marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#141414",
    // backgroundColor:'green'
    //backgroundColor:'rgba(255,255,255,.05)',
  },
});

export default Credit;
