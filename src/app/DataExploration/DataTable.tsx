import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import MinimizeIcon from '@mui/icons-material/Minimize';
import FullscreenIcon from '@mui/icons-material/Fullscreen';


interface DataTableProps {
  data: any[];
  columns: GridColDef[];
  onUpdateData: (newData: any[]) => void;
  onResetData: () => void;  // Add this line

}


const DataTable: React.FC<DataTableProps> = ({ data, columns,onUpdateData,onResetData }) => {
  const rows = data.map((row, index) => ({
    id: index + 1,
    ...row,
  }));
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    setIsVisible(!isVisible); // Toggles visibility
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized); // Toggles maximization for the table
  };

  const tableStyle = isMaximized ? { height: '90vh', width: '100%' } : { height: 400, width: '100%' };

  const CustomToolbar = ({ onUpdateData, selectedRows, onResetData }) => {
   
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
        <GridToolbar />
        
        <Button
        variant="text"
        color="primary"
        onClick={() => onUpdateData(selectedRows)}
        // style={{ margin: '0 20px' }}
        size="small"

        >
          Show Selected
        </Button>
        <Button
        variant="text"
        color="primary"
        onClick={onResetData}  // This uses the onResetData function passed as a prop
        // style={{ margin: '0 20px' }}
        size="small"
        >
          Reset View
        </Button>
        <Box>
          <IconButton onClick={handleMinimize} size="large">
            <MinimizeIcon />
          </IconButton>
          <IconButton onClick={handleMaximize} size="large">
            {isMaximized ? <FullscreenIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>
     </Box>
    );
  };
  
  useEffect(() => {
    console.log('Data:', data); // Log the current state of data
  }, [data]);

  useEffect(() => {
    console.log('Columns:', columns); // Log the current state of columns
  }, [columns]);

  if (!isVisible) return <IconButton onClick={handleMinimize}><MinimizeIcon /></IconButton>;

 
  return (
    <Paper sx={{ borderRadius: 2, minWidth: 300 }}>

    <Box sx={{ display: isVisible ? 'block' : 'none', ...tableStyle }}>
    <Typography variant="h6" gutterBottom>
        Table Viewer
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        slots={{
          toolbar: () => <CustomToolbar onUpdateData={onUpdateData} selectedRows={selectedRows} onResetData={onResetData}  // Pass the reset function as a prop
          />
        }}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) =>
            selectedIDs.has(row.id),
          );
          setSelectedRows(selectedRows);
        }}
        {...rows}
      />
    </Box>
    </Paper>
  );
};

export default DataTable;



