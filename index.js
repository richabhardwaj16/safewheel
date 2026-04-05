// app/index.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Animated, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Animations
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;

  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;

  // Shutter
  const shutterRadius = useRef(new Animated.Value(0)).current;

  // Particles
  const numParticles = 12;
  const particles = Array.from({ length: numParticles }).map(() => ({
    x: new Animated.Value(Math.random() * 220 - 110),
    y: new Animated.Value(Math.random() * 220 - 110),
    opacity: new Animated.Value(Math.random()),
  }));

  useEffect(() => {
    // Open shutter
    Animated.timing(shutterRadius, {
      toValue: Math.max(width, height),
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Sequence for logo + title + tagline
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        // Title animation
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        // Tagline animation
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 1200,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 1200,
          delay: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Particle floating animation
    particles.forEach((p, idx) => {
      const animateParticle = () => {
        Animated.sequence([
          Animated.timing(p.x, {
            toValue: Math.random() * 220 - 110,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(p.y, {
            toValue: Math.random() * 220 - 110,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ]).start(() => animateParticle());
        Animated.sequence([
          Animated.timing(p.opacity, {
            toValue: Math.random(),
            duration: 1500 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ]).start();
      };
      animateParticle();
    });

    // After 6s → fade out + close shutter → navigate
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(taglineOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Close shutter
        Animated.timing(shutterRadius, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }).start(() => {
          router.replace("/login");
        });
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#232526", "#414345"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.shutter,
          {
            borderRadius: shutterRadius,
            width: shutterRadius.interpolate({
              inputRange: [0, Math.max(width, height)],
              outputRange: [0, Math.max(width, height) * 2],
            }),
            height: shutterRadius.interpolate({
              inputRange: [0, Math.max(width, height)],
              outputRange: [0, Math.max(width, height) * 2],
            }),
          },
        ]}
      />

      <View style={styles.centerContent}>
        {/* Particles */}
        {particles.map((p, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                opacity: p.opacity,
                transform: [{ translateX: p.x }, { translateY: p.y }],
              },
            ]}
          />
        ))}

        {/* Logo */}
        <Animated.Image
          source={require("../assets/images/logo.png")}
          style={[styles.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
          resizeMode="contain"
        />

        {/* Title */}
        <Animated.Text
          style={[
            styles.title,
            { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] },
          ]}
        >
          SafeWheel
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: taglineOpacity,
              transform: [{ translateY: taglineTranslateY }],
            },
          ]}
        >
          When your eyes grow heavy, our SafeWheel keeps you awake.
        </Animated.Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shutter: {
    position: "absolute",
    top: height / 2,
    left: width / 2,
    backgroundColor: "#232526",
    transform: [{ translateX: -width / 2 }, { translateY: -height / 2 }],
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#C0C0C0",
    marginBottom: 8,
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.1,
    shadowRadius: 20,

  },
  tagline: {
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  particle: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#AAAAAA", // changed from blue to grey
  },
});
