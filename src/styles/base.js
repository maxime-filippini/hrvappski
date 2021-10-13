import { StyleSheet, Dimensions } from "react-native";

export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
};

export const colors = {
  primary: "#233D4D",
  secondary: "#619B8A",
  tertiary: "#A1C181",
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  xl: 40,
};

const baseStyles = {
  title: {
    fontSize: fonts.xl,
  },
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#edeff0",
  },
  divider: {
    borderBottomColor: "#c4c2c4",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({ ...baseStyles, ...overrides });
}
