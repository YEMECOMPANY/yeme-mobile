import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "../appText";
import HistoryRow from "./historyRow";

function YemsHistory() {
  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyHeader}>
        <AppText style={styles.historyHeaderCol} fontWeight="bold">
          DATE
        </AppText>
        <AppText style={styles.historyHeaderCol} fontWeight="bold">
          STORE
        </AppText>
        <AppText style={styles.historyHeaderCol} fontWeight="bold">
          YEMs
        </AppText>
        <AppText style={styles.historyHeaderCol} fontWeight="bold">
          STATUS
        </AppText>
      </View>

      <ScrollView style={styles.historyList}>
        <HistoryRow
          date="2/10/2023"
          store="John's Cafe"
          yems={25}
          status="approved"
        />
        <HistoryRow
          date="2/4/2023"
          store="SmartHome"
          yems={98}
          status="pending"
        />
        <HistoryRow
          date="2/2/2023"
          store="Skyline Cinema"
          yems={100}
          status="approved"
        />
        <HistoryRow
          date="2/2/2023"
          store="Fitness Hub Gym"
          yems={25}
          status="approved"
        />
        <HistoryRow
          date="1/28/2023"
          store="Adventure Sports"
          yems={308}
          status="approved"
        />
        <HistoryRow
          date="1/28/2023"
          store="Green Grocer"
          yems={25}
          status="approved"
        />
        <HistoryRow
          date="1/20/2023"
          store="Ocean Blue"
          yems={250}
          status="approved"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    marginBottom: 24,
  },
  historyHeader: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 8,
    marginBottom: 12,
  },
  historyHeaderCol: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  historyList: {
    marginBottom: 16,
  },
});

export default YemsHistory;
