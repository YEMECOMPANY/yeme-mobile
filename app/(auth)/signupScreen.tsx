import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AppText from "../../src/components/appText";

const SignupScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      router.push("/(auth)/phoneNumberScreen");
    }, 1000);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/(auth)/phoneNumberScreen");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/yeme-logo.png")}
              style={styles.logo}
            />
            <AppText fontWeight="bold" style={styles.title}>
              Create Account
            </AppText>
          </View>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, { fontFamily: "Inter-Regular" }]}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { fontFamily: "Inter-Regular" }]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={[styles.input, { fontFamily: "Inter-Regular" }]}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <AppText style={styles.errorText}>{error}</AppText> : null}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <AppText fontWeight="semi-bold" style={styles.buttonText}>
                  Sign Up
                </AppText>
              )}
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <AppText style={styles.orText}>OR</AppText>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignup}
              disabled={isLoading}
            >
              <Image
                source={require("../../assets/images/google-icon.png")}
                style={styles.googleIcon}
              />
              <AppText style={styles.googleButtonText}>
                Continue with Google
              </AppText>
            </TouchableOpacity>

            <View style={styles.footer}>
              <AppText style={styles.footerText}>
                Already have an account?{" "}
              </AppText>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/loginScreen")}
              >
                <AppText style={styles.linkText}>Sign In</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  logo: { width: 250, height: 80 },
  title: { fontSize: 24, color: "#333", marginTop: 10 },
  form: { gap: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: { color: "red", fontSize: 12 },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#999" },
  buttonText: { color: "#fff", fontSize: 16 },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  googleIcon: { width: 24, height: 24, marginRight: 10 },
  googleButtonText: { color: "#333", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { color: "#666", fontSize: 14 },
  linkText: { color: "#007AFF", fontSize: 14 },
});

export default SignupScreen;
