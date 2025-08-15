import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Contacts from "expo-contacts";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import AppText from "../appText";

interface Group {
  name: string;
  members: string[];
  image: string;
  lastActivity?: string;
  unreadCount?: number;
}

export default function GroupsScreen() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [favoriteGroups, setFavoriteGroups] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });

        if (data.length > 0) {
          setContacts(data);
        } else {
          console.log("No contacts found");
        }
      } else {
        console.log("Contacts permission denied");
      }
    })();
  }, []);

  const toggleContactSelected = (contact: string) => {
    setSelectedContacts((prevState) => {
      const updatedState = [...prevState];
      updatedState.includes(contact)
        ? updatedState.splice(updatedState.indexOf(contact), 1)
        : updatedState.push(contact);
      return updatedState;
    });
  };

  const toggleGroupIsFavorite = (group: Group) => {
    setFavoriteGroups((prevState) => {
      const updatedState = [...prevState];
      updatedState.includes(group)
        ? updatedState.splice(updatedState.indexOf(group), 1)
        : updatedState.push(group);
      return updatedState;
    });
  };

  const resetValues = () => {
    setSelectedContacts([]);
    setGroupName("");
    setShowModal(false);
  };

  const createGroup = (groupName: string, groupMembers: string[]) => {
    const hasGroupName = groups.find((g) => g.name === groupName);
    if (groupName && groupMembers.length > 1 && !hasGroupName) {
      const newGroup: Group = {
        name: groupName,
        members: groupMembers,
        image: `https://i.pravatar.cc/${Math.floor(Math.random() * 100)}`,
        lastActivity: "Just now",
        unreadCount: 0,
      };
      setGroups([...groups, newGroup]);
      resetValues();
      ToastAndroid.show("Group created successfully!", ToastAndroid.SHORT);
    } else {
      const text = !groupName
        ? "Enter group name"
        : groupMembers.length <= 1
        ? "Select more group members"
        : hasGroupName
        ? "Group name already used"
        : "Unknown error";
      ToastAndroid.show(text, ToastAndroid.SHORT);
    }
  };

  const deleteGroup = (groupToDelete: Group) => {
    Alert.alert(
      "Delete Group",
      `Are you sure you want to delete "${groupToDelete.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setGroups(groups.filter((g) => g !== groupToDelete));
            setFavoriteGroups(
              favoriteGroups.filter((g) => g !== groupToDelete)
            );
            ToastAndroid.show("Group deleted", ToastAndroid.SHORT);
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
      ToastAndroid.show("Groups refreshed", ToastAndroid.SHORT);
    }, 1000);
  };

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFavoriteFilter = showFavoritesOnly
      ? favoriteGroups.includes(group)
      : true;
    return matchesSearch && matchesFavoriteFilter;
  });

  const filteredContacts = contacts.filter((contact) =>
    (contact.name || "Unknown")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <MaterialIcons name="people" size={24} color="black" />
            <View style={styles.headerActions}>
              <Pressable
                style={styles.filterButton}
                onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                <FontAwesome
                  name={showFavoritesOnly ? "star" : "star-o"}
                  size={18}
                  color={showFavoritesOnly ? "#3a266e" : "#666"}
                />
              </Pressable>
              <Pressable
                style={styles.newGroupButton}
                onPress={() => setShowModal(true)}
              >
                <MaterialIcons name="add" size={20} color="white" />
                <AppText style={styles.buttonText} fontWeight="semi-bold">
                  New Group
                </AppText>
              </Pressable>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search groups..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery ? (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </Pressable>
            ) : null}
          </View>
        </View>

        {/* Groups Count */}
        <View style={styles.statsContainer}>
          <AppText style={styles.statsText} fontWeight="regular">
            {filteredGroups.length} group
            {filteredGroups.length !== 1 ? "s" : ""}
            {showFavoritesOnly && " (favorites)"}
          </AppText>
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.decoratedModal}>
              <AppText style={styles.modalTitle} fontWeight="bold">
                Create New Group
              </AppText>
              <TextInput
                placeholder="Enter group name"
                onChangeText={setGroupName}
                value={groupName}
                style={styles.textInput}
                placeholderTextColor="#999"
              />

              {/* Search in modal */}
              <View style={styles.modalSearchContainer}>
                <Ionicons name="search" size={16} color="#666" />
                <TextInput
                  style={styles.modalSearchInput}
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#999"
                />
              </View>

              {/* Selected count */}
              {selectedContacts.length > 0 && (
                <AppText style={styles.selectedCount} fontWeight="semi-bold">
                  {selectedContacts.length} selected
                </AppText>
              )}

              <ScrollView
                contentContainerStyle={styles.contactsContainer}
                style={styles.scrollView}
              >
                {filteredContacts.map((item, i) => (
                  <Pressable
                    key={i}
                    onPress={() =>
                      toggleContactSelected(item.name || "Unknown")
                    }
                    style={[
                      styles.contactCard,
                      {
                        backgroundColor: selectedContacts.includes(
                          item.name || "Unknown"
                        )
                          ? "#e8f5e8"
                          : "white",
                        borderColor: selectedContacts.includes(
                          item.name || "Unknown"
                        )
                          ? "#4caf50"
                          : "transparent",
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <AppText style={styles.contactText} fontWeight="semi-bold">
                      {item.name || "Unknown"}
                    </AppText>
                    {selectedContacts.includes(item.name || "Unknown") && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#4caf50"
                      />
                    )}
                  </Pressable>
                ))}
              </ScrollView>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowModal(false);
                    setSelectedContacts([]);
                    setGroupName("");
                    setSearchQuery("");
                  }}
                >
                  <AppText
                    style={styles.cancelButtonText}
                    fontWeight="semi-bold"
                  >
                    Cancel
                  </AppText>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, styles.createButton]}
                  onPress={() => createGroup(groupName, [...selectedContacts])}
                >
                  <AppText
                    style={styles.createButtonText}
                    fontWeight="semi-bold"
                  >
                    Create
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Groups List */}
        <ScrollView
          contentContainerStyle={styles.groupsView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredGroups.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="group" size={64} color="#ccc" />
              <AppText style={styles.emptyText} fontWeight="regular">
                {searchQuery
                  ? "No groups found"
                  : showFavoritesOnly
                  ? "No favorite groups"
                  : "No groups yet"}
              </AppText>
              <AppText style={styles.emptySubtext} fontWeight="regular">
                {searchQuery
                  ? "Try a different search"
                  : "Create your first group to get started"}
              </AppText>
            </View>
          ) : (
            filteredGroups.map((item, i) => (
              <View key={i} style={styles.groupWrapper}>
                <Link
                  asChild
                  href={{
                    pathname: "/(screens)/groupDetailScreen",
                    params: {
                      id: i.toString(),
                      name: item.name,
                      members: JSON.stringify(item.members),
                      image: item.image,
                    },
                  }}
                >
                  <Pressable style={styles.groupsCard}>
                    <View style={styles.groupContent}>
                      <View style={styles.groupImageContainer}>
                        {item.members.slice(0, 3).map((_, index) => (
                          <Image
                            key={index}
                            style={[
                              styles.memberImage,
                              { left: index * 15 },
                              item.members.length > 3 &&
                                index === 2 &&
                                styles.dimmedImage,
                            ]}
                            source={{
                              uri: `https://i.pravatar.cc/${Math.floor(
                                Math.random() * 100
                              )}`,
                            }}
                          />
                        ))}
                        {item.members.length > 3 && (
                          <View style={styles.moreMembersIndicator}>
                            <AppText
                              style={styles.moreMembersText}
                              fontWeight="semi-bold"
                            >
                              +{item.members.length - 3}
                            </AppText>
                          </View>
                        )}
                      </View>
                      <View style={styles.groupInfo}>
                        <View style={styles.groupHeader}>
                          <AppText style={styles.groupName} fontWeight="bold">
                            {item.name}
                          </AppText>
                          <Pressable
                            onPress={() => toggleGroupIsFavorite(item)}
                          >
                            {favoriteGroups.includes(item) ? (
                              <FontAwesome
                                name="star"
                                size={14}
                                color="white"
                              />
                            ) : (
                              <FontAwesome
                                name="star-o"
                                size={14}
                                color="white"
                              />
                            )}
                          </Pressable>
                        </View>
                        <AppText
                          style={styles.groupMembers}
                          fontWeight="regular"
                        >
                          {item.members.length} members
                        </AppText>
                        {item.lastActivity && (
                          <AppText
                            style={styles.lastActivity}
                            fontWeight="regular"
                          >
                            {item.lastActivity}
                          </AppText>
                        )}
                      </View>
                    </View>
                    <View style={styles.groupActions}>
                      {item.unreadCount && item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <AppText style={styles.unreadText} fontWeight="bold">
                            {item.unreadCount}
                          </AppText>
                        </View>
                      )}
                      <AntDesign name="right" size={15} color="white" />
                    </View>
                  </Pressable>
                </Link>
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => deleteGroup(item)}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={20}
                    color="#ff4444"
                  />
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  screenContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    marginTop: 10,
    marginBottom: 15,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  newGroupButton: {
    backgroundColor: "#3a266e",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  statsContainer: {
    marginBottom: 15,
  },
  statsText: {
    fontSize: 14,
    color: "#666",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  decoratedModal: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 15,
  },
  textInput: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    marginBottom: 10,
    gap: 8,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  selectedCount: {
    color: "#3a266e",
    fontSize: 14,
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 250,
    width: "100%",
    marginBottom: 20,
  },
  contactsContainer: {
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    gap: 8,
  },
  contactCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  createButton: {
    backgroundColor: "#3a266e",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
  },
  groupsView: {
    gap: 12,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  groupWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  groupsCard: {
    backgroundColor: "#d86d5e",
    flex: 1,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },
  groupImageContainer: {
    width: 70,
    height: 40,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  memberImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    borderWidth: 2,
    borderColor: "white",
  },
  dimmedImage: {
    opacity: 0.5,
  },
  moreMembersIndicator: {
    position: "absolute",
    left: 45,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  moreMembersText: {
    color: "white",
    fontSize: 12,
  },
  groupInfo: {
    flex: 1,
    gap: 3,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  groupName: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  groupMembers: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
  },
  lastActivity: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
  },
  groupActions: {
    alignItems: "center",
    gap: 8,
  },
  unreadBadge: {
    backgroundColor: "#ff4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 68, 68, 0.1)",
  },
});
