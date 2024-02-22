import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const DriverCard = ({ driver, standingsType }) => {
  const [driverInformation, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let data;
      if (standingsType === "drivers") {
        const fullName =
          driver.Driver.givenName + " " + driver.Driver.familyName;
        console.log(fullName);
        const response = await axios.post(
          `http://192.168.1.2:9090/api/drivers/searchByName?name=${fullName}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        data = response.data;
      } else if (standingsType === "constructors") {
        const response = await axios.post(
          `http://192.168.1.2:9090/api/teams/searchByName?name=${driver.Constructor.name}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        data = response.data;
      }
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const navigation = useNavigation();

  const handleCardPress = () => {
    if (standingsType === "drivers") {
      navigation.navigate("DriverInformation", {
        driver: driverInformation,
        teamName: driver.Constructors[0].name,
      });
    } else if (standingsType === "constructors") {
      navigation.navigate("TeamInformation", { team: driverInformation });
    }
  };

  return standingsType === "drivers" ? (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.leftContent}>
          <Text style={styles.position}>{driver.position}</Text>
          {driver.Driver && (
            <>
              <Text style={styles.text}>
                {driver.Driver.givenName} {driver.Driver.familyName}
              </Text>
              {driver.Constructors[0] && (
                <Text style={styles.text}>{driver.Constructors[0].name}</Text>
              )}
            </>
          )}
        </View>
        <View style={styles.rightContent}>
          <Image
            source={{
              uri: driverInformation.coverImageUrl,
            }}
            style={styles.image}
          />
          <Text style={[styles.absoluteText]}>{driver.points} Points</Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.leftContent}>
          <Text style={styles.position}>{driver.position}</Text>
          {driver.Constructor && (
            <Text style={styles.text}>{driver.Constructor.name}</Text>
          )}
        </View>
        <View style={styles.rightContent}>
          <Image
            source={{
              uri: driverInformation.coverImageUrl,
            }}
            style={styles.image}
          />
          <Text style={[styles.absoluteText]}>{driver.points} Points</Text>
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
    alignContent: "center",
  },
  rightContent: {
    flex: 1,
    alignItems: "center",
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
  image: {
    width: 150,
    height: 150,
    resizeMode: "center",
  },
  absoluteText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 0,
  },
});

export default DriverCard;
