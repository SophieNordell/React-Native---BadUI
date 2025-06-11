import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../firebase/firebase";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <Stack>
      {!user ? (
        <Stack.Screen name="login" options={{ headerShown: true }} />
      ) : (
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
