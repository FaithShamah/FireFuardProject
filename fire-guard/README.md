# FireGuard - Smart Fire & Temperature Monitoring Dashboard

🔥 **React.js + Firebase dashboard for real-time fire and temperature monitoring**

Built for the Africa's Talking WIT Kampala Hackathon - Hardware Solutions theme.

## 🌟 Features

- **Real-time Monitoring**: Live temperature readings and fire detection status
- **Interactive Charts**: Temperature trend visualization using Recharts
- **Alert System**: Comprehensive alerts panel with different severity levels
- **Responsive Design**: Mobile-friendly interface
- **Firebase Integration**: Real-time database for sensor data storage
- **Professional UI**: Clean, modern design suitable for presentation

## 🛠️ Project Structure

```
src/
├── components/
│   ├── Navbar.js/css          # Top navigation bar
│   ├── Dashboard.js/css       # Main dashboard container
│   ├── SensorPanel.js/css     # Temperature & fire sensor display
│   ├── TemperatureChart.js/css # Interactive temperature chart
│   └── AlertsPanel.js/css     # Alerts history and management
├── firebase.js                # Firebase configuration
├── App.js                     # Main app component
└── App.css                    # Global styles
```

## 🚀 Getting Started

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (e.g., "fireguard-hackathon")
3. Enable **Realtime Database** 
4. Set database rules to allow read/write for testing:
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
5. Go to Project Settings > General > Your apps
6. Click "Web app" and register your app
7. Copy the Firebase config object

### 2. Update Firebase Config

Replace the config in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 📊 Firebase Database Structure

The app expects this data structure in Firebase Realtime Database:

```json
{
  "sensors": {
    "temperature": 25.5,
    "humidity": 45.0,
    "fire": false
  },
  "alerts": {
    "alert1": {
      "type": "temperature",
      "temperature": 65,
      "device_id": "fireguard-01",
      "timestamp": 1695828300
    }
  }
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
