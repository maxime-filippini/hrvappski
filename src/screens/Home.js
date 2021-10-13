import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

import createStyles from "../styles/base";

const baseStyles = createStyles();

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
    <View style={baseStyles.container}>
      <Animated.View style={[{ opacity: fadeAnim }]}>
        <Text style={baseStyles.title}>
          <Text>Hrv</Text>
          <Text style={{ color: "#65696b", fontStyle: "italic" }}>app</Text>
          <Text>ski</Text>
        </Text>
      </Animated.View>
      <Animated.View style={[{ opacity: fadeAnim2 }]}>
        <Text
          style={[
            baseStyles.title,
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
  title: {
    fontSize: 40,
  },
});
