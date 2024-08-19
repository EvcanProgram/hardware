'use client'
import { useEffect, useState } from 'react';
import Control from './components/control';

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hardware Control</h1>
      <Control />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
