import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Header from '../../../app/layout/Header';
import PricingSwiper from './components/PricingSwiper';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import GradientBtn from './components/GradientBtn';
import { COLORS, FONTS } from '../../../app/constants/theme';

const Subscriptions = ({route}) => {

    const {colors} = useTheme();

    const { activeSlide } = route.params;

    const [activeIndex , setActiveIndex] = useState(activeSlide);

    const pricingData = [
        [
            {
                title : "Unlimited Likes",
                lock : false,
            },
            {
                title : "See Who Likes You",
                lock : true,
            },
            {
                title : "Priority Likes",
                lock : true,
            },
            {
                title : "Unlimited Rewinds",
                lock : false,
            },
            {
                title : "1 Free Boost per month",
                lock : true,
            },
            {
                title : "5 Free Super Likes per week",
                lock : true,
            },
            {
                title : "Message Before Matching",
                lock : true,
            },
            {
                title : "Passport",
                lock : false,
            },
            {
                title : "Top Picks",
                lock : true,
            },
            {
                title : "Control Your Profile",
                lock : false,
            },
            {
                title : "Control Who Sees You",
                lock : false,
            },
            {
                title : "Control Who You See",
                lock : false,
            },
            {
                title : "Hide Ads",
                lock : false,
            },
        ],
        [
            {
                title : "Unlimited Likes",
                lock : false,
            },
            {
                title : "See Who Likes You",
                lock : false,
            },
            {
                title : "Priority Likes",
                lock : true,
            },
            {
                title : "Unlimited Rewinds",
                lock : false,
            },
            {
                title : "1 Free Boost per month",
                lock : false,
            },
            {
                title : "5 Free Super Likes per week",
                lock : false,
            },
            {
                title : "Message Before Matching",
                lock : true,
            },
            {
                title : "Passport",
                lock : false,
            },
            {
                title : "Top Picks",
                lock : false,
            },
            {
                title : "Control Your Profile",
                lock : false,
            },
            {
                title : "Control Who Sees You",
                lock : false,
            },
            {
                title : "Control Who You See",
                lock : false,
            },
            {
                title : "Hide Ads",
                lock : false,
            },
        ],
        [
            {
                title : "Unlimited Likes",
                lock : false,
            },
            {
                title : "See Who Likes You",
                lock : false,
            },
            {
                title : "Priority Likes",
                lock : false,
            },
            {
                title : "Unlimited Rewinds",
                lock : false,
            },
            {
                title : "1 Free Boost per month",
                lock : false,
            },
            {
                title : "5 Free Super Likes per week",
                lock : false,
            },
            {
                title : "Message Before Matching",
                lock : false,
            },
            {
                title : "Passport",
                lock : false,
            },
            {
                title : "Top Picks",
                lock : false,
            },
            {
                title : "Control Your Profile",
                lock : false,
            },
            {
                title : "Control Who Sees You",
                lock : false,
            },
            {
                title : "Control Who You See",
                lock : false,
            },
            {
                title : "Hide Ads",
                lock : false,
            },
        ]
    ]

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <Header
                leftIcon={'back'}
                title={'My Subscription'}
                titleLeft
            />
            <View
                style={{
                    height:135,
                }}
            >
                <PricingSwiper
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            </View>
            <View style={{
                flex:1,
            }}>
                <ScrollView>
                    <View
                        style={{
                            paddingHorizontal:20,
                            paddingVertical:0,
                        }}
                    >
                        {pricingData[activeIndex].map((data,index) => {
                            return(
                                <View 
                                    key={index}
                                    style={{
                                        paddingVertical:12,
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}
                                >
                                    <FeatherIcon style={{marginRight:12 , opacity : data.lock ?  .8 : 1}} size={20} color={data.lock ? colors.textLight : COLORS.primary2} name={data.lock ? 'lock' :'check'}/>
                                    <Text style={[{...FONTS.font,fontSize:15,...FONTS.fontSemiBold,color:colors.title},
                                        data.lock && {
                                            color:colors.textLight,
                                            opacity:.8,
                                        }
                                    ]}>{data.title}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    paddingHorizontal:40,
                    paddingVertical:20,
                }}
            >
                <GradientBtn
                    gradient={
                        activeIndex === 0 ?
                        ["#ea3d85","#ff864e"]
                        :
                        activeIndex === 1 ?
                        ["#e89e44","#f0cc6e"]
                        :
                        activeIndex === 2 ?
                        ["#090A0C","#374550"]
                        :
                        ["#ea3d85","#ff864e"]
                    }
                    title={
                        activeIndex === 0 ?
                        'Starting at ₹450'
                        :
                        activeIndex === 1 ?
                        'Starting at ₹650'
                        :
                        activeIndex === 2 ?
                        'Starting at ₹999'
                        :
                        'Starting at ₹661.28'
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Subscriptions;