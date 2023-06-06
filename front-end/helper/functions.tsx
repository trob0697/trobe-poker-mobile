// Internal Imports
import * as Enums from "./enums";
import * as Interfaces from "./interfaces";

// Constants
const DAY_IN_MS = 8.64 * Math.pow(10,7);

// TODO: Time filter not working
function filterSessions( previousSessions: Interfaces.PreviousSession[], filters: Interfaces.Filters ): Interfaces.PreviousSession[] {
  let tempPreviousSessions = [...previousSessions];
  let now = new Date();
  switch (filters.timeFrame) {
    case Enums.TimeFrames.AllTime:
      break;
    case Enums.TimeFrames.OneYear:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getTime() > (now.getTime() - (DAY_IN_MS * 365)));
      break;
    case Enums.TimeFrames.ThreeMonths:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getTime() > (now.getTime() - (DAY_IN_MS * 90)));
      break;
    case Enums.TimeFrames.OneMonth:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getTime() > (now.getTime() - (DAY_IN_MS * 30)));
      break;
    case Enums.TimeFrames.OneWeek:
      tempPreviousSessions = tempPreviousSessions.filter((session) => session.start.getTime() > (now.getTime() - (DAY_IN_MS * 7)));
      break;
  }
  return tempPreviousSessions.filter((session) => filters.gameType.length == 0 || filters.gameType.includes(session.gameType));
}

function getGraphData( sessions: Interfaces.PreviousSession[] ): Interfaces.GetGraphDataFunctionReturn {
  const tempGraphData: Interfaces.GraphDataPoint[] = []
  let tempSessions = [...sessions].reverse();
  let [tempEarnings, earningsInBB, timePlayedMS] = [0, 0, 0];
  tempSessions.forEach((session, index) => {
    if(index === 0){
      const startingPoint = new Date(session.start);
      startingPoint.setDate(startingPoint.getDate() - 1);
      tempGraphData.push({
        x: startingPoint,
        y: 0,
      })
    }
    tempEarnings += session.cashOut - session.cashIn;
    earningsInBB += (session.cashOut - session.cashIn) / session.bigBlind;
    timePlayedMS += session.end.getTime() - session.start.getTime()
    tempGraphData.push({
      x: session.start,
      y: tempEarnings,
    });
  });
  return {
    earnings: tempEarnings,
    earningsRate: (earningsInBB / timePlayedMS) * 3600000,
    graphData: tempGraphData,

  }
}

export { filterSessions, getGraphData };
