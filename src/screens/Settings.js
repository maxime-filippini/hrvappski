import React, { useState, useEffect } from "react";
import { Text, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";

const questionTypeOptions = [
  { key: "multiple-choice", label: "Multiple choice" },
  { key: "typed", label: "Typed" },
];

export default function SettingsScreen({ saveCallback }) {
  const [isLanguageEnabled, setIsLanguageEnabled] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(20);
  const [questionType, setQuestionType] = useState(questionTypeOptions[0]);

  const toggleLanguageSwitch = () => {
    setIsLanguageEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    saveCallback({
      startLanguage: isLanguageEnabled ? "ENG" : "HRK",
      numberOfQuestions: numberOfQuestions,
      questionType: questionType,
    });
  }, [isLanguageEnabled, numberOfQuestions, questionType]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 0 }}>Starting language</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ margin: 20 }}>HRK</Text>
        <Switch
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLanguageSwitch}
          value={isLanguageEnabled}
        />
        <Text style={{ margin: 20 }}>ENG</Text>
      </View>
      <Text style={{ fontSize: 20, marginTop: 100, marginBottom: 0 }}>
        Number of questions
      </Text>
      <Picker
        style={{ height: 50, width: 100, margin: 0 }}
        itemStyle={{ height: 100 }}
        selectedValue={numberOfQuestions}
        onValueChange={(itemValue, itemIndex) =>
          setNumberOfQuestions(itemValue)
        }
      >
        {[5, 10, 20, 30, 40, 50].map((n) => {
          return <Picker.Item key={n} label={`${n}`} value={n} />;
        })}
      </Picker>

      <Text style={{ fontSize: 20, marginTop: 100, marginBottom: 0 }}>
        Type of questions
      </Text>
      <Picker
        style={{ height: 50, width: 200, margin: 0 }}
        itemStyle={{ height: 100 }}
        selectedValue={questionType}
        onValueChange={(itemValue, itemIndex) => setQuestionType(itemValue)}
      >
        {questionTypeOptions.map((entry) => {
          return (
            <Picker.Item
              key={entry.key}
              label={entry.label}
              value={entry.key}
            />
          );
        })}
      </Picker>
    </View>
  );
}
