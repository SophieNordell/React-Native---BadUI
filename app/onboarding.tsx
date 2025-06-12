import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
// @ts-ignore
import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen() {
  const router = useRouter();

  const GifImage = ({ uri }: { uri: string }) => (
    <ImageBackground
      source={{ uri }}
      resizeMode="cover"
      style={styles.gifContainer}
    ></ImageBackground>
  );

  return (
    <Onboarding
      onSkip={() => router.replace("/(tabs)")}
      onDone={() => router.replace("/(tabs)")}
      pages={[
        {
          backgroundColor: "#000",
          image: (
            <GifImage uri="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Rotating_earth_%28large%29.gif/250px-Rotating_earth_%28large%29.gif" />
          ),
          title: "Den här gifen säger mer än tusen ord",
        },
        {
          backgroundColor: "#222",
          image: (
            <GifImage uri="https://www.icegif.com/wp-content/uploads/2023/08/icegif-564.gif" />
          ),
          title: "Den här gifen säger mer än tusen ord",
        },
        {
          backgroundColor: "#111",
          image: (
            <GifImage uri="https://media.tenor.com/A3z9MU9YTBQAAAAM/salad-mix.gif" />
          ),
          title: "Den här gifen säger mer än tusen ord",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  gifContainer: {
    width: 400,
    height: 300,
    justifyContent: "center",
  },
});
