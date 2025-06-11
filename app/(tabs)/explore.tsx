import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "../../firebase/firebase";

const Explore = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Navigera till login");
      router.replace("/login");
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };

  const generateRandomPhone = () => {
    const prefixes = ["070", "072", "073", "076", "079"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const middle = Math.floor(1000000 + Math.random() * 9000000).toString();
    const randomPhone = prefix + middle;
    setPhone(randomPhone);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/shek.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.label}>Är detta ditt nummer?</Text>

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Telefonnummer"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={generateRandomPhone}>
          <Text style={styles.buttonText}>Slumpa nummer</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.choiceButton, styles.green]}
            onPress={() => alert("Du tryckte JA")}
          >
            <Text style={styles.choiceText}>Ja</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceButton, styles.red]}
            onPress={() => alert("Du tryckte NEJ")}
          >
            <Text style={styles.choiceText}>Nej</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logga ut</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  label: {
    fontSize: 20,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    width: "100%",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  choiceButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  green: {
    backgroundColor: "#28a745",
  },
  red: {
    backgroundColor: "#dc3545",
  },
  choiceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Explore;
