import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Tabs, useRouter } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
  });

  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (fontError) {
    console.error("Font loading error:", fontError);
    // Fallback UI or handling can be added here
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Set to true since most screens use headers
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#b3b3b3",
        tabBarLabelStyle: {
          fontFamily: "Inter-Regular",
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontFamily: "Inter-Regular",
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: "#3A266E",
          borderTopWidth: 0,
          paddingBottom: 0,
          marginBottom: 0,
          height: 60 + insets.bottom,
          paddingTop: 0,
        },

        headerTitleAlign: "center", // Consistent alignment for all headers
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/home")}
            style={{ marginLeft: 12 }}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false, // Only screen without header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="yems"
        options={{
          title: "YEMs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
