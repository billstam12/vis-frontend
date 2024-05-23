import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { VegaLite } from "react-vega"
import InfoIcon from "@mui/icons-material/Info"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { SetStateAction, useState } from "react"
import FormControl from "@mui/material/FormControl"

interface ILineplot {
  width: string
}

const LinePlot = (props: ILineplot) => {
  const { width } = props
  const [selectedFeature, setSelectedFeature] = useState<string>("Feature 1")
  const featureList = ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]

  const handleFeatureSelection = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedFeature(e.target.value)
  }

  return (
    <Paper
      className="Category-Item"
      elevation={2}
      sx={{
        borderRadius: 4,
        width: width,
        display: "flex",
        flexDirection: "column",
        rowGap: 0,
        minWidth: "300px",
      }}
    >
      <Box sx={{ px: 1.5, pt: 1.5, display: "flex", alignItems: "center" }}>
        <Typography fontSize={"1rem"} fontWeight={600}>
          Plot name
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip title="This is going to contain the description of the plot that its been visualized">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", px: 1.5 }}>
        <Typography fontSize={"0.8rem"}>Select Feature:</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedFeature}
            sx={{ fontSize: "0.8rem" }}
            onChange={handleFeatureSelection}
          >
            {featureList.map(feature => (
              <MenuItem value={feature}>{feature}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "99%", px:1 }}>
        <VegaLite
          actions={false}
          style={{ width: "90%"}}
          spec={{
            width: 'container',
            autosize: { type: "fit", contains: "padding", resize: true},
            // height: 200,
            data: {
              values: [
                { a: "A", b: 28 },
                { a: "B", b: 55 },
                { a: "C", b: 43 },
                { a: "D", b: 91 },
                { a: "E", b: 81 },
                { a: "F", b: 53 },
                { a: "G", b: 19 },
                { a: "H", b: 87 },
                { a: "I", b: 52 },
              ],
            },
            mark: { type: "line", tooltip: true, point: { size: 100 } },
            encoding: {
              x: { field: "a", type: "nominal" },
              y: { field: "b", type: "quantitative" },
            },
          }}
        />
      </Box>
    </Paper>
  )
}

export default LinePlot
