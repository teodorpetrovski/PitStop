import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header, createStackNavigator } from "@react-navigation/stack"; // Import createStackNavigator
import Calendar from "./app/tabs/calendar";
import Results from "./app/tabs/results";
import RaceDetailsScreen from "./app/tabs/racedetails";
import Standings from "./app/tabs/standings";
import Club from "./app/tabs/club";
import Map from "./app/tabs/map";
import DriverInformation from "./app/tabs/driverinformation";
import TeamInformation from "./app/tabs/teaminformation";
import CustomCamera from "./app/tabs/camera";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Calendar") {
          iconName = "calendar";
        } else if (route.name === "Results") {
          iconName = "trophy";
        } else if (route.name === "Standings") {
          iconName = "flag-checkered";
        } else if (route.name === "FanClub") {
          iconName = "list-ul";
        }

        return <FontAwesome name={iconName} size={25} color={color} />;
      },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "white",
      tabBarInactiveBackgroundColor: "#232423",
      tabBarActiveBackgroundColor: "#232423",
    })}
  >
    <Tab.Screen
      name="Calendar"
      component={Calendar}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Results"
      component={Results}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Standings"
      component={Standings}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="FanClub"
      component={Club}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="RaceDetails" component={RaceDetailsScreen} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="DriverInformation" component={DriverInformation} />
        <Stack.Screen name="TeamInformation" component={TeamInformation} />
        <Stack.Screen name="Camera" component={CustomCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
