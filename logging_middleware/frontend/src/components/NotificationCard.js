import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Log } from '../services/logger';

const NotificationCard = ({ notification, onView }) => {
  const handleClick = () => {
    onView(notification.id);
    Log('frontend', 'info', 'NotificationCard', 'notification viewed');
  };

  const isViewed = localStorage.getItem(`viewed_${notification.id}`) === 'true';

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        backgroundColor: isViewed ? '#e0e0e0' : '#fff',
        '&:hover': { boxShadow: 3 }
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {notification.Title || 'Notification'}
        </Typography>
        <Chip label={notification.Type} color="primary" size="small" sx={{ mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {notification.Message}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {new Date(notification.Timestamp).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;