import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import AppText from "../appText";

interface CarouselItem {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
}

interface CarouselBannerProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onItemPress?: (item: CarouselItem) => void;
}

const BANNER_ITEMS: CarouselItem[] = [
  {
    id: "1",
    image: require("../../../assets/images/rewards1.png"),
    title: "Join Our Loyalty Program",
    description: "Earn YEMs with every purchase",
  },
  {
    id: "2",
    image: require("../../../assets/images/rewards2.png"),
    title: "New Summer Menu",
    description: "Fresh flavors for the season",
  },
  {
    id: "3",
    image: require("../../../assets/images/rewards3.png"),
    title: "Refer a Friend",
    description: "Get 500 YEMs for each referral",
  },
];

const { width: screenWidth } = Dimensions.get("window");
const ITEM_WIDTH = screenWidth - 40; // Account for horizontal margin

const CarouselBanner = ({
  autoPlay = true,
  autoPlayInterval = 3000,
  onItemPress,
}: CarouselBannerProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoPlay) {
      intervalId = setInterval(() => {
        if (activeIndex === BANNER_ITEMS.length - 1) {
          scrollToIndex(0);
        } else {
          scrollToIndex(activeIndex + 1);
        }
      }, autoPlayInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [activeIndex, autoPlay, autoPlayInterval]);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * ITEM_WIDTH,
        animated: true,
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / ITEM_WIDTH);

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleItemPress = (item: CarouselItem) => {
    if (onItemPress) {
      onItemPress(item);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        {BANNER_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.9}
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.textOverlay}>
              <AppText fontWeight="bold" style={styles.title}>
                {item.title}
              </AppText>
              <AppText style={styles.description}>{item.description}</AppText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination indicators */}
      <View style={styles.paginationContainer}>
        {BANNER_ITEMS.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.activePaginationDot,
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(53, 32, 105, 0.7)",
    padding: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: "#352069",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default CarouselBanner;
