import React, { useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  StyleSheet,
  Text,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Easing,
} from "react-native";
import auth from "../../firebase/firebase";

const Profile = () => {
  const router = useRouter();
  const image = {
    uri: "https://i.pinimg.com/originals/de/05/c3/de05c375cd0c20ed4b5157fe361b5c8e.gif",
  };

  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -10,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 10,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Navigera till login");
      router.replace("/login");
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };

  return (
    <ImageBackground source={image} style={styles.container}>
      <Animated.Text
        style={[styles.floatingText, { transform: [{ translateY: moveAnim }] }]}
      >
        Dina favoritsaker: the last of us, göra så att dina elever blir
        miljonbelopp skyldiga till firebase, kaffe, Graveyard, få skjuts med
        familjehushållets bil, undervisa UXF24
      </Animated.Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logga ut</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingText: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 6,
    marginBottom: 20,
  },
  logoutButton: {
    paddingVertical: 200,
    paddingHorizontal: 140,
    borderWidth: 10,
    borderColor: "red",
    backgroundColor: "transparent",
  },
  logoutText: {
    color: "red",
    fontSize: 6,
  },
});

export default Profile;
