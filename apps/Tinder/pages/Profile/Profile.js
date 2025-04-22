import React, {useRef} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, IMAGES, SIZES} from '../../../../app/constants/theme';
import {GlobalStyleSheet} from '../../../../app/constants/StyleSheet';
import Swiper from 'react-native-swiper';
import {Shadow} from 'react-native-shadow-2';
import SuperLikeSheet from '../components/SuperLikeSheet';

const Profile = ({navigation}) => {
  const {colors} = useTheme();
  const theme = useTheme();

  const superLikeSheet = useRef();

  return (
    <>
      <SuperLikeSheet sheetRef={superLikeSheet} />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              backgroundColor: colors.cardBg,
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 2,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 120,
                  height: 30,
                  resizeMode: 'contain',
                  top: -1,
                }}
                source={IMAGES.tinder}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <IconButton
                  onPress={() => {}}
                  size={28}
                  icon={() => (
                    <Ionicons color={colors.text} size={24} name="shield" />
                  )}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginBottom: 25,
                paddingHorizontal: 15,
              }}>
              <IconButton
                onPress={() => navigation.navigate('Settings')}
                size={28}
                style={{
                  backgroundColor: colors.bgLight,
                }}
                icon={() => (
                  <Ionicons
                    size={24}
                    color={colors.text}
                    name="settings-sharp"
                  />
                )}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{transform: [{rotate: '180deg'}]}}>
                  <Progress.Circle
                    borderWidth={0}
                    unfilledColor={'#d4e8f2'}
                    color={COLORS.primary2}
                    progress={0.4}
                    size={130}
                    thickness={5}
                    strokeCap={'round'}
                  />
                </View>
                <Image
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 100,
                    position: 'absolute',
                  }}
                  source={IMAGES.userPic5}
                />
                <LinearGradient
                  colors={['#ea3d85', '#ff864e']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[
                    styles.profileProgress,
                    {
                      borderColor: colors.cardBg,
                    },
                  ]}>
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontBold,
                      color: COLORS.white,
                      top: -1,
                    }}>
                    40% Complete
                  </Text>
                </LinearGradient>
              </View>
              <IconButton
                onPress={() => navigation.navigate('EditProfile')}
                size={28}
                style={{
                  backgroundColor: colors.bgLight,
                }}
                icon={() => (
                  <FontAwesome size={22} color={colors.text} name="pencil" />
                )}
              />
            </View>
            <Text
              style={{...FONTS.h4, textAlign: 'center', color: colors.title}}>
              Alena, 20
            </Text>
            <Text
              style={{
                ...FONTS.font,
                textAlign: 'center',
                color: colors.text,
                lineHeight: 18,
                marginBottom: 25,
              }}>
              Web Designer
            </Text>
          </View>
          <View style={[GlobalStyleSheet.container, {flex: 1}]}>
            <View style={GlobalStyleSheet.row}>
              <View style={GlobalStyleSheet.col33}>
                <TouchableOpacity
                  onPress={() => superLikeSheet.current.open()}
                  activeOpacity={0.8}
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    backgroundColor: colors.cardBg,
                    borderRadius: SIZES.radius,
                  }}>
                  <Image
                    style={{
                      tintColor: COLORS.info,
                      height: 28,
                      width: 28,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    source={IMAGES.star}
                  />
                  <Text style={{...FONTS.font, color: colors.text}}>
                    0 Super Likes
                  </Text>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderWidth: 2,
                      borderRadius: 30,
                      borderColor: colors.borderColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderStyle: 'dotted',
                      marginTop: 15,
                      marginBottom: -28,
                      backgroundColor: colors.cardBg,
                    }}>
                    <FeatherIcon size={18} color={colors.text} name={'plus'} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={GlobalStyleSheet.col33}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    backgroundColor: colors.cardBg,
                    borderRadius: SIZES.radius,
                  }}>
                  <Image
                    style={{
                      tintColor: COLORS.primary2,
                      height: 24,
                      width: 24,
                      marginTop: 7,
                      marginBottom: 7,
                    }}
                    source={IMAGES.shuttle}
                  />
                  <Text style={{...FONTS.font, color: colors.text}}>
                    My Boosts
                  </Text>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderWidth: 2,
                      borderRadius: 30,
                      borderColor: colors.borderColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderStyle: 'dotted',
                      marginTop: 15,
                      marginBottom: -28,
                      backgroundColor: colors.cardBg,
                    }}>
                    <FeatherIcon size={18} color={colors.text} name={'plus'} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={GlobalStyleSheet.col33}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('Subscriptions', {activeSlide: 0})
                  }
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    backgroundColor: colors.cardBg,
                    borderRadius: SIZES.radius,
                  }}>
                  <Image
                    style={{
                      tintColor: COLORS.danger,
                      height: 24,
                      width: 24,
                      marginTop: 7,
                      marginBottom: 7,
                    }}
                    source={IMAGES.notification}
                  />
                  <Text style={{...FONTS.font, color: colors.text}}>
                    Subscriptions
                  </Text>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderWidth: 2,
                      borderRadius: 30,
                      borderColor: colors.borderColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderStyle: 'dotted',
                      marginTop: 15,
                      marginBottom: -28,
                      backgroundColor: colors.cardBg,
                    }}>
                    <FeatherIcon size={18} color={colors.text} name={'plus'} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: -15,
                flex: 1,
                justifyContent: 'center',
                paddingTop: 45,
                paddingBottom: 30,
              }}>
              <Swiper
                style={{
                  height: 180,
                }}
                activeDotColor={COLORS.primary2}
                dotColor={theme.dark ? 'rgba(255,255,255,.15)' : '#dfdfdf'}
                paginationStyle={{
                  bottom: 80,
                }}
                showsPagination={true}>
                <View
                  style={{
                    alignItems: 'center',
                    paddingBottom: 120,
                  }}>
                  <Text style={{...FONTS.h6, color: colors.title}}>
                    Get Tinder Plus
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      color: colors.text,
                      textAlign: 'center',
                      marginBottom: 20,
                    }}>
                    Get Unlimited Likes, Passport and more!
                  </Text>
                  <Shadow
                    style={[
                      {
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 0.04,
                        shadowRadius: 4,
                      },
                      Platform.OS === 'ios' && {
                        backgroundColor: colors.cardBg,
                        borderRadius: 30,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Subscriptions', {activeSlide: 0})
                      }
                      style={{
                        backgroundColor: colors.cardBg,
                        paddingHorizontal: 25,
                        paddingVertical: 12,
                        borderRadius: 30,
                      }}>
                      <Text style={{...FONTS.fontLg, color: COLORS.primary2}}>
                        Get Tinder Plus
                      </Text>
                    </TouchableOpacity>
                  </Shadow>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    paddingBottom: 120,
                  }}>
                  <Text style={{...FONTS.h6, color: colors.title}}>
                    Get Tinder Platinum
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      color: colors.text,
                      textAlign: 'center',
                      marginBottom: 20,
                    }}>
                    Get Unlimited Likes, Passport and more!
                  </Text>
                  <DropShadow
                    style={[
                      {
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 0.04,
                        shadowRadius: 4,
                      },
                      Platform.OS === 'ios' && {
                        backgroundColor: colors.cardBg,
                        borderRadius: 30,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Subscriptions', {activeSlide: 2})
                      }
                      style={{
                        backgroundColor: colors.cardBg,
                        paddingHorizontal: 25,
                        paddingVertical: 12,
                        borderRadius: 30,
                      }}>
                      <Text style={{...FONTS.fontLg, color: colors.title}}>
                        Get Tinder Platinum
                      </Text>
                    </TouchableOpacity>
                  </DropShadow>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    paddingBottom: 120,
                  }}>
                  <Text style={{...FONTS.h6, color: colors.title}}>
                    Get Tinder Gold
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      color: colors.text,
                      textAlign: 'center',
                      marginBottom: 20,
                    }}>
                    Get Unlimited Likes, Passport and more!
                  </Text>
                  <DropShadow
                    style={[
                      {
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 0.04,
                        shadowRadius: 4,
                      },
                      Platform.OS === 'ios' && {
                        backgroundColor: colors.cardBg,
                        borderRadius: 30,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Subscriptions', {activeSlide: 1})
                      }
                      style={{
                        backgroundColor: colors.cardBg,
                        paddingHorizontal: 25,
                        paddingVertical: 12,
                        borderRadius: 30,
                      }}>
                      <Text style={{...FONTS.fontLg, color: '#f19c00'}}>
                        Get Tinder Gold
                      </Text>
                    </TouchableOpacity>
                  </DropShadow>
                </View>
              </Swiper>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profileProgress: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 20,
    //borderWidth:2,
  },
});

export default Profile;
