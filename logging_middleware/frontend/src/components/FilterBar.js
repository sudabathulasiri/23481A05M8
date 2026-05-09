import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Log } from '../services/logger';

const FilterBar = ({ onFilterChange, onLimitChange, filter, limit }) => {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
    Log('frontend', 'info', 'FilterBar', 'filter changed');
  };

  const handleLimitChange = (event) => {
    onLimitChange(event.target.value);
    Log('frontend', 'info', 'FilterBar', 'limit changed');
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} label="Filter" onChange={handleFilterChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Limit</InputLabel>
        <Select value={limit} label="Limit" onChange={handleLimitChange}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;