import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { fetchDataExploration } from '../../store/slices/dataExplorationSlice';
import DataTable from './DataTable';
import { Box, CircularProgress, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import DataExplorationChart from './DataExplorationChart';
import { IDataExplorationRequest } from '../../shared/models/dataexploration.model';

const DataExploration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dataExploration, loading, error } = useSelector((state: RootState) => state.dataExploration);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const requestData = {
      datasetId: "file:///home/pgidarakos/OLDIES/CSVSXXP/ale_features.csv",
      columns: ["values"],
      aggFunction: "l",
      filters: [
        // {
        //   column: "dns_interlog_time_q3",
        //   type: "range",
        //   value: {
        //     min: 0.03597122302158273,
        //     max: 0.13697122302158273,
        //   },
        // },
      ],
      limit: 30,
      scaler: "z",
    } as IDataExplorationRequest;
    dispatch(fetchDataExploration(requestData));
  }, []);

  useEffect(() => {
    if (dataExploration) {
      console.log("pamedata",dataExploration);
      const parsedData = JSON.parse(
        dataExploration.data);
      setData(parsedData);
      
      const columnNames = Object.keys(parsedData[0]);
      const gridColumns: GridColDef[] = columnNames.map((name) => ({
        field: name,
        headerName: name,
        width: 200,
      }));
      setColumns(gridColumns);
    }
  }, [dataExploration]);

  return (
    <Box>
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Data Exploration
      </Typography>
      {loading === "true" && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}
    {dataExploration && <DataTable data={data} columns={columns} />}

    </Box>
   
  </Box>
  );
};

export default DataExploration;