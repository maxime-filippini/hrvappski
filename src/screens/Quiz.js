import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import QuizComponent from "../components/QuizComponent";

import _ from "lodash";

const Stack = createNativeStackNavigator();

const QuizSelectScreen = ({ navigation, quizzes }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 2 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Pick a quiz!</Text>
      </View>
      <View style={{ flex: 2 }}>
        {quizzes.map((entry) => {
          return (
            <Button
              key={entry.key}
              title={entry.title}
              color="#233D4D"
              onPress={() => navigation.navigate(entry.title)}
            />
          );
        })}
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

  const quizzes = [
    { key: "nouns", title: "Nouns", questions: questions["nouns"] },
    { key: "verbs", title: "Verbs", questions: questions["verbs"] },
    { key: "sayings", title: "Sayings", questions: questions["sayings"] },
    { key: "everything", title: "Everything goes", questions: everythingGoes },
  ];

  return (
    <Stack.Navigator>
      <Stack.Screen name="QuizSelect" options={{ headerShown: false }}>
        {(props) => <QuizSelectScreen {...props} quizzes={quizzes} />}
      </Stack.Screen>

      {quizzes.map((entry) => {
        return (
          <Stack.Screen
            key={entry.key}
            name={entry.title}
            options={{ headerShown: true }}
          >
            {(props) => {
              return (
                <QuizComponent
                  {...props}
                  key={entry.key}
                  questions={entry.questions}
                  nQuestions={settings["numberOfQuestions"]}
                  answerType={settings["questionType"]}
                />
              );
            }}
          </Stack.Screen>
        );
      })}
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
