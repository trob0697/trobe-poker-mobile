import * as Enums from "./enums";
import * as Interfaces from "./interfaces";

const Filters: Interfaces.Filters = {
  timeFrame: Enums.TimeFrames.AllTime, 
  gameType: Object.values(Enums.GameTypes),
}

const Modal: Interfaces.LiveStatsModal = {
  visible: false,
  type: Enums.LiveStatsModals.None,
}

export { Filters, Modal };
