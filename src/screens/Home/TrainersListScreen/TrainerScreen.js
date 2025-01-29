import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { TouchableOpacity } from "react-native";
import { textStyles } from "../../../styles/globalStyles";
import { Text } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIndicator } from "react-native-indicators";
import axios from "axios";
import { profileScreen } from "../../Profile/styles/profileStyle";

// Import the local video file
// const videoSource = require("../../../../assets/trainersvideo/sultan.mp4");

const TrainerScreen = ({ route }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log(videoLink);

  const videoSource = {
    uri: videoLink[0], // Replace with your video URL
  };
  useEffect(() => {
    getTrainer();
  }, []);

  const getTrainer = () => {
    setIsLoading(true);
    const config = {
      method: "get",
      url: `https://portmaster.kz/api/fitness/v1/getTrainersVideos?phone_number=${route.params.trainer.NomerTel}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        let info = response.data;
        setVideoLink(info);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  if (isLoading) {
    return (
      <View style={profileScreen.loaderContainer}>
        <MaterialIndicator color="#BC994A" />
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={{
            width: "90%",
            height: "100%",
            aspectRatio: Platform.OS === "android" && 20 / 9,
          }}
          source={videoSource}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          videoStyle={{
            width: "90%",
            alignItems: "center",
            height: "100%",
          }}
        />
        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={togglePlayback}
        >
          <TouchableOpacity
            onPress={togglePlayback}
            style={{
              //   backgroundColor: "#F5EEDD",
              width: 80,
              height: 80,
              borderRadius: 90,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPlaying ? (
              <MaterialCommunityIcons name="pause" size={50} color="#C69D3E" />
            ) : (
              <Entypo name="controller-play" size={50} color="#C69D3E" />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        <Text style={textStyles.regular14pxWhite}>
          {route.params.trainer.Doljnost}
        </Text>
        <Text style={{ ...textStyles.bold22pxWhite, marginTop: 5 }}>
          {route.params.trainer.LastName} {route.params.trainer.Name}
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:+77059719220`)}
            style={{
              width: "100%",
              paddingVertical: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#CFA953",
              borderRadius: 20,
              marginTop: 20,
            }}
          >
            <Text style={textStyles.bold20pxWhite}>Записаться</Text>
          </TouchableOpacity>
        </View>
        {/* Add any content you want inside this view */}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    color: "#CFA953",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#202226",
    height: "100%",
  },
  videoContainer: {
    width: "80%",
    height: "78%",
    // overflow: "hidden",
    zIndex: 4,
    alignItems: "center",
  },
  // video: {
  //   width: "100%",
  //   height: "100%",
  //   aspectRatio: Platform.OS === "android" && 16 / 9,
  // },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "rgba(188, 153, 74, 0.3)",
    borderRadius: 100,
    padding: 5,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    width: "100%",
    height: "30%",
    backgroundColor: "#393C43",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    // alignItems: "center",
    // justifyContent: "center",
    zIndex: 2,
  },
});

export default TrainerScreen;
