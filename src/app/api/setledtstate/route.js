export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { state, timestamp } = req.body;
  
      try {
        // Call your backend or database here to handle the LED state
        const response = await fetch('https://hardware-sigma.vercel.app/api/ledstate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state, timestamp }),
        });
  
        const result = await response.json();
  
        // Respond to the frontend
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ message: 'Failed to set LED state', error: error.message });
      }
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }  