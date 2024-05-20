import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const VisualizationFilter = ({ datasetName, onFiltersChange }) => {
  const [columns, setColumns] = useState([]);
  const [columnValues, setColumnValues] = useState({});
  const [filters, setFilters] = useState([
    { column: '', type: 'range', value: { min: '', max: '' } }
  ]);

  useEffect(() => {
    if (datasetName) {
      axios.get(`http://leviathan.imsi.athenarc.gr:8080/api/visualization/data/${datasetName}/columns`)
        .then(response => {
          const columnNames = response.data.map(column => column.name);
          setColumns(columnNames);
        })
        .catch(error => {
          console.error('Error fetching columns:', error);
        });
    }
  }, [datasetName]);

  const fetchColumnValues = (columnName) => {
    if (columnName) {
      axios.get(`http://leviathan.imsi.athenarc.gr:8080/api/visualization/data/${datasetName}/column/${columnName}`)
        .then(response => {
          const values = response.data.map(item => item[columnName]);
          const uniqueValues = [...new Set(values)];  // Ensure values are unique
          setColumnValues(prevValues => ({ ...prevValues, [columnName]: uniqueValues }));
        })
        .catch(error => {
          console.error('Error fetching column values:', error);
        });
    }
  };

  const handleFilterChange = (index, key, value) => {
    setFilters(prevFilters => {
      const newFilters = [...prevFilters];
      if (key === 'column') {
        newFilters[index][key] = value;
        fetchColumnValues(value);  // Fetch values when column is selected
      } else if (key === 'value') {
        newFilters[index].value.min = value;
        newFilters[index].value.max = value;
      } else {
        newFilters[index][key] = value;
      }
      return newFilters;
    });
  };

  const addFilter = () => {
    setFilters(prevFilters => [
      ...prevFilters,
      { column: '', type: 'range', value: { min: '', max: '' } }
    ]);
  };

  const removeFilter = (index) => {
    setFilters(prevFilters => prevFilters.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  return (
    <Box sx={{ p: 2 }}>
      {/* <h1>Visualization Filter</h1> */}

      {filters.map((filter, index) => (
        <Grid container spacing={4} key={index} alignItems="center">
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Select Column</InputLabel>
              <Select
                value={filter.column}
                onChange={e => handleFilterChange(index, 'column', e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // Adjust the maximum height as needed
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>--Select a Column--</em>
                </MenuItem>
                {columns.map((column, idx) => (
                  <MenuItem key={idx} value={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {filter.column && (
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Select Value</InputLabel>
                <Select
                  value={filter.value.min}
                  onChange={e => handleFilterChange(index, 'value', e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Adjust the maximum height as needed
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>--Select a Value--</em>
                  </MenuItem>
                  {columnValues[filter.column] && columnValues[filter.column].map((value, idx) => (
                    <MenuItem key={idx} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={1}>
            <Button variant="outlined"   size="small" startIcon={<DeleteIcon/>} color="secondary" onClick={() => removeFilter(index)}>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}

      <Button variant="contained" color="primary" onClick={addFilter}>
        Add Filter
      </Button>
    </Box>
  );
};

export default VisualizationFilter;