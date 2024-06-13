import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import InfoIcon from "@mui/icons-material/Info"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IPlotModel } from "../../../shared/models/plotmodel.model"
import grey from "@mui/material/colors/grey"
import { Checkbox, useTheme } from "@mui/material"
import { VegaLite } from "react-vega"
import _ from "lodash"

interface IInstanceClassification {
  plotData: any
  point: any;
  setPoint: Dispatch<SetStateAction<any>>
}

const InstanceClassification = (props: IInstanceClassification) => {
  const theme = useTheme()
  const { plotData, setPoint, point } = props
  const [options, setOptions] = useState<string[]>([])
  const [xAxisOption, setXAxisOption] = useState<string>("")
  const [yAxisOption, setYAxisOption] = useState<string>("")
  const [checkbox, setCheckbox] = useState<boolean>(false)

  const getVegaData = (data: any) => {
    let newData: any[] = _.cloneDeep(data)
    if (checkbox) {
      newData = newData.filter(d => d.label !== d.predicted)
    }
    return newData
  }

  useEffect(() => {
    if (plotData.length > 0) {
      setOptions(Object.keys(plotData[0]))
    }
  }, [])

  useEffect(() => {
    if (options.length > 0) {
      setXAxisOption(options[0])
      setYAxisOption(options[1])
    }
  }, [options])

  const handleAxisSelection =
    (axis: string) => (e: { target: { value: string } }) => {
      if (axis === "x") {
        setXAxisOption(e.target.value)
      } else {
        setYAxisOption(e.target.value)
      }
    }

  const handleCheckboxChange = (event: React.ChangeEvent) => {
    setCheckbox((event.target as HTMLInputElement).checked)
    setPoint(null)
  }

  const handleNewView = (view: any) => {
    view.addEventListener("click", (event: any, item: any) => {
      if (item && item.datum) {
        setPoint(item.datum)
      } else {
        setPoint(null)
      }
    })
  }

  return (
    <>
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
          <Tooltip title={"An instance classification plot is a visualization used to depict the performance of a classification model on individual data instances."}>
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
                  .map((feature, idx) => (
                    <MenuItem key={`xAxis-${feature}-${idx}`} value={feature}>
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
                  .map((feature, idx) => (
                    <MenuItem key={`yAxis-${feature}-${idx}`} value={feature}>
                      {feature}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            px: 1.5,
          }}
        >
          <Typography fontSize={"0.8rem"}>Missclasified Instances:</Typography>
          <Checkbox checked={checkbox} onChange={handleCheckboxChange} />
        </Box>
        <Box sx={{ width: "99%", px: 1 }}>
          {options && (
            <VegaLite
              actions={false}
              style={{ width: "90%", height: 500 }}
              onNewView={handleNewView}
              spec={{
                width: "container",
                height: "container",
                autosize: { type: "fit", contains: "padding", resize: true },
                data: {
                  values: getVegaData(plotData),
                },
                params: [
                  {
                    name: "pts",
                    select: "point",
                  },
                  {
                    name: "panZoom",
                    select: "interval",
                    bind: "scales",
                  },
                ],
                mark: {
                  type: "point",
                  filled: true,
                  tooltip: true,
                  size: 100,
                  color: theme.palette.primary.main,
                },
                encoding: {
                  x: {
                    field: xAxisOption || "xAxis default",
                    type: "quantitative",
                  },
                  y: {
                    field: yAxisOption || "yAxis default",
                    type: "quantitative",
                  },
                  color: {
                    condition: {
                      param: "pts",
                      field: "label",
                      type: "ordinal",
                      scale: { scheme: "category10" },
                      legend: null,
                    },
                    value: "grey",
                  },
                },
              }}
            />
          )}
        </Box>
      </Paper>
    </>
  )
}

export default InstanceClassification
