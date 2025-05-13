import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    BackHandler,
    Image,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    Animated,
    View,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    TextInput,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { List } from "react-native-paper";
import uuid from "react-native-uuid";
import FeatherIcon from "react-native-vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import { useDispatch, useSelector } from "react-redux";
import CheckList from "../components/CheckList";
import ButtonLight from "../../../../app/components/Button/ButtonLight";
import ButtonOutline from "../../../../app/components/Button/ButtonOutline";
import * as Actions from "../../../../redux/Actions";

const PaymentRequestDetails = ({ navigation }) => {
    const user = useSelector((state) => state?.user?.currentUser);
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const [modal, setModal] = React.useState(false)
    const { height } = Dimensions.get("window");
    const [durationIndex, setDurationIndex] = React.useState(0)
    const [history, setHistory] = React.useState([])
    const [cost, setTotalCost] = React.useState([])
    const [ifscCode, setIfscCode] = React.useState("")
    const [upiId, setUpiId] = React.useState("")
    const [cardNumber, setCardNumber] = React.useState("")
    const [expiryDate, setExpiryDate] = React.useState("")
    const [cvv, setCvv] = React.useState("")
    const [cardHolderName, setCardHolderName] = React.useState("")
    const [bankAccountNumber, setBankAccountNumber] = React.useState("")


const handleSaveDetails= () => {
    if(durationIndex === 0){
        dispatch(Actions?.updateCurrentUser({ card: {cardHolderName, cardNumber, expiryDate, cvv}}))
        ToastAndroid.show("Card Details Saved", ToastAndroid.SHORT);
    }else if(durationIndex === 1){
        dispatch(Actions?.updateCurrentUser({ upi: {upiId}}))
        ToastAndroid.show("UPI Details Saved", ToastAndroid.SHORT); }
    else if(durationIndex === 2){
        dispatch(Actions?.updateCurrentUser({ bankAccount: {bankAccountNumber, ifscCode}}))
        ToastAndroid.show("Bank Details Saved", ToastAndroid.SHORT);
    }
}
const handleRaiseRequest = () => {
if(user?.bankAccount?.bankAccountNumber || user?.card?.cardNumber || user?.upi?.upiId){
    dispatch(Actions?.updateCurrentUser({ withdrawlRequest: [...user?.withdrawlRequest, { status: "Pending"}]}))
    ToastAndroid.show("Payment Request Raised", ToastAndroid.SHORT);
}else{
    ToastAndroid.show("Please add payment details", ToastAndroid.SHORT);
}
}
    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                }}
            >
                <Header
                    leftIcon={"back"}
                    title={"Payment Details"}
                    titleLeft
                    backAction={() => { navigation.goBack() }}
                />

                <ScrollView>
                    <View style={{ padding: 16 }}>
                        <Modal visible={modal} transparent onLayout={() => setModal(false)}>
                            <TouchableWithoutFeedback onPress={() => setModal(false)}>
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        justifyContent: "center",
                                        alignContent: "center",

                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: colors.cardBg,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            margin: 20,
                                            borderRadius: 10,
                                            padding: 16,
                                            gap: 10,
                                            height: height * 0.4,
                                            overflow: "hidden",
                                            // backgroundColor: "blue",
                                        }}
                                    >
                                        <View style={{ padding: 16 }}>
                                            <Text
                                                style={{
                                                    ...FONTS.h5,
                                                    // flex: 1,
                                                    textAlign: "center",
                                                    color: colors.title,
                                                }}
                                            >
                                                Select Duration
                                            </Text>
                                        </View>

                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            {["CARD", "UPI", "BANK DETAILS"]?.map((data, index) => {
                                                return (
                                                    <CheckList
                                                        onPress={() => {
                                                            setDurationIndex(index)
                                                            setModal(false)
                                                        }}
                                                        item={data}
                                                        checked={index === durationIndex ? true : false}
                                                        key={index}
                                                    />
                                                );
                                            })}
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <View style={{ paddingVertical: 20, }}>
                            <CheckList
                                onPress={() => {
                                    setModal(true)
                                }}
                                item={[["CARD", "UPI", "BANK DETAILS"][durationIndex]]}
                                dropdown={true}
                                checked={false}
                            />
                        </View>
                        {durationIndex === 0 && (<View style={[GlobalStyleSheet.card, { paddingVertical: 30, paddingHorizontal: 20, borderColor: COLORS.placeholderColor }]}>
                            <Text style={{
                                ...FONTS.h5,
                                // flex: 1,
                                // textAlign: "center",
                                color: colors.title,
                            }}>Enter Card Details</Text>

                            <Text style={{ marginBottom: 5, color: COLORS.textLight }}>Cardholder Name</Text>
                            <TextInput
                                placeholder="ADD YOUR FULL NAME"
                                placeholderTextColor={COLORS.light}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 15,
                                    backgroundColor: COLORS.white,
                                    color: COLORS.dark,
                                    fontSize: 18,
                                    // letterSpacing: 4,
                                }}
                                value={cardHolderName}
                                inputMode="text"
                                onChangeText={(text) => {
                                    setCardHolderName(text)
                                }}
                                autoCapitalize="characters"
                            />

                            <Text style={{ marginBottom: 5, color: COLORS.textLight }}>Card Number</Text>
                            <TextInput
                                placeholder="1234 5678 9012 3456"
                                keyboardType="numeric"
                                placeholderTextColor={COLORS.light}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 15,
                                    backgroundColor: COLORS.white,
                                    color: COLORS.dark,
                                    fontSize: 18,
                                    letterSpacing: 4,
                                }}
                                value={cardNumber}
                                onChangeText={(text => {
                                    setCardNumber(text)
                                })}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Text style={{ marginBottom: 5, color: COLORS.textLight }}>Expiry Date</Text>
                                    <TextInput
                                        placeholder="MM/YY"
                                        keyboardType="numeric"
                                        placeholderTextColor={COLORS.light}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 8,
                                            padding: 10,
                                            backgroundColor: COLORS.white,
                                            color: COLORS.dark,
                                            fontSize: 18,
                                        }}
                                        value={expiryDate}
                                        onChangeText={(text) => {
                                            setExpiryDate(text)
                                        }}  
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ marginBottom: 5 }}>CVV</Text>
                                    <TextInput
                                        placeholder="123"
                                        keyboardType="numeric"
                                        secureTextEntry
                                        placeholderTextColor={COLORS.light}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 8,
                                            padding: 10,
                                            backgroundColor: COLORS.white,
                                            color: COLORS.dark,
                                            fontSize: 18,
                                        }}
                                        value={cvv}
                                        onChangeText={(text) => {
                                            setCvv(text)
                                        }}  
                                    />
                                </View>
                            </View>

                        </View>)}
                        {durationIndex === 2 &&(<View style={[GlobalStyleSheet.card, { paddingVertical: 30, paddingHorizontal: 20, borderColor: COLORS.placeholderColor }]}>
                            <Text style={{
                                ...FONTS.h5,
                                // flex: 1,
                                // textAlign: "center",
                                color: colors.title,
                            }}>Enter Card Details</Text>

                            <Text style={{ marginBottom: 5, color: COLORS.textLight }}>Bank Account Number</Text>
                            <TextInput
                                // placeholder="ADD YOUR FULL NAME"
                                placeholderTextColor={COLORS.light}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 15,
                                    backgroundColor: COLORS.white,
                                    color: COLORS.dark,
                                    fontSize: 18,
                                    // letterSpacing: 4,
                                }}
                                value={bankAccountNumber}
                                inputMode="numeric"
                                onChangeText={(text) => {
                                    setBankAccountNumber(text)
                                }}
                                autoCapitalize="characters"
                            />

                            <Text style={{ marginBottom: 5, color: COLORS.textLight }}>IFSC CODE</Text>
                            <TextInput
                                // placeholder="1234 5678 9012 3456"
                                // keyboardType="numeric"
                                placeholderTextColor={COLORS.light}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 15,
                                    backgroundColor: COLORS.white,
                                    color: COLORS.dark,
                                    fontSize: 18,
                                    letterSpacing: 4,
                                }}
                                value={ifscCode}
                                onChangeText={(text => {
                                    setIfscCode(text)
                                })} 
                                autoCapitalize="characters"
                            />


                        </View>)}
                        {durationIndex === 1 &&(<View style={[GlobalStyleSheet.card, { paddingVertical: 30, paddingHorizontal: 20, borderColor: COLORS.placeholderColor }]}>
                            <Text style={{
                                ...FONTS.h5,
                                // flex: 1,
                                // textAlign: "center",
                                color: colors.title,
                            }}>Enter UPI Details</Text>

                            <Text style={{ marginBottom: 5, color: COLORS.textLight }}>UPI Id</Text>
                            <TextInput
                                placeholder="Add Your UPI Id"
                                placeholderTextColor={COLORS.light}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    padding: 10,
                                    marginBottom: 15,
                                    backgroundColor: COLORS.white,
                                    color: COLORS.dark,
                                    fontSize: 18,
                                    // letterSpacing: 4,
                                }}
                                value={upiId}
                                inputMode="text"
                                onChangeText={(text) => {
                                    setUpiId(text)
                                }}
                            />

                        </View>)}
                    <ButtonLight title="Save Details" onPress={handleSaveDetails}/>
                    </View>
                </ScrollView>
                <View style={{ paddingVertical: 20, paddingHorizontal: 20, gap: 40 }}>
                    {/* <ButtonLight
        onPress={() => navigation.navigate("EarningDetails")}
        title={`Total:  Rs ${cost}`}
        btnRounded
        color={COLORS.textLight}
      /> */}
                    <ButtonOutline
                        // onPress={handleAddRecharge}
                        title={"Raise Request"}
                        btnRounded
                        onPress={handleRaiseRequest}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

export default PaymentRequestDetails;
