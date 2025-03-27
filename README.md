# 🌌 DIY Particle Detector

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-react-native-web&project-name=with-react-native-web&repository-name=with-react-native-web)

A React Native mobile application built with Expo that connects to an OWON VDS1022 oscilloscope via WebSocket to display real-time data and send notifications when thresholds are exceeded.

## ✨ Features

- 📊 **Real-time Data Visualization**: Connect to your oscilloscope via WebSocket and visualize RMS data from two channels with beautiful line charts.
- 🔔 **Threshold Notifications**: Get push notifications when measurements exceed your defined thresholds.
- 💾 **Persistent Settings**: All configuration is stored locally and persists between app restarts.
- 🌙 **Dark Mode Support**: Automatically adapts to your device's color scheme preference.

## 📸 Screenshots

<div style="display: flex; justify-content: space-around; align-items: center;">
    <img src="/assets/images/index.png" alt="Index Screen" style="width: 45%; border: 1px solid #ccc; border-radius: 8px;" />
    <img src="/assets/images/settings.png" alt="Settings Screen" style="width: 45%; border: 1px solid #ccc; border-radius: 8px;" />
</div>

## 🛠️ Requirements

- Node.js 16+
- pnpm
- Expo CLI
- OWON VDS1022 oscilloscope or compatible WebSocket data source

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fukayatti/diy-particle-detector-app.git
   cd diy-particle-detector
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm expo start
   ```

4. Use the Expo Go app on your mobile device to scan the QR code, or press `a` to run on Android emulator or `i` to run on iOS simulator.

## ⚙️ Configuration

### 🌐 WebSocket Backend

The app expects to connect to a WebSocket server that emits data with the following structure:

```typescript
type DataPoint = {
  timestamp: number; // Unix timestamp
  rms_ch1: number; // RMS value for channel 1
  rms_ch2: number; // RMS value for channel 2
};
```

The WebSocket server should emit these data points with the event name `'data'`.

### 🛠️ Default Settings

- Default WebSocket URL: `ws://your-backend-server:5000` (change in the Settings tab)
- Default threshold for CH1: `100`
- Default threshold for CH2: `100`

## 🗂️ Project Structure

- `/app`: Expo Router application structure
  - `/(tabs)`: Tab-based navigation screens
  - `+html.tsx`, `+not-found.tsx`, `_layout.tsx`: Expo Router configuration
- `/contexts`: React contexts, including the main application state
- `/components`: Reusable UI components

## 🛠️ Tech Stack

- [Expo](https://expo.dev/): React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction/): File-based routing for Expo
- [Socket.io Client](https://socket.io/docs/v4/client-api/): WebSocket communication
- [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit): Beautiful charts and graphs
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/): Push notification functionality
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/): Persistent data storage

## 🛠️ Development

### 🏗️ Building for Production

To create a production build:

```bash
# For Android
pnpm expo build:android

# For iOS
pnpm expo build:ios

# For Web
pnpm expo build:web
```

### 🧪 Testing

Run tests with Jest:

```bash
pnpm expo start
```

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OWON for their oscilloscope hardware.
- The Expo team for their amazing React Native tooling.
- All contributors who have helped shape this project.
