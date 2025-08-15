import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "../../appText";
import CardListHeader from "./cardListHeader";
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

const CardList = () => {
  const router = useRouter();
  const { newCard } = useLocalSearchParams<{ newCard?: string }>();
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      lastFour: "4242",
      brand: "Visa",
      name: "John Doe",
      expiry: "12/25",
      cvv: "123",
      isPrimary: true,
    },
    {
      id: "2",
      lastFour: "5555",
      brand: "Mastercard",
      name: "Jane Doe",
      expiry: "11/26",
      cvv: "456",
      isPrimary: false,
    },
  ]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList<Card>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (newCard) {
      const parsedCard: Card = JSON.parse(newCard);
      setCards((prevCards) => [...prevCards, parsedCard]);
    }
  }, [newCard]);

  const setPrimaryCard = (cardId: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isPrimary: card.id === cardId,
      }))
    );
    setMenuVisible(false);
  };

  const deleteCard = (cardId: string) => {
    setCards(cards.filter((card) => card.id !== cardId));
    setMenuVisible(false);
  };

  const viewTransactions = (cardId: string) => {
    router.push({
      pathname: "/(screens)/transactions",
      params: { cardId },
    });
    setMenuVisible(false);
  };

  const addCard = () => {
    router.push("/(screens)/Cards");
  };

  const openMenu = (cardId: string) => {
    setSelectedCardId(cardId);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedCardId(null);
  };

  const onScroll = (event: any) => {
    const slideSize = Dimensions.get("window").width * 0.85; // Approximate visible card width with margins
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              flatListRef.current?.scrollToIndex({ index, animated: true })
            }
            style={styles.paginationDot}
          >
            <View
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CardListHeader onAddPress={addCard} />
      <FlatList
        ref={flatListRef}
        data={cards}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.menuButtonContainer}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => openMenu(item.id)}
              >
                <Ionicons name="ellipsis-vertical" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <CreditCard
              name={item.name}
              expiry={item.expiry}
              cvv={item.cvv}
              lastFour={item.lastFour}
              brand={item.brand}
              isPrimary={item.isPrimary}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={styles.carouselContent}
        onScroll={onScroll}
        scrollEventThrottle={16}
        pagingEnabled
      />
      {renderPagination()}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeMenu}
        >
          <View style={styles.menuContainer}>
            {selectedCardId &&
              !cards.find((card) => card.id === selectedCardId)?.isPrimary && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setPrimaryCard(selectedCardId)}
                >
                  <AppText fontWeight="semi-bold" style={styles.menuText}>
                    Set as Primary
                  </AppText>
                </TouchableOpacity>
              )}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => viewTransactions(selectedCardId!)}
            >
              <AppText fontWeight="semi-bold" style={styles.menuText}>
                Transactions
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuItem, styles.deleteMenuItem]}
              onPress={() => deleteCard(selectedCardId!)}
            >
              <AppText
                fontWeight="semi-bold"
                style={[styles.menuText, styles.deleteText]}
              >
                Delete
              </AppText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  cardContainer: {
    marginRight: 16,
    width: 300,
    position: "relative",
  },
  carousel: {
    flexGrow: 0,
    marginBottom: 20,
  },
  carouselContent: {
    paddingRight: 20,
  },
  menuButtonContainer: {
    position: "absolute",
    top: 25,
    left: 10,
    zIndex: 1,
  },
  menuButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 6,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    width: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  menuText: {
    fontSize: 16,
    color: "#1A1A1A",
  },
  deleteMenuItem: {
    backgroundColor: "#FF4444",
  },
  deleteText: {
    color: "#FFFFFF",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    marginHorizontal: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#666",
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default CardList;
