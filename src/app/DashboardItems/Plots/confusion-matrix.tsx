import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { VegaLite } from "react-vega"
import InfoIcon from "@mui/icons-material/Info"
import { IPlotModel } from "../../../shared/models/plotmodel.model"
import grey from "@mui/material/colors/grey"

interface ILineplot {
  plotData: IPlotModel | null
}

const ConfusionMatrix = (props: ILineplot) => {
  const { plotData } = props

  return (
    <Paper
      className="Category-Item"
      elevation={2}
      sx={{
        borderRadius: 4,
        width: "inherit",
        display: "flex",
        flexDirection: "column",
        rowGap: 0,
        minWidth: "300px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${grey[400]}`,
        }}
      >
        <Typography fontSize={"1rem"} fontWeight={600}>
          {"Confusion Matrix"}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip title={"Description not available"}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ width: "99%", px: 1, py: 1 }}>
        <VegaLite
          actions={false}
          style={{ width: "90%" }}
          spec={{
            width: "container",
            height: 300,
            autosize: { type: "fit", contains: "padding", resize: true },
            data: {
              values: [
                { actual: 1, predicted: 1, count: 1010 },
                { actual: 1, predicted: 0, count: 1120 },
                { actual: 0, predicted: 1, count: 233 },
                { actual: 0, predicted: 0, count: 242 },
              ],
            },
            layer: [
              {
                mark: "rect",
                encoding: {
                  x: {
                    field: "predicted",
                    type: "nominal",
                    title: "Predicted",
                  },
                  y: { field: "actual", type: "nominal", title: "Actual" },
                  color: {
                    field: "count",
                    type: "quantitative",
                    scale: { scheme: "blues" },
                    legend: null,
                  },
                },
              },
              {
                mark: "text",
                encoding: {
                  text: { field: "count", type: "quantitative", format: "d" },
                  color: {
                    condition: {
                      test: "datum.count > 500",
                      value: "white",
                    },
                    value: "black",
                  },
                },
              },
            ],
          }}
        />
      </Box>
    </Paper>
  )
}

export default ConfusionMatrix
