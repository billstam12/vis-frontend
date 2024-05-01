// import React from 'react';
// import { Theme } from '@mui/material/styles';
// // import Sidebar from './Sidebar';
// // import DashboardContent from './DashboardContent';
// import { createStyles, makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//     },
//   })
// );

// const DashTroll: React.FC = () => {
//   const classes = useStyles();

//   return (
//     <div >
//     <h1>This is the dashtroll/This is the dashtroll/This is the dashtroll</h1>
//     </div>
//   );
// };

// export default DashTroll;


import React from 'react';
import { useTheme } from '@mui/material/styles';
import { VegaLite } from 'react-vega'; 
import { Mark } from 'vega';

// import Sidebar from './Sidebar';

const DataExplainability = () => {
  const theme = useTheme();

  const info = theme.palette.info.light;

  const vegaLiteSpec = {
    // $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A simple bar chart',
    data: {
      values: [
        { day: 'Mo', value: 80 },
        { day: 'Tu', value: 95 },
        { day: 'We', value: 70 },
        { day: 'Th', value: 42 },
        { day: 'Fr', value: 65 },
        { day: 'Sa', value: 55 },
        { day: 'Su', value: 78 }
      ]
    },
    mark: 'line',
    encoding: {
      x: { field: 'day', type: 'ordinal' },
      y: { field: 'value', type: 'quantitative' },
      color: { value: info }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Adjust max-width as needed */}
      <VegaLite spec={vegaLiteSpec} />
    </div>
  );
};

export default DataExplainability;
