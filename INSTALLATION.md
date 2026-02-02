# 🚀 Installation & Setup Guide

Complete guide to get the Habit Flow app running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify npm: `npm --version`
   - Or install yarn: `npm install -g yarn`

3. **Expo CLI**
   ```bash
   npm install -g expo-cli
   ```
   - Verify: `expo --version`

4. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### For Testing on Physical Device

- **Expo Go app** on your smartphone
  - iOS: Download from App Store
  - Android: Download from Google Play Store

### For Testing on Emulator/Simulator (Optional)

- **Android Studio** (for Android emulator)
  - Download from: https://developer.android.com/studio
  
- **Xcode** (for iOS simulator - Mac only)
  - Download from Mac App Store

## Step-by-Step Installation

### Step 1: Navigate to Project Directory

```bash
cd "d:\Coding Projects\Mobile Habit Tracker (Prototype)"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native
- Expo SDK
- React Navigation
- Reanimated
- And all other dependencies

**Expected duration:** 2-5 minutes depending on internet speed

### Step 3: Download and Add Custom Fonts

**This step is REQUIRED for the app to work properly.**

1. **Create the fonts directory** (if not exists):
   ```
   assets/fonts/
   ```

2. **Download Poppins font:**
   - Visit: https://fonts.google.com/specimen/Poppins
   - Click "Download family"
   - Extract the ZIP file
   - Copy these files to `assets/fonts/`:
     - `Poppins-Bold.ttf`
     - `Poppins-SemiBold.ttf`
     - `Poppins-Medium.ttf`
     - `Poppins-Regular.ttf`

3. **Download Inter font:**
   - Visit: https://fonts.google.com/specimen/Inter
   - Click "Download family"
   - Extract the ZIP file
   - Copy these files to `assets/fonts/`:
     - `Inter-Bold.ttf`
     - `Inter-SemiBold.ttf`
     - `Inter-Medium.ttf`
     - `Inter-Regular.ttf`

4. **Verify font files:**
   You should have exactly 8 `.ttf` files in `assets/fonts/`

   See `FONTS_README.md` for detailed font setup instructions.

### Step 4: Create App Icons (Optional)

For the best experience, create custom icons:

1. **App Icon** (`assets/icon.png`):
   - Size: 1024x1024 pixels
   - Should match the app's purple/blue theme

2. **Splash Screen** (`assets/splash.png`):
   - Size: 1242x2436 pixels
   - Background color: #6C5CE7 (purple)

3. **Android Adaptive Icon** (`assets/adaptive-icon.png`):
   - Size: 1024x1024 pixels

4. **Favicon** (`assets/favicon.png`):
   - Size: 48x48 pixels

*Note: The app will work without custom icons, using Expo defaults*

### Step 5: Start the Development Server

```bash
npm start
```

Or with Expo CLI:
```bash
expo start
```

This will:
1. Start the Metro bundler
2. Open a browser window with QR code
3. Show options to run on different platforms

**Alternative commands:**
```bash
# Start with cache clearing (if you encounter issues)
expo start -c

# Start in LAN mode (for device testing)
expo start --lan

# Start in tunnel mode (if LAN doesn't work)
expo start --tunnel
```

## Running the App

### Option 1: On Your Physical Device (Recommended)

1. **Install Expo Go** on your phone (if not already installed)
   - iOS: App Store → Search "Expo Go"
   - Android: Play Store → Search "Expo Go"

2. **Connect to the same Wi-Fi** network as your computer

3. **Scan the QR code**:
   - iOS: Open Camera app → Point at QR code → Tap notification
   - Android: Open Expo Go → Tap "Scan QR Code" → Point at code

4. **Wait for the app to load** (first load may take 1-2 minutes)

### Option 2: On Android Emulator

1. **Start Android Studio**
2. **Open AVD Manager** (Virtual Device Manager)
3. **Start an emulator**
4. **In the terminal**, press `a` when Expo is running

### Option 3: On iOS Simulator (Mac only)

1. **Open Xcode**
2. **In the terminal**, press `i` when Expo is running
3. **Wait for simulator to launch**

### Option 4: On Web Browser

```bash
expo start --web
```

Or press `w` when Expo is running

*Note: Some features may not work perfectly on web (e.g., haptic feedback)*

## Verification & Testing

Once the app loads, you should see:

1. **Onboarding Screens** (first launch):
   - 3 animated slides
   - Purple/blue gradients
   - Custom icons and fonts

2. **Home Screen**:
   - "Good Morning/Afternoon/Evening" greeting
   - Progress card with gradient
   - Empty state prompting to add habits

3. **Try creating a habit**:
   - Tap the "+" button
   - Enter habit name
   - Select an icon and color
   - Create habit

4. **Test interactions**:
   - Mark habit as complete (should see animation)
   - View progress screen
   - Check habit details

## Troubleshooting

### "Unable to resolve module" errors

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start -c
```

### Font loading errors

- Ensure all 8 font files are in `assets/fonts/`
- Check that filenames match exactly (case-sensitive)
- Restart with cache clear: `expo start -c`

### "Network error" or can't connect on device

1. **Check Wi-Fi**: Ensure device and computer are on same network
2. **Try LAN mode**: `expo start --lan`
3. **Try tunnel mode**: `expo start --tunnel`
4. **Check firewall**: Ensure Metro bundler port (19000) isn't blocked

### App crashes on startup

1. Check console for errors
2. Ensure all dependencies are installed: `npm install`
3. Clear cache: `expo start -c`
4. Check Node.js version: `node --version` (should be v14+)

### Performance issues

- Try running on a physical device instead of emulator
- Close other running apps
- Restart the Metro bundler

### "Expo Go" vs "Development Build"

This app is designed to run in **Expo Go** (managed workflow). If you modify native code or add custom native modules, you'll need to create a development build.

## Development Tips

### Hot Reloading

- The app automatically reloads when you save changes
- Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android) for developer menu

### Debugging

1. **React Developer Tools**:
   ```bash
   npm install -g react-devtools
   react-devtools
   ```

2. **Console logs**: Check terminal for `console.log()` outputs

3. **Debug mode**: Press `d` in the Expo CLI to toggle debug mode

### Code Structure

```
src/
├── screens/        # All app screens
├── theme/          # Colors, fonts, styling
└── utils/          # Helper functions, storage
```

## Next Steps

After successful installation:

1. ✅ Explore the onboarding flow
2. ✅ Create your first habit
3. ✅ Mark it complete and see animations
4. ✅ Check the progress screen
5. ✅ Customize habit icons and colors
6. ✅ View detailed habit statistics

## Building for Production

### For Testing (APK/IPA)

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

### For Store Submission

Follow Expo's deployment guide:
https://docs.expo.dev/distribution/introduction/

## Additional Resources

- **Expo Documentation**: https://docs.expo.dev/
- **React Native Docs**: https://reactnavigation.org/
- **React Navigation**: https://reactnavigation.org/

## Need Help?

If you encounter issues:

1. Check the error message carefully
2. Search the error on Google or Stack Overflow
3. Check Expo forums: https://forums.expo.dev/
4. Review the `README.md` for feature documentation

---

**Congratulations!** 🎉 You're now ready to use Habit Flow and build amazing habits!
