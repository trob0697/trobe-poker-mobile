// Internal Imports
import * as Enums from "./enums";

interface ActiveSession {
  location: string;
  gameType: Enums.GameTypes;
  smallBlind: number;
  bigBlind: number;
  cashIn: number;
  cashOut?: number;
  start: Date;
  end?: Date;
}

interface Filters {
  timeFrame: Enums.TimeFrames;
  gameType: Enums.GameTypes[];
}

interface LiveStatsModal {
  visible: boolean;
  type: Enums.LiveStatsModals;
}

interface GetGraphDataFunctionReturn {
  earnings: number;
  earningsRate: number;
  graphData: GraphDataPoint[];
}

interface GraphDataPoint {
  x: Date;
  y: number;
}

interface InitializeSession {
  uuid?: string;
  location?: string;
  gameType?: Enums.GameTypes;
  smallBlind?: number;
  bigBlind?: number;
  cashIn?: number;
  cashOut?: number;
  start?: Date;
  end?: Date;
}

interface PreviousSession {
  uuid?: string;
  location: string;
  gameType: Enums.GameTypes;
  smallBlind: number;
  bigBlind: number;
  cashIn: number;
  cashOut: number;
  start: Date;
  end: Date;
}

export type { ActiveSession, Filters, GetGraphDataFunctionReturn, GraphDataPoint, LiveStatsModal, InitializeSession, PreviousSession };
