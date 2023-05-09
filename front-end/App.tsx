// External Imports
import React, { useState, useEffect } from "react";
import { StatusBar, SafeAreaView } from "react-native";

// Internal Imports
import * as Enums from "./types/enums";
import LoadingScreen from "./screens/loading/index";
import LoginScreen from "./screens/login";
import Navigation from "./screens/navigation";

export default function App(): JSX.Element {
  const [state, setState] = useState<Enums.AppStates>(Enums.AppStates.Loading);

  useEffect(() => {
    setInterval(() => {
      setState(Enums.AppStates.App);
    }, 5000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
        {(() => {
          switch (state) {
            case Enums.AppStates.Loading:
              return <LoadingScreen />;
            case Enums.AppStates.Login:
              return <LoginScreen />;
            case Enums.AppStates.App:
              return <Navigation />;
          }
        })()}
    </SafeAreaView>
  );
}
