import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const RaceDetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  const { raceName } = route.params;

  const [circuit, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://192.168.1.2:9090/api/tracks/searchByName?name=${raceName}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onPressTakeMeThere = () => {
    navigation.navigate("Map", { circuit: circuit });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome.Button
          name="arrow-left"
          backgroundColor="transparent"
          onPress={() => navigation.goBack()}
        ></FontAwesome.Button>
        <Text style={styles.title}>{circuit.name}</Text>
      </View>
      <Image
        source={{
          uri: circuit.layoutURL,
        }}
        style={styles.image}
      />
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.text}>{circuit.description}</Text>
      </ScrollView>

      <Button
        onPress={onPressTakeMeThere}
        title="Take me there"
        color="#a11500"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: 10,
  },
  text: {
    color: "#ffffff",
    marginBottom: 30,
    fontSize: 20,
  },
  image: {
    width: 400, // Adjust width as needed
    height: 270, // Adjust height as needed
    marginBottom: 10,
    resizeMode: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal:15
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default RaceDetailsScreen;
