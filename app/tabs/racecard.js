import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

const RaceCard = ({ race }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("RaceDetails", { raceName: race.Circuit.circuitName });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.leftContent}>
          <Text style={styles.text}>{format(race.date, "MMM do, yyyy")}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.text}>Round {race.round}</Text>
          <Text style={styles.title}>{race.Circuit.Location.country}</Text>
          <Text style={styles.text}>{race.raceName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContent: {
    flex: 1,
    justifyContent: "center",
  },
  rightContent: {
    flex: 2,
    borderLeftWidth: 1,
    borderLeftColor: "#ffffff",
    paddingLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text: {
    color: "#ffffff",
  },
});

export default RaceCard;
