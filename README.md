# Pit Stop

## App Description
The Pit Stop application is designed for Formula 1 enthusiasts, aiming to deliver the latest and most comprehensive information about the sport. With Formula 1 gaining immense popularity in recent years, Pit Stop serves as a centralized platform for fans to access all necessary information, including race results, standings, circuit details, and more.

## App Features
- Racing calendar showcasing all races in a year.
- Detailed information for each circuit featured in the racing calendar.
- Map integration displaying the location of circuits and providing a car route from the user's location.
- User location acquisition feature.
- Display of results from the latest qualifying or race, as well as previous races or qualifying sessions.
- Current driver and team championship standings.
- Detailed profiles for drivers and teams in the championship standings.
- Camera functionality allowing users to capture event photos, which are automatically uploaded to Cloudinary.
- Display of all event images from Cloudinary uploaded by users.
- Custom UI elements enhancing the user experience.
- State management.
- Folder-based routing using React Navigation.
- Integration with a backend Spring Boot Application and the Ergast API for fetching relevant data.

## Design Patterns
The Pit Stop application implements various design patterns to ensure a seamless user experience:
- Navigation: Utilizes tab and stack-based navigation for navigating between different screens.
- Component-Based Architecture: Separates UI elements into reusable components for improved maintainability.
- Conditional Rendering: Dynamically adjusts component appearance based on context, such as rendering race times or qualifying times in the results card component.
- State Management with Hooks: Manages component state using React's useState hook, enabling behavior alteration based on state changes.

## Installation
To install the application:
1. Ensure Node.js is installed on your computer.
2. Run `npm install` in Visual Studio Code terminal to install all dependencies.

## Running
To run the application:
1. Run `npm start` in the Visual Studio Code terminal.
2. To test the application on your device, install "Expo Go" from Google Play and scan the QR code displayed in the terminal.
3. Alternatively, to test the app on an emulator, press "a" in the terminal to run on your Android emulator. For instructions on installing and running an Android emulator, visit [Expo's documentation](https://docs.expo.dev/workflow/android-studio-emulator/).