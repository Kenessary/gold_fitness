// import { FontAwesome } from "@expo/vector-icons"; // Corrected import
// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Image,
//   ScrollView,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { getAllNews } from "../../../News/api";
// import { MaterialIndicator } from "react-native-indicators";
// import { Text } from "react-native";

// const { width: screenWidth } = Dimensions.get("window");

// const CarouselItem = ({ item }) => {
//   return (
//     <View style={styles.carouselItem}>
//       <Image
//         source={{ uri: `data:image/png;base64,${item}` }}
//         style={styles.image}
//       />
//       <Text style={{ color: "white" }}>Kenessary</Text>
//     </View>
//   );
// };

// const ImageCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [news, setNews] = useState("");

//   // console.log(news);
//   const scrollViewRef = useRef(null);

//   useEffect(() => {
//     getAllNews(setIsLoading, setNews);
//   }, []);

//   const carouselData = [
//     {
//       image: require("../../../../../assets/carousel/im1.png"),
//       discount: "Получите 20% скидку на абонементы",
//     },
//     {
//       image: require("../../../../../assets/carousel/im2.png"),
//       discount: "Получите 20% скидку на абонементы",
//     },
//     {
//       image: require("../../../../../assets/carousel/im3.png"),
//       discount: "Получите 20% скидку на абонементы",
//     },
//     {
//       image: require("../../../../../assets/carousel/im4.png"),
//       discount: "Получите 20% скидку на абонементы",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       slideToNext();
//     }, 10000);
//     return () => clearInterval(interval);
//   }, [activeIndex]);

//   const slideToNext = () => {
//     let nextIndex = activeIndex + 1;
//     if (nextIndex >= news.length) {
//       nextIndex = 0;
//     }
//     scrollViewRef.current.scrollTo({
//       x: nextIndex * screenWidth,
//       animated: true,
//     });
//     setTimeout(() => setActiveIndex(nextIndex), 300); // Delay state update to sync with scroll animation
//   };

//   const slideToPrev = () => {
//     let prevIndex = activeIndex - 1;
//     if (prevIndex < 0) {
//       prevIndex = news.length - 1;
//     }
//     scrollViewRef.current.scrollTo({
//       x: prevIndex * screenWidth,
//       animated: true,
//     });
//     setTimeout(() => setActiveIndex(prevIndex), 300); // Delay state update to sync with scroll animation
//   };

//   const onScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(scrollPosition / screenWidth);
//     setActiveIndex(currentIndex);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.carouselContainer}>
//         {isLoading ? (
//           <MaterialIndicator color="#BC994A" />
//         ) : (
//           <>
//             <ScrollView
//               ref={scrollViewRef}
//               horizontal
//               pagingEnabled
//               showsHorizontalScrollIndicator={false}
//               onScroll={onScroll}
//               scrollEventThrottle={16}
//               contentContainerStyle={styles.scrollViewContent}
//             >
//               {news &&
//                 news.map((item, index) => (
//                   <CarouselItem item={item.photo} key={index} />
//                 ))}
//             </ScrollView>
//             <TouchableOpacity
//               style={[styles.arrow, styles.leftArrow]}
//               onPress={slideToPrev}
//             >
//               <FontAwesome name="caret-left" size={24} color="#BC994A" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.arrow, styles.rightArrow]}
//               onPress={slideToNext}
//             >
//               <FontAwesome name="caret-right" size={24} color="#BC994A" />
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//       <View style={styles.pagination}>
//         {news &&
//           news.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.paginationDot,
//                 activeIndex === index ? styles.activeDot : styles.inactiveDot,
//               ]}
//             />
//           ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   carouselContainer: {
//     height: 200,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//     width: "100%",
//     alignSelf: "center",
//   },
//   carouselItem: {
//     width: screenWidth * 1,
//     alignItems: "center",
//   },
//   image: {
//     width: "95%",
//     height: 200,
//     borderRadius: 25,
//   },
//   pagination: {
//     flexDirection: "row",
//     marginTop: 5,
//   },
//   paginationDot: {
//     height: 3,
//     width: 20,
//     borderRadius: 5,
//     margin: 3,
//   },
//   activeDot: {
//     backgroundColor: "#BC994A",
//   },
//   inactiveDot: {
//     backgroundColor: "gray",
//   },
//   arrow: {
//     position: "absolute",
//     top: "50%",
//     marginTop: -20,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     height: 40,
//     width: 30,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1,
//   },
//   leftArrow: {
//     left: 10,
//   },
//   rightArrow: {
//     right: 10,
//   },
//   scrollViewContent: {
//     alignItems: "center",
//   },
// });

// export default ImageCarousel;

import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAllNews } from "../../../News/api";
import { MaterialIndicator } from "react-native-indicators";
import { Text } from "react-native";
import { textStyles } from "../../../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const CarouselItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => navigation.navigate("OneNewForMainPage", { item })}
    >
      <Image
        source={{ uri: `data:image/png;base64,${item.photo}` }}
        style={styles.image}
      />
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: 15,
          position: "absolute",
          bottom: 10,
          // left: 10,
          width: screenWidth * 0.9,
          padding: 5,
        }}
      >
        <Text style={{ ...textStyles.bold18pxWhite, ...styles.text }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState("");

  const scrollViewRef = useRef(null);

  useEffect(() => {
    getAllNews(setIsLoading, setNews);
  }, []);

  const carouselData = [
    {
      image: require("../../../../../assets/carousel/im1.png"),
      discount: "Получите 20% скидку на абонементы",
    },
    {
      image: require("../../../../../assets/carousel/im2.png"),
      discount: "Получите 20% скидку на абонементы",
    },
    {
      image: require("../../../../../assets/carousel/im3.png"),
      discount: "Получите 20% скидку на абонементы",
    },
    {
      image: require("../../../../../assets/carousel/im4.png"),
      discount: "Получите 20% скидку на абонементы",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      slideToNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const slideToNext = () => {
    let nextIndex = activeIndex + 1;
    if (nextIndex >= news.length) {
      nextIndex = 0;
    }
    scrollViewRef.current.scrollTo({
      x: nextIndex * screenWidth,
      animated: true,
    });
    setTimeout(() => setActiveIndex(nextIndex), 300); // Delay state update to sync with scroll animation
  };

  const slideToPrev = () => {
    let prevIndex = activeIndex - 1;
    if (prevIndex < 0) {
      prevIndex = news.length - 1;
    }
    scrollViewRef.current.scrollTo({
      x: prevIndex * screenWidth,
      animated: true,
    });
    setTimeout(() => setActiveIndex(prevIndex), 300); // Delay state update to sync with scroll animation
  };

  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / screenWidth);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {isLoading ? (
          <MaterialIndicator color="#BC994A" />
        ) : (
          <>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.scrollViewContent}
            >
              {news &&
                news.map((item, index) => (
                  <CarouselItem item={item} key={index} />
                ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.arrow, styles.leftArrow]}
              onPress={slideToPrev}
            >
              <FontAwesome name="caret-left" size={24} color="#BC994A" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.arrow, styles.rightArrow]}
              onPress={slideToNext}
            >
              <FontAwesome name="caret-right" size={24} color="#BC994A" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.pagination}>
        {news &&
          news.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    alignSelf: "center",
  },
  carouselItem: {
    width: screenWidth * 1,
    alignItems: "center",
    position: "relative", // Added to enable absolute positioning for the text
  },
  image: {
    width: "95%",
    height: 200,
    borderRadius: 25,
  },
  text: {
    color: "white",

    padding: 5,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 5,
  },
  paginationDot: {
    height: 3,
    width: 20,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor: "#BC994A",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    marginTop: -20,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 40,
    width: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  scrollViewContent: {
    alignItems: "center",
  },
});

export default ImageCarousel;
