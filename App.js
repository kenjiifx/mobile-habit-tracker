import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
// import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import HabitDetailScreen from './src/screens/HabitDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  // Load custom fonts - UNCOMMENT after adding font files to assets/fonts/
  // const [fontsLoaded] = useFonts({
  //   'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  //   'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  //   'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  //   'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  //   'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  //   'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
  //   'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
  //   'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  // });

  useEffect(() => {
    async function prepare() {
      try {
        // Check if first launch
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        setIsFirstLaunch(hasLaunched === null);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // App is ready
  useEffect(() => {
    // Ready to go
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            gestureEnabled: true,
          }}
        >
          {isFirstLaunch && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddHabit" component={AddHabitScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
