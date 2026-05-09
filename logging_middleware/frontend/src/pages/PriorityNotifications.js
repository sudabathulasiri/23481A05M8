import React, { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress, Alert, Typography, Pagination, Box } from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import FilterBar from '../components/FilterBar';
import { fetchNotifications } from '../services/api';
import { Log } from '../services/logger';

const PriorityNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const priorityOrder = { Placement: 3, Result: 2, Event: 1 };

  const sortNotifications = (nots) => {
    Log('frontend', 'info', 'PriorityNotifications', 'priority calculation');
    return nots.sort((a, b) => {
      const aPriority = priorityOrder[a.type] || 0;
      const bPriority = priorityOrder[b.type] || 0;
      if (aPriority !== bPriority) return bPriority - aPriority;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  };

  const loadNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { limit, page };
      const data = await fetchNotifications(params);
      let filtered = data.notifications || [];
      // Filter to priority types
      filtered = filtered.filter(notif => notif.type === 'Placement' || notif.type === 'Result');
      // Then apply additional filter if not All
      if (filter !== 'All') {
        filtered = filtered.filter(notif => notif.type === filter);
      }
      const sorted = sortNotifications(filtered);
      setNotifications(sorted);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [filter, limit, page]);

  const handleView = (id) => {
    localStorage.setItem(`viewed_${id}`, 'true');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;

  return (
    <Container sx={{ mt: 2 }}>
      <FilterBar
        onFilterChange={setFilter}
        onLimitChange={setLimit}
        filter={filter}
        limit={limit}
      />
      {notifications.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No priority notifications found.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {notifications.map((notif) => (
              <Grid item xs={12} sm={6} md={4} key={notif.id}>
                <NotificationCard notification={notif} onView={handleView} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default PriorityNotifications;