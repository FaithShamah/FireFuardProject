import React from 'react';
import './AlertsPanel.css';

const AlertsPanel = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'fire':
      case 'flame':
        return '🔥';
      case 'temperature':
        return '🌡️';
      case 'system':
        return '⚙️';
      default:
        return '⚠️';
    }
  };

  const getAlertSeverity = (type, temperature) => {
    if (type === 'fire' || type === 'flame') return 'critical';
    if (type === 'temperature') {
      if (temperature > 70) return 'critical';
      if (temperature > 50) return 'warning';
      return 'info';
    }
    return 'info';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="alerts-panel">
      <div className="alerts-header">
        <h3>Recent Alerts</h3>
        <div className="alerts-count">
          {alerts.length} total
        </div>
      </div>
      
      <div className="alerts-container">
        {alerts && alerts.length > 0 ? (
          <div className="alerts-list">
            {alerts.slice(0, 10).map((alert, index) => {
              const severity = getAlertSeverity(alert.type, alert.temperature);
              return (
                <div key={alert.id || index} className={`alert-item ${severity}`}>
                  <div className="alert-icon">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">
                      {alert.type === 'fire' || alert.type === 'flame' 
                        ? 'Fire Detected!' 
                        : alert.type === 'temperature' 
                        ? 'High Temperature Alert'
                        : 'System Alert'
                      }
                    </div>
                    <div className="alert-details">
                      {alert.temperature && (
                        <span className="detail-item">
                          Temperature: {alert.temperature}°C
                        </span>
                      )}
                      {alert.device_id && (
                        <span className="detail-item">
                          Device: {alert.device_id}
                        </span>
                      )}
                    </div>
                    <div className="alert-time">
                      {formatTimestamp(alert.timestamp)}
                    </div>
                  </div>
                  <div className={`alert-severity ${severity}`}>
                    {severity === 'critical' && '🚨'}
                    {severity === 'warning' && '⚠️'}
                    {severity === 'info' && 'ℹ️'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-alerts">
            <div className="no-alerts-icon">✅</div>
            <p>No alerts</p>
            <p className="no-alerts-subtitle">System running normally</p>
          </div>
        )}
      </div>

      <div className="alerts-footer">
        <button className="clear-alerts-btn" disabled={!alerts || alerts.length === 0}>
          Clear All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertsPanel;