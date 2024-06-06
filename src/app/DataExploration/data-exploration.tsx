import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchDataExploration } from '../../store/slices/dataExplorationSlice';
import DataTable from './DataTable';
import { Box, Button, CircularProgress, Menu, MenuItem, TextField, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { IDataExplorationRequest } from '../../shared/models/dataexploration.model';
import DataExplorationChart from './DataExplorationChart';

const DataExploration: React.FC = () => {
  const { dataExploration, loading, error } = useAppSelector(state => state.dataExploration);
  const dispatch = useAppDispatch();


  useEffect(() => {
    console.log("Data Exploration State: ", dataExploration);
    console.log("Loading State: ", loading);
    console.log("Error State: ", error);
}, [dataExploration, loading, error]);

  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [granularity, setGranularity] = useState<string>('null');
  const [scaler, setScaler] = useState<string>('null');
  const [useCase, setUseCase] = useState<string>('1');
  const [folder, setFolder] = useState<string>('input_data');
  const [subfolder, setSubfolder] = useState<string>('electrical_data');
  const [filename, setFilename] = useState<string>('test.csv');
  // const [cols,setCols]=useState<any[]>(["timestamp","dns_interlog_time_q1","dns_interlog_time_q2","dns_interlog_time_q3"])
  const [cols,setCols]=useState<any[]>([])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fetchData = () => {
    const datasetId = `zenoh://${useCase}/${folder}/${subfolder}/${filename}`;
    const requestData = {
      datasetId: datasetId,
      columns: cols,
      aggFunction: granularity,
      filters: [],
      limit: 1000,
      scaler: scaler,
    } as IDataExplorationRequest;
    dispatch(fetchDataExploration(requestData));
    handleMenuClose();
  };

  useEffect(() => {
    if (dataExploration) {
      const parsedData = JSON.parse(dataExploration.data);
      setData(parsedData);

      const gridColumns: GridColDef[] = dataExploration.columns.map(col => ({
            field: col.name,
            headerName: col.name,
            width: 200
        }));
        setColumns(gridColumns);
    }
}, [dataExploration]);

  const handleUseCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseCase(event.target.value);
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolder(event.target.value);
  };

  const handleSubfolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubfolder(event.target.value);
  };


  const handleFilenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [cols,granularity,scaler]);



  

  return (

   
    <Box
      sx={{
        px: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        my: "3rem",
      }}
      >    
      <Box sx={{ display: "flex", gap: 4, flexFlow: "wrap" }}>
        <Button variant="contained" onClick={handleMenuClick}>
          Actions
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          >
          <MenuItem>
          <TextField
            label="Use Case"
            value={useCase}
            onChange={handleUseCaseChange}
            sx={{ mb: 2 }}
          />
          </MenuItem>
          <MenuItem>
            <TextField
              label="Folder"
              value={folder}
              onChange={handleFolderChange}
              sx={{ mb: 2 }}
            />
          </MenuItem>
          <MenuItem>
          <TextField
            label="Subfolder"
            value={subfolder}
            onChange={handleSubfolderChange}
            sx={{ mb: 2 }}
          />
          </MenuItem>
          <MenuItem>
            <TextField
              label="Filename"
              value={filename}
              onChange={handleFilenameChange}
              sx={{ mb: 2 }}
            />
          </MenuItem>
          <MenuItem>
            <Button variant="contained" onClick={fetchData}>
              Fetch Data
            </Button>
          </MenuItem>
            
        </Menu>
        {loading && <CircularProgress />}
        {error && <Typography color="error">Error: {error}</Typography>}
        {data.length>0 && (
          <>
            <DataTable data={JSON.parse(dataExploration.data)} columns={dataExploration.columns.map(col => ({
              field: col.name,
              headerName: col.name,
              width: 200
              }))} setGranularity={setGranularity} setScaler={setScaler} />
          </>

        )}
      </Box>
      {loading  && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}
      {data.length>0 && (
        <>
          <DataExplorationChart data={JSON.parse(dataExploration.data)} columns={ dataExploration.columns.map(col => ({
              field: col.name,
              headerName: col.name,
              width: 200
          })).map((column) => column.field)} />
        </>
      )}

        
      
  </Box>
    
  );
};

export default DataExploration;









