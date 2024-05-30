import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { Vega } from "react-vega"
import InfoIcon from "@mui/icons-material/Info"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { SetStateAction, useEffect, useState } from "react"
import FormControl from "@mui/material/FormControl"
import { IPlotModel } from "../../../shared/models/plotmodel.model"
import { useAppDispatch } from "../../../store/store"
import { fetchExplanation } from "../../../store/slices/explainabilitySlice"

interface ILineplot {
  width: string
  plotModel: IPlotModel | null
  options: string[]
}

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
  console.log(data)
  return data
}

const ContourPlot = (props: ILineplot) => {
  const { width, plotModel, options } = props
  const dispatch = useAppDispatch()
  const [selectedFeature1, setSelectedFeature1] = useState<string>("")
  const [selectedFeature2, setSelectedFeature2] = useState<string>("")

  useEffect(() => {
    if (options.length > 0) {
      setSelectedFeature1(options[0])
      setSelectedFeature2(options[1])
    }
  }, [])

  const handleFeatureSelection =
    (plmodel: IPlotModel | null, featureNumber: number) =>
    (e: { target: { value: string } }) => {
      dispatch(
        fetchExplanation({
          explanationType: plmodel?.explainabilityType || "",
          explanationMethod: plmodel?.explanationMethod || "",
          model: plmodel?.explainabilityModel || "",
          feature1:
            featureNumber === 1 ? e.target.value : selectedFeature1 || "",
          feature2:
            featureNumber === 2 ? e.target.value : selectedFeature2 || "",
        }),
      )
      featureNumber === 1
        ? setSelectedFeature1(e.target.value)
        : setSelectedFeature2(e.target.value)
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
          {plotModel?.plotName || "Plot name"}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip title={plotModel?.plotDescr || "Description not available"}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", px: 1.5 }}>
        <Typography fontSize={"0.8rem"}>
          {plotModel?.explainabilityType === "featureExplanation"
            ? "Select Feature:"
            : "Select Hyperparameter 1"}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 120 }} size="small">
          <Select
            value={selectedFeature1}
            sx={{ fontSize: "0.8rem" }}
            onChange={handleFeatureSelection(plotModel, 1)}
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
              .filter(option => option !== selectedFeature2)
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
        <Typography fontSize={"0.8rem"}>
          {plotModel?.explainabilityType === "featureExplanation"
            ? "Select Feature:"
            : "Select Hyperparameter 2"}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 120 }} size="small">
          <Select
            value={selectedFeature2}
            sx={{ fontSize: "0.8rem" }}
            onChange={handleFeatureSelection(plotModel, 2)}
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
              .filter(option => option !== selectedFeature1)
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
      <Box sx={{ width: "99%", px: 1 }}>
        <Vega
          actions={false}
          style={{ width: "90%" }}
          spec={{
            width: "container",
            // autosize: { type: "fit", contains: "padding", resize: true },
            data: {
              values: getVegaliteData(plotModel),
            },
            mark: { type: "rect", tooltip: true},
            encoding: {
              x: {
                field: plotModel?.xAxis.axisName || "xAxis default",
                type: "ordinal",
              },
              y: {
                field: plotModel?.yAxis.axisName || "yAxis default",
                type: "ordinal",
              },
              color: {
                field:
                  plotModel?.zAxis.axisName === null
                    ? "value"
                    : plotModel?.zAxis.axisName,
                type: "quantitative",
                // aggregate: "mean",
              },
            },
            config: {
              axis: { grid: true, tickBand: "extent" },
            },
          }}
        />
      </Box>
    </Paper>
  )
}

export default ContourPlot
