import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../appText";

interface VendorCardProps {
  logo: string;
  name: string;
  branches: number;
  distance: number;
}

function VendorCard({ logo, name, branches, distance }: VendorCardProps) {
  return (
    <View style={styles.vendorCard}>
      <Image
        source={{ uri: logo }}
        style={styles.vendorLogo}
        resizeMode="contain"
      />
      <View style={styles.vendorInfo}>
        <AppText fontWeight="semi-bold" style={styles.vendorName}>
          {name}
        </AppText>
        <AppText style={styles.vendorDetails}>
          {branches} branches • {distance} km away
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vendorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  vendorLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  vendorDetails: {
    fontSize: 12,
    color: "#777",
  },
});

export default VendorCard;
