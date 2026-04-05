// app/register.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// Particle setup
const PARTICLE_COUNT = 20;
const createParticles = () =>
  Array.from({ length: PARTICLE_COUNT }).map(() => ({
    x: Math.random() * 120 - 60,
    y: Math.random() * 80 - 40,
    size: Math.random() * 4 + 2,
    anim: new Animated.Value(Math.random() * 100),
  }));

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const logoAnim = useRef(new Animated.Value(0)).current;
  const inputsAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const socialAnim = useRef(new Animated.Value(0)).current;

  const particles = useRef(createParticles()).current;

  useEffect(() => {
    // Logo float
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnim, { toValue: -5, duration: 1000, useNativeDriver: true }),
        Animated.timing(logoAnim, { toValue: 5, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // Sequential fade-in
    Animated.stagger(200, [
      Animated.timing(inputsAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(buttonAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(socialAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();

    // Particle animation
    particles.forEach((p) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(p.anim, { toValue: -80, duration: 4000 + Math.random() * 2000, useNativeDriver: true }),
          Animated.timing(p.anim, { toValue: 80, duration: 4000 + Math.random() * 2000, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  const handleRegister = () => {
    setError("");
    if (!agreeTerms) {
      setError("You must agree to Terms & Conditions.");
      return;
    }
    if (!fullName || !emailOrPhone || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Registration Successful!");
    }, 1500);
  };

  return (
    <LinearGradient colors={["#232526", "#414345"]} style={styles.container}>
      {/* Particles */}
      <View style={styles.particleContainer}>
        {particles.map((p, idx) => (
          <Animated.View
            key={idx}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: "#414141",
              transform: [{ translateX: p.x }, { translateY: Animated.add(p.anim, p.y) }],
            }}
          />
        ))}
      </View>

      {/* Logo */}
      <Animated.Image
        source={require("../assets/images/logo.png")}
        style={[styles.logo, { transform: [{ translateY: logoAnim }] }]}
        resizeMode="contain"
      />
      <Text style={styles.appName}>SafeWheel</Text>
      <Text style={styles.screenTitle}>Create Account</Text>

      {/* Inputs */}
      <Animated.View style={{ opacity: inputsAnim, width: "100%" }}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#696969"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Email or Phone Number"
          placeholderTextColor="#696969"
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#696969"
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 8 }}>
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#696969"
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirm}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={{ padding: 8 }}>
            <Ionicons name={showConfirm ? "eye" : "eye-off"} size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.rememberMe} onPress={() => setAgreeTerms(!agreeTerms)}>
            <Ionicons name={agreeTerms ? "checkbox" : "square-outline"} size={20} color="#708090" />
            <Text style={styles.rememberText}>I agree to Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </Animated.View>

      {/* Register Button */}
      <Animated.View style={{ opacity: buttonAnim, width: "100%" }}>
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister} activeOpacity={0.8} disabled={loading}>
          {loading ? <ActivityIndicator color="#232526" /> : <Text style={styles.loginButtonText}>Sign Up</Text>}
        </TouchableOpacity>
      </Animated.View>

      {/* Already have account */}
      <Animated.View style={{ opacity: buttonAnim }}>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Social Sign Up */}
      <Animated.View style={{ opacity: socialAnim, width: "100%" }}>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Sign up with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Sign up with Apple</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, justifyContent: "center" },
  particleContainer: { position: "absolute", top: "30%", left: "50%", width: 0, height: 0 },
  logo: { width: 80, height: 80, marginBottom: 8 },
  appName: { fontSize: 24, fontWeight: "700", color: "#708090", marginBottom: 8, textShadowColor: "rgba(112,128,144,0.5)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  screenTitle: { fontSize: 20, fontWeight: "600", color: "#fff", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "#3a3a3a", color: "#fff", paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 4, elevation: 2 },
  passwordWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#3a3a3a", borderRadius: 12, marginBottom: 12 },
  optionsRow: { flexDirection: "row", justifyContent: "flex-start", marginBottom: 12 },
  rememberMe: { flexDirection: "row", alignItems: "center" },
  rememberText: { color: "#fff", marginLeft: 6 },
  errorText: { color: "#FF6B6B", marginBottom: 10 },
  loginButton: { width: "100%", backgroundColor: "#708090", paddingVertical: 15, borderRadius: 12, alignItems: "center", marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5, elevation: 3 },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  signUpText: { color: "#fff", marginBottom: 20, textAlign: "center" },
  socialRow: { flexDirection: "column", width: "100%" },
  socialButton: { paddingVertical: 12, borderRadius: 12, backgroundColor: "#333", alignItems: "center", marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 3, elevation: 2 },
  socialText: { color: "#fff", fontWeight: "600" },
});