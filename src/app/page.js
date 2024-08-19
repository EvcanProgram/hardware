import { useState } from 'react';
import Control from './components/control';

export default function Home() {
  const [ledState, setLedState] = useState('off');

  const handleChange = (event) => {
    setLedState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/api/setledstate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: ledState, timestamp: new Date().toISOString() }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h1>Control LED</h1>
      <form onSubmit={handleSubmit}>
      <Control />
        <label>
          LED State:
          <select value={ledState} onChange={handleChange}>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="off">Off</option>
          </select>
        </label>
        <button type="submit">Set LED State</button>
      </form>
    </div>
  );
}
