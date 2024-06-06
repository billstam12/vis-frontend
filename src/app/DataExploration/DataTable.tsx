import React from 'react';
import { DataGrid, GridColDef, GridFooterContainer, GridFooter, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';




interface DataTableProps {
  data: any[];
  columns: GridColDef[];
  setGranularity: (value: string) => void;
  setScaler: (value: string) => void;
}

const CustomFooter: React.FC<{ setGranularity: (value: string) => void; setScaler: (value: string) => void; }> = ({ setGranularity, setScaler }) => {
  const [granularityAnchorEl, setGranularityAnchorEl] = React.useState<null | HTMLElement>(null);
  const [scalerAnchorEl, setScalerAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleGranularityClick = (event: React.MouseEvent<HTMLElement>) => {
    setGranularityAnchorEl(event.currentTarget);
  };

  const handleGranularityClose = (option?: string) => {
    setGranularityAnchorEl(null);
    if (option) {
      setGranularity(option);
    }
  };

  const handleScalerClick = (event: React.MouseEvent<HTMLElement>) => {
    setScalerAnchorEl(event.currentTarget);
  };

  const handleScalerClose = (option?: string) => {
    setScalerAnchorEl(null);
    if (option) {
      setScaler(option);
    }
  };

  return (
    <GridFooterContainer>
      <Box sx={{ flexGrow: 1 }} />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={handleGranularityClick}>
          Resample  
        </Button>
        <Menu
          anchorEl={granularityAnchorEl}
          open={Boolean(granularityAnchorEl)}
          onClose={() => handleGranularityClose()}
        >
          <MenuItem onClick={() => handleGranularityClose('None')}>None</MenuItem>
          <MenuItem onClick={() => handleGranularityClose('min')}>Min</MenuItem>
          <MenuItem onClick={() => handleGranularityClose('mean')}>Mean</MenuItem>
          <MenuItem onClick={() => handleGranularityClose('max')}>Max</MenuItem>

        </Menu>
        <Button variant="contained" color="primary" onClick={handleScalerClick}>
          Scaler
        </Button>
        <Menu
          anchorEl={scalerAnchorEl}
          open={Boolean(scalerAnchorEl)}
          onClose={() => handleScalerClose()}
        >
          <MenuItem onClick={() => handleScalerClose('None')}>None</MenuItem>
          <MenuItem onClick={() => handleScalerClose('z')}>Z-normalize</MenuItem>
          <MenuItem onClick={() => handleScalerClose('minmax')}>Min max</MenuItem>
          <MenuItem onClick={() => handleScalerClose('log')}> Log</MenuItem>


        </Menu>
      </Box>
      <GridFooter sx={{ border: 'none' }} />
    </GridFooterContainer>
  );
};

const DataTable: React.FC<DataTableProps> = ({ data, columns, setGranularity, setScaler }) => {
  const rows = data.map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Table Viewer
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        slots={{
          footer: (props) => <CustomFooter {...props} setGranularity={setGranularity} setScaler={setScaler} />,
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default DataTable;