import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, BounceIn } from 'react-native-reanimated';
import { colors, gradients } from '../theme/colors';
import { fonts, fontSizes } from '../theme/fonts';
import { loadHabits, saveHabits } from '../utils/storage';

const HABIT_ICONS = [
  'fitness', 'book', 'water', 'bed', 'restaurant', 'musical-notes',
  'bicycle', 'leaf', 'heart', 'sunny', 'moon', 'star',
  'flame', 'flower', 'sparkles', 'telescope'
];

const HABIT_COLORS = [
  colors.primary, colors.secondary, colors.accent, colors.accentOrange,
  colors.accentGreen, colors.accentYellow, colors.success, '#FF6B9D',
  '#9775FA', '#FF8787', '#51CF66', '#FFA94D'
];

const AddHabitScreen = ({ navigation }) => {
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('fitness');
  const [selectedColor, setSelectedColor] = useState(colors.primary);

  const handleSaveHabit = async () => {
    if (!habitName.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    const newHabit = {
      id: Date.now().toString(),
      name: habitName.trim(),
      description: habitDescription.trim(),
      icon: selectedIcon,
      color: selectedColor,
      createdAt: new Date().toISOString(),
    };

    const habits = await loadHabits();
    await saveHabits([...habits, newHabit]);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={styles.gradient}
      >
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Habit</Text>
          <View style={{ width: 40 }} />
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Preview Card */}
          <Animated.View entering={BounceIn.delay(200)} style={styles.previewCard}>
            <View style={[styles.previewIcon, { backgroundColor: selectedColor + '20' }]}>
              <Ionicons name={selectedIcon} size={48} color={selectedColor} />
            </View>
            <Text style={styles.previewName}>
              {habitName || 'Your Habit Name'}
            </Text>
            {habitDescription ? (
              <Text style={styles.previewDescription}>{habitDescription}</Text>
            ) : null}
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Habit Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Morning Exercise"
                placeholderTextColor={colors.textTertiary}
                value={habitName}
                onChangeText={setHabitName}
                maxLength={50}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add a note about your habit..."
                placeholderTextColor={colors.textTertiary}
                value={habitDescription}
                onChangeText={setHabitDescription}
                multiline
                numberOfLines={3}
                maxLength={150}
              />
            </View>

            {/* Icon Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Choose an Icon</Text>
              <View style={styles.iconGrid}>
                {HABIT_ICONS.map((icon, index) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      selectedIcon === icon && styles.iconOptionSelected,
                      { backgroundColor: selectedColor + '20' }
                    ]}
                    onPress={() => {
                      setSelectedIcon(icon);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    <Ionicons
                      name={icon}
                      size={28}
                      color={selectedIcon === icon ? selectedColor : colors.textSecondary}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Color Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Choose a Color</Text>
              <View style={styles.colorGrid}>
                {HABIT_COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.colorOptionSelected,
                    ]}
                    onPress={() => {
                      setSelectedColor(color);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    {selectedColor === color && (
                      <Ionicons name="checkmark" size={20} color={colors.white} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        {/* Save Button */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveHabit}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveButtonGradient}
            >
              <Ionicons name="checkmark-circle" size={24} color={colors.white} />
              <Text style={styles.saveButtonText}>Create Habit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.poppins.bold,
    color: colors.textPrimary,
  },
  previewCard: {
    marginHorizontal: 24,
    marginBottom: 30,
    padding: 30,
    borderRadius: 24,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
  },
  previewIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  previewName: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.poppins.semiBold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: fontSizes.md,
    fontFamily: fonts.inter.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 28,
  },
  label: {
    fontSize: fontSizes.md,
    fontFamily: fonts.poppins.semiBold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.backgroundInput,
    borderRadius: 16,
    padding: 18,
    fontSize: fontSizes.lg,
    fontFamily: fonts.inter.regular,
    color: colors.textPrimary,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconOption: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: colors.white,
    transform: [{ scale: 1.1 }],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  saveButtonText: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.poppins.semiBold,
    color: colors.white,
  },
});

export default AddHabitScreen;
