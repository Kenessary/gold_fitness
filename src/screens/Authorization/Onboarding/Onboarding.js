import { useState, useRef } from "react";
import { View, FlatList, Animated } from "react-native";

import onboardingData from "./onboardingData";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import LoginScreen from "../Login/LoginScreen";
import { onboardingStyle } from "./styles/onboardingStyles";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const [visible, setVisible] = useState(false);

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setVisible(true);
    }
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <View style={onboardingStyle.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <Paginator data={onboardingData} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / onboardingData.length)}
      />
      <LoginScreen
        visible={visible}
        toggleBottomNavigationView={toggleBottomNavigationView}
        setVisible={setVisible}
      />
    </View>
  );
}
