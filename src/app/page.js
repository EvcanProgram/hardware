'use client';
//not auto fetch
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchLux');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched data:', result.data); // Debugging line
        setData(result.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">PHUW022 DB</h1>
      <ul className="space-y-4">
        {data.length > 0 ? (
          data.map((row) => (
            <li key={row.id} className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600"><span className="font-semibold">ID:</span> {row.id}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">State:</span> {row.state}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Timestamp:</span> {formatDate(row.timestamp)}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Status:</span> {row.status}</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Lux:</span> {row.lux}</p>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No data available</li>
        )}
      </ul>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => sendControlRequest('red')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Red
        </button>
        <button
          onClick={() => sendControlRequest('green')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Yellow
        </button>
        <button
          onClick={() => sendControlRequest('blue')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Green
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
