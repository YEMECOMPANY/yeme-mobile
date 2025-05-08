import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  fontWeight?: "regular" | "semi-bold" | "bold";
}

export default function AppText({
  style,
  fontWeight = "regular",
  ...props
}: AppTextProps) {
  let fontFamily = "Inter-Regular";

  if (fontWeight === "semi-bold") {
    fontFamily = "Inter-SemiBold";
  } else if (fontWeight === "bold") {
    fontFamily = "Inter-Bold";
  }

  return <Text style={[{ fontFamily }, style]} {...props} />;
}
