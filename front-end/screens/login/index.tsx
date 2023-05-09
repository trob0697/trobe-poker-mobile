// External Imports
import React from "react";
import { Dimensions, View, Text } from "react-native";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function LoginScreen(): JSX.Element {
  return (
    <View className="flex-1 bg-black justify-center items-center">
      <Text className="text-center text-2xl text-white">Login</Text>
    </View>
  );
}
