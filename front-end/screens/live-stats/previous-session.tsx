// External Imports
import React from "react";
import { Dimensions, View, Text } from "react-native";

// Internal Imports
import type * as Props from "../../types/props";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function PreviousSessionComponent(props: Props.PreviousSession): JSX.Element {
  const { session } = props;
  return (
    <View className="flex-row bg-zinc-900 rounded-md w-11/12 h-16 m-2">
      <View className="flex-1 justify-around m-2">
        <Text className="text-white">
          {session.smallBlind.toString() + "/" + session.bigBlind.toString() + " " + session.gameType.toString()}
        </Text>
        <Text className="text-white">{session.location}</Text>
      </View>
      <View className="justify-end m-2">
        <View className="flex-1 justify-around items-center">
        {session.cashOut - session.cashIn >= 0 ?
          <Text className="text-green-500">
            {"+$" + (session.cashOut - session.cashIn).toString()}
          </Text>
        : 
          <Text className="text-red-500">
            {"-$" + Math.abs(session.cashOut - session.cashIn).toString()}
          </Text>
        }
          <Text className="text-white">
            {session.start.toLocaleDateString("en-US", { year: "2-digit", month: "numeric",  day: "numeric" })}
          </Text>
        </View>
      </View>
    </View>
  );
}
