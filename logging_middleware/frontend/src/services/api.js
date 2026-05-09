import axios from 'axios';
import { Log } from './logger';

const API_URL = '/evaluation-service/notifications';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdWRhYmF0aHVsYXNyaW5pamFAZ21haWwuY29tIiwiZXhwIjoxNzc4MzEyMDM1LCJpYXQiOjE3NzgzMTExMzUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiM2IyNGQ1MC1iMjUwLTQxNjQtYTZiMy0wODE2NjFmMWRiYTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmluaWphIHN1ZGFiYXRodWxhIiwic3ViIjoiZGU3OWNiNzctYzM4OC00NjRlLWEzMmMtM2I2YTlmYzE2ZTk3In0sImVtYWlsIjoic3VkYWJhdGh1bGFzcmluaWphQGdtYWlsLmNvbSIsIm5hbWUiOiJzcmluaWphIHN1ZGFiYXRodWxhIiwicm9sbE5vIjoiMjM0ODFhMDVtOCIsImFjY2Vzc0NvZGUiOiJlSmRDdUMiLCJjbGllbnRJRCI6ImRlNzljYjc3LWMzODgtNDY0ZS1hMzJjLTNiNmE5ZmMxNmU5NyIsImNsaWVudFNlY3JldCI6Ikp4ZmdNa3lBR0RCZE5xbWYifQ.9Ti48hUZiuwKtdv1Pg0MCYZPhXgI1kTZbidg1_3cKow'; // Replace with actual token

export const fetchNotifications = async (params = {}) => {
  Log('frontend', 'info', 'api', 'fetch started');
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    Log('frontend', 'info', 'api', 'fetch success');
    return response.data;
  } catch (error) {
    Log('frontend', 'error', 'api', 'fetch failure');
    throw error;
  }
};