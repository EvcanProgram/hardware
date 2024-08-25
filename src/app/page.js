'use client';
//db not auto fetch (dont mind this comment)
import { useEffect, useState } from 'react';
//dont forget to make button (dont mind this comment)
export default function Page() {
  const [sensorData, setSensorData] = useState(null);
  const [luxData, setLuxData] = useState([]);
  const [loadingSensor, setLoadingSensor] = useState(true);
  const [loadingLux, setLoadingLux] = useState(true);
  const [errorSensor, setErrorSensor] = useState(null);
  const [errorLux, setErrorLux] = useState(null);

  const fetchSensorData = async () => {
    try {
      setLoadingSensor(true); // Ensure you show a loading state while fetching data
      const response = await fetch('/api/sensorData'); // Fetch data from your backend API
      if (!response.ok) {
        throw new Error('Failed to fetch sensor data'); // Handle non-200 responses
      }
      const result = await response.json(); // Parse the JSON data
      console.log('Fetched sensor data:', result); // Log the data for debugging
      setSensorData(result || {}); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching sensor data:', error); // Log any errors
      setErrorSensor(error.message); // Update state to show an error message
    } finally {
      setLoadingSensor(false); // Ensure loading state is cleared
    }
  };

  const fetchLuxData = async () => {
    try {
      const response = await fetch('/api/fetchLux');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Fetched lux data:', result.data); // Debugging line
      setLuxData(result.data || []);
    } catch (error) {
      setErrorLux(error.message);
    } finally {
      setLoadingLux(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    fetchLuxData();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid Date';

    const date = new Date(timestamp);
    return date.toLocaleString(); // Customize as needed
  };

  const sendControlRequest = async (action) => {
    try {
      const response = await fetch('/api/ledstate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loadingSensor || loadingLux) return <p className="text-center text-gray-500">Loading...</p>;
  if (errorSensor) return <p className="text-center text-red-500">Error: {errorSensor}</p>;
  if (errorLux) return <p className="text-center text-red-500">Error: {errorLux}</p>;

  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">PHUW022 Data Display</h1>

      {/* Sensor Data Display */}
      <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-black mb-4">Sensor Data</h2>
        {sensorData ? (
          <div>
            <p className="text-sm text-gray-600"><span className="font-semibold">Lux:</span> {sensorData.lux}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Temperature:</span> {sensorData.temperature} °C</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Raindrop Status:</span> {sensorData.raindrop_status}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Raindrop Value:</span> {sensorData.raindrop_value}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Vibration Status:</span> {sensorData.vibration_status}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Timestamp:</span> {formatDate(sensorData.timestamp)}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No sensor data available</p>
        )}
        <button
          onClick={fetchSensorData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Fetch Sensor Data
        </button>
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
          onClick={() => sendControlRequest('green')}
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