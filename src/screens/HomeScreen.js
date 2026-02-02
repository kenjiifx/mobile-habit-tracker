import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  FadeInUp,
  BounceIn,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { colors, gradients } from '../theme/colors';
import { fonts, fontSizes } from '../theme/fonts';
import {
  loadHabits,
  saveCompletion,
  removeCompletion,
  isHabitCompletedOnDate,
  loadCompletions,
} from '../utils/storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [todayDate, setTodayDate] = useState(new Date());

  const loadData = async () => {
    const loadedHabits = await loadHabits();
    const loadedCompletions = await loadCompletions();
    setHabits(loadedHabits);
    setCompletions(loadedCompletions);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleToggleHabit = async (habitId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const isCompleted = await isHabitCompletedOnDate(habitId, todayDate);
    
    if (isCompleted) {
      await removeCompletion(habitId, todayDate);
    } else {
      await saveCompletion(habitId, todayDate);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    await loadData();
  };

  const getTodayProgress = () => {
    if (habits.length === 0) return 0;
    const todayKey = todayDate.toISOString().split('T')[0];
    const completed = habits.filter(habit => 
      completions[habit.id]?.includes(todayKey)
    ).length;
    return Math.round((completed / habits.length) * 100);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={styles.gradient}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
            <View>
              <Text style={styles.greeting}>{getGreeting()}!</Text>
              <Text style={styles.subtitle}>Let's build great habits today</Text>
            </View>
            <TouchableOpacity
              style={styles.progressButton}
              onPress={() => navigation.navigate('Progress')}
            >
              <Ionicons name="stats-chart" size={24} color={colors.white} />
            </TouchableOpacity>
          </Animated.View>

          {/* Today's Progress Card */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.progressCard}
            >
              <View style={styles.progressContent}>
                <Text style={styles.progressLabel}>Today's Progress</Text>
                <Text style={styles.progressValue}>{getTodayProgress()}%</Text>
                <Text style={styles.progressSubtext}>
                  {habits.filter(h => completions[h.id]?.includes(todayDate.toISOString().split('T')[0])).length} of {habits.length} habits completed
                </Text>
              </View>
              <View style={styles.progressRing}>
                <Ionicons name="flame" size={40} color={colors.white} />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Habits List */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Habits</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddHabit')}
                style={styles.addButton}
              >
                <Ionicons name="add-circle" size={28} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {habits.length === 0 ? (
              <Animated.View entering={BounceIn} style={styles.emptyState}>
                <Ionicons name="leaf-outline" size={80} color={colors.textTertiary} />
                <Text style={styles.emptyTitle}>No habits yet</Text>
                <Text style={styles.emptyText}>
                  Start building better habits by adding your first one!
                </Text>
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => navigation.navigate('AddHabit')}
                >
                  <LinearGradient
                    colors={gradients.primary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.emptyButtonGradient}
                  >
                    <Ionicons name="add" size={24} color={colors.white} />
                    <Text style={styles.emptyButtonText}>Add Your First Habit</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ) : (
              habits.map((habit, index) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  index={index}
                  completed={completions[habit.id]?.includes(todayDate.toISOString().split('T')[0])}
                  onToggle={() => handleToggleHabit(habit.id)}
                  onPress={() => navigation.navigate('HabitDetail', { habitId: habit.id })}
                />
              ))
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const HabitCard = ({ habit, index, completed, onToggle, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onToggle();
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={animatedStyle}
    >
      <TouchableOpacity
        style={[styles.habitCard, completed && styles.habitCardCompleted]}
        onPress={handlePress}
        onLongPress={onPress}
        activeOpacity={0.9}
      >
        <BlurView intensity={completed ? 40 : 20} style={styles.habitBlur}>
          <View style={styles.habitContent}>
            <View style={[styles.iconCircle, { backgroundColor: habit.color + '20' }]}>
              <Ionicons name={habit.icon} size={28} color={habit.color} />
            </View>
            
            <View style={styles.habitInfo}>
              <Text style={[styles.habitName, completed && styles.habitNameCompleted]}>
                {habit.name}
              </Text>
              {habit.description && (
                <Text style={styles.habitDescription}>{habit.description}</Text>
              )}
            </View>

            <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
              {completed && (
                <Ionicons name="checkmark" size={24} color={colors.white} />
              )}
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
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
  greeting: {
    fontSize: fontSizes.xxxl,
    fontFamily: fonts.poppins.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontFamily: fonts.inter.regular,
    color: colors.textSecondary,
    marginTop: 4,
  },
  progressButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  progressContent: {
    flex: 1,
  },
  progressLabel: {
    fontSize: fontSizes.md,
    fontFamily: fonts.inter.medium,
    color: colors.white,
    opacity: 0.9,
  },
  progressValue: {
    fontSize: fontSizes.massive,
    fontFamily: fonts.poppins.bold,
    color: colors.white,
    marginVertical: 8,
  },
  progressSubtext: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.inter.regular,
    color: colors.white,
    opacity: 0.8,
  },
  progressRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.poppins.semiBold,
    color: colors.textPrimary,
  },
  addButton: {
    padding: 4,
  },
  habitCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.backgroundCard,
  },
  habitCardCompleted: {
    opacity: 0.8,
  },
  habitBlur: {
    padding: 20,
  },
  habitContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.poppins.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  habitNameCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  habitDescription: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.inter.regular,
    color: colors.textSecondary,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.poppins.semiBold,
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.inter.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  emptyButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 10,
  },
  emptyButtonText: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.poppins.semiBold,
    color: colors.white,
  },
});

export default HomeScreen;
