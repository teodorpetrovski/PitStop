import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import RaceCard from "./racecard";
import axios from "axios";

const Calendar = () => {
  const [races, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://ergast.com/api/f1/current.json"
      );
      setData(response.data.MRData.RaceTable.Races);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Racing</Text>
      <Text style={styles.title}>Calendar</Text>
      <FlatList
        data={races}
        renderItem={({ item }) => <RaceCard race={item} />}
        keyExtractor={(item) => item.round.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 20,
  },
});

export default Calendar;
