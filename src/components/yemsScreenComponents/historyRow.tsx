import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../appText";

interface HistoryRowProps {
  date: string;
  store: string;
  yems: number;
  status: "approved" | "pending";
}

function HistoryRow({ date, store, yems, status }: HistoryRowProps) {
  return (
    <View style={styles.historyRow}>
      <AppText
        style={styles.historyDate}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {date}
      </AppText>
      <AppText style={styles.historyStore} fontWeight="semi-bold">
        {store}
      </AppText>
      <AppText
        style={styles.historyYems}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {yems}
      </AppText>
      <View
        style={[
          styles.statusBadge,
          status === "approved" ? styles.approvedBadge : styles.pendingBadge,
        ]}
      >
        <AppText
          style={[
            styles.statusText,
            status === "approved" ? styles.approvedText : styles.pendingText,
          ]}
          fontWeight="semi-bold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {status === "approved" ? "Approved" : "Pending"}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  historyDate: {
    flex: 1,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  historyStore: {
    flex: 2,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  historyYems: {
    flex: 1,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  statusBadge: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  approvedBadge: {
    backgroundColor: "#E7F7E8",
  },
  pendingBadge: {
    backgroundColor: "#FFF8E7",
  },
  statusText: {
    fontSize: 12,
    textAlign: "center",
  },
  approvedText: {
    color: "#2E7D32",
  },
  pendingText: {
    color: "#F9A826",
  },
});

export default HistoryRow;
