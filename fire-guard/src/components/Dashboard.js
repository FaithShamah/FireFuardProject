// import React, { useState, useEffect } from 'react';
// import { ref, onValue } from "firebase/database";
// import { db } from "../firebase";
// import SensorPanel from './SensorPanel';
// import AlertsPanel from './AlertsPanel';
// import TemperatureChart from './TemperatureChart';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [temperature, setTemperature] = useState(null);
//   const [humidity, setHumidity] = useState(null);
//   const [fireDetected, setFireDetected] = useState(false);
//   const [alerts, setAlerts] = useState([]);
//   const [temperatureHistory, setTemperatureHistory] = useState([]);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   useEffect(() => {
//     // Listen for real-time sensor data
//     const tempRef = ref(db, "sensors/temperature");
//     const humidityRef = ref(db, "sensors/humidity");
//     const fireRef = ref(db, "sensors/fire");
//     const alertsRef = ref(db, "alerts");

//     const unsubscribeTemp = onValue(tempRef, (snapshot) => {
//       const temp = snapshot.val();
//       if (temp !== null) {
//         setTemperature(temp);
//         setLastUpdate(new Date());
        
//         // Add to temperature history for chart
//         setTemperatureHistory(prev => {
//           const newHistory = [...prev, { 
//             time: new Date().toLocaleTimeString(), 
//             temperature: temp 
//           }];
//           // Keep only last 20 readings
//           return newHistory.slice(-20);
//         });
//       }
//     });

//     const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
//       const hum = snapshot.val();
//       if (hum !== null) {
//         setHumidity(hum);
//         setLastUpdate(new Date());
//       }
//     });

//     const unsubscribeFire = onValue(fireRef, (snapshot) => {
//       const fireStatus = snapshot.val();
//       setFireDetected(fireStatus === true || fireStatus === 1);
//       setLastUpdate(new Date());
//     });

//     const unsubscribeAlerts = onValue(alertsRef, (snapshot) => {
//       const alertsData = snapshot.val();
//       if (alertsData) {
//         const alertsArray = Object.keys(alertsData).map(key => ({
//           id: key,
//           ...alertsData[key]
//         }));
//         setAlerts(alertsArray.sort((a, b) => b.timestamp - a.timestamp));
//       }
//     });

//     return () => {
//       unsubscribeTemp();
//       unsubscribeHumidity();
//       unsubscribeFire();
//       unsubscribeAlerts();
//     };
//   }, []);

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h2>Real-time Monitoring Dashboard</h2>
//         {lastUpdate && (
//           <span className="last-update">
//             Last updated: {lastUpdate.toLocaleTimeString()}
//           </span>
//         )}
//       </div>
      
//       <div className="dashboard-grid">
//         <SensorPanel 
//           temperature={temperature} 
//           humidity={humidity}
//           fireDetected={fireDetected}
//           lastUpdate={lastUpdate}
//         />
        
//         <TemperatureChart data={temperatureHistory} />
        
//         <AlertsPanel alerts={alerts} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { ref, onValue, query, limitToLast } from "firebase/database";
import { db } from "../firebase";
import SensorPanel from './SensorPanel';
import AlertsPanel from './AlertsPanel';
import TemperatureChart from './TemperatureChart';
import './Dashboard.css';

const Dashboard = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [fireDetected, setFireDetected] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [temperatureHistory, setTemperatureHistory] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    // Listen for the latest reading
    const readingsRef = query(ref(db, "readings"), limitToLast(20));

    const unsubscribeReadings = onValue(readingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const readingsArray = Object.values(data);
        
        // Get the latest reading
        const latestReading = readingsArray[readingsArray.length - 1];

        setTemperature(latestReading.temperature);
        setHumidity(latestReading.humidity);
        setFireDetected(latestReading.fire < 16); // assuming fire > 0 means detected
        setLastUpdate(new Date(latestReading.timestamp));

        // Update temperature history for chart
        const history = readingsArray.map(r => ({
          time: new Date(r.timestamp).toLocaleTimeString(),
          temperature: r.temperature
        }));
        setTemperatureHistory(history);
      }
    });

    // Listen for alerts separately
    const alertsRef = ref(db, "alerts");
    const unsubscribeAlerts = onValue(alertsRef, (snapshot) => {
      const alertsData = snapshot.val();
      if (alertsData) {
        const alertsArray = Object.keys(alertsData).map(key => ({
          id: key,
          ...alertsData[key]
        }));
        setAlerts(alertsArray.sort((a, b) => b.timestamp - a.timestamp));
      }
    });

    return () => {
      unsubscribeReadings();
      unsubscribeAlerts();
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Real-time Monitoring Dashboard</h2>
        {lastUpdate && (
          <span className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="dashboard-grid">
        <SensorPanel 
          temperature={temperature} 
          humidity={humidity}
          fireDetected={fireDetected}
          lastUpdate={lastUpdate}
        />
        
        <TemperatureChart data={temperatureHistory} />
        
        <AlertsPanel alerts={alerts} />
      </div>
    </div>
  );
};

export default Dashboard;
