import React from 'react';
import './SensorPanel.css';

const SensorPanel = ({ temperature, humidity, fireDetected, lastUpdate }) => {
  const getTemperatureStatus = (temp) => {
    if (temp === null) return 'loading';
    if (temp > 60) return 'danger';
    if (temp > 40) return 'warning';
    return 'normal';
  };

  const getHumidityStatus = (hum) => {
    if (hum === null) return 'loading';
    if (hum > 80 || hum < 20) return 'warning';
    if (hum > 90 || hum < 10) return 'danger';
    return 'normal';
  };

  const temperatureStatus = getTemperatureStatus(temperature);
  const humidityStatus = getHumidityStatus(humidity);

  return (
    <div className="sensor-panel">
      <h3>Sensor Readings</h3>
      
      <div className="sensor-cards">
        <div className={`sensor-card temperature ${temperatureStatus}`}>
          <div className="sensor-icon">🌡️</div>
          <div className="sensor-data">
            <div className="sensor-value">
              {temperature !== null ? `${temperature}°C` : 'Loading...'}
            </div>
            <div className="sensor-label">Temperature</div>
            <div className={`sensor-status ${temperatureStatus}`}>
              {temperatureStatus === 'danger' && 'Critical!'}
              {temperatureStatus === 'warning' && 'High'}
              {temperatureStatus === 'normal' && 'Normal'}
              {temperatureStatus === 'loading' && 'Connecting...'}
            </div>
          </div>
        </div>

        <div className={`sensor-card fire ${fireDetected ? 'danger' : 'normal'}`}>
          <div className="sensor-icon">🔥</div>
          <div className="sensor-data">
            <div className="sensor-value">
              {fireDetected ? 'DETECTED' : 'SAFE'}
            </div>
            <div className="sensor-label">Fire Status</div>
            <div className={`sensor-status ${fireDetected ? 'danger' : 'normal'}`}>
              {fireDetected ? 'Emergency!' : 'All Clear'}
            </div>
          </div>
        </div>

        <div className={`sensor-card humidity ${humidityStatus}`}>
          <div className="sensor-icon">💧</div>
          <div className="sensor-data">
            <div className="sensor-value">
              {humidity !== null ? `${humidity}%` : 'Loading...'}
            </div>
            <div className="sensor-label">Humidity</div>
            <div className={`sensor-status ${humidityStatus}`}>
              {humidityStatus === 'danger' && 'Critical!'}
              {humidityStatus === 'warning' && 'Alert'}
              {humidityStatus === 'normal' && 'Optimal'}
              {humidityStatus === 'loading' && 'Connecting...'}
            </div>
          </div>
        </div>
      </div>

      {fireDetected && (
        <div className="emergency-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-text">
            <strong>FIRE DETECTED!</strong>
            <br />
            Emergency protocols activated
          </div>
        </div>
      )}
      
      <div className="device-status">
        <div className="status-item">
          <span className="status-label">Device:</span>
          <span className="status-value online">Online</span>
        </div>
        <div className="status-item">
          <span className="status-label">Battery:</span>
          <span className="status-value">98%</span>
        </div>
        <div className="status-item">
          <span className="status-label">Signal:</span>
          <span className="status-value strong">Strong</span>
        </div>
      </div>
    </div>
  );
};

export default SensorPanel;