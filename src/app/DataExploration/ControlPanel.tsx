import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Grid, MenuProps, Paper } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

interface ControlPanelProps {
  datetimeColumn: string;
  selectedCols: string[];
  columns: GridColDef[];
  availableTimeColumns: string[];
  granularity: string;
  limit: number;
  scaler: string;
  chartType: string;
  setGranularity: React.Dispatch<React.SetStateAction<string>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setScaler: React.Dispatch<React.SetStateAction<string>>;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => void;
  handleColumnChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleTimeColumnChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  datetimeColumn,
  selectedCols,
  columns,
  availableTimeColumns,
  granularity,
  limit,
  scaler,
  chartType,
  setGranularity,
  setLimit,
  setScaler,
  setChartType,
  fetchData,
  handleColumnChange,
  handleTimeColumnChange
}) => {
  // Customized MenuProps for dropdown height and scrolling
  const customMenuProps: Partial<MenuProps> = {
    PaperProps: {
      style: {
        maxHeight: 200,  // Set maximum height for dropdown
        overflow: 'auto', // Enable scrolling
      },
    },
  };

  return (
    <Paper
    className="Category-Item"
    elevation={2}
    sx={{
      borderRadius: 4,
      width: "container",
      display: "flex",
      flexDirection: "column",
      rowGap: 0,
      minWidth: "300px",
    }}
>
    <Box sx={{ p: 2, bgcolor: 'background.default', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Data Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Time Column</InputLabel>
            <Select value={datetimeColumn} onChange={handleTimeColumnChange} label="Time Column">
              {availableTimeColumns.map((timeCol) => (
                <MenuItem key={timeCol} value={timeCol}>{timeCol}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Other Columns</InputLabel>
            <Select
              multiple
              value={selectedCols}
              onChange={handleColumnChange}
              renderValue={(selected) => selected.join(', ')}
              label="Columns"
              MenuProps={customMenuProps}
            >
              {columns.filter(col => col.field !== datetimeColumn).map((col) => (
                <MenuItem key={col.field} value={col.field}>
                  {col.headerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Aggregation Function" value={granularity} onChange={(e) => setGranularity(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Limit" type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Scaler</InputLabel>
            <Select value={scaler} onChange={(e) => setScaler(e.target.value)} label="Scaler">
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="minmax">Min-Max</MenuItem>
              <MenuItem value="z">Standard</MenuItem>
              <MenuItem value="log">Log</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="chart-type-label">Chart Type</InputLabel>
            <Select
              labelId="chart-type-label"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              label="Chart Type"
            >
              <MenuItem value="line">Line Chart</MenuItem>
              <MenuItem value="scatter">Scatter Plot</MenuItem>
              <MenuItem value="bar">Bar Chart</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={fetchData} variant="contained" color="primary" fullWidth>
            Fetch Data
          </Button>
        </Grid>
      </Grid>
    </Box>
    </Paper>  
  );
};

export default ControlPanel;
