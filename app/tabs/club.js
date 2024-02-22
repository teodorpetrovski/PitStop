import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const FanClub = () => {
  const navigation = useNavigation();

  const handleButtonPress = (type) => {
    navigation.navigate("Camera");
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://res.cloudinary.com/dvj1op71d/image/list/pitstop.json`
      );
      setImages(response.data.resources);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: `https://res.cloudinary.com/dvj1op71d/image/upload/${item.public_id}.jpg`,
        }}
        style={styles.image}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fan Club</Text>

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.public_id}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>Take a picture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#a60707",
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  image: {
    width: 300,
    height: 400,
    //resizeMode: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#333",
    padding: 10,
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

export default FanClub;
