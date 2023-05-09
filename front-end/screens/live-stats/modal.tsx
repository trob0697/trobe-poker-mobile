// External Imports
import React, { useEffect, useState } from "react";
import { Dimensions, Modal, TouchableWithoutFeedback, Pressable, View, Text, TouchableOpacity, TextInput, Keyboard } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// Internal Imports
import * as Enums from "../../types/enums";
import type * as Interfaces from "../../types/interfaces";
import type * as Props from "../../types/props";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function LiveStatsModal(props: Props.LiveStatsModal): JSX.Element {
  const { modal, setModal, setFilters, setActiveSession, addPreviousSession } = props;

  function onClickOutside(): void {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      setModal({ visible: false, type: Enums.LiveStatsModals.None });
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modal.visible}>
      <Pressable className="flex-1 flex-col justify-center items-center bg-black/50" onPress={() => onClickOutside()}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="bg-zinc-800 border border-white rounded-lg drop-shadow-2xl h-1/2 w-5/6 z-10">
          {(() => {
            switch (modal.type) {
              case Enums.LiveStatsModals.Filters:
                return <FiltersComponent modal={modal} setModal={setModal} setFilters={setFilters} setActiveSession={setActiveSession} addPreviousSession={addPreviousSession} />;
              case Enums.LiveStatsModals.Add:
                return <AddComponent modal={modal} setModal={setModal} setFilters={setFilters} setActiveSession={setActiveSession} addPreviousSession={addPreviousSession} />;
              case Enums.LiveStatsModals.Modify:
                return <ModifyComponent />;
              case Enums.LiveStatsModals.None:
                return <></>;
            }
          })()}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

function FiltersComponent(props: Props.LiveStatsModal): JSX.Element {
  const { modal, setModal, setFilters, setActiveSession, addPreviousSession } = props;
  const [isTimeFrameOpen, setIsTimeFrameOpen] = useState<boolean>(false);
  const [timeFrame, setTimeFrame] = useState<Enums.TimeFrames | null>(null);
  const [isGameTypeOpen, setIsGameTypeOpen] = useState<boolean>(false);
  const [gameType, setGameType] = useState<Enums.GameTypes[]>([]);
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (!timeFrame) {
      setIsSubmitButtonEnabled(false);
    } else {
      setIsSubmitButtonEnabled(true);
    }
  }, [timeFrame, gameType]);

  function onSubmit(): void {
    if (timeFrame) {
      setFilters({ timeFrame, gameType });
    }
    setModal({ visible: false, type: Enums.LiveStatsModals.None });
  }

  return (
    <Pressable className="h-full" onPress={() => { setIsTimeFrameOpen(false); setIsGameTypeOpen(false); }} >
      <View className="flex-row justify-around m-4">
        <Text className="text-xl font-semibold text-white">Filter</Text>
      </View>
      <View className="mx-5">
        <View className="mb-2">
          <Text className="mx-1 text-white">Time Frame</Text>
          <DropDownPicker
            open={isTimeFrameOpen}
            value={timeFrame}
            items={Object.values(Enums.TimeFrames).map((item) => ({ label: item, value: item }))}
            setOpen={(value) => { setIsGameTypeOpen(false); setIsTimeFrameOpen(value); }}
            setValue={setTimeFrame}
            theme="DARK"
            style={{ backgroundColor: "rgb(24 24 27)", borderWidth: 0 }}
          />
        </View>
        <View className="mb-2 -z-10">
          <Text className="mx-1 text-white">Game Type</Text>
          <DropDownPicker
            open={isGameTypeOpen}
            value={gameType}
            multiple={true}
            items={Object.values(Enums.GameTypes).map((item) => ({ label: item, value: item }))}
            setOpen={(value) => { setIsTimeFrameOpen(false); setIsGameTypeOpen(value); }}
            setValue={setGameType}
            theme="DARK"
            style={{ backgroundColor: "rgb(24 24 27)", borderWidth: 0 }}
          />
        </View>
      </View>
      <TouchableOpacity
        className={"absolute bottom-0 self-center border-2 border-white rounded-lg my-5 px-6 -z-10" + (!isSubmitButtonEnabled ? " opacity-25" : "")}
        disabled={!isSubmitButtonEnabled}
        onPress={() =>  onSubmit()}
      >
        <Text className="text-center text-white text-lg">Submit</Text>
      </TouchableOpacity>
    </Pressable>
  );
}

function AddComponent(props: Props.LiveStatsModal): JSX.Element {
  const { modal, setModal, setActiveSession, addPreviousSession } = props;
  const [isStartSession, setIsStartSession] = useState<boolean>(true);
  const [isGameTypeOpen, setIsGameTypeOpen] = useState<boolean>(false);
  const [isDateTimeOpen, setIsDateTimeOpen] = useState<[boolean, boolean]>([ false, false ]);
  const [isStartButtonEnabled, setIsStartButtonEnabled] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [gameType, setGameType] = useState<Enums.GameTypes | null>(null);
  const [sessionStartEnd, setSessionStartEnd] = useState<[Date, Date]>([ new Date(), new Date() ]);
  const [blinds, setBlinds] = useState<[string, string]>(["", ""]);
  const [cashInOut, setCashInOut] = useState<[string, string]>(["", ""]);

  useEffect(() => {
    if ( isStartSession && (location === "" || !gameType || blinds.includes("") || cashInOut[0] === "") ) {
      setIsStartButtonEnabled(false);
    } else if ( !isStartSession && (location === "" || !gameType || sessionStartEnd[0] > sessionStartEnd[1] || blinds.includes("") || cashInOut.includes("")) ) {
      setIsStartButtonEnabled(false);
    } else {
      setIsStartButtonEnabled(true);
    }
  }, [location, gameType, sessionStartEnd, blinds, cashInOut]);

  function onSubmit(): void {
    if (isStartSession && gameType) {
      const tempActiveSession: Interfaces.ActiveSession = {
        location,
        gameType,
        smallBlind: Number(blinds[0]),
        bigBlind: Number(blinds[1]),
        cashIn: Number(cashInOut[0]),
        start: new Date(),
      };
      setActiveSession(tempActiveSession);
    } else if (!isStartSession && gameType) {
      const tempPreviousSession: Interfaces.PreviousSession = {
        uuid: uuidv4(),
        location,
        gameType,
        smallBlind: Number(blinds[0]),
        bigBlind: Number(blinds[1]),
        cashIn: Number(cashInOut[0]),
        cashOut: Number(cashInOut[1]),
        start: sessionStartEnd[0],
        end: sessionStartEnd[1],
      };
      addPreviousSession(tempPreviousSession);
    }
    setModal({ visible: false, type: Enums.LiveStatsModals.None });
  }

  return (
    <Pressable className="h-full" onPress={() => setIsGameTypeOpen(false)} >
      <View className="flex-row justify-around m-4">
        <TouchableOpacity onPress={() => setIsStartSession(true)} >
          <Text className={"text-xl font-semibold text-white" + (!isStartSession ? " opacity-25" : "")} >
            Start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsStartSession(false)} >
          <Text className={"text-xl font-semibold text-white" + (isStartSession ? " opacity-25" : "")}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mx-5">
        <View className="mb-2" onTouchStart={() => setIsGameTypeOpen(false)} >
          <Text className="mx-1 text-white">Location</Text>
          <TextInput
            className="bg-zinc-900 rounded-lg p-3 text-[#BFC7D5]"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
        </View>
        <View className="mb-2">
          <Text className="mx-1 text-white">Game Type</Text>
          <DropDownPicker
            open={isGameTypeOpen}
            value={gameType}
            items={Object.values(Enums.GameTypes).map((item) => ({ label: item, value: item }))}
            setOpen={(value) => { Keyboard.dismiss(); setIsGameTypeOpen(value); }}
            setValue={setGameType}
            theme="DARK"
            style={{ backgroundColor: "rgb(24 24 27)", borderWidth: 0 }}
          />
        </View>
          {!isStartSession ? 
            <View className="flex-row justify-around -z-10">
              <View className="mb-2 w-[48%]">
                <Text className="mx-2 text-white text-center">Start</Text>
                <TouchableOpacity className="bg-zinc-900 rounded-lg p-3" onPress={() => setIsDateTimeOpen([true, false])} >
                  <Text className="text-center text-[2.25vw] text-[#BFC7D5]">{sessionStartEnd[0].toLocaleString()}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  themeVariant="light"
                  mode="datetime"
                  isVisible={isDateTimeOpen[0]}
                  onConfirm={(date) => { setSessionStartEnd([date, sessionStartEnd[1]]); setIsDateTimeOpen([false, false]); }}
                  onCancel={() =>  setIsDateTimeOpen([false, false])}
                />
              </View>
              <View className="mb-2 w-[48%]">
                <Text className="mx-2 text-white text-center">End</Text>
                <TouchableOpacity className="bg-zinc-900 rounded-lg p-3" onPress={() => setIsDateTimeOpen([false, true])} >
                  <Text className="text-center text-[2.25vw] text-[#BFC7D5]">{sessionStartEnd[1].toLocaleString()}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  themeVariant="light"
                  mode="datetime"
                  isVisible={isDateTimeOpen[1]}
                  onConfirm={(date) => { setSessionStartEnd([sessionStartEnd[0], date]); setIsDateTimeOpen([false, false]); }}
                  onCancel={() => setIsDateTimeOpen([false, false])}
                />
              </View>
            </View>
          : <></>}
        <View className="flex-row -z-10">
          <View className="flex-1 flex-row justify-around">
            <View className="mb-2 w-[45%]">
              <Text className="mx-1 text-center text-white">SB</Text>
              <TextInput
                className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                keyboardType="numeric"
                value={blinds[0]}
                onChangeText={(text) => setBlinds([text, blinds[1]])}
              />
            </View>
            <View className="mb-2 w-[45%]">
              <Text className="mx-1 text-center text-white">BB</Text>
              <TextInput
                className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                keyboardType="numeric"
                value={blinds[1]}
                onChangeText={(text) => setBlinds([blinds[0], text])}
              />
            </View>
          </View>
          <View className={"flex-1 flex-row" + (!isStartSession ? " justify-around" : "")} >
            <View className="mb-2 w-[45%]">
              <Text className="mx-1 text-center text-white">In</Text>
              <TextInput
                className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                keyboardType="numeric"
                value={cashInOut[0]}
                onChangeText={(text) => setCashInOut([text, cashInOut[1]])}
              />
            </View>
              {!isStartSession ? 
                <View className="mb-2 w-[45%]">
                  <Text className="mx-1 text-center text-white">Out</Text>
                  <TextInput
                    className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                    keyboardType="numeric"
                    value={cashInOut[1]}
                    onChangeText={(text) => setCashInOut([cashInOut[0], text])}
                  />
                </View>
              : <></>}
          </View>
        </View>
      </View>
      <TouchableOpacity
        className={"absolute bottom-0 self-center border-2 border-white rounded-lg my-5 px-6 -z-10" + (!isStartButtonEnabled ? " opacity-25" : "")}
        disabled={!isStartButtonEnabled}
        onPress={() => onSubmit()}
      >
        <Text className="text-center text-white text-lg">{isStartSession ? "Start" : "Add"}</Text>
      </TouchableOpacity>
    </Pressable>
  );
}

function ModifyComponent(): JSX.Element {
  return (
    <View>
      <Text>Modify</Text>
    </View>
  );
}
