// src/components/Transactions.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  cashback: number;
}

const Transactions = () => {
  const transactions: Transaction[] = [
    {id: '1', merchant: 'IKEA', date: '13 JUN', amount: 32.01, cashback: 6.4},
    {id: '2', merchant: 'H&M', date: '12 JUN', amount: 264.0, cashback: 0.0},
    {
      id: '3',
      merchant: 'JB Hi-Fi',
      date: '10 JUN',
      amount: 456.0,
      cashback: 114.0,
    },
  ];

  const renderTransaction = ({item}: {item: Transaction}) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionInfo}>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>-${item.amount.toFixed(2)}</Text>
        {item.cashback > 0 && (
          <View style={styles.cashbackBadge}>
            <Text style={styles.cashbackText}>
              +${item.cashback.toFixed(2)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transactions</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  seeAll: {
    fontSize: 14,
    color: '#1e90ff',
    fontWeight: '500',
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionInfo: {
    flexDirection: 'column',
  },
  merchant: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '600',
  },
  cashbackBadge: {
    backgroundColor: '#e8f8f2',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  cashbackText: {
    fontSize: 12,
    color: '#2ecc71',
    fontWeight: '600',
  },
});

export default Transactions;
