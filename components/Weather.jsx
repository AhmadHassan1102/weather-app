import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
import RenderIf from "./RenderIf";
import { useGetCurrentWeatherQuery } from "../api";

const Weather = ({ location }) => {
  const { data, error, isLoading, refetch } = useGetCurrentWeatherQuery(location);

  const [tempUnit, setTempUnit] = useState("c");

  const toggleTempUnit = () => setTempUnit(tempUnit === "c" ? "f" : "c");

  useEffect(() => {
    if (location) refetch();
  }, [location]);

  return (
    <View style={styles.container}>
      <RenderIf isTrue={!isLoading} fallback={<Loading />}>
        <RenderIf isTrue={!error} fallback={<Text style={styles.errorText}>{error?.data?.error?.code === 1006 ? error?.data?.error?.message : "An Error Occurred"} </Text>}>
          <View style={styles.buttonContainer}>
            <Text style={styles.temperatureText}>
              {data?.current?.[`temp_${tempUnit}`]}°{tempUnit.toUpperCase()}
            </Text>
            <TouchableOpacity style={styles.button} onPress={toggleTempUnit}>
              <Text style={styles.buttonText}>{tempUnit === "c" ? "Switch to Fahrenheit" : "Switch to Celsius"}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.conditionText}>{data?.current?.condition?.text}</Text>
          <Image style={styles.image} source={{ uri: data?.current?.condition?.icon ?? "https://cdn.weatherapi.com/weather/64x64/day/143.png" }} />
          <Text style={styles.locationText}>{data?.location?.name + ", " + data?.location?.country}</Text>
        </RenderIf>
      </RenderIf>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    width: "100%",
  },
  temperatureText: {
    fontSize: 28,
    color: "black",
  },
  buttonContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "white",
    fontSize: 10,
  },
  button: {
    backgroundColor: "#00B4D8",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  conditionText: {
    fontSize: 18,
    color: "black",
  },
  loadingText: {
    fontSize: 18,
    color: "gray",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default Weather;
