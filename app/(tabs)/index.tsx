import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import auth from "../../firebase/firebase";

const { width, height } = Dimensions.get("window");

const Index = () => {
  const router = useRouter();

  const [bgColor, setBgColor] = useState("#000");
  const [isSpinning, setIsSpinning] = useState(false);
  const [textColor] = useState("#39ff14");

  const spinAnim = useRef(new Animated.Value(0)).current;
  const flyPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const spinAnimRef = useRef<Animated.CompositeAnimation | null>(null);
  const isFlyingRef = useRef(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false); // Ny state för om musiken spelar

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const flyRotation = flyPosition.y.interpolate({
    inputRange: [0, height],
    outputRange: ["0deg", "720deg"],
  });

  const startSpin = () => {
    if (isSpinning) {
      spinAnimRef.current?.stop();
      spinAnimRef.current = null;
      setIsSpinning(false);
      return;
    }

    spinAnim.setValue(0);
    const spinAnimation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimRef.current = spinAnimation;
    spinAnimation.start();
    setIsSpinning(true);
  };

  useEffect(() => {
    const neonColors = [
      "#ffa500",
      "#ff00ff",
      "#00ffff",
      "#39ff14",
      "#ffff00",
      "#ff073a",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setBgColor(neonColors[i % neonColors.length]);
      i++;
    }, 500);

    // Ladda musik vid start, men spela inte ännu
    const loadMusic = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/music/musik.mp3")
        );
        soundRef.current = sound;
        await sound.setIsLoopingAsync(true);
      } catch (error) {
        console.error("Kunde inte ladda musik:", error);
      }
    };

    loadMusic();

    return () => {
      clearInterval(interval);
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Ny funktion för att spela upp musiken vid användarinteraktion
  const handlePlayMusic = async () => {
    if (soundRef.current && !musicPlaying) {
      try {
        await soundRef.current.playAsync();
        setMusicPlaying(true);
      } catch (error) {
        console.error("Kunde inte spela musik:", error);
      }
    }
  };

  const moveRocket = () => {
    if (!isFlyingRef.current) return;

    const randomX = Math.random() * (width - 60);
    const randomY = Math.random() * (height - 100);

    Animated.timing(flyPosition, {
      toValue: { x: randomX, y: randomY },
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      moveRocket();
    });
  };

  const startFlyLoop = () => {
    if (isFlyingRef.current) return;
    isFlyingRef.current = true;
    moveRocket();
  };

  const handleLogout = async () => {
    try {
      if (soundRef.current) await soundRef.current.stopAsync();
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.Text
        onPress={startFlyLoop}
        style={[
          styles.flyingIcon,
          {
            transform: [
              { translateX: flyPosition.x },
              { translateY: flyPosition.y },
              { rotate: flyRotation },
            ],
            opacity: 0.9,
          },
        ]}
      >
        🐸
      </Animated.Text>

      <Animated.Text
        onPress={startSpin}
        style={[
          styles.spinningText,
          { color: textColor, transform: [{ rotate: spin }] },
        ]}
      >
        🐸 VÄLKOMMEN TILL Alva och Sophies sida 🐸
      </Animated.Text>

      <Pressable
        onPress={() => {
          const neonColors = [
            "#ff00ff",
            "#00ffff",
            "#39ff14",
            "#ff073a",
            "#ffff00",
            "#ff6ec7",
          ];
          setBgColor(neonColors[Math.floor(Math.random() * neonColors.length)]);
          startSpin();
          handlePlayMusic();
        }}
        style={styles.weirdBox}
      >
        <Text style={styles.weirdText}>TRYCK HÄR</Text>
      </Pressable>

      <Button title="🫣 LOGGA UT" onPress={handleLogout} color="#ff00ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#000",
  },
  spinningText: {
    fontSize: 28,
    fontWeight: "900",
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#00FF00",
    textAlign: "center",
    letterSpacing: 2,
    fontFamily: "Courier New",
    textShadowColor: "#ff00ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  weirdBox: {
    backgroundColor: "#ff00ff",
    borderWidth: 3,
    borderColor: "#00ffff",
    padding: 25,
    borderRadius: 5,
  },
  weirdText: {
    color: "#00ffff",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    textShadowColor: "#ff00ff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: "center",
  },
  flyingIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    fontSize: 50,
    zIndex: 10,
  },
});

export default Index;
