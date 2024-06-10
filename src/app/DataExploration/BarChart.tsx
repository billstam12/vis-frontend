import React from 'react';
import { VegaLite, VisualizationSpec } from 'react-vega';

const BarChart = ({ data, datetimeColumn, columns }) => {
    const spec: VisualizationSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "width": "container",
        "height": 400,
        "data": { "values": data },
        "mark": "bar",
        "encoding": {
            "x": { "field": datetimeColumn, "type": "temporal", "title": "Time" },
            "y": { "field": columns[0], "type": "quantitative" },
            "color": { "field": "category", "type": "nominal" }
        }
    };

    return <VegaLite spec={spec} />;
};

export default BarChart;
