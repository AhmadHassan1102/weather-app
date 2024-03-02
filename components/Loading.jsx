import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";

const Loading = () => <Image source={require("../assets/loadingGif.gif")} style={{ width: 50, height: 50 }} />;

const styles = StyleSheet.create({
  loading: {
    fontSize: 18,
    color: "gray",
  },
});

export default Loading;
