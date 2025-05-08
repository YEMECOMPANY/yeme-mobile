import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import UserTransactionFilter from "../transactionsFilterSearch";
import AppText from "../appText";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Transaction {
  id: string;
  date: string;
  vendor: string;
  paid: number;
  split: number;
  status: "Payment split" | "Pending split";
}

interface UserTransactionsScreenProps {
  limit?: number;
  showHeader?: boolean; // New prop to control header visibility
}

const UserTransactionsScreen: React.FC<UserTransactionsScreenProps> = ({
  limit,
  showHeader = true,
}) => {
  const router = useRouter();

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "15 Apr 2025",
      vendor: "Starbucks",
      paid: 15.5,
      split: 3.1,
      status: "Payment split",
    },
    {
      id: "2",
      date: "14 Apr 2025",
      vendor: "Amazon",
      paid: 89.99,
      split: 0,
      status: "Pending split",
    },
    {
      id: "3",
      date: "13 Apr 2025",
      vendor: "Whole Foods",
      paid: 45.2,
      split: 9.04,
      status: "Payment split",
    },
    {
      id: "4",
      date: "12 Apr 2025",
      vendor: "Uber Eats",
      paid: 32.8,
      split: 6.56,
      status: "Payment split",
    },
    {
      id: "5",
      date: "11 Apr 2025",
      vendor: "Nike",
      paid: 120.0,
      split: 0,
      status: "Pending split",
    },
    {
      id: "6",
      date: "10 Apr 2025",
      vendor: "Target",
      paid: 67.4,
      split: 13.48,
      status: "Payment split",
    },
    {
      id: "7",
      date: "09 Apr 2025",
      vendor: "Best Buy",
      paid: 299.99,
      split: 0,
      status: "Pending split",
    },
    {
      id: "8",
      date: "08 Apr 2025",
      vendor: "Walmart",
      paid: 23.75,
      split: 4.75,
      status: "Payment split",
    },
    {
      id: "9",
      date: "07 Apr 2025",
      vendor: "Apple Store",
      paid: 999.0,
      split: 0,
      status: "Pending split",
    },
    {
      id: "10",
      date: "06 Apr 2025",
      vendor: "Trader Joe's",
      paid: 38.6,
      split: 7.72,
      status: "Payment split",
    },
  ]);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "date-desc" | "date-asc" | "amount-desc" | "amount-asc"
  >("date-desc");

  // Handle search and sort
  useEffect(() => {
    let updatedTransactions = [...transactions];

    // Filter by search query (vendor name)
    if (searchQuery) {
      updatedTransactions = updatedTransactions.filter((transaction) =>
        transaction.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort transactions
    updatedTransactions.sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "amount-desc") {
        return b.paid - a.paid;
      } else {
        return a.paid - b.paid;
      }
    });

    // Apply limit if provided
    if (limit) {
      updatedTransactions = updatedTransactions.slice(0, limit);
    }

    setFilteredTransactions(updatedTransactions);
  }, [searchQuery, sortBy, transactions, limit]);

  // Handle "See All" navigation
  const handleSeeAll = () => {
    router.push({
      pathname: "/(screens)/transactions",
      params: { transactions: JSON.stringify(transactions) },
    });
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <AppText style={styles.dateText}>{item.date}</AppText>
        <View
          style={[
            styles.statusBadge,
            item.status === "Pending split"
              ? styles.pendingBadge
              : styles.splitBadge,
          ]}
        >
          <Ionicons
            name={
              item.status === "Payment split"
                ? "checkmark-circle"
                : "time-outline"
            }
            size={16}
            color={item.status === "Payment split" ? "#FFF" : "#FFF"}
            style={styles.statusIcon}
          />
          <AppText style={styles.statusText}>{item.status}</AppText>
        </View>
      </View>
      <AppText fontWeight="semi-bold" style={styles.vendorText}>
        {item.vendor}
      </AppText>
      <View style={styles.amountContainer}>
        <View style={styles.amountSection}>
          <AppText style={styles.amountLabel}>Paid</AppText>
          <AppText fontWeight="bold" style={styles.amountText}>
            ${item.paid.toFixed(2)}
          </AppText>
        </View>
        {item.split > 0 && (
          <View style={styles.amountSection}>
            <AppText style={styles.amountLabel}>Split</AppText>
            <AppText fontWeight="bold" style={styles.amountText}>
              ${item.split.toFixed(2)}
            </AppText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <UserTransactionFilter
        onSearch={(query: string) => setSearchQuery(query)}
        onSort={(
          sortType: "date-desc" | "date-asc" | "amount-desc" | "amount-asc"
        ) => setSortBy(sortType)}
      />

      {showHeader && (
        <View style={styles.headerContainer}>
          <AppText fontWeight="bold" style={styles.sectionTitle}>
            Recent Transactions
          </AppText>
          {limit && (
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={handleSeeAll}
            >
              <AppText style={styles.seeAllText} fontWeight="bold">
                See all
              </AppText>
              <Icon name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <AppText style={styles.emptyText}>No transactions found.</AppText>
        }
        scrollEnabled={limit ? false : true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20, // Aligned with other components
    color: "#333",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  listContent: {
    paddingBottom: 32,
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  splitBadge: {
    backgroundColor: "#FF6F61",
  },
  pendingBadge: {
    backgroundColor: "#3A266E",
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#FFF",
  },
  vendorText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountSection: {
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  amountText: {
    fontSize: 16,
    color: "#3A266E",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 32,
  },
});

export default UserTransactionsScreen;
