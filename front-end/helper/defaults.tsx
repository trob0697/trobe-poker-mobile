// Internal Imports
import * as Enums from "./enums";
import * as Interfaces from "./interfaces";

const ActiveSession: Interfaces.ActiveSession = {
  location: "",
  gameType: Enums.GameTypes.NoLimitHoldem,
  smallBlind: 0,
  bigBlind: 0,
  cashIn: 0,
  start: new Date(),
}

const Filters: Interfaces.Filters = {
  timeFrame: Enums.TimeFrames.AllTime, 
  gameType: Object.values(Enums.GameTypes),
}

const Modal: Interfaces.LiveStatsModal = {
  visible: false,
  type: Enums.LiveStatsModals.None,
}

export { ActiveSession, Filters, Modal };
