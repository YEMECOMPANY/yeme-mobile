import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../appText";
import SearchBar from "./searchBar";
import TiersView from "./tiersView";
import TotalYemsCard from "./totalYemsCard";
import VendorsListView from "./vendorsListView";
import YemsHistory from "./yemsHistory";

type TabType = "my-yems" | "earn-yems";
type ViewType = "tiers" | "history";
type ViewModeType = "list" | "map";

function YemsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("my-yems");
  const [activeView, setActiveView] = useState<ViewType>("tiers");
  const [viewMode, setViewMode] = useState<ViewModeType>("list");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.tabContainer}>
            <View
              style={[
                styles.tabIndicator,
                activeTab === "my-yems"
                  ? styles.tabIndicatorLeft
                  : styles.tabIndicatorRight,
              ]}
            />
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => setActiveTab("my-yems")}
            >
              <AppText
                style={[
                  styles.tabText,
                  activeTab === "my-yems" && styles.activeTabText,
                ]}
                fontWeight={activeTab === "my-yems" ? "bold" : "semi-bold"}
              >
                My YEMs
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => setActiveTab("earn-yems")}
            >
              <AppText
                style={[
                  styles.tabText,
                  activeTab === "earn-yems" && styles.activeTabText,
                ]}
                fontWeight={activeTab === "earn-yems" ? "bold" : "semi-bold"}
              >
                Earn YEMs
              </AppText>
            </TouchableOpacity>
          </View>

          {activeTab === "my-yems" && (
            <>
              <TotalYemsCard />
              <SearchBar showTag={true} onTunePress={() => {}} />
              <View style={styles.viewToggle}>
                <TouchableOpacity
                  style={[
                    styles.viewToggleButton,
                    activeView === "tiers" && styles.activeViewToggleButton,
                  ]}
                  onPress={() => setActiveView("tiers")}
                >
                  <AppText
                    style={[
                      styles.viewToggleText,
                      activeView === "tiers" && styles.activeViewToggleText,
                    ]}
                    fontWeight={activeView === "tiers" ? "bold" : "semi-bold"}
                  >
                    Tiers
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.viewToggleButton,
                    activeView === "history" && styles.activeViewToggleButton,
                  ]}
                  onPress={() => setActiveView("history")}
                >
                  <AppText
                    style={[
                      styles.viewToggleText,
                      activeView === "history" && styles.activeViewToggleText,
                    ]}
                    fontWeight={activeView === "history" ? "bold" : "semi-bold"}
                  >
                    History
                  </AppText>
                </TouchableOpacity>
              </View>
              {activeView === "tiers" ? <TiersView /> : <YemsHistory />}
            </>
          )}

          {activeTab === "earn-yems" && (
            <VendorsListView viewMode={viewMode} setViewMode={setViewMode} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF5EC",
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#3A266E",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 24,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tabIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  tabIndicatorLeft: {
    left: 0,
  },
  tabIndicatorRight: {
    left: "50%",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  tabText: {
    color: "#fff",
    fontSize: 16,
    opacity: 0.7,
  },
  activeTabText: {
    color: "#3A266E",
    opacity: 1,
    fontWeight: "600",
  },
  viewToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  viewToggleButton: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginHorizontal: 12,
  },
  activeViewToggleButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#3A266E",
  },
  viewToggleText: {
    fontSize: 18,
    color: "#777",
  },
  activeViewToggleText: {
    color: "#3A266E",
  },
});

export default YemsScreen;
