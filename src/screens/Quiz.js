import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FromQuizScreen from "./FromQuiz";
import ToQuizScreen from "./ToQuiz";

const Stack = createNativeStackNavigator();

const QuizSelectScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Pick a quiz!</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Button
          title="Hrvatski na Engleski"
          color="#233D4D"
          onPress={() => navigation.navigate("FromQuiz")}
        />
        <Button
          title="Engelski na Hrvatski"
          color="#FE7F2D"
          onPress={() => navigation.navigate("ToQuiz")}
        />
        <Button
          title="Placeholder"
          color="#A1C181"
          onPress={() => navigation.navigate("ToQuiz")}
        />
        <Button
          title="Placeholder"
          color="#619B8A"
          onPress={() => navigation.navigate("ToQuiz")}
        />
        <Button
          title="Placeholder"
          color="#073B4C"
          onPress={() => navigation.navigate("ToQuiz")}
        />
      </View>
      <View style={{ flex: 2 }} />
    </View>
  );
};

export default function QuizScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuizSelect"
        component={QuizSelectScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FromQuiz"
        component={FromQuizScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="ToQuiz"
        component={ToQuizScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    margin: 0,
  },
  button: {},
});
