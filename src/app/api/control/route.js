import axios from 'axios';

export default async function handler(req, res) {

  const { action } = req.query; // e.g., 'action=red' or 'action=off'

  // Define the URL of the Raspberry Pi Pico or Espruino device
  const deviceUrl = 'http://<your-raspberry-pi-ip>'; // Change to gnrok lat

  try {
    const response = await axios.get(`${deviceUrl}/${action}`);

    res.status(200).json({ success: true, message: `Action ${action} executed`, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to control hardware', error: error.message });
  }
}
