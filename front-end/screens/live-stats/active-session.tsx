// External Imports
import React, { useEffect, useState } from "react";
import { Dimensions, View, TouchableOpacity, Text, TextInput, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Internal Imports
import * as Defaults from "../../helper/defaults";
import * as Interfaces from "../../helper/interfaces";
import * as Props from "../../helper/props";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function ActiveSessionComponent( props: Props.ActiveSession ): JSX.Element {
  const { addSession, clearSession, sessionKey, sessionDropDownIndex, setSessionDropDownIndex } = props;
  const [ session, setSession] = useState<Interfaces.ActiveSession>(Defaults.ActiveSession);
  const [ duration, setDuration ] = useState<string>("0HH 0MM 0SS");
  const [ addValue, setAddValue ] = useState<string>("");
  const [ cashOutValue, setCashOutValue ] = useState<string>("");

  useEffect(() => {
    setSession(props.session)
  }, [props.session]);

  useEffect(() => {
    setInterval(() => {
      const tempDuration = new Date().getTime() - session.start.getTime();
      let seconds = Math.floor(tempDuration / 1000);
      let minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      setDuration(hours.toString() + "HH " + (minutes % 60).toString() + "MM " + (seconds % 60).toString() + "SS");
    }, 1000);
  }, []);

  function onClickComponent(): void {
    if(sessionKey === sessionDropDownIndex)
      setSessionDropDownIndex(-1);
    else
      setSessionDropDownIndex(sessionKey);
  };

  function addCashIn(): void {
    setSession((prev) => ({...prev, cashIn: prev.cashIn + Number(addValue)}));
    setAddValue("");
  };

  function endSession(): void {
    const endedSession = {
      ...session,
      cashOut: Number(cashOutValue),
      end: new Date()
    } as Interfaces.PreviousSession
    addSession(endedSession);
    clearSession();
  };

  return (
    <View className="my-2">
      <TouchableOpacity className={"flex-row w-11/12 h-16 bg-zinc-900 " + (sessionKey === sessionDropDownIndex ? "rounded-t-md" : "rounded-md")} 
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
        <View className="p-2 items-center rounded-b-md bg-zinc-800">
          <Text className="m-0.5 text-xs text-white">{duration}</Text>
          <Text className="m-0.5 text-xs text-white">Cash In: {session.cashIn}</Text>
          <View className="m-0.5 flex-row h-7 ">
            <TouchableOpacity className="justify-center items-center w-1/12 rounded-l-lg bg-emerald-700" onPress={addCashIn}>
                <Text className="text-xs text-gray-200">Add</Text>  
            </TouchableOpacity>
            <TextInput className="w-1/6 text-center bg-emerald-600 text-white" 
              keyboardType="numeric"
              value={addValue}
              onChangeText={setAddValue}
            />
            <TextInput className="w-1/6 text-center bg-red-600 text-white"
              keyboardType="numeric"
              value={cashOutValue}
              onChangeText={setCashOutValue}
            />
            <TouchableOpacity className="justify-center items-center w-1/12 rounded-r-lg bg-red-700" onPress={endSession}>
              <Text className="text-center text-xs text-gray-200">End</Text>
            </TouchableOpacity>
          </View>
        </View>
      : <></>}
    </View>
  );
};
