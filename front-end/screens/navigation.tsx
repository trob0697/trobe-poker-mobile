// External Imports
import React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screens
import LiveStatsScreen from "./live-stats/index";
import OnlineStatsScreen from "./online-stats/index";
import DatabaseScreen from "./database/index";
import ProfileScreen from "./profile/index";

// Constants
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#000000",
              borderTopWidth: 0,
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case "Live Stats":
                  return <MaterialCommunityIcons name="cards-playing-spade-multiple" size={size} color={color} />;
                case "Online Stats":
                  return <MaterialCommunityIcons name="mouse-variant" size={size} color={color}/>;
                case "Database":
                  return <MaterialCommunityIcons name="database" size={size} color={color} />;
                case "Profile":
                  return <FontAwesome name="user" size={size} color={color} />;
              }
            },
          };
        }}
      >
        <Tab.Screen name="Live Stats" component={LiveStatsScreen} />
        <Tab.Screen name="Online Stats" component={OnlineStatsScreen} />
        <Tab.Screen name="Database" component={DatabaseScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
