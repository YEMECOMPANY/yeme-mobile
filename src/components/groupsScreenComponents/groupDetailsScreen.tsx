import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import MemberList from "./memberList";

export default function GroupDetailsScreen() {
  const { id, name, members, image } = useLocalSearchParams();
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedGroupName, setEditedGroupName] = useState(
    (name as string) || ""
  );
  const [groupDescription, setGroupDescription] = useState(
    "Welcome to our group chat! 🎉"
  );
  const [isAdmin, setIsAdmin] = useState(true); // Simulate admin status
  const [notifications, setNotifications] = useState(true);

  const memberList = (() => {
    try {
      if (typeof members === "string") {
        const parsed = JSON.parse(members);
        return Array.isArray(parsed) ? parsed : members.split(",");
      }
      return [];
    } catch {
      return typeof members === "string" ? members.split(",") : [];
    }
  })();

  const handleDeleteMember = (member: string) => {
    Alert.alert("Remove Member", `Remove ${member} from the group?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          ToastAndroid.show(`${member} removed from group`, ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const handleAddMembers = () => {
    // router.push("/(screens)/addMembersScreen");
  };

  const handleSaveGroupInfo = () => {
    if (editedGroupName.trim()) {
      ToastAndroid.show("Group info updated", ToastAndroid.SHORT);
      setShowEditModal(false);
    } else {
      ToastAndroid.show("Group name cannot be empty", ToastAndroid.SHORT);
    }
  };

  const handleShareGroup = async () => {
    try {
      await Share.share({
        message: `Join our group "${name}"! We have ${memberList.length} members.`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleLeaveGroup = () => {
    Alert.alert("Leave Group", "Are you sure you want to leave this group?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "destructive",
        onPress: () => {
          ToastAndroid.show("Left group", ToastAndroid.SHORT);
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.groupImageContainer}>
          <Image
            style={styles.groupImage}
            source={{ uri: (image as string) || `https://i.pravatar.cc/100` }}
          />
          <Pressable style={styles.cameraButton}>
            <MaterialIcons name="camera-alt" size={16} color="white" />
          </Pressable>
        </View>

        <View style={styles.groupInfoHeader}>
          <Text style={styles.groupNameHeader}>{name}</Text>
          <Text style={styles.groupStatus}>
            {memberList.length} members • Active now
          </Text>
          <Text style={styles.groupDescription}>{groupDescription}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable style={styles.actionButton} onPress={() => {}}>
          <MaterialIcons name="message" size={20} color="#3a266e" />
          <Text style={styles.actionButtonText}>Message</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={() => {}}>
          <MaterialIcons name="videocam" size={20} color="#3a266e" />
          <Text style={styles.actionButtonText}>Video Call</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleShareGroup}>
          <MaterialIcons name="share" size={20} color="#3a266e" />
          <Text style={styles.actionButtonText}>Share</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => setShowSettings(!showSettings)}
        >
          <FontAwesome6 name="gear" size={18} color="#3a266e" />
          <Text style={styles.actionButtonText}>Settings</Text>
        </Pressable>
      </View>

      {/* Settings Panel */}
      {showSettings && (
        <View style={styles.settingsPanel}>
          <Pressable
            style={styles.settingItem}
            onPress={() => setShowEditModal(true)}
          >
            <MaterialIcons name="edit" size={20} color="#333" />
            <Text style={styles.settingText}>Edit group info</Text>
          </Pressable>

          <Pressable style={styles.settingItem} onPress={handleAddMembers}>
            <MaterialIcons name="person-add" size={20} color="#333" />
            <Text style={styles.settingText}>Add members</Text>
          </Pressable>

          <Pressable
            style={styles.settingItem}
            onPress={() => setNotifications(!notifications)}
          >
            <MaterialIcons
              name={notifications ? "notifications" : "notifications-off"}
              size={20}
              color="#333"
            />
            <Text style={styles.settingText}>
              {notifications ? "Mute notifications" : "Unmute notifications"}
            </Text>
          </Pressable>

          <Pressable style={styles.settingItem} onPress={() => {}}>
            <MaterialIcons name="block" size={20} color="#ff4444" />
            <Text style={[styles.settingText, { color: "#ff4444" }]}>
              Block group
            </Text>
          </Pressable>

          <Pressable style={styles.settingItem} onPress={handleLeaveGroup}>
            <MaterialIcons name="exit-to-app" size={20} color="#ff4444" />
            <Text style={[styles.settingText, { color: "#ff4444" }]}>
              Leave group
            </Text>
          </Pressable>
        </View>
      )}

      {/* Members Section */}
      <View style={styles.membersSection}>
        <View style={styles.membersHeader}>
          <Text style={styles.membersTitle}>Members ({memberList.length})</Text>
          {isAdmin && (
            <Pressable
              style={styles.addMemberButton}
              onPress={handleAddMembers}
            >
              <MaterialIcons name="person-add" size={20} color="#3a266e" />
            </Pressable>
          )}
        </View>

        <MemberList
          members={memberList}
          onDeleteMember={isAdmin ? handleDeleteMember : undefined}
          showAdminBadge={true}
        />
      </View>

      {/* Edit Group Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModal}>
            <Text style={styles.modalTitle}>Edit Group Info</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Group Name</Text>
              <TextInput
                style={styles.textInput}
                value={editedGroupName}
                onChangeText={setEditedGroupName}
                placeholder="Enter group name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={groupDescription}
                onChangeText={setGroupDescription}
                placeholder="Enter group description"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveGroupInfo}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerSection: {
    backgroundColor: "white",
    padding: 10,
    paddingTop: 10,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#3a266e",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3a266e",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  groupInfoHeader: {
    alignItems: "center",
    gap: 5,
  },
  groupNameHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  groupStatus: {
    fontSize: 14,
    color: "#666",
  },
  groupDescription: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 15,
    paddingVertical: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButton: {
    alignItems: "center",
    gap: 5,
    flex: 1,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#3a266e",
    fontWeight: "600",
  },
  settingsPanel: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  membersSection: {
    flex: 1,
    marginHorizontal: 16,
  },
  membersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  membersTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addMemberButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  editModal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
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
  saveButton: {
    backgroundColor: "#3a266e",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
