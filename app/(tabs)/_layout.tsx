import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform } from "react-native";

const DonkeyIcon = () => (
  <Image
    source={require("../../assets/images/åsnan2.jpg")}
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />
);
const ShekIcon = () => (
  <Image
    source={require("../../assets/images/shek.jpg")}
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />
);

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: DonkeyIcon,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ShekIcon,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/profilepic.jpg")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
