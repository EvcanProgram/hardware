export default function Control() {
    const handleControl = async (color) => {
      await fetch('/api/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color }),
      });
    };
  
    return (
      <div>
        <button onClick={() => handleControl('red')}>Red</button>
        <button onClick={() => handleControl('green')}>Green</button>
        <button onClick={() => handleControl('blue')}>Blue</button>
        <button onClick={() => handleControl('off')}>Off</button>
      </div>
    );
  }
  