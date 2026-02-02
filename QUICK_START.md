# ⚡ Quick Start Guide

Get Habit Flow running in under 10 minutes!

## Prerequisites Check ✅

Run these commands to verify you have what you need:

```bash
node --version    # Should be v14 or higher
npm --version     # Should be 6 or higher
```

If either command fails, install Node.js from: https://nodejs.org/

## Installation (5 Steps)

### 1. Navigate to Project
```bash
cd "d:\Coding Projects\Mobile Habit Tracker (Prototype)"
```

### 2. Install Dependencies
```bash
npm install
```
⏱️ Takes 2-5 minutes

### 3. Install Expo CLI
```bash
npm install -g expo-cli
```

### 4. Add Fonts (REQUIRED)

**Quick method:**

1. Visit https://fonts.google.com/specimen/Poppins
2. Click "Download family"
3. Extract and copy these 4 files to `assets/fonts/`:
   - Poppins-Bold.ttf
   - Poppins-SemiBold.ttf
   - Poppins-Medium.ttf
   - Poppins-Regular.ttf

4. Visit https://fonts.google.com/specimen/Inter
5. Click "Download family"
6. Extract and copy these 4 files to `assets/fonts/`:
   - Inter-Bold.ttf
   - Inter-SemiBold.ttf
   - Inter-Medium.ttf
   - Inter-Regular.ttf

**You should have 8 .ttf files in `assets/fonts/`**

See `FONTS_README.md` for detailed instructions.

### 5. Start the App
```bash
npm start
```

## Running on Your Phone

**Easiest Method:**

1. Install "Expo Go" app from App Store or Play Store
2. Make sure your phone and computer are on the same Wi-Fi
3. Scan the QR code that appears in your terminal/browser
4. Wait 30-60 seconds for app to load

## Testing the App

Once loaded, you should see:

✅ Beautiful onboarding screens with purple/blue gradients  
✅ Custom icons and smooth animations  
✅ "Get Started" button with gradient  

Then:

1. Tap "Get Started"
2. Tap the "+" button to add a habit
3. Create a habit named "Test Habit"
4. Select any icon and color
5. Tap "Create Habit"
6. Mark it complete by tapping the habit card
7. See the success animation and haptic feedback! 🎉

## Troubleshooting

### "Unable to resolve module" error?
```bash
rm -rf node_modules
npm install
expo start -c
```

### Font errors?
- Make sure all 8 .ttf files are in `assets/fonts/`
- Restart with cache clear: `expo start -c`

### Can't connect on phone?
```bash
expo start --tunnel
```

## What's Next?

Explore the app:
- Create multiple habits
- Mark them complete
- View the Progress screen (stats icon in header)
- Long-press a habit to see details
- Try different icons and colors

## Need More Help?

- 📖 Full installation guide: `INSTALLATION.md`
- 🎨 Feature details: `FEATURES_SHOWCASE.md`
- 🔧 Project overview: `PROJECT_OVERVIEW.md`
- 📋 Main documentation: `README.md`

## Common Commands

```bash
# Start with cache clear
expo start -c

# Start on Android emulator
expo start --android

# Start on iOS simulator (Mac only)
expo start --ios

# Start on web browser
expo start --web
```

---

**You're all set!** Enjoy using Habit Flow! 🎯✨
