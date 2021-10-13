import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MultipleAnswersQuiz from "./MultipleAnswersQuiz";

import _ from "lodash";

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
          title="Nouns"
          color="#233D4D"
          onPress={() => navigation.navigate("Nouns")}
        />

        <Button
          title="Verbs"
          color="#233D4D"
          onPress={() => navigation.navigate("Verbs")}
        />

        <Button
          title="Sayings"
          color="#233D4D"
          onPress={() => navigation.navigate("Sayings")}
        />

        <Button
          title="Everything goes!"
          color="#233D4D"
          onPress={() => navigation.navigate("Everything goes")}
        />
      </View>
      <View style={{ flex: 2 }} />
    </View>
  );
};

export default function QuizScreen({ questions, settings }) {
  let everythingGoes = Object.keys(questions)
    .map((key) => questions[key])
    .reduce((prev, curr) => {
      return { ...prev, ...curr };
    });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuizSelect"
        component={QuizSelectScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Nouns" options={{ headerShown: true }}>
        {(props) => (
          <MultipleAnswersQuiz
            {...props}
            questions={questions["nouns"]}
            nQuestions={settings["numberOfQuestions"]}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Verbs" options={{ headerShown: true }}>
        {(props) => (
          <MultipleAnswersQuiz
            {...props}
            questions={questions["verbs"]}
            nQuestions={settings["numberOfQuestions"]}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Sayings" options={{ headerShown: true }}>
        {(props) => (
          <MultipleAnswersQuiz
            {...props}
            questions={questions["sayings"]}
            nQuestions={settings["numberOfQuestions"]}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Everything goes" options={{ headerShown: true }}>
        {(props) => (
          <MultipleAnswersQuiz
            {...props}
            questions={everythingGoes}
            nQuestions={settings["numberOfQuestions"]}
          />
        )}
      </Stack.Screen>
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
