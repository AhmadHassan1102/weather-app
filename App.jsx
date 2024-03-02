import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useRef, useState } from "react";

import Geolocation from "react-native-geolocation-service";
import Loading from "./components/Loading";
import { Provider } from "react-redux";
import RenderIf from "./components/RenderIf";
import { TouchableOpacity } from "react-native-web";
import Weather from "./components/Weather";
import { store } from "./store";

export default function App() {
  const inputRef = useRef(null);

  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const handleFetchWeather = () => setLocation(inputRef.current.value);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (inputRef?.current) inputRef.current.clear();
        setLocation(`${latitude},${longitude}`);
        setLoading(false);
      },
      (error) => console.error(error.message),
    );
  };

  return (
    <Provider store={store}>
      <View style={{ ...styles.container, justifyContent: loading ? "center" : "" }}>
        <RenderIf isTrue={!loading} fallback={<Loading />}>
          <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 10 }}>Welcome Come</Text>

          <View style={{ paddingTop: 10 }}>
            <TextInput ref={inputRef} placeholder="Enter location" style={styles.input} />

            <View style={{ paddingTop: 10, flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Button title="Fetch Weather" onPress={handleFetchWeather} color="#4CAF50" />
              <TouchableOpacity onPress={fetchCurrentLocation}>
                <Image source={require("./assets/refreshIcon.png")} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </View>
          </View>

          <RenderIf isTrue={location}>
            <Weather location={location} />
          </RenderIf>
        </RenderIf>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: "#BDBDBD",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
