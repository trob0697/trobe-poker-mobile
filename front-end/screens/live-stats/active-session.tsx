// External Imports
import React, { useEffect, useState } from "react";
import { Dimensions, View, TouchableOpacity, Text } from "react-native";
// import { Transition, Transitioning } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Internal Imports
import * as Props from "../../helper/props";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
// const ref = React.useRef();
// const transition= (
//   <Transition.Together>
//     <Transition.In type="fade"  durationMs={200}/>
//     <Transition.Change />
//     <Transition.Out type="fade"  durationMs={200}/>
//   </Transition.Together>
// )

export default function ActiveSessionComponent( props: Props.ActiveSession ): JSX.Element {
  const { session, sessionKey, sessionDropDownIndex, setSessionDropDownIndex } = props;
  const [duration, setDuration] = useState<string>("0HH 0MM 0SS");

  useEffect(() => {
    setInterval(() => {
      const tempDuration = new Date().getTime() - session.start.getTime();
      let seconds = Math.floor(tempDuration / 1000);
      let minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      setDuration(hours.toString() + "HH " + (minutes % 60).toString() + "MM " + (seconds % 60).toString() + "SS");
    }, 1000);
  }, [duration]);

  function onClickComponent(): void {
    if(sessionKey === sessionDropDownIndex)
      setSessionDropDownIndex(-1);
    else
      setSessionDropDownIndex(sessionKey);
  }

  return (
    <View className="my-2">
      <TouchableOpacity className={"flex-row bg-zinc-900 w-11/12 h-16 " + (sessionKey === sessionDropDownIndex ? "rounded-t-md" : "rounded-md")} 
        onPress={() => onClickComponent()}
      >
        <View className="flex-1 justify-around m-2">
          <Text className="text-white">
            {session.smallBlind.toString() + "/" + session.bigBlind.toString() + " " + session.gameType.toString()}
          </Text>
          <Text className="text-white">{session.location}</Text>
        </View>
        <View className="justify-center m-6">
          <FontAwesome
            className="self-center"
            name="circle"
            size={WIDTH * 0.03}
            color="red"
          />
        </View>
      </TouchableOpacity>
      {sessionKey === sessionDropDownIndex ?
        <View className="bg-zinc-800 rounded-b-md">
          <Text className="text-white text-center">{duration}</Text>
          <Text className="text-white text-center">Info 1</Text>
          <Text className="text-white text-center">Info 2</Text>
        </View>
      : <></>}
    </View>
  );
}
