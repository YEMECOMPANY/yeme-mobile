import AddCardForm from "@/src/components/homeScreenComponents/cardCarousel/addCardForm";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Card {
  id: string;
  lastFour: string;
  brand: "Visa" | "Mastercard" | "Amex";
  name: string;
  expiry: string;
  cvv: string;
  isPrimary: boolean;
}

const NewCard = () => {
  const router = useRouter();

  const handleAddCard = (newCard: Card) => {
    console.log("Adding card:", newCard); // Debug log
    router.push({
      pathname: "/(tabs)/home",
      params: { newCard: JSON.stringify(newCard) },
    });
  };

  const handleCancel = () => {
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <AddCardForm onAddCard={handleAddCard} onCancel={handleCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
});

export default NewCard;
