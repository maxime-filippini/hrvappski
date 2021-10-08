import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

export default function HomeScreen() {
  const fadeAnim = new Animated.Value(0);
  const fadeAnim2 = new Animated.Value(0);

  const animation = () => {
    return Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(animation, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Text style={styles.title}>
          <Text>Hrv</Text>
          <Text style={{ color: "#65696b", fontStyle: "italic" }}>app</Text>
          <Text>ski</Text>
        </Text>
      </Animated.View>
      <Animated.View style={[{ opacity: fadeAnim2 }]}>
        <Text
          style={[
            styles.title,
            { fontSize: 30, color: "#65696b", fontStyle: "italic" },
          ]}
        >
          Dobro došli
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#edeff0",
  },
  title: {
    fontSize: 40,
    margin: 0,
  },
});
