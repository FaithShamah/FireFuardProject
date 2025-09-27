import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TemperatureChart.css';

const TemperatureChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Time: ${label}`}</p>
          <p className="value">{`Temperature: ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="temperature-chart">
      <h3>Temperature Trend</h3>
      
      {data && data.length > 0 ? (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="time" 
                stroke="#a0a6ad"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#a0a6ad"
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ff6b6b" 
                strokeWidth={3}
                dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ff6b6b', strokeWidth: 2, fill: '#1a1a2e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="no-data">
          <div className="no-data-icon">📊</div>
          <p>No temperature data available</p>
          <p className="no-data-subtitle">Waiting for sensor readings...</p>
        </div>
      )}
      
      <div className="chart-stats">
        {data && data.length > 0 && (
          <>
            <div className="stat-item">
              <span className="stat-label">Latest:</span>
              <span className="stat-value">{data[data.length - 1]?.temperature}°C</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average:</span>
              <span className="stat-value">
                {(data.reduce((sum, item) => sum + item.temperature, 0) / data.length).toFixed(1)}°C
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Max:</span>
              <span className="stat-value">
                {Math.max(...data.map(item => item.temperature))}°C
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TemperatureChart;