import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { colors, gradients } from '../theme/colors';
import { fonts, fontSizes } from '../theme/fonts';
import { loadHabits, loadCompletions } from '../utils/storage';

const { width } = Dimensions.get('window');

const ProgressScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState({});
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const loadedHabits = await loadHabits();
    const loadedCompletions = await loadCompletions();
    setHabits(loadedHabits);
    setCompletions(loadedCompletions);
    calculateWeekData(loadedHabits, loadedCompletions);
  };

  const calculateWeekData = (habits, completions) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const dayName = days[date.getDay()];
      
      let completedCount = 0;
      habits.forEach(habit => {
        if (completions[habit.id]?.includes(dateKey)) {
          completedCount++;
        }
      });
      
      data.push({
        day: dayName,
        completed: completedCount,
        total: habits.length,
        percentage: habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0,
      });
    }
    
    setWeekData(data);
  };

  const getTotalStreak = () => {
    // Calculate longest current streak
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      let allCompleted = true;
      habits.forEach(habit => {
        if (!completions[habit.id]?.includes(dateKey)) {
          allCompleted = false;
        }
      });
      
      if (allCompleted && habits.length > 0) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getTotalCompletions = () => {
    let total = 0;
    Object.values(completions).forEach(dates => {
      total += dates.length;
    });
    return total;
  };

  const getHabitStreak = (habitId) => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      if (completions[habitId]?.includes(dateKey)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

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
          <Text style={styles.headerTitle}>Your Progress</Text>
          <View style={{ width: 40 }} />
        </Animated.View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <Animated.View entering={FadeInUp.delay(200)} style={styles.statCard}>
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
              >
                <Ionicons name="flame" size={32} color={colors.white} />
                <Text style={styles.statValue}>{getTotalStreak()}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </LinearGradient>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(300)} style={styles.statCard}>
              <LinearGradient
                colors={gradients.success}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
              >
                <Ionicons name="checkmark-circle" size={32} color={colors.white} />
                <Text style={styles.statValue}>{getTotalCompletions()}</Text>
                <Text style={styles.statLabel}>Total Completions</Text>
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Weekly Chart */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.chartContainer}>
            <Text style={styles.sectionTitle}>This Week</Text>
            {weekData.length > 0 && (
              <VictoryChart
                theme={VictoryTheme.material}
                height={250}
                width={width - 48}
                domainPadding={{ x: 20 }}
              >
                <VictoryAxis
                  style={{
                    axis: { stroke: 'transparent' },
                    tickLabels: {
                      fill: colors.textSecondary,
                      fontFamily: fonts.inter.medium,
                      fontSize: 12,
                    },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    axis: { stroke: 'transparent' },
                    tickLabels: { fill: 'transparent' },
                    grid: { stroke: colors.backgroundCard, strokeWidth: 1 },
                  }}
                />
                <VictoryBar
                  data={weekData}
                  x="day"
                  y="completed"
                  style={{
                    data: {
                      fill: colors.primary,
                      fillOpacity: 0.8,
                    },
                  }}
                  cornerRadius={{ top: 8 }}
                  barWidth={30}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 500 },
                  }}
                />
              </VictoryChart>
            )}
          </Animated.View>

          {/* Habit Breakdown */}
          <Animated.View entering={FadeInDown.delay(500)} style={styles.habitsSection}>
            <Text style={styles.sectionTitle}>Habits Breakdown</Text>
            {habits.map((habit, index) => (
              <Animated.View
                key={habit.id}
                entering={FadeInUp.delay(600 + index * 100)}
                style={styles.habitProgressCard}
              >
                <View style={styles.habitProgressHeader}>
                  <View style={[styles.habitIcon, { backgroundColor: habit.color + '20' }]}>
                    <Ionicons name={habit.icon} size={24} color={habit.color} />
                  </View>
                  <View style={styles.habitProgressInfo}>
                    <Text style={styles.habitProgressName}>{habit.name}</Text>
                    <Text style={styles.habitProgressStreak}>
                      🔥 {getHabitStreak(habit.id)} day streak
                    </Text>
                  </View>
                  <Text style={styles.habitProgressCount}>
                    {completions[habit.id]?.length || 0}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </Animated.View>

          {habits.length === 0 && (
            <Animated.View entering={FadeInDown.delay(400)} style={styles.emptyState}>
              <Ionicons name="bar-chart-outline" size={80} color={colors.textTertiary} />
              <Text style={styles.emptyTitle}>No data yet</Text>
              <Text style={styles.emptyText}>
                Start tracking habits to see your progress here!
              </Text>
            </Animated.View>
          )}
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
  headerTitle: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.poppins.bold,
    color: colors.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
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
  },
  chartContainer: {
    marginHorizontal: 24,
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard,
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.poppins.semiBold,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  habitsSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  habitProgressCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  habitProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  habitProgressInfo: {
    flex: 1,
  },
  habitProgressName: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.poppins.medium,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  habitProgressStreak: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.inter.regular,
    color: colors.textSecondary,
  },
  habitProgressCount: {
    fontSize: fontSizes.xxl,
    fontFamily: fonts.poppins.bold,
    color: colors.primary,
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
    paddingHorizontal: 40,
  },
});

export default ProgressScreen;
