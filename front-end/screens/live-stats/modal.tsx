// External Imports
import React, { useEffect, useState } from "react";
import { Dimensions, Modal, TouchableWithoutFeedback, Pressable, View, Text, TouchableOpacity, TextInput, Keyboard } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// Internal Imports
import * as Enums from "../../helper/enums";
import * as Interfaces from "../../helper/interfaces";
import * as Props from "../../helper/props";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function LiveStatsModal( props: Props.LiveStatsModal ): JSX.Element {
  const { modal, setModal, setFilters, setActiveSession, addSession } = props;

  function onClickOutside(): void {
    if(Keyboard.isVisible())
      Keyboard.dismiss();
    else
      setModal({ visible: false, type: Enums.LiveStatsModals.None });
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modal.visible}>
      <Pressable className="flex-1 flex-col justify-center items-center bg-black/50" onPress={() => onClickOutside()}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="bg-zinc-800 border border-white rounded-lg drop-shadow-2xl h-1/2 w-5/6 z-10">
            {(() => {
              switch (modal.type) {
                case Enums.LiveStatsModals.Filters:
                  return (
                    <FiltersComponent
                      modal={modal}
                      setModal={setModal}
                      setFilters={setFilters}
                      setActiveSession={setActiveSession}
                      addSession={addSession}
                    />
                  );
                case Enums.LiveStatsModals.Add:
                  return (
                    <AddComponent
                      modal={modal}
                      setModal={setModal}
                      setFilters={setFilters}
                      setActiveSession={setActiveSession}
                      addSession={addSession}
                    />
                  );
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
};

function FiltersComponent(props: Props.LiveStatsModal): JSX.Element {
  const { setModal, setFilters } = props;
  const [ isTimeFrameOpen, setIsTimeFrameOpen ] = useState<boolean>(false);
  const [ timeFrame, setTimeFrame ] = useState<Enums.TimeFrames | null>(null);
  const [ isGameTypeOpen, setIsGameTypeOpen ] = useState<boolean>(false);
  const [ gameType, setGameType ] = useState<Enums.GameTypes[]>([]);

  function onSubmit(): void {
    if(timeFrame)
      setFilters({ timeFrame, gameType });
    setModal({ visible: false, type: Enums.LiveStatsModals.None });
  }

  return (
    <Pressable className="h-full" onPress={() => { setIsTimeFrameOpen(false); setIsGameTypeOpen(false); }}>
      <View className="flex-row justify-around m-4">
        <Text className="text-xl font-semibold text-white">Filter</Text>
      </View>
      <View className="mx-5">
        <View className="mb-2">
          <Text className="mx-1 text-white">Time Frame</Text>
          <DropDownPicker
            open={isTimeFrameOpen}
            value={timeFrame}
            items={Object.values(Enums.TimeFrames).map((item) => ({
              label: item,
              value: item,
            }))}
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
            items={Object.values(Enums.GameTypes).map((item) => ({ label: item, value: item, }))}
            setOpen={(value) => { setIsTimeFrameOpen(false); setIsGameTypeOpen(value); }}
            setValue={setGameType}
            theme="DARK"
            style={{ backgroundColor: "rgb(24 24 27)", borderWidth: 0 }}
          />
        </View>
      </View>
      <TouchableOpacity
        className={"absolute bottom-0 self-center border-2 border-white rounded-lg my-5 px-6 -z-10" + (!timeFrame ? " opacity-25" : "")}
        disabled={!timeFrame}
        onPress={() => onSubmit()}
      >
        <Text className="text-center text-white text-lg">Submit</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

function AddComponent(props: Props.LiveStatsModal): JSX.Element {
  const { setModal, setActiveSession, addSession } = props;
  const [ tab, setTab ] = useState<Enums.AddModalTabs>(Enums.AddModalTabs.Start);
  const [ isGameTypeOpen, setIsGameTypeOpen ] = useState<boolean>(false);
  const [ isDateTimeOpen, setIsDateTimeOpen ] = useState<[boolean, boolean]>([ false, false, ]);
  const [ isStartButtonEnabled, setIsStartButtonEnabled ] = useState<boolean>(false);
  const [ session, setSession ] = useState<Interfaces.InitializeSession>({});
  const [ gameType, setGameType ] = useState<Enums.GameTypes | null>(null);

  useEffect(() => {
    if(gameType)
      setSession((prev) => ({...prev, gameType: gameType}));
  }, [gameType])

  useEffect(() => {
    if(tab === Enums.AddModalTabs.Start){
      if(session.location && session.gameType && session.smallBlind && session.bigBlind && session.cashIn)
        setIsStartButtonEnabled(true);
      else
        setIsStartButtonEnabled(false);
    }
    else if(tab === Enums.AddModalTabs.Add){
      if(session.location && session.gameType && session.start && session.end && session.smallBlind && session.bigBlind && session.cashIn && session.cashOut)
        setIsStartButtonEnabled(true);
      else
        setIsStartButtonEnabled(false);
    }
  }, [tab, session])

  function onSubmit(): void {
    if(tab === Enums.AddModalTabs.Start){
      const tempSession = {
        ...session,
        start: new Date(),
      } as Interfaces.ActiveSession;
      setActiveSession(tempSession);
    }
    else if (tab === Enums.AddModalTabs.Add){
      const tempSession = {
        ...session,
        uuid: uuidv4(),
      } as Interfaces.PreviousSession;
      addSession(tempSession);
    }
    setModal({ visible: false, type: Enums.LiveStatsModals.None });
  }

  return (
    <Pressable className="h-full" onPress={() => setIsGameTypeOpen(false)}>
      <View className="flex-row justify-around m-4">
        <TouchableOpacity onPress={() => setTab(Enums.AddModalTabs.Start)}>
          <Text className={"text-xl font-semibold text-white" + (tab !== Enums.AddModalTabs.Start ? " opacity-25" : "")}>
            Start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(Enums.AddModalTabs.Add)}>
          <Text className={"text-xl font-semibold text-white" + (tab !== Enums.AddModalTabs.Add ? " opacity-25" : "")}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mx-5">
        <View className="mb-2" onTouchStart={() => setIsGameTypeOpen(false)}>
          <Text className="mx-1 text-white">Location</Text>
          <TextInput
            className="bg-zinc-900 rounded-lg p-3 text-[#BFC7D5]"
            value={session.location || ""}
            onChangeText={(text) => setSession((prev) => ({...prev, location: text}))}
          />
        </View>
        <View className="mb-2">
          <Text className="mx-1 text-white">Game Type</Text>
          <DropDownPicker
            open={isGameTypeOpen}
            value={session.gameType || null}
            items={Object.values(Enums.GameTypes).map((item) => ({ label: item, value: item }))}
            setOpen={(value) => { Keyboard.dismiss(); setIsGameTypeOpen(value); }}
            setValue={setGameType}
            theme="DARK"
            style={{ backgroundColor: "rgb(24 24 27)", borderWidth: 0 }}
          />
        </View>
        {tab ===  Enums.AddModalTabs.Add ?
          <View className="flex-row justify-around -z-10">
            <View className="mb-2 w-[48%]">
              <Text className="mx-2 text-white text-center">Start</Text>
              <TouchableOpacity className="bg-zinc-900 rounded-lg p-3" onPress={() => setIsDateTimeOpen([true, false])}>
                <Text className="text-center text-[2.25vw] text-[#BFC7D5]">
                  {session.start ? session.start.toLocaleString() : ""}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                themeVariant="light"
                mode="datetime"
                isVisible={isDateTimeOpen[0]}
                onConfirm={(date) => {
                  setSession((prev) => ({...prev, start: date}))
                  setIsDateTimeOpen([false, false]);
                }}
                onCancel={() => setIsDateTimeOpen([false, false])}
              />
            </View>
            <View className="mb-2 w-[48%]">
              <Text className="mx-2 text-white text-center">End</Text>
              <TouchableOpacity className="bg-zinc-900 rounded-lg p-3" onPress={() => setIsDateTimeOpen([false, true])}>
                <Text className="text-center text-[2.25vw] text-[#BFC7D5]">
                  {session.end ? session.end.toLocaleString() : ""}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                themeVariant="light"
                mode="datetime"
                isVisible={isDateTimeOpen[1]}
                onConfirm={(date) => {
                  setSession((prev) => ({...prev, end: date}))
                  setIsDateTimeOpen([false, false]);
                }}
                onCancel={() => setIsDateTimeOpen([false, false])}
              />
            </View>
          </View>
        : <></> }
        <View className="flex-row -z-10">
          <View className="flex-1 flex-row justify-around">
            <View className="mb-2 w-[45%]">
              <Text className="mx-1 text-center text-white">SB</Text>
              <TextInput
                className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                keyboardType="numeric"
                value={session.smallBlind?.toString()}
                onChangeText={(text) => setSession((prev) => ({...prev, smallBlind: Number(text)}))}
              />
            </View>
            <View className="mb-2 w-[45%]">
              <Text className="mx-1 text-center text-white">BB</Text>
              <TextInput
                className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                keyboardType="numeric"
                value={session.bigBlind?.toString()}
                onChangeText={(text) => setSession((prev) => ({...prev, bigBlind: Number(text)}))}
              />
            </View>
          </View>
          <View className={"flex-1 flex-row" + (tab ===  Enums.AddModalTabs.Add ? " justify-around" : "")}>
            <View className="mb-2 w-[45%]">
              <Text className="mx-1 text-center text-white">In</Text>
              <TextInput
                className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                keyboardType="numeric"
                value={session.cashIn?.toString()}
                onChangeText={(text) => setSession((prev) => ({...prev, cashIn: Number(text)}))}
              />
            </View>
            {tab === Enums.AddModalTabs.Add? 
              <View className="mb-2 w-[45%]">
                <Text className="mx-1 text-center text-white">Out</Text>
                <TextInput
                  className="bg-zinc-900 rounded-lg p-3 text-center text-[#BFC7D5]"
                  keyboardType="numeric"
                  value={session.cashOut?.toString()}
                  onChangeText={(text) => setSession((prev) => ({...prev, cashOut: Number(text)}))}
                />
              </View>
            : <></> }
          </View>
        </View> 
      </View>
      <TouchableOpacity
        className={"absolute bottom-0 self-center border-2 border-white rounded-lg my-5 px-6 -z-10" + (!isStartButtonEnabled ? " opacity-25" : "")}
        disabled={!isStartButtonEnabled}
        onPress={() => onSubmit()}
      >
        <Text className="text-center text-white text-lg">
          {tab ===  Enums.AddModalTabs.Start ? "Start" : "Add"}
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};

function ModifyComponent(): JSX.Element {
  return (
    <View>
      <Text>Modify</Text>
    </View>
  );
};
