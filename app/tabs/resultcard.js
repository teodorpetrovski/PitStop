import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ResultCard = ({ driver, resultType }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.position}>{driver.position}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.title}>
          {driver.Driver.givenName} {driver.Driver.familyName}
        </Text>
        <Text style={styles.text}>{driver.Constructor.name}</Text>

        {resultType === "race" ? (
          driver.Time && driver.Time.time ? (
            <Text style={styles.time}>{driver.Time.time}</Text>
          ) : (
            <Text style={styles.time}>{driver.status}</Text>
          )
        ) : (
          <View>
            <Text style={styles.time}>Q1: {driver.Q1}</Text>
            <Text style={styles.time}>Q2: {driver.Q2}</Text>
            <Text style={styles.time}>Q3: {driver.Q3}</Text>
          </View>
        )}
      </View>
    </View>
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
    alignContent: "center",
  },
  rightContent: {
    flex: 2,
    borderLeftWidth: 1,
    borderLeftColor: "#ffffff",
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  position: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
  },
  time: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "right",
  },
});

export default ResultCard;
