import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";

const DriverInformation = ({ route }) => {
  const { driver } = route.params;
  const { teamName } = route.params;
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
          <Text style={styles.title}>Driver Information</Text>
        </View>
        <Image
          source={{
            uri: driver.coverImageUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{driver.fullName}</Text>
        <Text style={styles.teamName}>{teamName}</Text>
        <Text style={styles.text}>Country: {driver.country}</Text>
        <Text style={styles.text}>Podiums: {driver.podiums}</Text>
        <Text style={styles.text}>Points: {driver.overallPoints}</Text>
        <Text style={styles.text}>
          GrandPrix Entered: {driver.grandPrixEntered}
        </Text>
        <Text style={styles.text}>
          World Championships: {driver.worldChampionships}
        </Text>
        <Text style={styles.text}>
          Highest Race Finish: {driver.highestRaceFinish} (x
          {driver.numberOfHighestRaceFinishes})
        </Text>
        <Text style={styles.text}>
          Date of birth: {format(driver.dateOfBirth, "MMM do, yyyy")}
        </Text>
        <Text style={styles.text}>Place of birth: {driver.placeOfBirth}</Text>
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
    textAlign: "center",
    flex: 1,
  },
  name: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#E70000",
    marginLeft: 20,
    textAlign: "left",
  },
  teamName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#929292",
    marginLeft: 20,
    marginBottom: 30,
    textAlign: "left",
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
  },
});

export default DriverInformation;
