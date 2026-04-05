# SafeWheel 🚗😴
AI-Based Driver Drowsiness Detection System

SafeWheel is an Artificial Intelligence powered system designed to detect driver fatigue and prevent road accidents.  
The application uses computer vision and machine learning techniques to monitor facial features such as eye closure and head movement in real-time.

The system helps improve road safety by alerting drivers when signs of drowsiness are detected.

---

## Features

- Real-time driver monitoring using webcam
- Detects eye closure and fatigue patterns
- Uses computer vision for facial feature analysis
- Provides alert when drowsiness is detected
- Helps reduce risk of road accidents
- Lightweight and efficient system

---

## Tech Stack

Programming Language:
- Python

Libraries:
- OpenCV
- NumPy
- dlib / mediapipe 
- TensorFlow / Keras 

Concepts:
- Machine Learning
- Computer Vision
- Image Processing
- Facial Landmark Detection

---

## How it Works

1. Webcam captures live video feed
2. Computer vision detects facial features
3. Eye movement and blink rate are analyzed
4. Machine learning model checks fatigue patterns
5. Alert is triggered when drowsiness is detected

---

## Project Structure

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
