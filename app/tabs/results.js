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
import ResultCard from "./resultcard";
import { Picker } from "@react-native-picker/picker";

const Results = () => {
  const [resultType, setResultType] = useState("race");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("current");
  const [selectedRound, setSelectedRound] = useState("last");
  const [raceName, setRaceName] = useState("");

  useEffect(() => {
    fetchData();
  }, [resultType, selectedYear, selectedRound]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let response;
      let allResults;
      let raceName;
      if (resultType === "race") {
        response = await axios.get(
          `https://ergast.com/api/f1/${
            selectedYear === "current" ? "current" : selectedYear
          }/${selectedRound === "last" ? "last" : selectedRound}/results.json`
        );
        const races = response.data.MRData.RaceTable.Races;
        raceName = races.length > 0 ? races[0].raceName : "";
        allResults = races.flatMap((race) => race.Results);
      } else if (resultType === "qualifying") {
        response = await axios.get(
          `https://ergast.com/api/f1/${
            selectedYear === "current" ? "current" : selectedYear
          }/${
            selectedRound === "last" ? "last" : selectedRound
          }/qualifying.json`
        );
        const races = response.data.MRData.RaceTable.Races;
        raceName = races.length > 0 ? races[0].raceName : "";
        allResults = races.flatMap((race) => race.QualifyingResults);
      }

      setRaceName(raceName);
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
      <Text style={styles.title}>Results</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            resultType === "race" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("race")}
        >
          <Text style={styles.buttonText}>Race</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            resultType === "qualifying" && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress("qualifying")}
        >
          <Text style={styles.buttonText}>Qualifying</Text>
        </TouchableOpacity>
      </View>

      <Picker
        style={styles.pickerContainer}
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
      >
        <Picker.Item label="Current" value="current" />
        {[...Array(10)].map((_, i) => (
          <Picker.Item
            key={i}
            label={(new Date().getFullYear() - i).toString()}
            value={new Date().getFullYear() - i}
          />
        ))}
      </Picker>
      <Picker
        style={styles.pickerContainer}
        selectedValue={selectedRound}
        onValueChange={(itemValue) => setSelectedRound(itemValue)}
      >
        <Picker.Item label="Last" value="last" />
        {[...Array(22)].map((_, i) => (
          <Picker.Item key={i} label={(22 - i).toString()} value={22 - i} />
        ))}
      </Picker>

      <Text style={styles.raceName}>{raceName}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <ResultCard driver={item} resultType={resultType} />
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
  raceName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Results;
