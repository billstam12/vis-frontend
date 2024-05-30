import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

interface DataTableProps {
  data: any[];
  columns: GridColDef[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const rows = data.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Dataset Viewer
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="body1">Explore dataset: i2Cat Phishing</Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ mr: 1 }}>
            Show selected
          </Button>
          <Button variant="contained" color="secondary">
            Show generated
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        // disableSelectionOnClick
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />
    </Box>
  );
};

export default DataTable;
