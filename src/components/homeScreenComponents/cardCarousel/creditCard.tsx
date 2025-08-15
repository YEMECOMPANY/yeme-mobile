import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlipCard from "react-native-flip-card";

interface CreditCardState {
  isFlipped: boolean;
  showCvv: boolean;
}

interface CreditCardProps {
  name?: string;
  expiry?: string;
  cvv?: string;
  lastFour?: string;
  brand?: "Visa" | "Mastercard" | "Amex";
  isPrimary?: boolean;
}

class CreditCard extends Component<CreditCardProps, CreditCardState> {
  state = {
    isFlipped: false,
    showCvv: false,
  };

  handleFlip = () => {
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  toggleCvv = () => {
    this.setState((prevState) => ({ showCvv: !prevState.showCvv }));
  };

  render() {
    const {
      name = "John Doe",
      expiry = "12/25",
      cvv = "123",
      lastFour = "4242",
      brand = "Visa",
      isPrimary = false,
    } = this.props;

    const frontImage = {
      Visa: require("../../../../assets/images/card-front-visa.png"),
      Mastercard: require("../../../../assets/images/card-front-mastercard.png"),
      Amex: require("../../../../assets/images/card-front-american-express.png"),
    }[brand];

    // Format card number based on brand
    const formatCardNumber = () => {
      if (brand === "Amex") {
        // Amex: 4-6-5 pattern, lastFour is last 5 digits
        return `•••• •••••• ${lastFour}`;
      }
      // Visa/Mastercard: 4-4-4-4 pattern
      return `•••• •••• •••• ${lastFour}`;
    };

    return (
      <View style={styles.cardContainer}>
        <FlipCard
          style={styles.card}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={this.state.isFlipped}
          clickable={false}
        >
          {/* Front of the card */}
          <TouchableOpacity onPress={this.handleFlip}>
            <View style={[styles.card, isPrimary && styles.primaryCard]}>
              <Image source={frontImage} style={styles.frontImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardNumber}>{formatCardNumber()}</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.expiry}>{expiry}</Text>
                </View>
                {isPrimary && (
                  <View style={styles.primaryBadge}>
                    <Text style={styles.primaryText}>Primary</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
          {/* Back of the card */}
          <TouchableOpacity onPress={this.handleFlip}>
            <View style={styles.card}>
              <Image
                source={require("../../../../assets/images/card-back.png")}
                style={styles.backImage}
              />
              <View style={styles.blackStrip} />
              <View style={styles.cvvContainer}>
                <TouchableOpacity onPress={this.toggleCvv}>
                  <Text style={styles.cvv}>
                    {this.state.showCvv ? cvv : "***"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </FlipCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 190,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 10,
  },
  card: {
    width: 300,
    height: 190,
    borderRadius: 16,
    position: "relative",
  },
  primaryCard: {
    borderWidth: 2,
    borderColor: "#FEFBF0", // Light cream as provided
  },
  frontImage: {
    width: 300,
    height: 190,
    position: "absolute",
    borderRadius: 16,
  },
  backImage: {
    width: 300,
    height: 190,
    position: "absolute",
    borderRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 80,
    fontWeight: "600",
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    padding: 6,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  expiry: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  blackStrip: {
    height: 40,
    width: "100%",
    backgroundColor: "#000",
    position: "absolute",
    top: 30,
  },
  cvvContainer: {
    width: 50,
    height: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 75,
    right: 40,
    borderRadius: 4,
  },
  cvv: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  primaryBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(159, 122, 234, 0.3)", // Lighter purple for badge
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEFBF0", // Light cream as provided
  },
  primaryText: {
    color: "#FFFFFF", // Changed to white
    fontSize: 12,
    fontWeight: "600",
  },
});

export default CreditCard;
