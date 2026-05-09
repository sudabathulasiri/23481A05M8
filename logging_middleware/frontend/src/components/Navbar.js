import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          variant={location.pathname === '/' ? 'outlined' : 'text'}
        >
          All Notifications
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/priority"
          variant={location.pathname === '/priority' ? 'outlined' : 'text'}
        >
          Priority Notifications
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;