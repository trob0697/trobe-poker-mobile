enum AddModalTabs {
  Start = "Start",
  Add = "Add",
}

enum AppStates {
  Loading,
  Login,
  App,
}

enum GameTypes {
  NoLimitHoldem = "No Limit Hold'em",
  LimitHoldem = "Limit Hold'em",
  ShortDeckNoLimitHoldem = "Short Deck No Limit Hold'em",
  PotLimitOmaha = "Pot Limit Omaha",
  FiveCardPotLimitOmaha = "5 Card Pot Limit Omaha",
}

enum LiveStatsModals {
  Filters = "Filters",
  Add = "Add",
  Modify = "Modify",
  None = "None",
}

enum TimeFrames {
  OneWeek = "One Week",
  OneMonth = "One Month",
  ThreeMonths = "Three Months",
  OneYear = "One Year",
  AllTime = "All Time",
}

export { AddModalTabs, AppStates, GameTypes, LiveStatsModals, TimeFrames };
