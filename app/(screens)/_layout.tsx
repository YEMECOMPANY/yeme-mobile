import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitleStyle: {
            fontFamily: "Inter-Regular",
            fontSize: 18,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home")}
              style={{ marginLeft: 12 }}
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="store"
        options={{
          title: "Store",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitleStyle: {
            fontFamily: "Inter-Regular",
            fontSize: 18,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/store")}
              style={{ marginLeft: 12 }}
            >
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="partnerLoyaltyPrograms"
        options={{ title: "Discover Loyalty Programs", headerShown: false }}
      />
      <Stack.Screen
        name="rewards"
        options={{ title: "Recent Reward Points", headerShown: false }}
      />
      <Stack.Screen
        name="discoverLoyaltyProgram"
        options={{ title: "Discover Loyalty Programs", headerShown: false }}
      />
      <Stack.Screen
        name="myLoyaltyProgram"
        options={{ title: "My Loyalty Programs", headerShown: false }}
      />
      <Stack.Screen
        name="myLoyaltyProgramDetails"
        options={{ title: "My Loyalty Program Detail", headerShown: false }}
      />
      <Stack.Screen
        name="Add New Card"
        options={{ title: "Card", headerShown: false }}
      />
      <Stack.Screen
        name="groupDetailScreen"
        options={{ title: "Groups", headerShown: false }}
      />
    </Stack>
  );
}
