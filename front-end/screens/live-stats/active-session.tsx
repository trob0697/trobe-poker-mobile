// External Imports
import React, { Dimensions, View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Internal Imports
import type * as Props from "../../types/props";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function ActiveSessionComponent(props: Props.ActiceSession): JSX.Element {
  const { session } = props;
  return (
    <View className="flex-row bg-zinc-900 rounded-md w-11/12 h-16 m-2">
      <View className="flex-1 justify-around m-2">
        <Text className="text-white">
          {session.smallBlind.toString() + "/" + session.bigBlind.toString() + " " + session.gameType.toString()}
        </Text>
        <Text className="text-white">{session.location}</Text>
      </View>
      <View className="justify-center m-6">
        <FontAwesome className="self-center" name="circle" size={WIDTH * 0.03} color="red" />
      </View>
    </View>
  );
}
