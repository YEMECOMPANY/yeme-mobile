import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Tabs, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
  });

  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: "default",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#b3b3b3",
        tabBarLabelStyle: {
          fontFamily: "Inter-Regular",
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
          borderTopWidth: 0, // Remove top border
          paddingBottom: 0, // Remove default bottom padding
          marginBottom: 0, // Remove default bottom margin
          height: 60 + insets.bottom, // Adjust height to include safe area inset
          paddingTop: 0, // Remove top padding if any
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
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
          headerTitleAlign: "center",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              style={{ marginLeft: 12 }}
              onPress={() => router.push("/home")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              style={{ marginLeft: 12 }}
              onPress={() => router.push("/home")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              style={{ marginLeft: 12 }}
              onPress={() => router.push("/home")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
