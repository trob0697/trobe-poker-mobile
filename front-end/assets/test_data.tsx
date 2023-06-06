// External Imports
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// Internal Imports
import * as Enums from "../helper/enums";
import * as Interfaces from "../helper/interfaces";

export const PreviousSessionsTestData: Interfaces.PreviousSession[] = [
  {
    uuid: uuidv4(),
    location: "Tampa Hard Rock Casino",
    gameType: Enums.GameTypes.NoLimitHoldem,
    smallBlind: 1,
    bigBlind: 2,
    cashIn: 200,
    cashOut: 400,
    start: new Date(2023, 5, 5, 10, 0, 0, 0),
    end: new Date(2023, 5, 5, 18, 0, 0, 0),
  },
  {
    uuid: uuidv4(),
    location: "Tampa Hard Rock Casino",
    gameType: Enums.GameTypes.NoLimitHoldem,
    smallBlind: 1,
    bigBlind: 2,
    cashIn: 200,
    cashOut: 400,
    start: new Date(2023, 4, 4, 10, 0, 0, 0),
    end: new Date(2023, 4, 4, 18, 0, 0, 0),
  },
  {
    uuid: uuidv4(),
    location: "Tampa Hard Rock Casino",
    gameType: Enums.GameTypes.NoLimitHoldem,
    bigBlind: 2,
    cashIn: 200,
    cashOut: 700,
    start: new Date(2023, 4, 3, 10, 0, 0, 0),
    end: new Date(2023, 4, 3, 18, 0, 0, 0),
    smallBlind: 1,
  },
  {
    uuid: uuidv4(),
    location: "Tampa Hard Rock Casino",
    gameType: Enums.GameTypes.NoLimitHoldem,
    smallBlind: 1,
    bigBlind: 2,
    cashIn: 200,
    cashOut: 100,
    start: new Date(2023, 4, 2, 10, 0, 0, 0),
    end: new Date(2023, 4, 2, 18, 0, 0, 0),
  },
  {
    uuid: uuidv4(),
    location: "Tampa Hard Rock Casino",
    gameType: Enums.GameTypes.NoLimitHoldem,
    smallBlind: 1,
    bigBlind: 2,
    cashIn: 200,
    cashOut: 400,
    start: new Date(2023, 4, 1, 10, 0, 0, 0),
    end: new Date(2023, 4, 1, 18, 0, 0, 0),
  },
    {
    uuid: uuidv4(),
    location: "Tampa Hard Rock Casino",
    gameType: Enums.GameTypes.NoLimitHoldem,
    smallBlind: 1,
    bigBlind: 2,
    cashIn: 200,
    cashOut: 400,
    start: new Date(2023, 3, 1, 10, 0, 0, 0),
    end: new Date(2023, 3, 1, 18, 0, 0, 0),
  },
];
