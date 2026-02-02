import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { colors, gradients } from '../theme/colors';
import { fonts, fontSizes } from '../theme/fonts';
import { loadHabits, saveHabits, loadCompletions } from '../utils/storage';

const HabitDetailScreen = ({ navigation, route }) => {
  const { habitId } = route.params;
  const [habit, setHabit] = useState(null);
  const [completions, setCompletions] = useState([]);

  useEffect(() => {
    loadHabitData();
  }, []);

  const loadHabitData = async () => {
    const habits = await loadHabits();
    const foundHabit = habits.find(h => h.id === habitId);
    setHabit(foundHabit);

    const allCompletions = await loadCompletions();
    const habitCompletions = allCompletions[habitId] || [];
    setCompletions(habitCompletions);
  };

  const handleDeleteHabit = () => {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const habits = await loadHabits();
            const updatedHabits = habits.filter(h => h.id !== habitId);
            await saveHabits(updatedHabits);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const getStreak = () => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      if (completions.includes(dateKey)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getBestStreak = () => {
    if (completions.length === 0) return 0;
    
    const sortedDates = [...completions].sort();
    let currentStreak = 1;
    let bestStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const dayDiff = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    
    return bestStreak;
  };

  const getCompletionRate = () => {
    if (completions.length === 0) return 0;
    
    const createdDate = new Date(habit.createdAt);
    const today = new Date();
    const daysSinceCreation = Math.ceil((today - createdDate) / (1000 * 60 * 60 * 24)) + 1;
    
    return Math.round((completions.length / daysSinceCreation) * 100);
  };

  if (!habit) {
    return null;
  }

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Habit Details</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteHabit}
          >
            <Ionicons name="trash-outline" size={22} color={colors.error} />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Habit Info Card */}
          <Animated.View entering={FadeInUp.delay(200)} style={styles.infoCard}>
            <View style={[styles.habitIconLarge, { backgroundColor: habit.color + '20' }]}>
              <Ionicons name={habit.icon} size={64} color={habit.color} />
            </View>
            <Text style={styles.habitName}>{habit.name}</Text>
            {habit.description && (
              <Text style={styles.habitDescription}>{habit.description}</Text>
            )}
          </Animated.View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <Animated.View entering={FadeInUp.delay(300)}>
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statBox}
              >
                <Ionicons name="flame" size={32} color={colors.white} />
                <Text style={styles.statValue}>{getStreak()}</Text>
                <Text style={styles.statLabel}>Current Streak</Text>
              </LinearGradient>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400)}>
              <LinearGradient
                colors={gradients.success}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statBox}
              >
                <Ionicons name="trophy" size={32} color={colors.white} />
                <Text style={styles.statValue}>{getBestStreak()}</Text>
                <Text style={styles.statLabel}>Best Streak</Text>
              </LinearGradient>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(500)}>
              <LinearGradient
                colors={gradients.accent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statBox}
              >
                <Ionicons name="checkmark-done" size={32} color={colors.white} />
                <Text style={styles.statValue}>{completions.length}</Text>
                <Text style={styles.statLabel}>Total Completions</Text>
              </LinearGradient>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(600)}>
              <LinearGradient
                colors={gradients.warm}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statBox}
              >
                <Ionicons name="speedometer" size={32} color={colors.white} />
                <Text style={styles.statValue}>{getCompletionRate()}%</Text>
                <Text style={styles.statLabel}>Completion Rate</Text>
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Recent History */}
          <Animated.View entering={FadeInDown.delay(700)} style={styles.historySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {completions.length === 0 ? (
              <View style={styles.emptyHistory}>
                <Ionicons name="calendar-outline" size={48} color={colors.textTertiary} />
                <Text style={styles.emptyText}>No completions yet</Text>
                <Text style={styles.emptySubtext}>
                  Complete this habit to see your activity here
                </Text>
              </View>
            ) : (
              <View style={styles.historyList}>
                {[...completions]
                  .sort((a, b) => new Date(b) - new Date(a))
                  .slice(0, 10)
                  .map((date, index) => (
                    <Animated.View
                      key={date}
                      entering={FadeInUp.delay(800 + index * 50)}
                      style={styles.historyItem}
                    >
                      <View style={styles.historyIcon}>
                        <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                      </View>
                      <Text style={styles.historyDate}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </Text>
                    </Animated.View>
                  ))}
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </View>
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
  deleteButton: {
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
  infoCard: {
    marginHorizontal: 24,
    marginBottom: 30,
    padding: 30,
    borderRadius: 24,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
  },
  habitIconLarge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  habitName: {
    fontSize: fontSizes.xxxl,
    fontFamily: fonts.poppins.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  habitDescription: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.inter.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 30,
  },
  statBox: {
    width: '47%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSizes.huge,
    fontFamily: fonts.poppins.bold,
    color: colors.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.inter.medium,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
    textAlign: 'center',
  },
  historySection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.poppins.semiBold,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  emptyHistory: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.poppins.medium,
    color: colors.textSecondary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: fontSizes.md,
    fontFamily: fonts.inter.regular,
    color: colors.textTertiary,
    marginTop: 8,
    textAlign: 'center',
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    padding: 16,
    borderRadius: 16,
  },
  historyIcon: {
    marginRight: 12,
  },
  historyDate: {
    flex: 1,
    fontSize: fontSizes.md,
    fontFamily: fonts.inter.medium,
    color: colors.textPrimary,
  },
});

export default HabitDetailScreen;
