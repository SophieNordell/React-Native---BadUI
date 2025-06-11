import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import auth from "../../firebase/firebase";

const Profile = () => {
  const router = useRouter();
  const image = {
    uri: "https://i.pinimg.com/originals/de/05/c3/de05c375cd0c20ed4b5157fe361b5c8e.gif",
  };

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
