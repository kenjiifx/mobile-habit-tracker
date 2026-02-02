import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = '@habits';
const COMPLETIONS_KEY = '@completions';
const ONBOARDING_KEY = '@hasLaunched';

// Habit Storage
export const saveHabits = async (habits) => {
  try {
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
  }
};

export const loadHabits = async () => {
  try {
    const habits = await AsyncStorage.getItem(HABITS_KEY);
    return habits ? JSON.parse(habits) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

// Completion Storage (date-based tracking)
export const saveCompletion = async (habitId, date) => {
  try {
    const completions = await loadCompletions();
    const dateKey = date.toISOString().split('T')[0];
    
    if (!completions[habitId]) {
      completions[habitId] = [];
    }
    
    if (!completions[habitId].includes(dateKey)) {
      completions[habitId].push(dateKey);
      await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
    }
  } catch (error) {
    console.error('Error saving completion:', error);
  }
};

export const removeCompletion = async (habitId, date) => {
  try {
    const completions = await loadCompletions();
    const dateKey = date.toISOString().split('T')[0];
    
    if (completions[habitId]) {
      completions[habitId] = completions[habitId].filter(d => d !== dateKey);
      await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
    }
  } catch (error) {
    console.error('Error removing completion:', error);
  }
};

export const loadCompletions = async () => {
  try {
    const completions = await AsyncStorage.getItem(COMPLETIONS_KEY);
    return completions ? JSON.parse(completions) : {};
  } catch (error) {
    console.error('Error loading completions:', error);
    return {};
  }
};

export const isHabitCompletedOnDate = async (habitId, date) => {
  try {
    const completions = await loadCompletions();
    const dateKey = date.toISOString().split('T')[0];
    return completions[habitId]?.includes(dateKey) || false;
  } catch (error) {
    console.error('Error checking completion:', error);
    return false;
  }
};

// Onboarding
export const setOnboardingComplete = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.error('Error setting onboarding:', error);
  }
};

export const hasCompletedOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value !== null;
  } catch (error) {
    console.error('Error checking onboarding:', error);
    return false;
  }
};
