# 🎯 Habit Flow - Mobile Habit Tracker

A beautiful, interactive mobile habit tracking application built with React Native. Track your daily habits with stunning animations, vibrant colors, and an intuitive user experience.

## ✨ Features

### 🎨 Beautiful Design
- **Custom Color Palette**: Vibrant gradients with purple, blue, and accent colors
- **Modern Typography**: Custom Poppins and Inter fonts
- **Smooth Animations**: React Native Reanimated for fluid transitions
- **Dark Theme**: Eye-friendly dark mode design

### 📱 Core Functionality
- **Onboarding Flow**: Engaging introduction with animated slides
- **Habit Management**: Create, track, and delete habits
- **Daily Check-ins**: Mark habits complete with satisfying animations
- **Progress Tracking**: Visual charts and statistics
- **Streak Tracking**: Monitor your consistency with streak counters
- **Habit Details**: In-depth view of each habit's performance

### 🎭 User Experience
- **Haptic Feedback**: Physical feedback for interactions
- **Micro-interactions**: Delightful animations throughout
- **Intuitive Navigation**: Smooth transitions between screens
- **Custom Icons**: Choose from 16+ beautiful icons
- **Color Customization**: Personalize habits with 12+ colors

## 🏗️ Project Structure

```
Mobile Habit Tracker (Prototype)/
├── src/
│   ├── screens/
│   │   ├── OnboardingScreen.js      # Animated onboarding flow
│   │   ├── HomeScreen.js             # Main habit list & daily check-ins
│   │   ├── AddHabitScreen.js         # Create new habits
│   │   ├── ProgressScreen.js         # Statistics & charts
│   │   └── HabitDetailScreen.js      # Individual habit details
│   ├── theme/
│   │   ├── colors.js                 # Color palette & gradients
│   │   └── fonts.js                  # Typography configuration
│   └── utils/
│       └── storage.js                # AsyncStorage data management
├── assets/
│   └── fonts/                        # Custom font files
├── App.js                            # Main app component & navigation
├── app.json                          # Expo configuration
├── package.json                      # Dependencies
└── babel.config.js                   # Babel configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repository**
   ```bash
   cd "d:\Coding Projects\Mobile Habit Tracker (Prototype)"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add font files**
   Download and place these fonts in the `assets/fonts/` directory:
   - Poppins (Bold, SemiBold, Medium, Regular)
   - Inter (Bold, SemiBold, Medium, Regular)
   
   You can download them from [Google Fonts](https://fonts.google.com/).

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on your device**
   - Install the Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📦 Dependencies

- **expo**: Framework for React Native
- **react-native**: Mobile framework
- **react-navigation**: Navigation library
- **react-native-reanimated**: Advanced animations
- **expo-linear-gradient**: Gradient backgrounds
- **expo-haptics**: Haptic feedback
- **expo-blur**: Blur effects
- **victory-native**: Charts and data visualization
- **@react-native-async-storage/async-storage**: Local data persistence

## 🎨 Design Highlights

### Color Palette
- **Primary**: Purple to Blue gradient (#6C5CE7 → #00D2FF)
- **Success**: Vibrant green (#20E3B2)
- **Accent**: Pink to Orange gradient (#FF6B9D → #FFA94D)
- **Background**: Deep dark blues (#0A0E27, #141936)

### Animations
- Fade-in effects for screen transitions
- Bounce animations for interactive elements
- Spring physics for natural motion
- Haptic feedback for tactile responses

### Typography
- **Headings**: Poppins (Bold, SemiBold)
- **Body**: Inter (Regular, Medium)
- Optimized for mobile readability

## 📱 Screens

### 1. Onboarding
- 3-slide introduction
- Animated pagination dots
- Skip or continue options
- Gradient backgrounds

### 2. Home Screen
- Today's progress card
- Habit list with check-off functionality
- Quick navigation to progress
- Empty state guidance

### 3. Add Habit
- Live preview card
- Icon selection grid (16 icons)
- Color picker (12 colors)
- Name and description input

### 4. Progress Screen
- Weekly completion chart
- Streak counter
- Total completions
- Per-habit breakdown

### 5. Habit Detail
- Detailed statistics
- Current & best streaks
- Completion rate
- Activity history

## 🔄 Data Management

The app uses AsyncStorage for local data persistence:
- **Habits**: Stored with ID, name, description, icon, color
- **Completions**: Date-based tracking per habit
- **Onboarding**: First-launch flag

All data persists across app sessions and is automatically loaded on startup.

## 🎯 Key Features Implementation

### Habit Tracking
```javascript
// Toggle habit completion with haptic feedback
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
```

### Animations
```javascript
// Smooth enter animations with delays
<Animated.View entering={FadeInUp.delay(index * 100)}>
  <HabitCard habit={habit} />
</Animated.View>
```

## 🌟 Future Enhancements

Potential features for future development:
- Push notifications & reminders
- Multiple check-ins per day
- Categories & tags
- Social sharing
- Cloud sync
- Widgets
- Apple Watch / Wear OS support
- Export data functionality

## 📄 License

This project is created as a prototype for educational purposes.

## 👨‍💻 Author

Built with ❤️ as a portfolio project showcasing modern React Native development practices.

---

**Note**: This is a prototype application. Font files need to be manually added to the `assets/fonts/` directory before running the app.
