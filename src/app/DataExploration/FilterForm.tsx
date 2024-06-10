import React from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';

const FilterForm = ({ columns, onAddFilter, onRemoveFilter, filters , onRemoveAllFilters}) => {
    const [selectedColumn, setSelectedColumn] = React.useState('');
    const [filterType, setFilterType] = React.useState('equals');
    const [filterValue, setFilterValue] = React.useState('');
  
    const handleAddFilter = () => {
      let value = {};
      if (filterType === 'equals') {
        value = { value: filterValue };
      } else if (filterType === 'range') {
        const rangeParts = filterValue.split('-').map(part => part.trim());
        if (rangeParts.length === 2) {
          value = { min: rangeParts[0], max: rangeParts[1] };
        } else {
          alert("Please enter a valid range in the format 'min-max'.");
          return; // Exit without adding the filter if format is incorrect
        }
      };
  
      const newFilter = {
        column: selectedColumn,
        type: filterType,
        value: value
      };

      

      
      onAddFilter(newFilter);
      console.log('Adding filter:', newFilter);  // Log new filter
      console.log('Current filters:', filters); // Log all current filters after addition
      setSelectedColumn('');
      setFilterType('equals');
      setFilterValue('');
    };

    const resetFilters = () => {
        setSelectedColumn('');
        setFilterType('equals');
        setFilterValue('');
        onRemoveAllFilters();
    };
  
    return (
      <Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Column</InputLabel>
          <Select
            value={selectedColumn}
            label="Column"
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            {columns.map((col) => (
              <MenuItem key={col.field} value={col.field}>{col.headerName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={filterType}
            label="Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="equals">Equals</MenuItem>
            <MenuItem value="range">Range</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
        //   label="Value"
        label={filterType === 'equals' ? "Value" : "Range (min-max)"}
        placeholder={filterType === 'equals' ? "Enter value" : "e.g., 0-100"}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          margin="normal"
        />
        <Button onClick={handleAddFilter} variant="text" color="primary">Add Filter</Button>
        <Button onClick={resetFilters} variant="text" color="secondary" >
            Clear Filters
        </Button>
        <Box>
        {filters.map((filter, index) => (
          <Box key={index} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
      {filter.column} {filter.type} {filter.type === 'equals' ? filter.value.value : `${filter.value.min} to ${filter.value.max}`}
      <Button onClick={() => onRemoveFilter(index)}>Remove</Button>
      
          </Box>
        ))}
      </Box>
      </Box>
    );
  };
  
  export default FilterForm;
