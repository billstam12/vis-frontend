import { Box, Typography } from '@mui/material';
import React from 'react';
import { VegaLite, VisualizationSpec } from 'react-vega';
interface DataExplorationChartProps {
    data: any;
    columns: string[];
}
const DataExplorationChart: React.FC<DataExplorationChartProps> = ({ data,columns }) => {
    const spec: VisualizationSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "width": "container",
        "height": 400,
        "data": {
            "values": data
        },
        "mark": "line",
        "encoding": {
            "x": {
                "field": "timestamp",
                "type": "temporal",
                "title": "Timestamp"
            },
            "y": {
                "field": "value",
                "type": "quantitative",
                "title": "Value"
            },
            "color": {
                "field": "variable",
                "type": "nominal",
                "title": "Variable"
            }
        },
        "transform": [
            {
                "fold": columns.slice(1,4),
                "as": ["variable", "value"]
            }
        ]
    };

    return( 
        <>
            <Typography variant="h6" gutterBottom>
                Linechart Viewer
            </Typography>
            <VegaLite spec={spec} />
        </>
    );
};

export default DataExplorationChart;