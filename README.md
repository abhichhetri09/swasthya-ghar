# AarogyaCare - Health Companion App

A React Native mobile application built with Expo, featuring dark/light mode and multi-language support (English, Finnish, and Nepali).

## Features

- 🌙 **Dark/Light Mode**: Toggle between dark and light themes with persistent storage
- 🌍 **Multi-language Support**: Switch between English and Finnish languages
- 🎨 **Modern UI**: Built with Tailwind CSS (NativeWind) for beautiful, responsive design
- 📱 **Cross-platform**: Works on both iOS and Android
- ⚡ **Fast Development**: Built with Expo for rapid development and easy deployment

## Tech Stack

- **React Native** with **Expo**
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS for React Native)
- **AsyncStorage** for persistent data storage
- **React Context** for state management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AarogyaCare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS (requires macOS)
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── locales/            # Translation files
│   ├── en.ts
│   └── fi.ts
├── screens/            # App screens
│   └── HomeScreen.tsx
└── utils/              # Utility functions
    └── translations.ts
```

## Features in Detail

### Theme Management
- Automatic theme persistence using AsyncStorage
- Smooth transitions between light and dark modes
- Theme-aware components that adapt to the current theme

### Language Support
- Support for English (en) and Finnish (fi)
- Persistent language selection
- Easy to add more languages by extending the translation files

### UI Components
- Modern, responsive design using Tailwind CSS
- Consistent theming across all components
- Touch-friendly interface optimized for mobile

## Adding New Languages

To add a new language:

1. Create a new translation file in `src/locales/` (e.g., `de.ts`)
2. Add the language to the `Language` type in `src/utils/translations.ts`
3. Update the language selector in `HomeScreen.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@aarogyacare.com or create an issue in the repository.
