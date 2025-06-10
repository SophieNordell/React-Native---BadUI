import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/onboarding");
    } catch (error: any) {
      Alert.alert("Inloggningsfel", error.message);
      setErrorMessage("Fel E-mail eller lösenord");
    }
  };

  const handleRegister = async () => {
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Lösenorden matchar inte");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/onboarding");
    } catch (error: any) {
      Alert.alert("Registreringsfel", error.message);
      setErrorMessage("Fel vid registrering, försök igen.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          {isRegistering ? "Registrera dig" : "Logga in"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-post"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Lösenord"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        {isRegistering && (
          <TextInput
            style={styles.input}
            placeholder="Bekräfta lösenord"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        )}

        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={isRegistering ? handleRegister : handleLogin}
        >
          <Text style={styles.buttonText}>
            {isRegistering ? "Registrera" : "Logga in"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setErrorMessage("");
            setIsRegistering(!isRegistering);
          }}
        >
          <Text style={styles.switchText}>
            {isRegistering
              ? "Har du redan ett konto? Logga in här"
              : "Är du inte medlem? Registrera dig här"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  switchText: {
    marginTop: 20,
    textAlign: "center",
    color: "#007bff",
    fontWeight: "500",
  },
});

export default Login;
