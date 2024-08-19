'use client';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>PHUW022 Data</h1>
      <ul>
        {data.length > 0 ? (
          data.map((row) => (
            <li key={row.id}>
              <p>ID: {row.id}</p>
              <p>State: {row.state}</p>
              <p>Timestamp: {formatDate(row.timestamp)}</p>
              <p>Status: {row.status}</p>
              <p>Lux: {row.lux}</p>
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
      <button onClick={() => sendControlRequest('red')}>Red</button>
      <button onClick={() => sendControlRequest('green')}>Green</button>
      <button onClick={() => sendControlRequest('blue')}>Blue</button>
      <button onClick={() => sendControlRequest('off')}>Off</button>
    </div>
  );
}
