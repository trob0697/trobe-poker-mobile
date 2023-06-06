// Internal Imports
import * as Interfaces from "./interfaces";

interface ActiveSession {
  session: Interfaces.ActiveSession;
  addSession: (arg1: Interfaces.PreviousSession) => void;
  clearSession: () => void;
  sessionKey: number;
  sessionDropDownIndex: number;
  setSessionDropDownIndex: (args1: number) => void;
}

interface GraphComponent {
  sessions: Interfaces.PreviousSession[];
}

interface LiveStatsModal {
  modal: Interfaces.LiveStatsModal;
  setModal: (arg1: Interfaces.LiveStatsModal) => void;
  setFilters: (arg1: Interfaces.Filters) => void;
  setActiveSession: (arg1: Interfaces.ActiveSession | null) => void;
  addSession: (arg1: Interfaces.PreviousSession) => void;
}

interface PreviousSession {
  session: Interfaces.PreviousSession;
  sessionKey: number;
  sessionDropDownIndex: number;
  setSessionDropDownIndex: (args1: number) => void;
}

export type { ActiveSession, GraphComponent, LiveStatsModal, PreviousSession };
