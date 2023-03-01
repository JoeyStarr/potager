import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Toast Notification
import { ToastProvider } from "react-native-toast-notifications";

// Redux
import { Provider } from "react-redux";
import { store } from "./store/store";

// Firebase
import "./config/firebase";

// Root Navigation
import RootNavigation from "./navigation/Stack";

// Async Storage - OnBoard;
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Mynerve-Regular": require("./assets/fonts/Mynerve-Regular.ttf"),
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.

      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ToastProvider
        style={{ flex: 1, width: "100%" }}
        renderType={{
          custom_toast: (toast) => (
            <View
              style={{
                maxWidth: "90%",
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#fff",
                marginVertical: 4,
                borderRadius: 8,
                borderLeftColor: "#00C851",
                borderLeftWidth: 6,
                justifyContent: "center",
                paddingLeft: 16,
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                {toast.data.title}
              </Text>
              <Text style={{ color: "#a3a3a3", marginTop: 2 }}>
                {toast.message}
              </Text>
            </View>
          ),
        }}
      >
        <View style={styles.container} onLayout={onLayoutRootView}>
          <RootNavigation />
        </View>
      </ToastProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
