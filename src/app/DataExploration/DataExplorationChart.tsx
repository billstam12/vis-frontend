// components/DataExplorationChart.tsx

import React from 'react';
import { VegaLite } from 'react-vega';

const DataExplorationChart: React.FC<{ data: any }> = ({ data }) => {
    const spec = {
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
                "fold": [ "dns_interlog_time_q2", "dns_interlog_time_q3"],
                "as": ["variable", "value"]
            }
        ]
    };

    return <VegaLite spec={spec} />;
};

export default DataExplorationChart;


