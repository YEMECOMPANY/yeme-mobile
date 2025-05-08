import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AppText from "../appText";

const UserProfile = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const userData = {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    memberSince: "March 2023",
  };

  const handleGoBack = () => {
    router.back();
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <AppText style={styles.headerTitle} fontWeight="semi-bold">
          My Profile
        </AppText>
        <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
          <AppText style={styles.editButtonText}>
            {isEditing ? "Cancel" : "Edit"}
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.profileImageContainer}>
          <Ionicons name="person-circle-outline" size={120} color="#ccc" />
          {isEditing && (
            <TouchableOpacity style={styles.changePhotoButton}>
              <AppText style={styles.changePhotoText}>Change Photo</AppText>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoSection}>
          <AppText style={styles.sectionTitle} fontWeight="semi-bold">
            Personal Information
          </AppText>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Name</AppText>
            <AppText style={styles.infoValue} fontWeight="bold">
              {userData.name}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Email</AppText>
            <AppText style={styles.infoValue} fontWeight="bold">
              {userData.email}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Phone</AppText>
            <AppText style={styles.infoValue} fontWeight="bold">
              {userData.phone}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Location</AppText>
            <AppText style={styles.infoValue} fontWeight="bold">
              {userData.location}
            </AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.infoLabel}>Member Since</AppText>
            <AppText style={styles.infoValue} fontWeight="bold">
              {userData.memberSince}
            </AppText>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <AppText style={styles.sectionTitle} fontWeight="semi-bold">
            Account Settings
          </AppText>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="notifications-outline" size={22} color="#333" />
            <AppText style={styles.actionText}>
              Notification Preferences
            </AppText>
            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999"
              style={styles.actionArrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="lock-closed-outline" size={22} color="#333" />
            <AppText style={styles.actionText}>Privacy Settings</AppText>
            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999"
              style={styles.actionArrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card-outline" size={22} color="#333" />
            <AppText style={styles.actionText}>Payment Methods</AppText>
            <Ionicons
              name="chevron-forward"
              size={22}
              color="#999"
              style={styles.actionArrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            <AppText style={styles.logoutText}>Log Out</AppText>
          </TouchableOpacity>
        </View>

        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
          >
            <AppText style={styles.saveButtonText} fontWeight="bold">
              Save Changes
            </AppText>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: "#333",
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  changePhotoButton: {
    marginTop: 12,
  },
  changePhotoText: {
    color: "#007AFF",
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  actionsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    flex: 1,
  },
  actionArrow: {
    marginLeft: "auto",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    color: "#FF3B30",
    marginLeft: 12,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 32,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default UserProfile;
