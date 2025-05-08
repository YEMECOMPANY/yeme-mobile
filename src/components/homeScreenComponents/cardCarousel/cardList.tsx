import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AppText from "../../appText";
import Cards from "./userCards";
import AddCardForm from "./addCardForm";
import CardListHeader from "./cardListHeader";

interface Card {
  id: string;
  lastFour: string;
  brand: "Visa" | "Mastercard" | "Amex";
  isPrimary: boolean;
}

const CardList = () => {
  const [cards, setCards] = useState<Card[]>([
    { id: "1", lastFour: "4242", brand: "Visa", isPrimary: true },
    { id: "2", lastFour: "5555", brand: "Mastercard", isPrimary: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const setPrimaryCard = (cardId: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isPrimary: card.id === cardId,
      }))
    );
  };

  const addCard = (newCard: Card) => {
    setCards([...cards, newCard]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CardListHeader onAddPress={() => setModalVisible(true)} />
      <FlatList
        data={cards}
        renderItem={({ item }) => (
          <Cards card={item} onSetPrimary={() => setPrimaryCard(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
      />
      <AddCardForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddCard={addCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  carousel: {
    flexGrow: 0,
    marginBottom: 20,
  },
  carouselContent: {
    paddingRight: 20,
  },
});

export default CardList;
