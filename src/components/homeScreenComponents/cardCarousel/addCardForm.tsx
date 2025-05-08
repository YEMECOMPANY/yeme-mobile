import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AppText from "../../appText";

interface Card {
  id: string;
  lastFour: string;
  brand: "Visa" | "Mastercard" | "Amex";
  isPrimary: boolean;
}

interface AddCardFormProps {
  visible: boolean;
  onClose: () => void;
  onAddCard: (newCard: Card) => void;
}

const AddCardForm = ({ visible, onClose, onAddCard }: AddCardFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAddCard = () => {
    const numLength = cardNumber.replace(/\s/g, "").length;
    if (
      (numLength === 15 || numLength === 16) &&
      expiry.length === 5 &&
      cvv.length >= 3
    ) {
      const brand =
        numLength === 15 ? "Amex" : Math.random() > 0.5 ? "Visa" : "Mastercard";
      const newCard: Card = {
        id: Date.now().toString(),
        lastFour: cardNumber.slice(-4),
        brand,
        isPrimary: false,
      };
      onAddCard(newCard);
      setCardNumber("");
      setExpiry("");
      setCvv("");
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AppText fontWeight="bold" style={styles.modalTitle}>
            Add New Card
          </AppText>
          <TextInput
            style={[styles.input, { fontFamily: "Inter-Regular" }]}
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={(text) =>
              setCardNumber(
                text
                  .replace(/\D/g, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim()
              )
            }
            keyboardType="numeric"
            maxLength={19}
          />
          <View style={styles.row}>
            <TextInput
              style={[
                styles.input,
                styles.halfInput,
                { fontFamily: "Inter-Regular" },
              ]}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={(text) => {
                let formatted = text.replace(/\D/g, "");
                if (formatted.length > 2)
                  formatted = `${formatted.slice(0, 2)}/${formatted.slice(
                    2,
                    4
                  )}`;
                setExpiry(formatted);
              }}
              keyboardType="numeric"
              maxLength={5}
            />
            <TextInput
              style={[
                styles.input,
                styles.halfInput,
                { fontFamily: "Inter-Regular" },
              ]}
              placeholder="CVV"
              value={cvv}
              onChangeText={(text) => setCvv(text.replace(/\D/g, ""))}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <AppText fontWeight="semi-bold" style={styles.buttonText}>
                Cancel
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButtonModal}
              onPress={handleAddCard}
            >
              <AppText fontWeight="semi-bold" style={styles.buttonText}>
                Add
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cancelButton: {
    padding: 12,
    backgroundColor: "#999",
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },
  addButtonModal: {
    padding: 12,
    backgroundColor: "#4A58D9",
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddCardForm;
