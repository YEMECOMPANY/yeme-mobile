import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppText from "../appText";

const LoyaltyProgramDetailScreen = () => {
  const { program } = useLocalSearchParams();
  const router = useRouter();

  // Handle missing or invalid program param
  let parsedProgram;
  try {
    parsedProgram = program ? JSON.parse(program) : null;
  } catch (error) {
    console.error("Error parsing program param:", error);
    parsedProgram = null;
  }

  // Program-specific details mapping (updated for all 10 programs)
  const programDetails = {
    flybuys: {
      description:
        "Flybuys is one of Australia's most popular loyalty programs. Collect points when you shop at Coles, Liquorland, Kmart, Target, and more. Redeem your points for rewards, flights, or money off your shopping.",
      benefits: [
        "Earn 1 point per $1 spent at partner stores",
        "Bonus point offers regularly available",
        "Points can be converted to Velocity points",
        "Digital card available in the app",
      ],
      partnerWebsite: "https://www.flybuys.com.au",
    },
    velocity: {
      description:
        "Velocity Frequent Flyer is the award-winning loyalty program of Virgin Australia. Earn points on flights, hotels, car rentals, and everyday spending that you can redeem for rewards.",
      benefits: [
        "Earn Status Credits to unlock elite membership tiers",
        "Points never expire with eligible activity every 24 months",
        "Family pooling available to combine points",
        "Redeem for flights, upgrades, and merchandise",
      ],
      partnerWebsite: "https://www.velocityfrequentflyer.com",
    },
    qantas: {
      description:
        "Qantas Frequent Flyer allows you to earn Qantas Points when you fly, shop, dine, and more. Use your points for flights, upgrades, hotels, or choose from thousands of products in the Qantas Store.",
      benefits: [
        "Status Credits to earn Bronze, Silver, Gold or Platinum status",
        "Access to exclusive member deals",
        "Points Plus Pay options for flights",
        "Points Club for high point earners",
      ],
      partnerWebsite: "https://www.qantas.com/frequentflyer",
    },
    myer: {
      description:
        "MYER one rewards you every time you shop at Myer. Earn credit towards Myer gift cards, receive exclusive member offers, sale previews, and birthday treats.",
      benefits: [
        "$10 reward for every 2,000 points earned",
        "Exclusive member offers and discounts",
        "Birthday reward each year",
        "Access to VIP shopping events",
      ],
      partnerWebsite: "https://www.myer.com.au/myerone",
    },
    woolworths: {
      description:
        "Everyday Rewards helps you earn points on your shopping at Woolworths, BWS, and partner retailers. Redeem points for money off your shop or convert to Qantas Points.",
      benefits: [
        "1 point per $1 spent at Woolworths and BWS",
        "Personalized weekly specials",
        "Fuel discounts at participating stations",
        "Automatic digital receipts",
      ],
      partnerWebsite: "https://www.woolworthsrewards.com.au",
    },
    ikea: {
      description:
        "IKEA Family is a free loyalty program that gives you access to discounted products, special offers, free coffee or tea in the IKEA Restaurant, and much more.",
      benefits: [
        "Free coffee/tea in the IKEA Restaurant",
        "Member-only discounts on selected products",
        "Extended 90-day exchange policy",
        "Exclusive in-store events and workshops",
      ],
      partnerWebsite: "https://www.ikea.com/au/en/ikea-family/",
    },
    coles: {
      description:
        "Coles Rewards lets you earn points on your grocery shopping at Coles and affiliated stores. Redeem points for discounts or exclusive offers.",
      benefits: [
        "Earn 1 point per $1 spent at Coles",
        "Exclusive member discounts",
        "Redeem points for grocery vouchers",
        "Access to special promotions",
      ],
      partnerWebsite: "https://www.coles.com.au/rewards",
    },
    kmart: {
      description:
        "Kmart Rewards offers points for every purchase at Kmart stores. Use your points for discounts or special member benefits.",
      benefits: [
        "Earn points on every Kmart purchase",
        "Member-only sales events",
        "Redeem points for store credit",
        "Early access to new products",
      ],
      partnerWebsite: "https://www.kmart.com.au/rewards",
    },
    bunnings: {
      description:
        "Bunnings PowerPass provides exclusive discounts and benefits for frequent shoppers at Bunnings Warehouse.",
      benefits: [
        "Exclusive trade discounts",
        "Priority checkout for members",
        "Extended return policy",
        "Special order benefits",
      ],
      partnerWebsite: "https://www.bunnings.com.au/powerpass",
    },
    target: {
      description:
        "Target Club rewards you for shopping at Target with points that can be redeemed for discounts and exclusive offers.",
      benefits: [
        "Earn points on every Target purchase",
        "Exclusive member coupons",
        "Redeem points for gift cards",
        "Access to VIP shopping days",
      ],
      partnerWebsite: "https://www.target.com.au/club",
    },
  };

  // Get details for the selected program, with fallback if program is invalid
  const details =
    parsedProgram && programDetails[parsedProgram.id]
      ? programDetails[parsedProgram.id]
      : {
        description:
          "Information about this loyalty program will be coming soon.",
        benefits: ["Stay tuned for details about benefits and rewards."],
        partnerWebsite: "#",
      };

  // Fallback program data for rendering
  const displayProgram = parsedProgram || {
    name: "Unknown Program",
    logo: "❓",
    color: "#666",
  };

  const handleJoinProgram = () => {
    if (details.partnerWebsite !== "#") {
      Linking.openURL(details.partnerWebsite);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <AppText style={styles.headerTitle} fontWeight="bold">
          {displayProgram.name}
        </AppText>
      </View>

      <View
        style={[
          styles.programBanner,
          { backgroundColor: `${displayProgram.color}22` },
        ]}
      >
        <View
          style={[
            styles.logoContainer,
            { backgroundColor: displayProgram.color },
          ]}
        >
          <AppText style={styles.logoText}>{displayProgram.logo}</AppText>
        </View>
        <AppText
          style={[styles.programName, { color: displayProgram.color }]}
          fontWeight="bold"
        >
          {displayProgram.name}
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle} fontWeight="bold">
          About the Program
        </AppText>
        <AppText style={styles.descriptionText}>{details.description}</AppText>
      </View>

      <View style={styles.section}>
        <AppText style={styles.sectionTitle} fontWeight="bold">
          Key Benefits
        </AppText>
        {details.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Icon name="check-circle" size={20} color={displayProgram.color} />
            <AppText style={styles.benefitText}>{benefit}</AppText>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.joinButton, { backgroundColor: displayProgram.color }]}
        onPress={handleJoinProgram}
        disabled={details.partnerWebsite === "#"}
      >
        <AppText style={styles.joinButtonText} fontWeight="bold">
          Join {displayProgram.name}
        </AppText>
      </TouchableOpacity>

      <AppText style={styles.disclaimer}>
        * By tapping 'Join', you will be redirected to the partner's website
        where you can complete your registration. Terms and conditions apply.
      </AppText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16, // Standardized with other screens
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 16,
    color: "#333",
  },
  programBanner: {
    alignItems: "center",
    padding: 24,
    marginBottom: 16,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
  },
  programName: {
    fontSize: 24,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: "#333",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    color: "#444",
  },
  joinButton: {
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: "#666",
    paddingHorizontal: 16,
    marginBottom: 24,
    fontStyle: "italic",
  },
});

export default LoyaltyProgramDetailScreen;
