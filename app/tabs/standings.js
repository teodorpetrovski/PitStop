import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import DriverCard from "./drivercard";

const Standings = () => {
  const [standingsType, setResultType] = useState("drivers");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [standingsType]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response;
      let allResults;
      if (standingsType === "drivers") {
        response = await axios.get(
          "https://ergast.com/api/f1/current/driverStandings.json"
        );
        const races = response.data.MRData.StandingsTable.StandingsLists;
        allResults = races.flatMap((race) => race.DriverStandings);
      } else if (standingsType === "constructors") {
        response = await axios.get(
          "https://ergast.com/api/f1/current/constructorStandings.json"
        );
        const races = response.data.MRData.StandingsTable.StandingsLists;
        allResults = races.flatMap((race) => race.ConstructorStandings);
      }


      setResults(allResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonPress = (type) => {
    setResultType(type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Standings</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            standingsType === "drivers" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("drivers")}
        >
          <Text style={styles.buttonText}>Drivers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            standingsType === "constructors" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("constructors")}
        >
          <Text style={styles.buttonText}>Constructors</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <DriverCard driver={item} standingsType={standingsType} />
          )}
          keyExtractor={(item) => item.position}
        />
      )}
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
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#333",
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  selectedButton: {
    backgroundColor: "#9e0000",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    color: "#ffffff",
    backgroundColor: "#808080",
  },
});

export default Standings;
