import axios from 'axios';

const LOG_URL = 'http://4.224.186.213/evaluation-service/logs';
const TOKEN = 'your-bearer-token'; // Replace with actual token

export const Log = async (stack, level, packageName, message) => {
  try {
    await axios.post(LOG_URL, { stack, level, packageName, message }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Failed to log:', error);
  }
};