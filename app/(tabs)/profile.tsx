import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Button, StyleSheet, Text, View, ImageBackground } from "react-native";
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
      <Text style={styles.text}>Hej där! </Text>
      <Button title="Logga ut" onPress={handleLogout} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 8,
  },
});

export default Profile;
