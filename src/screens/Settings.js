import React, { useState, useEffect } from "react";
import { Text, View, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SettingsScreen({ saveCallback }) {
  const [isLanguageEnabled, setIsLanguageEnabled] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(20);

  const toggleLanguageSwitch = () => {
    setIsLanguageEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    saveCallback({
      startLanguage: isLanguageEnabled ? "ENG" : "HRK",
      numberOfQuestions: numberOfQuestions,
    });
  }, [isLanguageEnabled, numberOfQuestions]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, margin: 20 }}>Starting language</Text>
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
      <Text style={{ fontSize: 30, marginTop: 20, marginBottom: 0 }}>
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
    </View>
  );
}
