# 📝 Font Setup Instructions

This app uses custom fonts for the best visual experience. You need to download and add these fonts to the project before running the app.

## Required Fonts

### 1. Poppins Font Family
Download from: https://fonts.google.com/specimen/Poppins

**Required weights:**
- Poppins-Bold.ttf (700)
- Poppins-SemiBold.ttf (600)
- Poppins-Medium.ttf (500)
- Poppins-Regular.ttf (400)

### 2. Inter Font Family
Download from: https://fonts.google.com/specimen/Inter

**Required weights:**
- Inter-Bold.ttf (700)
- Inter-SemiBold.ttf (600)
- Inter-Medium.ttf (500)
- Inter-Regular.ttf (400)

## Installation Steps

1. **Create the fonts directory:**
   ```
   assets/fonts/
   ```

2. **Download fonts:**
   - Visit the Google Fonts links above
   - Click "Download family" button
   - Extract the downloaded ZIP files

3. **Copy font files:**
   Copy the following 8 TTF files to `assets/fonts/`:
   - Poppins-Bold.ttf
   - Poppins-SemiBold.ttf
   - Poppins-Medium.ttf
   - Poppins-Regular.ttf
   - Inter-Bold.ttf
   - Inter-SemiBold.ttf
   - Inter-Medium.ttf
   - Inter-Regular.ttf

4. **Verify structure:**
   ```
   Mobile Habit Tracker (Prototype)/
   ├── assets/
   │   └── fonts/
   │       ├── Poppins-Bold.ttf
   │       ├── Poppins-SemiBold.ttf
   │       ├── Poppins-Medium.ttf
   │       ├── Poppins-Regular.ttf
   │       ├── Inter-Bold.ttf
   │       ├── Inter-SemiBold.ttf
   │       ├── Inter-Medium.ttf
   │       └── Inter-Regular.ttf
   ```

5. **Clear cache and restart:**
   ```bash
   expo start -c
   ```

## Alternative: Use System Fonts (Not Recommended)

If you want to test without custom fonts, you can temporarily modify `src/theme/fonts.js` to use system fonts:

```javascript
export const fonts = {
  poppins: {
    bold: 'System',
    semiBold: 'System',
    medium: 'System',
    regular: 'System',
  },
  inter: {
    bold: 'System',
    semiBold: 'System',
    medium: 'System',
    regular: 'System',
  },
};
```

However, this will significantly impact the app's visual design. Custom fonts are highly recommended for the intended experience.

## Troubleshooting

### Fonts not loading?
1. Make sure filenames match exactly (case-sensitive)
2. Clear Expo cache: `expo start -c`
3. Check that files are in the correct directory
4. Restart the development server

### "Unable to resolve" error?
- The font files might be missing
- Check the file paths in `App.js`
- Ensure all 8 font files are present

## Font Usage in the App

- **Poppins**: Used for headings, titles, and buttons (bold, attention-grabbing)
- **Inter**: Used for body text, descriptions, and labels (clean, readable)

These fonts were chosen for their modern appearance, excellent readability on mobile screens, and professional look.
