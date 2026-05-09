const axios = require("axios");
const Log = require("./logger");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdWRhYmF0aHVsYXNyaW5pamFAZ21haWwuY29tIiwiZXhwIjoxNzc4MzEyMDM1LCJpYXQiOjE3NzgzMTExMzUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiM2IyNGQ1MC1iMjUwLTQxNjQtYTZiMy0wODE2NjFmMWRiYTgiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzcmluaWphIHN1ZGFiYXRodWxhIiwic3ViIjoiZGU3OWNiNzctYzM4OC00NjRlLWEzMmMtM2I2YTlmYzE2ZTk3In0sImVtYWlsIjoic3VkYWJhdGh1bGFzcmluaWphQGdtYWlsLmNvbSIsIm5hbWUiOiJzcmluaWphIHN1ZGFiYXRodWxhIiwicm9sbE5vIjoiMjM0ODFhMDVtOCIsImFjY2Vzc0NvZGUiOiJlSmRDdUMiLCJjbGllbnRJRCI6ImRlNzljYjc3LWMzODgtNDY0ZS1hMzJjLTNiNmE5ZmMxNmU5NyIsImNsaWVudFNlY3JldCI6Ikp4ZmdNa3lBR0RCZE5xbWYifQ.9Ti48hUZiuwKtdv1Pg0MCYZPhXgI1kTZbidg1_3cKow"

const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function fetchNotifications() {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications from API"
    );

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const notifications = response.data.notifications;

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    // Sort by priority and timestamp
    notifications.sort((a, b) => {

      // priority comparison
      const priorityDiff =
        PRIORITY[b.Type] - PRIORITY[a.Type];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      // recent notifications first
      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

    const top10 = notifications.slice(0, 10);

    await Log(
      "frontend",
      "info",
      "component",
      "Top 10 notifications calculated"
    );

    console.log("\nTOP 10 NOTIFICATIONS\n");

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. [${item.Type}] ${item.Message}`
      );
    });

  } catch (error) {

    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    console.error(error.response?.data || error.message);
  }
}

fetchNotifications();