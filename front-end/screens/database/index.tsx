// External Imports
import React from "react";
import { Dimensions, View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function DatabaseScreen(): JSX.Element {
  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Text className="text-center text-2xl text-white">
        Database Feature Is Currently Under Construction, Come Back Soon!
      </Text>
      <FontAwesome name="hourglass-2" size={HEIGHT * 0.03} color={"white"} />
    </View>
  );
};
