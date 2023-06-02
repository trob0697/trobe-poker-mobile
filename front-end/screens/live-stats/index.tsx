// External Imports
import React, { useState, useEffect, useCallback } from "react";
import { Dimensions, ScrollView, View, TouchableOpacity, Text, } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Internal Imports
import * as Defaults from "../../helper/defaults";
import * as Functions from "../../helper/functions";
import * as Enums from "../../helper/enums";
import * as Interfaces from "../../helper/interfaces";
import GraphComponent from "./graph";
import ActiveSessionComponent from "./active-session";
import PreviousSessionComponent from "./previous-session";
import LiveStatsModal from "./modal";

// Test Data
import { PreviousSessionsTestData } from "../../assets/test_data";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default function LiveStatsScreen(): JSX.Element {
  const [activeSession, setActiveSession] = useState<Interfaces.ActiveSession | null>(null);
  const [previousSessions, setPreviousSessions] = useState<Interfaces.PreviousSession[]>([]);
  const [sessionDropDownIndex, setSessionDropDownIndex] = useState<number>(-1);
  const [filteredPreviousSessions, setFilteredPreviousSessions] = useState<Interfaces.PreviousSession[]>([]);
  const [filters, setFilters] = useState<Interfaces.Filters>(Defaults.Filters);
  const [modal, setModal] = useState<Interfaces.LiveStatsModal>(Defaults.Modal);

  useEffect(() => {
    const data = PreviousSessionsTestData;
    setPreviousSessions(data);
  }, []);

  useEffect(() => {
    let tempPreviousSessions = Functions.filterSessions(previousSessions, filters)
    setFilteredPreviousSessions(tempPreviousSessions);
  }, [previousSessions, filters]);

  const addSession = useCallback((session: Interfaces.PreviousSession) => {
    setPreviousSessions((prev) => [...prev, session]);
  }, [previousSessions]);

  return (
    <View className="flex-1 bg-black">
      <View className="flex-row justify-between mx-5">
        <TouchableOpacity onPress={() => setModal({ visible: true, type: Enums.LiveStatsModals.Filters })}>
          <MaterialCommunityIcons
            name="filter"
            color="white"
            size={WIDTH * 0.06}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal({ visible: true, type: Enums.LiveStatsModals.Add })}>
          <MaterialCommunityIcons
            name="plus"
            color="white"
            size={WIDTH * 0.06}
          />
        </TouchableOpacity>
      </View>
      <GraphComponent sessions={filteredPreviousSessions} />
      <ScrollView>
        <View className="items-center">
          {activeSession == null && previousSessions.length === 0 ?
            <Text className="text-white m-5"> No sessions available</Text>
          : <></> }
          {activeSession != null ?
            <ActiveSessionComponent
              session={activeSession}
              sessionKey={0}
              sessionDropDownIndex={sessionDropDownIndex}
              setSessionDropDownIndex={setSessionDropDownIndex}
            />
          : <></> }
          {filteredPreviousSessions.sort((a, b) => b.start.getDate() - a.start.getDate()).map((session, index) => { return (
            <PreviousSessionComponent 
              key={index} 
              session={session} 
              sessionKey={index+1}
              sessionDropDownIndex={sessionDropDownIndex}
              setSessionDropDownIndex={setSessionDropDownIndex}
            />
          )})}
        </View>
      </ScrollView>
      <LiveStatsModal
        modal={modal}
        setModal={setModal}
        setFilters={setFilters}
        setActiveSession={setActiveSession}
        addSession={addSession}
      />
    </View>
  );
}
