// import React, { useState } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { VegaLite } from 'react-vega'; 
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// const DataExplainability = () => {
//   const theme = useTheme();
//   const info = theme.palette.info.light;

//   const [selectedGraph, setSelectedGraph] = useState(0); // Initially select the first graph (index 0)
//   const handleChange = (event: SelectChangeEvent) => {
//     setSelectedGraph(event.target.value as number);
//   };
//   const vegaLiteSpecs = [
//     {
//       description: 'A simple bar chart',
//       data: {
//         values: [
//           { day: 'Mo', value: 80 },
//           { day: 'Tu', value: 95 },
//           { day: 'We', value: 70 },
//           { day: 'Th', value: 42 },
//           { day: 'Fr', value: 65 },
//           { day: 'Sa', value: 55 },
//           { day: 'Su', value: 78 }
//         ]
//       },
//       mark: 'line',
//       encoding: {
//         x: { field: 'day', type: 'ordinal' },
//         y: { field: 'value', type: 'quantitative' },
//         color: { value: info }
//       }
//     },
//     {
//       description: 'Another simple bar chart',
//       data: {
//         values: [
//           { month: 'Jan', value: 100 },
//           { month: 'Feb', value: 150 },
//           { month: 'Mar', value: 120 },
//           { month: 'Apr', value: 180 },
//           { month: 'May', value: 90 },
//           { month: 'Jun', value: 110 },
//           { month: 'Jul', value: 130 }
//         ]
//       },
//       mark: 'bar',
//       encoding: {
//         x: { field: 'month', type: 'ordinal' },
//         y: { field: 'value', type: 'quantitative' },
//         color: { value: info }
//       }
//     }
//   ];

//   const handleGraphChange = (event) => {
//     setSelectedGraph(Number(event.target.value));
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        
//         <Select value={selectedGraph} label="Age"onChange={handleGraphChange}>
//         <MenuItem value={0}>Ten</MenuItem>
//           <MenuItem value={1}>Twenty</MenuItem>
//         </Select>
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <VegaLite spec={vegaLiteSpecs[selectedGraph]} />
//       </div>
//     </div>
//   );
// };

// export default DataExplainability;



import React, { Dispatch, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../store/data/dataAPI";
import { AppDispatch } from "../store";

const DataExplainability = () => {

  const dispatch = useDispatch<AppDispatch>();
  const Data = useSelector((state: any) => state.data.data);
  const loading = useSelector((state: any) => state.data.loading);
  const error = useSelector((state: any) => state.data.error);
  const ok=fetchData('f');
  console.log("ok",);
  console.log('Data',Data);


};
export default DataExplainability;
