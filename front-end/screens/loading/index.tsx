// External Imports
import React from "react";
import { Dimensions, View, Image } from "react-native";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function LoadingScreen(): JSX.Element {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Image source={require("../../assets/loading.gif")} style={{ height: HEIGHT / 8, width: WIDTH / 8 }} />
    </View>
  );
}
