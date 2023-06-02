import * as Enums from "./enums";
import * as Interfaces from "./interfaces";

// TODO: Time filter not working
function filterSessions( previousSessions: Interfaces.PreviousSession[], filters: Interfaces.Filters ): Interfaces.PreviousSession[] {
  const now = new Date();
  let tempPreviousSessions = [...previousSessions];
  switch (filters.timeFrame) {
    case Enums.TimeFrames.AllTime:
      break;
    case Enums.TimeFrames.OneYear:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() < now.setFullYear(now.getFullYear() - 1));
      break;
    case Enums.TimeFrames.ThreeMonths:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() < now.setDate(now.getDate() - 90));
      break;
    case Enums.TimeFrames.OneMonth:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() < now.setDate(now.getDate() - 30));
      break;
    case Enums.TimeFrames.OneWeek:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getDate() < now.setDate(now.getDate() - 7));
      break;
  }
  return tempPreviousSessions.filter((session) => filters.gameType.length == 0 || filters.gameType.includes(session.gameType));
}

function getGraphData( sessions: Interfaces.PreviousSession[] ): Interfaces.GetGraphDataFunctionReturn {
  // TODO: Fix start first data point at 0,0
  // const tempGraphData: Interfaces.GraphDataPoint[] = [{
  //   x: new Date(new Date().setDate(sessions[0].start.getDate() - 1)),
  //   y: 0,
  // }];
  const tempGraphData: Interfaces.GraphDataPoint[] = []
  let tempSessions = [...sessions].sort((a, b) => a.start.getDate() - b.start.getDate());
  let [tempEarnings, earningsInBB, timePlayed] = [0, 0, 0];
  tempSessions.forEach((session) => {
    tempEarnings += session.cashOut - session.cashIn;
    earningsInBB += (session.cashOut - session.cashIn) / session.bigBlind;
    timePlayed += (session.end.valueOf() - session.start.valueOf()) / 1000 / 60 / 60;
    tempGraphData.push({
      x: session.start,
      y: tempEarnings,
    });
  });
  return {
    earnings: tempEarnings,
    earningsRate: (Math.round(((earningsInBB / timePlayed) * 100) / 100) | 0),
    graphData: tempGraphData,

  }
}

export { filterSessions, getGraphData };
