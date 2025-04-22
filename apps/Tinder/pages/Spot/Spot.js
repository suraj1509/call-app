import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import TopPicks from './TopPicks';
import Likes from './Likes';

const FirstRoute = () => (
    <Likes/>
);
  
const SecondRoute = () => (
    <TopPicks/>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const Spot = () => {

    const {colors} = useTheme();

    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
        { key: 'first', title: '12 Likes' },
        { key: 'second', title: 'Top Picks' },
    ]);
    const renderTabBar = props => (
        <TabBar
          {...props}
          labelStyle={{
            ...FONTS.fontLg,
            textTransform:'capitalize',
          }}
          inactiveColor={colors.text}
          activeColor={colors.title}
          pressOpacity={0}
          pressColor={'transparent'}
          indicatorStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent',elevation:0 ,borderBottomWidth:1,borderBottomColor:colors.borderColor}}
        />
    );
    return (
        <>
            <SafeAreaView
                style={{
                    flex:1,
                    backgroundColor:colors.cardBg,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        paddingHorizontal:15,
                        paddingVertical:12,
                        alignItems:'center',
                    }}
                >
                    <Image
                        style={{
                            width:120,
                            height:30,
                            resizeMode:'contain',
                            top:-1,
                        }}
                        source={IMAGES.tinder}
                    />
                </View>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: SIZES.width }}
                />
            </SafeAreaView>
        </>
    );
};

export default Spot;