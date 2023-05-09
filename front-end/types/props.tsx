import type * as Interfaces from "./interfaces";

interface ActiceSession {
  session: Interfaces.ActiveSession;
}

interface GraphComponent {
  sessions: Interfaces.PreviousSession[];
}

interface LiveStatsModal {
  modal: Interfaces.LiveStatsModal;
  setModal: (arg1: Interfaces.LiveStatsModal) => void;
  setFilters: (arg1: Interfaces.Filters) => void;
  setActiveSession: (arg1: Interfaces.ActiveSession | null) => void;
  addPreviousSession: (arg1: Interfaces.PreviousSession) => void;
}

interface PreviousSession {
  session: Interfaces.PreviousSession;
}

export type { ActiceSession, GraphComponent, LiveStatsModal, PreviousSession };
