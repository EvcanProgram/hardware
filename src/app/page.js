'use client';
import { useState } from 'react';

export default function Page() {
  const [sensorData, setSensorData] = useState(null);
  const [luxData, setLuxData] = useState([]);
  const [loadingSensor, setLoadingSensor] = useState(false);
  const [loadingLux, setLoadingLux] = useState(false);
  const [errorSensor, setErrorSensor] = useState(null);
  const [errorLux, setErrorLux] = useState(null);

  const fetchLuxData = async () => {
    setLoadingLux(true);
    try {
      const response = await fetch('/api/fetchLux');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const result = await response.json();
      setLuxData(result.data || []);
    } catch (error) {
      setErrorLux(error.message);
    } finally {
      setLoadingLux(false);
    }
  };

  const fetchSensorData = async (sensorType) => {
    setLoadingSensor(true);
    try {
      const response = await fetch(`/api/sensorData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: sensorType }),
      });

      if (!response.ok) throw new Error(`Failed to fetch ${sensorType} data`);

      const result = await response.json();
      setSensorData({ ...sensorData, [sensorType]: result.data });
    } catch (error) {
      setErrorSensor(error.message);
    } finally {
      setLoadingSensor(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid Date';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const sendControlRequest = async (action) => {
    try {
      const response = await fetch('/api/ledstate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">PHUW022 Data Display</h1>

      {/* Sensor Data Display */}
      <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">Sensor Data</h2>
        {sensorData ? (
          <div>
            {Object.keys(sensorData).map((key) => (
              <p key={key} className="text-sm text-gray-600">
                <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {sensorData[key]}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No sensor data available</p>
        )}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => fetchSensorData('lux')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Fetch Lux Data
          </button>
          <button
            onClick={() => fetchSensorData('temperature')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Fetch Temperature Data
          </button>
          <button
            onClick={() => fetchSensorData('raindrop')}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Fetch Raindrop Data
          </button>
          <button
            onClick={() => fetchSensorData('vibration')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Fetch Vibration Data
          </button>
        </div>
      </div>

      {/* Lux Data Display */}
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-black mb-4">Lux Data</h2>
        <ul className="space-y-4">
          {luxData.length > 0 ? (
            luxData.map((row) => (
              <li key={row.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600"><span className="font-semibold">ID:</span> {row.id}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">State:</span> {row.state}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Timestamp:</span> {formatDate(row.timestamp)}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Status:</span> {row.status}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Lux:</span> {row.lux}</p>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No lux data available</li>
          )}
        </ul>
      </div>

      {/* LED Control Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => sendControlRequest('red')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Red
        </button>
        <button
          onClick={() => sendControlRequest('yellow')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Yellow
        </button>
        <button
          onClick={() => sendControlRequest('blue')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Blue
        </button>
        <button
          onClick={() => sendControlRequest('off')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Off
        </button>
      </div>
    </div>
  );
}
