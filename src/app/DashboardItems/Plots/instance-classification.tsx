import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import InfoIcon from "@mui/icons-material/Info"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { useEffect, useState } from "react"
import { IPlotModel } from "../../../shared/models/plotmodel.model"
import grey from "@mui/material/colors/grey"
import { useTheme } from "@mui/material"
import { VegaLite } from "react-vega"

interface IInstanceClassification {
  plotModel: IPlotModel | null
  options: string[]
}

const InstanceClassification = (props: IInstanceClassification) => {
const theme = useTheme();
  const getVegaliteData = (plmodel: IPlotModel | null) => {
    if (!plmodel) return []
    const data: { [x: string]: string }[] = []
    plmodel.xAxis.axisValues.map((xval, idx) => {
      plmodel.yAxis.axisValues.map((yVal, yIdx) => {
        data.push({
          [plmodel.xAxis.axisName]: parseFloat(xval),
          [plmodel.yAxis.axisName]: parseFloat(yVal),
          [plmodel.zAxis.axisName === null ? "value" : plmodel.zAxis.axisName]:
            JSON.parse(plmodel.zAxis.axisValues[idx])[yIdx],
        })
      })
    })
    return data
  }

  const { plotModel, options } = props
  const [xAxisOption, setXAxisOption] = useState<string>("")
  const [yAxisOption, setYAxisOption] = useState<string>("")

  useEffect(() => {
    if (options.length > 0) {
      setXAxisOption(options[0])
      setYAxisOption(options[1])
    }
  }, [])

  const handleAxisSelection =
    (axis: string) => (e: { target: { value: string } }) => {
      if (axis === "x") {
        setXAxisOption(e.target.value)
      } else {
        setYAxisOption(e.target.value)
      }
    }

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
          {"Instance Classification"}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip title={"Description not available"}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", px: 1.5 }}>
          <Typography fontSize={"0.8rem"}>x-axis:</Typography>
          <FormControl
            sx={{ m: 1, minWidth: 120, maxHeight: 120 }}
            size="small"
          >
            <Select
              value={xAxisOption}
              sx={{ fontSize: "0.8rem" }}
              onChange={handleAxisSelection("x")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    maxWidth: 300,
                  },
                },
              }}
            >
              {options
                .filter(option => option !== yAxisOption)
                .map(feature => (
                  <MenuItem
                    key={`${plotModel?.plotName}-${feature}`}
                    value={feature}
                  >
                    {feature}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", px: 1.5 }}>
          <Typography fontSize={"0.8rem"}>y-axis:</Typography>
          <FormControl
            sx={{ m: 1, minWidth: 120, maxHeight: 120 }}
            size="small"
          >
            <Select
              value={yAxisOption}
              sx={{ fontSize: "0.8rem" }}
              onChange={handleAxisSelection("y")}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    maxWidth: 300,
                  },
                },
              }}
            >
              {options
                .filter(option => option !== xAxisOption)
                .map(feature => (
                  <MenuItem
                    key={`${plotModel?.plotName}-${feature}`}
                    value={feature}
                  >
                    {feature}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ width: "99%", px: 1 }}>
        <VegaLite
          actions={false}
          style={{ width: "90%" }}
          spec={{
            width: "container",
            autosize: { type: "fit", contains: "padding", resize: true },
            data: {
              values: getVegaliteData(plotModel),
            },
            mark: {
              type: "line",
              tooltip: true,
              point: { size: 100, color: theme.palette.primary.main },
            },
            encoding: {
              x: {
                field: plotModel?.xAxis.axisName || "xAxis default",
                type:
                  plotModel?.xAxis.axisType === "numerical"
                    ? "quantitative"
                    : "ordinal",
                // aggregate: "mean"
              },
              y: {
                field: plotModel?.yAxis.axisName || "yAxis default",
                type:
                  plotModel?.xAxis.axisType === "numerical"
                    ? "quantitative"
                    : "ordinal",
              },
            },
          }}
        />
      </Box>
    </Paper>
  )
}

export default InstanceClassification
