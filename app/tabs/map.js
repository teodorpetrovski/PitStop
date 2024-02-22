import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const Map = ({ route, navigation }) => {
  const { circuit } = route.params;

  const [destination, setDestination] = useState({
    latitude: circuit.latitude,
    longitude: circuit.longitude,
  });
  const [origin, setOrigin] = useState({
    latitude: null,
    longitude: null,
  });
  const [routeFound, setRouteFound] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleMapReady = () => {
    // After the map is ready, check if the route is successfully found
    if (!routeFound) {
      // If route not found, set routeFound to false
      setRouteFound(false);
    }
  };

  return (
    <View style={styles.container}>
      {origin.latitude && origin.longitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 5,
            longitudeDelta: 1,
          }}
          onMapReady={handleMapReady}
        >
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyD-_FAlAhMrY5HCFOMAGFnB7I6xJCGle28"
            strokeWidth={4}
            strokeColor="red"
            mode={"DRIVING"}
            onError={(errorMessage) => {
              // If there's an error calculating the route, set routeFound to false
              setRouteFound(false);
            }}
          />
          <Marker coordinate={origin} title="Starting Point" />
          <Marker coordinate={destination} title="Destination Point" />
        </MapView>
      )}
      {routeFound ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>There is no way found to the desired circuit location</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
            <Text style={styles.goBackButtonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  messageContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  messageText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  goBackButton: {
    backgroundColor: "#8c8c8c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  goBackButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#8c8c8c",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Map;
