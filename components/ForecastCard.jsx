import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";
import { timeConversion } from "../helpers";

const ForecastCard = ({ temperature, condition, time, imageUrl, tempUnit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.temperature}>
        {temperature}°{tempUnit?.toUpperCase()}
      </Text>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.time}>{timeConversion(time)}</Text>
      <Image style={styles.image} source={{ uri: imageUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 5,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    alignItems: "center",
    height: 200,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
  },
  condition: {
    fontSize: 16,
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default ForecastCard;
