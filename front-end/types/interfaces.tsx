import type * as Enums from "./enums";

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

interface GraphDataPoint {
  x: Date;
  y: number;
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

export type { ActiveSession, Filters, GraphDataPoint, LiveStatsModal, PreviousSession };
