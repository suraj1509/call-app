import React, {useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {FONTS} from '../../../../app/constants/theme';
import {GlobalStyleSheet} from '../../../../app/constants/StyleSheet';
import CheckList from './CheckList';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../../../redux/Actions';

const GenderSheet = ({genderSheet}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.currentUser);

  const genderData = ['Women', 'Men', 'Other'];
  const [activeGender, setGender] = useState(
    user?.preferences?.genderPreference,
  );

  const handleGenderSelect = async data => {
    if (user?.preferences?.genderPreference === data) {
      genderSheet?.current.close();
      return;
    }
    try {
      setGender(data);
      dispatch(
        Actions?.updateCurrentUser({
          preferences: {genderPreference: data},
        }),
      );
      // ToastAndroid.show('Updated gender preference', ToastAndroid.SHORT);
      genderSheet?.current.close();
    } catch (error) {
      ToastAndroid.show('Error updating gender preference', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 12,
        }}>
        <Text style={{...FONTS.h5, color: colors.title}}>Show Me</Text>
      </View>
      <View style={GlobalStyleSheet.container}>
        {genderData.map((data, index) => {
          return (
            <CheckList
              onPress={() => handleGenderSelect(index)}
              item={data}
              checked={data == genderData[activeGender] ? true : false}
              key={index}
            />
          );
        })}
      </View>
    </>
  );
};

export default GenderSheet;
