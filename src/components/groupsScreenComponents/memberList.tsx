import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";

interface MemberListProps {
  members: string[];
  onDeleteMember?: (member: string) => void;
  showAdminBadge?: boolean;
  showOnlineStatus?: boolean;
}

interface MemberInfo {
  name: string;
  isOnline: boolean;
  isAdmin: boolean;
  lastSeen?: string;
  phoneNumber?: string;
}

export default function MemberList({
  members,
  onDeleteMember,
  showAdminBadge = false,
  showOnlineStatus = true,
}: MemberListProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // Simulate member data with additional info
  const memberData: MemberInfo[] = members.map((name, index) => ({
    name,
    isOnline: Math.random() > 0.3, // 70% chance of being online
    isAdmin: index === 0, // First member is admin
    lastSeen:
      Math.random() > 0.7
        ? "2 min ago"
        : Math.random() > 0.4
        ? "1 hour ago"
        : "Yesterday",
    phoneNumber: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(
      Math.random() * 900 + 100
    )}-${Math.floor(Math.random() * 9000 + 1000)}`,
  }));

  const handleMemberPress = (member: MemberInfo) => {
    setSelectedMember(member.name);
    setShowMemberModal(true);
  };

  const handleCallMember = (member: MemberInfo) => {
    ToastAndroid.show(`Calling ${member.name}...`, ToastAndroid.SHORT);
    setShowMemberModal(false);
  };

  const handleMessageMember = (member: MemberInfo) => {
    ToastAndroid.show(`Opening chat with ${member.name}`, ToastAndroid.SHORT);
    setShowMemberModal(false);
  };

  const handleRemoveMember = (member: MemberInfo) => {
    setShowMemberModal(false);
    if (onDeleteMember) {
      onDeleteMember(member.name);
    }
  };

  const handleMakeAdmin = (member: MemberInfo) => {
    Alert.alert("Make Admin", `Make ${member.name} an admin of this group?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Make Admin",
        onPress: () => {
          ToastAndroid.show(
            `${member.name} is now an admin`,
            ToastAndroid.SHORT
          );
          setShowMemberModal(false);
        },
      },
    ]);
  };

  const selectedMemberData = memberData.find((m) => m.name === selectedMember);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {memberData.map((member, index) => (
          <Pressable
            key={index}
            style={styles.memberCard}
            onPress={() => handleMemberPress(member)}
          >
            <View style={styles.memberInfo}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `https://i.pravatar.cc/${Math.floor(
                      Math.random() * 100
                    )}`,
                  }}
                />
                {showOnlineStatus && member.isOnline && (
                  <View style={styles.onlineIndicator} />
                )}
              </View>

              <View style={styles.memberDetails}>
                <View style={styles.nameRow}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  {showAdminBadge && member.isAdmin && (
                    <View style={styles.adminBadge}>
                      <MaterialIcons
                        name="verified"
                        size={14}
                        color="#3a266e"
                      />
                      <Text style={styles.adminText}>Admin</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.memberStatus}>
                  {member.isOnline ? "Online" : `Last seen ${member.lastSeen}`}
                </Text>
              </View>
            </View>

            <View style={styles.memberActions}>
              <Pressable
                style={styles.actionIcon}
                onPress={() => handleMessageMember(member)}
              >
                <MaterialIcons name="message" size={20} color="#3a266e" />
              </Pressable>

              {onDeleteMember && !member.isAdmin && (
                <Pressable
                  style={styles.actionIcon}
                  onPress={() => onDeleteMember(member.name)}
                >
                  <FontAwesome6 name="trash" size={16} color="#ff4444" />
                </Pressable>
              )}
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Member Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMemberModal}
        onRequestClose={() => setShowMemberModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.memberModal}>
            {selectedMemberData && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalAvatarContainer}>
                    <Image
                      style={styles.modalAvatar}
                      source={{
                        uri: `https://i.pravatar.cc/${Math.floor(
                          Math.random() * 100
                        )}`,
                      }}
                    />
                    {selectedMemberData.isOnline && (
                      <View style={styles.modalOnlineIndicator} />
                    )}
                  </View>

                  <Text style={styles.modalMemberName}>
                    {selectedMemberData.name}
                  </Text>
                  <Text style={styles.modalMemberStatus}>
                    {selectedMemberData.isOnline
                      ? "Online"
                      : `Last seen ${selectedMemberData.lastSeen}`}
                  </Text>

                  {selectedMemberData.isAdmin && (
                    <View style={styles.modalAdminBadge}>
                      <MaterialIcons name="verified" size={16} color="white" />
                      <Text style={styles.modalAdminText}>Group Admin</Text>
                    </View>
                  )}
                </View>

                <View style={styles.modalInfo}>
                  <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={20} color="#666" />
                    <Text style={styles.infoText}>
                      {selectedMemberData.phoneNumber}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <Pressable
                    style={[styles.modalActionButton, styles.callButton]}
                    onPress={() => handleCallMember(selectedMemberData)}
                  >
                    <MaterialIcons name="call" size={20} color="white" />
                    <Text style={styles.modalActionText}>Call</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.modalActionButton, styles.messageButton]}
                    onPress={() => handleMessageMember(selectedMemberData)}
                  >
                    <MaterialIcons name="message" size={20} color="white" />
                    <Text style={styles.modalActionText}>Message</Text>
                  </Pressable>
                </View>

                {/* Admin Actions */}
                {onDeleteMember && (
                  <View style={styles.adminActions}>
                    {!selectedMemberData.isAdmin && (
                      <Pressable
                        style={styles.adminActionButton}
                        onPress={() => handleMakeAdmin(selectedMemberData)}
                      >
                        <MaterialIcons
                          name="admin-panel-settings"
                          size={20}
                          color="#3a266e"
                        />
                        <Text
                          style={[styles.adminActionText, { color: "#3a266e" }]}
                        >
                          Make Admin
                        </Text>
                      </Pressable>
                    )}

                    {!selectedMemberData.isAdmin && (
                      <Pressable
                        style={styles.adminActionButton}
                        onPress={() => handleRemoveMember(selectedMemberData)}
                      >
                        <MaterialIcons
                          name="person-remove"
                          size={20}
                          color="#ff4444"
                        />
                        <Text
                          style={[styles.adminActionText, { color: "#ff4444" }]}
                        >
                          Remove from Group
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}

                <Pressable
                  style={styles.closeButton}
                  onPress={() => setShowMemberModal(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 24,
    gap: 8,
  },
  memberCard: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
  },
  memberDetails: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
  },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0ff",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 2,
  },
  adminText: {
    fontSize: 10,
    color: "#3a266e",
    fontWeight: "600",
  },
  memberStatus: {
    fontSize: 13,
    color: "#666",
  },
  memberActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  memberModal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalAvatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  modalOnlineIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "white",
  },
  modalMemberName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  modalMemberStatus: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  modalAdminBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3a266e",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  modalAdminText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  modalInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  modalActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  callButton: {
    backgroundColor: "#4CAF50",
  },
  messageButton: {
    backgroundColor: "#3a266e",
  },
  modalActionText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  adminActions: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 15,
    marginBottom: 15,
    gap: 10,
  },
  adminActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },
  adminActionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
});
