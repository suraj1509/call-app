import React, { Component } from 'react';
import { Animated, Image, View, PanResponder, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import EmptyCard from './EmptyCard';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';

const Foods = [
    { id: "1", image: IMAGES.slderPic1, name : "Harleen", age : "24" ,about : "Product Designer" },
    { id: "2", image: IMAGES.slderPic2, name : "Richard", age : "22" ,about : "Job Holder" },
    { id: "3", image: IMAGES.slderPic3, name : "Harleen", age : "25" ,about : "Product Designer" },
    { id: "4", image: IMAGES.slderPic4, name : "Harleen", age : "22" ,about : "Product Designer" },
    { id: "5", image: IMAGES.slderPic5, name : "Harleen", age : "21" ,about : "Product Designer" },
]

class MainSlider extends Component {

    constructor() {
        super()
        this.position = new Animated.ValueXY()
        this.state = {
           currentIndex: 0,
           isEmpty : false
        }
        this.rotate = this.position.x.interpolate({
          inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
          outputRange: ['-10deg', '0deg', '10deg'],
          extrapolate: 'clamp'
        })
        this.rotateAndTranslate = {
          transform: [{
            rotate: this.rotate
          },
          ...this.position.getTranslateTransform()
          ]
        }
        this.likeOpacity = this.position.x.interpolate({
          inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
          outputRange: [0, 0, 1],
          extrapolate: 'clamp'
        })
        this.layerlikeOpacity = this.position.x.interpolate({
          inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
          outputRange: [0, 0, .4],
          extrapolate: 'clamp'
        })
        this.nopeOpacity = this.position.x.interpolate({
          inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
          outputRange: [1, 0, 0],
          extrapolate: 'clamp'
        })
        this.nlayerOpacity = this.position.x.interpolate({
          inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
          outputRange: [.4, 0, 0],
          extrapolate: 'clamp'
        })
        this.nextCardOpacity = this.position.x.interpolate({
          inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp'
        })
        this.nextCardScale = this.position.x.interpolate({
          inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
          outputRange: [1, 0.8, 1],
          extrapolate: 'clamp'
        })
    }

   
    
    PanResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            this.position.setValue({ x: gestureState.dx, y: 0 });
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > 120) {
            Animated.spring(this.position, {
              toValue: { x: SIZES.width + 100, y: gestureState.dy },
              useNativeDriver: false,
            }).start(() => {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            })
            if(Foods.length == this.state.currentIndex + 1){
              this.setState({ isEmpty : true })
            }
          } else if (gestureState.dx < -120) {
            Animated.spring(this.position, {
              toValue: { x: -SIZES.width - 100, y: gestureState.dy },
              useNativeDriver: false,
            }).start(() => {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            })
            if(Foods.length == this.state.currentIndex + 1){
              this.setState({ isEmpty : true })
            }
          }else{  
              Animated.spring(this.position, {
                toValue: { x: 0, y: 0 },
                friction: 4,
                useNativeDriver: false,
              }).start()
          }
        }
    })
    

    renderFoods = () => {
        return Foods.map((item, i) => {
            if (i < this.state.currentIndex) {
                return null;
              } else if (i == this.state.currentIndex) {
                return (
                  <Animated.View
                    {...this.PanResponder.panHandlers}
                    key={i}
                    style={[
                      this.rotateAndTranslate,
                    {
                        height: '100%',
                        width: SIZES.width,
                        padding: 10,
                        position: "absolute"
                    }
                  ]}
                  >
                    
                  <Animated.View
                        style={{
                          opacity: this.likeOpacity,
                          alignItems:'center',
                          justifyContent:'center',
                          position: "absolute",
                          top: 50,
                          left: 40,
                          height:50,
                          width:50,
                          borderRadius:50,
                          backgroundColor:COLORS.success,
                          zIndex: 1000
                        }}
                      >
                       <FontAwesome5 size={24} color={COLORS.white} name='check' />
                      </Animated.View>
                      <Animated.View
                        style={{
                          opacity: this.nopeOpacity,
                          alignItems:'center',
                          justifyContent:'center',
                          position: "absolute",
                          top: 50,
                          right: 40,
                          height:50,
                          width:50,
                          borderRadius:50,
                          backgroundColor:COLORS.danger,
                          zIndex: 1000
                        }}
                      >
                        <FontAwesome5 size={24} color={COLORS.white} name='times' />
                      </Animated.View>
                    <View
                      style={{flex:1}}
                    >
                      <Image
                        style={{
                          flex: 1,
                          height: null,
                          width: null,
                          resizeMode: "cover",
                          borderRadius: 20
                        }}
                        source={item.image}
                      />
                      <Animated.View
                        style={{
                          opacity: this.nlayerOpacity,
                          position:'absolute',
                          height:'100%',
                          width:'100%',
                          top:0,
                          left:0,
                          backgroundColor:COLORS.danger,
                          borderRadius: 20,
                        }}
                      >
                      </Animated.View>
                      <Animated.View
                        style={{
                          opacity: this.layerlikeOpacity,
                          position:'absolute',
                          height:'100%',
                          width:'100%',
                          top:0,
                          left:0,
                          backgroundColor:"#00c37b",
                          borderRadius: 20,
                        }}
                      >
                      </Animated.View>
                      <LinearGradient
                        colors={["rgba(0,0,0,0)", "rgba(0,0,0,.5)", "rgba(0,0,0,1)"]}
                        style={{
                          position : "absolute",
                          height : 200,
                          width:"100%",
                          bottom : 0,
                          borderRadius:20,
                          justifyContent: "flex-end",
                          alignItems:"flex-start",
                        }}
                        >
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('ProfileDetail',{item : item})}
                          style={{
                            paddingVertical : 20,
                            paddingHorizontal : 20,
                          }}
                        >
                          <View
                            style={{
                              paddingHorizontal:12,
                              paddingVertical:3,
                              borderRadius:20,
                              backgroundColor:'rgba(255,255,255,.1)',
                              borderWidth:1,
                              borderColor:'rgba(255,255,255,.2)',
                              marginBottom:5,
                            }}
                          >
                            <Text style={{...FONTS.font,color:COLORS.white}}>{item.about}</Text>
                          </View>
                          <Text style={{...FONTS.h4,color:COLORS.white}}>{item.name} , {item.age}</Text>
                          <View
                            style={{
                              flexDirection:'row',
                              alignItems:'center',
                            }}
                          >
                            <FontAwesome5 size={14} color={"#BA70FF"} name="map-marker-alt"/>
                            <Text style={[FONTS.fontSm,{color:COLORS.white,marginLeft:6,opacity:.8,bottom:1}]}>32 miles away</Text>
                          </View>
                        </TouchableOpacity>

                        <View
                          style={[GlobalStyleSheet.row,{paddingHorizontal:15,marginBottom:20}]}
                        > 
                          <View style={[GlobalStyleSheet.col50]}>
                            <TouchableOpacity
                              activeOpacity={.9}
                              style={{
                                height:48,
                                backgroundColor:'rgba(255,74,92,.15)',
                                borderRadius:30,
                                borderWidth:1,
                                borderColor:'rgba(255,74,92,.25)',
                                alignItems:'center',
                                justifyContent:'center',
                              }}
                            >
                              <Image
                                style={{
                                  height:16,
                                  width:16,
                                  tintColor:COLORS.danger,
                                  resizeMode:'contain',
                                }}
                                source={IMAGES.close}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={[GlobalStyleSheet.col50]}>
                            <TouchableOpacity
                              activeOpacity={.9}
                              style={{
                                height:48,
                                backgroundColor:'rgba(186,112,255,.15)',
                                borderRadius:30,
                                borderWidth:1,
                                borderColor:'rgba(186,112,255,.25)',
                                alignItems:'center',
                                justifyContent:'center',
                              }}
                            >
                              <Image
                                style={{
                                  height:24,
                                  width:24,
                                  tintColor:"#BA70FF",
                                  resizeMode:'contain',
                                }}
                                source={IMAGES.heart2}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>

                      </LinearGradient>

                    </View>
                  </Animated.View>
                );
              } else {
                return (
                  <Animated.View
                    key={i} 
                    style={[{
                      opacity: this.nextCardOpacity,
                      transform: [{ scale: this.nextCardScale }],
                      height: '100%',
                      width: SIZES.width, 
                      padding: 10, 
                      position: 'absolute'
                    }]}
                  >
                    <View
                      style={{flex:1}}
                    >
                      <Image
                        style={{
                          flex: 1,
                          height: null,
                          width: null,
                          resizeMode: "cover",
                          borderRadius: 20
                        }}
                        source={item.image}
                      />
                      <LinearGradient
                        colors={["rgba(0,0,0,0)", "rgba(0,0,0,.5)", "rgba(0,0,0,1)"]}
                        style={{
                          position : "absolute",
                          height : 200,
                          width:"100%",
                          bottom : 0,
                          borderRadius:20,
                          justifyContent: "flex-end",
                          alignItems:"flex-start",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            paddingVertical : 20,
                            paddingHorizontal : 20,
                          }}
                        >
                          <View
                            style={{
                              paddingHorizontal:12,
                              paddingVertical:3,
                              borderRadius:20,
                              backgroundColor:'rgba(255,255,255,.1)',
                              borderWidth:1,
                              borderColor:'rgba(255,255,255,.2)',
                              marginBottom:5,
                            }}
                          >
                            <Text style={{...FONTS.font,color:COLORS.white}}>{item.about}</Text>
                          </View>
                          <Text style={{...FONTS.h4,color:COLORS.white}}>{item.name} , {item.age}</Text>
                          <View
                            style={{
                              flexDirection:'row',
                              alignItems:'center',
                            }}
                          >
                            <FontAwesome5 size={14} color={"#BA70FF"} name="map-marker-alt"/>
                            <Text style={[FONTS.fontSm,{color:COLORS.white,marginLeft:6,opacity:.8,bottom:1}]}>32 miles away</Text>
                          </View>
                        </TouchableOpacity>

                        <View
                          style={[GlobalStyleSheet.row,{paddingHorizontal:15,marginBottom:20}]}
                        > 
                          <View style={[GlobalStyleSheet.col50]}>
                            <TouchableOpacity
                              activeOpacity={.9}
                              style={{
                                height:48,
                                backgroundColor:'rgba(255,74,92,.15)',
                                borderRadius:30,
                                borderWidth:1,
                                borderColor:'rgba(255,74,92,.25)',
                                alignItems:'center',
                                justifyContent:'center',
                              }}
                            >
                              <Image
                                style={{
                                  height:16,
                                  width:16,
                                  tintColor:COLORS.danger,
                                  resizeMode:'contain',
                                }}
                                source={IMAGES.close}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={[GlobalStyleSheet.col50]}>
                            <TouchableOpacity
                              activeOpacity={.9}
                              style={{
                                height:48,
                                backgroundColor:'rgba(186,112,255,.15)',
                                borderRadius:30,
                                borderWidth:1,
                                borderColor:'rgba(186,112,255,.25)',
                                alignItems:'center',
                                justifyContent:'center',
                              }}
                            >
                              <Image
                                style={{
                                  height:24,
                                  width:24,
                                  tintColor:"#BA70FF",
                                  resizeMode:'contain',
                                }}
                                source={IMAGES.heart2}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </Animated.View>
                );
            }
        }).reverse();
    };

    render(){
        return (
            <>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 ,paddingBottom: 60 }}>
                        {this.renderFoods()}
                        {this.state.isEmpty &&
                          <EmptyCard/>
                        }
                    </View>
                </View>
            </>
        );
    }
};

export default MainSlider;