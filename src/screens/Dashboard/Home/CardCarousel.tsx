// src/components/CardCarousel.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

interface Card {
  id: string;
  lastFour: string;
  brand: 'Visa' | 'Mastercard' | 'Amex';
  isPrimary: boolean;
}

const CardCarousel = () => {
  const [cards, setCards] = useState<Card[]>([
    {id: '1', lastFour: '4242', brand: 'Visa', isPrimary: true},
    {id: '2', lastFour: '5555', brand: 'Mastercard', isPrimary: false},
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const addCard = () => {
    const numLength = cardNumber.replace(/\s/g, '').length;
    if (
      (numLength === 15 || numLength === 16) &&
      expiry.length === 5 &&
      cvv.length >= 3
    ) {
      const brand =
        numLength === 15 ? 'Amex' : Math.random() > 0.5 ? 'Visa' : 'Mastercard';
      const newCard: Card = {
        id: Date.now().toString(),
        lastFour: cardNumber.slice(-4),
        brand,
        isPrimary: cards.length === 0,
      };
      setCards([...cards, newCard]);
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setModalVisible(false);
    }
  };

  const setPrimaryCard = (cardId: string) => {
    setCards(
      cards.map(card => ({
        ...card,
        isPrimary: card.id === cardId,
      })),
    );
  };

  const renderCard = ({item}: {item: Card}) => (
    <TouchableOpacity
      style={[styles.card, item.isPrimary && styles.primaryCard]}
      onPress={() => setPrimaryCard(item.id)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardBrand}>{item.brand}</Text>
        {item.isPrimary && <Text style={styles.primaryText}>Primary</Text>}
      </View>
      <View style={styles.chip} />
      <Text style={styles.cardNumber}>•••• •••• •••• {item.lastFour}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Cards</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Card</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChangeText={text =>
                setCardNumber(
                  text
                    .replace(/\D/g, '')
                    .replace(/(.{4})/g, '$1 ')
                    .trim(),
                )
              }
              keyboardType="numeric"
              maxLength={19} // 16 digits + 3 spaces
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="MM/YY"
                value={expiry}
                onChangeText={text => {
                  let formatted = text.replace(/\D/g, '');
                  if (formatted.length > 2)
                    formatted = `${formatted.slice(0, 2)}/${formatted.slice(
                      2,
                      4,
                    )}`;
                  setExpiry(formatted);
                }}
                keyboardType="numeric"
                maxLength={5}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                value={cvv}
                onChangeText={text => setCvv(text.replace(/\D/g, ''))}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButtonModal} onPress={addCard}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#352069',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carousel: {
    flexGrow: 0,
  },
  card: {
    width: 220,
    height: 140,
    backgroundColor: '#352069',
    borderRadius: 12,
    padding: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryCard: {
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border for primary
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrand: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  primaryText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  chip: {
    width: 40,
    height: 25,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    marginVertical: 20,
  },
  cardNumber: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'monospace',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#666',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  addButtonModal: {
    padding: 10,
    backgroundColor: '#352069',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CardCarousel;
