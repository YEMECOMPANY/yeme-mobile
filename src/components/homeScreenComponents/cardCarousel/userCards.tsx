import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router, useRouter } from "expo-router";
import AppText from "../../../components/appText";

interface Card {
  id: string;
  lastFour: string;
  brand: "Visa" | "Mastercard" | "Amex";
  isPrimary: boolean;
}

interface CardProps {
  card: Card;
  onSetPrimary: () => void;
}

const Card = ({ card, onSetPrimary }: CardProps) => {
  // const router = useRouter();

  const getCardColor = (brand: "Visa" | "Mastercard" | "Amex") => {
    switch (brand) {
      case "Visa":
        return ["#1A1F71", "#436CAD"];
      case "Mastercard":
        return ["#3B556E", "#F79E1B"];
      case "Amex":
        return ["#2E77BB", "#60B1E6"];
      default:
        return ["#352069", "#5A3A9D"];
    }
  };

  const handleViewTransactions = () => {
    router.push({
      pathname: "/(screens)/transactions",
      params: { cardId: card.id },
    });
  };

  const [primaryColor] = getCardColor(card.brand);

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View
        style={[
          styles.card,
          { backgroundColor: primaryColor },
          card.isPrimary && styles.primaryCard,
        ]}
      >
        <View style={styles.cardHeader}>
          <AppText fontWeight="bold" style={styles.cardBrand}>
            {card.brand}
          </AppText>
          {card.isPrimary && (
            <View style={styles.primaryBadge}>
              <AppText fontWeight="bold" style={styles.primaryText}>
                Primary
              </AppText>
            </View>
          )}
        </View>

        <View style={styles.chipContainer}>
          <View style={styles.chip} />
        </View>

        <AppText fontWeight="semi-bold" style={styles.cardNumber}>
          •••• •••• •••• {card.lastFour}
        </AppText>

        <View style={styles.buttonContainer}>
          {!card.isPrimary && (
            <TouchableOpacity
              style={styles.setPrimaryButton}
              onPress={onSetPrimary}
            >
              <AppText fontWeight="semi-bold" style={styles.setPrimaryText}>
                Set as Primary
              </AppText>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.transactionsButton}
            onPress={handleViewTransactions}
          >
            <AppText fontWeight="semi-bold" style={styles.transactionsText}>
              View Transactions
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 16,
    width: 300,
    height: 195,
    borderRadius: 16,
    overflow: "hidden",
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryCard: {
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardBrand: {
    fontSize: 20,
    color: "#fff",
  },
  primaryBadge: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  primaryText: {
    fontSize: 12,
    color: "#FFD700",
  },
  chipContainer: {
    marginBottom: 15,
  },
  chip: {
    width: 45,
    height: 30,
    backgroundColor: "#FFD700",
    borderRadius: 6,
    opacity: 0.8,
  },
  cardNumber: {
    fontSize: 18,
    color: "#fff",
    letterSpacing: 1,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  setPrimaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  setPrimaryText: {
    color: "#fff",
    fontSize: 12,
  },
  transactionsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  transactionsText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default Card;
