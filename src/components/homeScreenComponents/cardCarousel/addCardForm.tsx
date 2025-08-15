import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../../appText";
import CreditCard from "./creditCard";

interface Card {
  id: string;
  lastFour: string;
  brand: "Visa" | "Mastercard" | "Amex";
  name: string;
  expiry: string;
  cvv: string;
  isPrimary: boolean;
}

interface AddCardFormProps {
  onAddCard: (newCard: Card) => void;
  onCancel: () => void;
}

const AddCardForm = ({ onAddCard, onCancel }: AddCardFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState<"Visa" | "Mastercard" | "Amex">("Visa");

  // Improved card type detection
  const detectCardType = (number: string) => {
    const cleanedNumber = number.replace(/\D/g, "");
    if (/^3[47][0-9]{0,13}$/.test(cleanedNumber)) return "Amex"; // Amex: starts with 34 or 37, up to 15 digits
    if (/^4[0-9]{0,15}$/.test(cleanedNumber)) return "Visa"; // Visa: starts with 4, up to 16 digits
    if (/^5[1-5][0-9]{0,14}$/.test(cleanedNumber)) return "Mastercard"; // Mastercard: starts with 51-55, up to 16 digits
    return "Visa"; // Default to Visa
  };

  const handleCardNumberChange = (text: string) => {
    let cleaned = text.replace(/\D/g, "");
    let formatted = "";

    const currentBrand = detectCardType(cleaned);
    setBrand(currentBrand);

    if (currentBrand === "Amex") {
      cleaned = cleaned.slice(0, 15);
      if (cleaned.length <= 4) formatted = cleaned;
      else if (cleaned.length <= 10)
        formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
      else
        formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(
          4,
          10
        )} ${cleaned.slice(10, 15)}`;
    } else {
      cleaned = cleaned.slice(0, 16);
      formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    }

    setCardNumber(formatted);
  };

  const handleAddCard = () => {
    const cleanedNumber = cardNumber.replace(/\s/g, "");
    const numLength = cleanedNumber.length;
    const expectedLength = brand === "Amex" ? 15 : 16;

    if (
      numLength === expectedLength &&
      /^[0-1][0-9]\/[0-9]{2}$/.test(expiry) &&
      cvv.length >= 3 &&
      cvv.length <= 4 &&
      name.trim().length > 0
    ) {
      const newCard: Card = {
        id: Date.now().toString(),
        lastFour: cardNumber.slice(-4),
        brand,
        name: name.trim(),
        expiry,
        cvv,
        isPrimary: false,
      };
      onAddCard(newCard);
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setName("");
    } else {
      Alert.alert(
        "Invalid Input",
        `Please check:\n- Card Number: ${expectedLength} digits\n- Expiry: MM/YY format\n- CVV: 3-4 digits\n- Name: Cannot be empty`
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <AppText fontWeight="bold" style={styles.title}>
        Add Payment Card
      </AppText>

      <View style={styles.previewContainer}>
        <CreditCard
          name={name || "Cardholder Name"}
          expiry={expiry || "MM/YY"}
          cvv={cvv || "***"}
          lastFour={cardNumber.slice(-4) || "xxxx"}
          brand={brand}
        />
        <View style={styles.flipCue}>
          <AppText style={styles.flipText}>Tap to Flip ↻</AppText>
        </View>
      </View>

      <TextInput
        style={[styles.input, cardNumber && styles.inputFilled]}
        placeholder={
          brand === "Amex"
            ? "Card Number (15 digits)"
            : "Card Number (16 digits)"
        }
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
        maxLength={brand === "Amex" ? 17 : 19}
        placeholderTextColor="#999"
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput, expiry && styles.inputFilled]}
          placeholder="MM/YY"
          value={expiry}
          onChangeText={(text) => {
            let formatted = text.replace(/\D/g, "");
            if (formatted.length > 2)
              formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
            setExpiry(formatted);
          }}
          keyboardType="numeric"
          maxLength={5}
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, styles.halfInput, cvv && styles.inputFilled]}
          placeholder="CVV"
          value={cvv}
          onChangeText={(text) => setCvv(text.replace(/\D/g, "").slice(0, 4))}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>
      <TextInput
        style={[styles.input, name && styles.inputFilled]}
        placeholder="Cardholder Name"
        value={name}
        onChangeText={setName}
        maxLength={50}
        placeholderTextColor="#999"
      />
      <View style={styles.selectContainer}>
        <AppText style={styles.label}>Card Type</AppText>
        <View style={styles.buttonGroup}>
          {["Visa", "Mastercard", "Amex"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.brandButton,
                brand === type && styles.brandButtonSelected,
              ]}
              onPress={() => setBrand(type as "Visa" | "Mastercard" | "Amex")}
            >
              <AppText
                style={[
                  styles.brandText,
                  brand === type && styles.brandTextSelected,
                ]}
              >
                {type}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <AppText fontWeight="semi-bold" style={styles.buttonText}>
            Add Card
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <AppText fontWeight="semi-bold" style={styles.buttonText}>
            Cancel
          </AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    color: "#1A1A1A",
    textAlign: "center",
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    color: "#1A1A1A",
  },
  inputFilled: {
    borderColor: "#4A58D9",
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  halfInput: {
    width: "48%",
  },
  selectContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: "#1A1A1A",
    marginBottom: 8,
    fontWeight: "600",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  brandButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FAFAFA",
    marginHorizontal: 4,
    alignItems: "center",
  },
  brandButtonSelected: {
    borderColor: "#4A58D9",
    backgroundColor: "#F0F3FF",
  },
  brandText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  brandTextSelected: {
    color: "#4A58D9",
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#4A58D9",
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8,
    elevation: 2,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  flipCue: {
    position: "absolute",
    bottom: -25,
    backgroundColor: "#F0F3FF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 10,
  },
  flipText: {
    color: "#4A58D9",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default AddCardForm;
