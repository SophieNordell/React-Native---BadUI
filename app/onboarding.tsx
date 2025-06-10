import React from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
// @ts-ignore
import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Onboarding
      onSkip={() => router.replace("/(tabs)")}
      onDone={() => router.replace("/(tabs)")}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/images/alice-icon.png")} />,
          title: "Välkommen!",
          subtitle: "En snabb introduktion till appen.",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../assets/images/alice-icon.png")} />,
          title: "Utforska",
          subtitle: "Hitta saker att göra!",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/images/alice-icon.png")} />,
          title: "Kom igång",
          subtitle: 'Tryck "Klar" för att börja!',
        },
      ]}
    />
  );
}
