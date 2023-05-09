// External Imports
import React, { useState, useEffect, useCallback } from "react";
import { Dimensions, ScrollView, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Internal Imports
import * as Enums from "../../types/enums";
import type * as Interfaces from "../../types/interfaces";
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
  const [filteredPreviousSessions, setFilteredPreviousSessions] = useState<Interfaces.PreviousSession[]>([]);
  const [filters, setFilters] = useState<Interfaces.Filters>({ timeFrame: Enums.TimeFrames.AllTime, gameType: Object.values(Enums.GameTypes )});
  const [modal, setModal] = useState<Interfaces.LiveStatsModal>({ visible: false, type: Enums.LiveStatsModals.None });

  useEffect(() => {
    const data = PreviousSessionsTestData;
    setPreviousSessions(data);
  }, []);

  useEffect(() => {
    const now = new Date();
    let tempPreviousSessions = [...previousSessions];
    switch (filters.timeFrame) {
      case Enums.TimeFrames.AllTime:
        break;
      case Enums.TimeFrames.OneYear:
        tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() > now.setFullYear(now.getFullYear() - 1));
        break;
      case Enums.TimeFrames.ThreeMonths:
        tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() > now.setDate(now.getDate() - 90));
        break;
      case Enums.TimeFrames.OneMonth:
        tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() > now.setDate(now.getDate() - 30));
        break;
      case Enums.TimeFrames.OneWeek:
        tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() < now.setDate(now.getDate() - 7));
        break;
    }
    tempPreviousSessions = tempPreviousSessions.filter((session) => filters.gameType.length == 0 || filters.gameType.includes(session.gameType));
    setFilteredPreviousSessions(tempPreviousSessions);
  }, [previousSessions, filters]);

  const addPreviousSession = useCallback((session: Interfaces.PreviousSession) => {
      setPreviousSessions((prev) => [...prev, session]);
    }, [previousSessions]);

  return (
    <View className="flex-1 bg-black">
      <View className="flex-row justify-between mx-5">
        <TouchableOpacity onPress={() => setModal({ visible: true, type: Enums.LiveStatsModals.Filters })} >
          <MaterialCommunityIcons name="filter" color="white" size={WIDTH * 0.06} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal({ visible: true, type: Enums.LiveStatsModals.Add })} >
          <MaterialCommunityIcons name="plus" color="white" size={WIDTH * 0.06} />
        </TouchableOpacity>
      </View>
      <GraphComponent sessions={filteredPreviousSessions} />
      <ScrollView>
        <View className="items-center">
          {activeSession == null && previousSessions.length === 0 ?
            <Text className="text-white m-5"> No sessions available</Text>
          : <></>}
          {activeSession != null ?
            <ActiveSessionComponent session={activeSession} />
          : <></>}
          {filteredPreviousSessions.sort((a, b) => b.start.getDate() - a.start.getDate()).map((session, index) => { return (
            <TouchableOpacity key={index}>
              <PreviousSessionComponent key={index} session={session} />
            </TouchableOpacity>
          )})}
        </View>
      </ScrollView>
      <LiveStatsModal
        modal={modal}
        setModal={setModal}
        setFilters={setFilters}
        setActiveSession={setActiveSession}
        addPreviousSession={addPreviousSession}
      />
    </View>
  );
}
