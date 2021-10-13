import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import HomeScreen from "./screens/Home";
import SettingsScreen from "./screens/Settings";
import QuizScreen from "./screens/Quiz";

import firebase from "firebase/app";
import "firebase/firestore";
import _ from "lodash";

const Tab = createBottomTabNavigator();

const useFirebase = false;

const iconMap = {
  Home: "home",
  Settings: "cog",
  Quiz: "question-circle",
};

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [settings, setSettings] = useState({});

  let fetchDataFirebase = async () => {
    console.log("Ready data from Firestore");

    try {
      const response = db.collection("vocab");
      const data = await response.get();

      let obj = {};
      data.docs.forEach((item) => {
        let doc = item.data();
        obj[doc["croatian"]] = doc["english"];
      });

      setQuestions(obj);
    } catch (err) {
      console.error(err);
    }
  };

  let fetchDataJSON = () => {
    console.log("Ready data from JSON file");
    let nouns = require("../data/nouns.json");
    let verbs = require("../data/verbs.json");
    let sayings = require("../data/sayings.json");

    let allQuestions = {
      nouns: nouns,
      verbs: verbs,
      sayings: sayings,
    };

    setQuestions(allQuestions);
  };

  if (useFirebase) {
    const firebaseConfig = require("./firebase.json");

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  }

  useEffect(() => {
    useFirebase ? fetchDataFirebase() : fetchDataJSON();
  }, []);

  useEffect(() => {
    if (settings["startLanguage"] === "HRK") {
      let out = {};

      Object.keys(questions).forEach((key) => {
        let q = _.invert(questions[key]);
        out[key] = q;
      });

      setQuestions(out);
    }
  }, [settings]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome
                name={iconMap[route.name]}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Quiz" options={{ headerShown: false }}>
          {(props) => {
            return (
              <QuizScreen
                {...props}
                questions={questions}
                settings={settings}
              />
            );
          }}
        </Tab.Screen>
        <Tab.Screen name="Settings" options={{ headerShown: false }}>
          {(props) => {
            return (
              <SettingsScreen
                {...props}
                saveCallback={(settings) => setSettings(settings)}
              />
            );
          }}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
