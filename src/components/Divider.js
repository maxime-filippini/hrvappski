import React from "react";
import { View } from "react-native";

import createStyles from "../styles/base";

const baseStyles = createStyles();

export default function Divider() {
  return <View style={baseStyles.divider} />;
}
