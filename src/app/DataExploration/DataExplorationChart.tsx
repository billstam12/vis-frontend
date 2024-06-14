import React, { useState } from 'react';
import { Box, Paper, Switch, FormControlLabel, Typography, FormControl, Button, InputLabel, Select, MenuItem, OutlinedInput, Chip, TextField } from '@mui/material';
import { VegaLite, VisualizationSpec } from 'react-vega';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'

interface Column {
    field: string;
    headerName: string;
    width: number;
    type: string;
}

interface DataExplorationChartProps {
    data: any[];
    columns: Column[];
    datetimeColumn: string;
}

const DataExplorationChart: React.FC<DataExplorationChartProps> = ({ data, columns, datetimeColumn }) => {
    const selectableColumns = columns.filter(column => column.field !== datetimeColumn);
    const initialSelectedColumn = selectableColumns[0]?.field || "";
    const [selectedColumns, setSelectedColumns] = useState<string[]>([initialSelectedColumn]);
    // const [selectedColumns, setSelectedColumns] = useState<string[]>([selectableColumns[0].field]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<'overlay' | 'stack'>('overlay');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [chartType, setChartType] = useState<'line' | 'bar'>('line');
    
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedColumns(event.target.value as string[]);
        setOpen(false); // Close the dropdown after selection
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleReset = () => {
        setSelectedColumns([initialSelectedColumn]);
        setStartDate(null);
        setEndDate(null);
        setMenuMode('overlay');
    };

    const filteredData = data.filter(item => {
        const itemDate = new Date(item[datetimeColumn]);
        return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
    });

    
    const spec: VisualizationSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "Dynamic data visualization.",
        "width": "container",
        "autosize": { "type": "fit", "contains": "padding", "resize": true },
        "height": 400,
        "data": { "values": filteredData },
        "encoding": {
            "x": { "field": datetimeColumn, "type": "temporal", "title": "Timestamp" },
            "y": { "field": "value", "type": "quantitative", "title": "Value","stack": mode === 'stack' ? 'zero' : null },
            // "y": { "field": selectedColumns, "type": "quantitative", "stack": mode === 'stack' ? 'zero' : null },
            "color": { "field": "variable", "type": "nominal", "title": "Variable" }
        },
        "layer": [
            {
                "mark": chartType === 'line' ? { "type": "line", "interpolate": "linear" } : { "type": "bar" },
                "encoding": {
                    "tooltip": [
                        { "field": "variable", "type": "nominal" },
                        { "field": "value", "type": "quantitative" }
                    ]
                }
            }
        ],
        "transform": [
            {
                "fold": selectedColumns.length > 0 ? selectedColumns : selectableColumns.map(col => col.field),
                "as": ["variable", "value"]
            }
        ]
    };

    return (
        <Paper 
        elevation={2} 
        sx={{ borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
            Linechart Viewer
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-multiple-chip-label">Select Variables</InputLabel>
                <Select
                labelId="demo-multiple-chip-label"
                multiple
                value={selectedColumns}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Select Variables" />}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 224,
                            width: 250,
                        },
                    },
                }}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} onDelete={() => handleChange({
                                target: { value: selected.filter(v => v !== value) } as any
                            } as React.ChangeEvent<{ value: unknown }>)}/>
                        ))}
                    </Box>
                )}>
                    {selectableColumns.map((column) => (
                        <MenuItem key={column.field} value={column.field}>
                            {column.headerName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newDate: Date | null) => setStartDate(newDate)}
                />
                <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newDate: Date | null) => setEndDate(newDate)}
                />
            </LocalizationProvider>
            <FormControlLabel
            control={
                <Switch
                checked={mode === 'stack'}
                onChange={(event) => setMode(event.target.checked ? 'stack' : 'overlay')}
                name="modeSwitch"
                color="primary"
                />
            }         
        label={mode.charAt(0).toUpperCase() + mode.slice(1)} // Capitalizes the first letter of the mode
        />
        <FormControlLabel
        control={<Switch checked={chartType === 'bar'} onChange={(event) => setChartType(event.target.checked ? 'bar' : 'line')} name="chartTypeSwitch" color="primary" />}
        label={chartType.charAt(0).toUpperCase() + chartType.slice(1)}
        />
        <Button 
        variant="text" 
        onClick={handleReset} 
        sx={{ ml: 2 }} 
        size="small"
        >
        Reset View
        </Button>
        </Box>
                
            <VegaLite
            spec={spec} 
    style={{ width: "100%" }} />
    </Paper>
    );
};

export default DataExplorationChart;

function setMenuMode(arg0: string) {
    throw new Error('Function not implemented.');
}

