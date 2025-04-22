import React, { useMemo } from "react";
import { ActivityIndicator, Dimensions, FlatList, Text, TextInput, ToastAndroid, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import CustomInput from "../../../../app/components/Input/CustomInput";
import GradientBtn from "./GradientBtn";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";
import userServices from "../../../../services/user";
import CheckList from "./CheckList";

const LocationSheet = ({ setLocation, locationSheet, name, locationKey }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [address, setAddress] = React.useState(user?.[locationKey]);
  const [loading, setLoading] = React.useState(false);
  const { colors } = useTheme();
  const [cities, setCities] = React.useState([]);
  const cityList = useMemo(() => cities, [cities]);
  // const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [isLoadingCities, setIsLoadingCities] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingCities(true);
        const countriesData = await userServices?.getCountries();
        const allCities = countriesData.flatMap((item) => item.cities.map((city) => `${city}, ${item.country}`));
        setCities(allCities);
        setIsLoadingCities(false);
      } catch (error) {
        setIsLoadingCities(false);
        ToastAndroid.show("Error fetching cities", ToastAndroid.SHORT);
      }
    };

    fetchData();
  }, []);

  const filteredCityList = useMemo(() => {
    if (!searchText) return cityList;

    return cityList.filter((city) => city.split(",")[0].toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, cityList]);

  const handleSaveAddress = async (location) => {
    // if (address.length <= 6) {
    //   return ToastAndroid.show("Add a proper current address", ToastAndroid.SHORT);
    // }
    // setLoading(true);
    dispatch(Actions?.updateCurrentUser({ [locationKey]: location, profileStatusToAdd: ["current-address"] }));
    setLocation(location);
    // ToastAndroid.show("Updated Current Address", ToastAndroid.SHORT);
    // setLoading(false);
    locationSheet.current.close();
  };
  const { height } = Dimensions.get("window");
  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 12,
        }}
      >
        <Text style={{ ...FONTS.h5, color: colors.title }}>{name}</Text>
      </View>
      <View style={GlobalStyleSheet.container}>
        <View style={{ height: height * 0.7 }}>
          <View
            style={{
              marginBottom: 16,
            }}
          >
            {/* <CheckList item={address} checked={false} /> */}
            <View>
              <TextInput
                style={{
                  borderRadius: 30,
                  borderColor: colors.border,
                  borderWidth: 1,
                  paddingLeft: 45,
                  height: 48,
                  paddingRight: 15,
                  paddingVertical: 10,
                  color: colors.textLight,
                }}
                placeholder="Search your location"
                placeholderTextColor={colors.textLight}
                onChangeText={setSearchText}
              />
              <FeatherIcon
                style={{
                  position: "absolute",
                  left: 15,
                  top: 15,
                }}
                name="search"
                size={18}
                color={colors.textLight}
              />
            </View>
          </View>
          {isLoadingCities ? (
            <View style={GlobalStyleSheet.spinner}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <FlatList
              data={filteredCityList}
              initialNumToRender={50}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CheckList
                  onPress={() => {
                    setAddress(item);
                    handleSaveAddress(item);
                  }}
                  item={item}
                  checked={address === item}
                />
              )}
            />
          )}
        </View>
        {/* <View style={{ marginBottom: 15 }}>
          <CustomInput
            icon={<FeatherIcon style={{ opacity: 0.6 }} name={"map-pin"} size={20} color={colors.text} />}
            value={address}
            placeholder={"Update Current Address"}
            onChangeText={(value) => setAddress(value)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          <GradientBtn title={"Save"} onPress={handleSaveAddress} isLoading={loading} />
        </View> */}
      </View>
    </>
  );
};

export default LocationSheet;
