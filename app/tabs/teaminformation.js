import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const TeamInformation = ({ route }) => {
  const { team } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <FontAwesome.Button
            name="arrow-left"
            backgroundColor="transparent"
            onPress={() => navigation.goBack()}
          ></FontAwesome.Button>
          <Text style={styles.title}>Team Information</Text>
        </View>
        <Image
          source={{
            uri: team.coverImageUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{team.name}</Text>
        {team.drivers.map((driver) => (
          <View style={styles.card} key={driver.id}>
            <Text style={styles.driverName}>{driver.fullName}</Text>
          </View>
        ))}
        <Text style={styles.text}>Base: {team.base}</Text>
        <Text style={styles.text}>Team Chief: {team.teamChief}</Text>
        <Text style={styles.text}>Technical Chief: {team.technicalChief}</Text>
        <Text style={styles.text}>Chassis: {team.chassis}</Text>
        <Text style={styles.text}>Power Unit: {team.powerUnit}</Text>
        <Text style={styles.text}>First Team Entry: {team.firstTeamEntry}</Text>
        <Text style={styles.text}>
          World Championships: {team.worldChampionships}
        </Text>
        <Text style={styles.text}>Total Wins: {team.totalWins}</Text>
        <Text style={styles.text}>Fastest Laps: {team.fastestLaps}</Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#000",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#E70000",
    marginLeft: 20,
    textAlign: "left",
  },
  driverName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#E70000",
    marginBottom: 30,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "left",
    marginLeft: 20,
  },
  image: {
    width: 400,
    height: 400,
    backgroundColor: "#7a7a7a",
    borderRadius: 10,
    resizeMode: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#333",
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
    justifyContent: "center",
  },
});
export default TeamInformation;
