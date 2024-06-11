import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import InfoIcon from "@mui/icons-material/Info"
import { useEffect, useState } from "react"
import Grid from "@mui/material/Grid"
import grey from "@mui/material/colors/grey"
import { green, red } from "@mui/material/colors"

interface ITableComponent {
  plotModel: any[]
  selectedModel: number
}

const ModelStatistics = (props: ITableComponent) => {
  const { plotModel, selectedModel } = props
  const [statistics, setStatistics] = useState<any>({})

  useEffect(() => {
    const selectedModelInfo = plotModel.filter((plot: any) => plot.id === selectedModel)[0]
    const restModelInfo = plotModel.filter((plot: any) => plot.id !== selectedModel)
    const restModelGroupedInfo = restModelInfo.reduce((acc: any, curval: any) => (
      {...acc, precision: [...acc.precision, curval.precision],
      runtime: [...acc.runtime, curval.runtime],
      recall: [...acc.recall, curval.recall],
      accuracy: [...acc.accuracy, curval.accuracy]
    }
    ), {precision: [], runtime: [], recall: [], accuracy: []})
    const finalStatistics = {avgPrecision: restModelGroupedInfo.precision.reduce((acc: number, curval: number, arr: []) => acc + curval, 0) / restModelGroupedInfo.precision.length,
    avgRuntime: restModelGroupedInfo.runtime.reduce((acc: number, curval: number) => acc + curval, 0) / restModelGroupedInfo.runtime.length,
    avgRecall: restModelGroupedInfo.recall.reduce((acc: number, curval: number) => acc + curval, 0) / restModelGroupedInfo.recall.length,
    avgAccuracy: restModelGroupedInfo.accuracy.reduce((acc: number, curval: number) => acc + curval, 0) / restModelGroupedInfo.accuracy.length}
    console.log(finalStatistics)
    const final = {
      row1: [
        {name: "Precision", value: selectedModelInfo.precision, avgDiff: (selectedModelInfo.precision/finalStatistics.avgPrecision * 100) - 100},
        {name: "Runtime", value: selectedModelInfo.runtime, avgDiff: (selectedModelInfo.runtime/finalStatistics.avgRuntime * 100) - 100},
      ],
      row2: [
        {name: "Recall", value: selectedModelInfo.recall, avgDiff: (selectedModelInfo.recall/finalStatistics.avgRecall * 100) - 100},
        {name: "Accuracy", value: selectedModelInfo.accuracy, avgDiff: (selectedModelInfo.accuracy/finalStatistics.avgAccuracy * 100) - 100}
      ]
    }
    setStatistics(final)
  }, [])

  const plotInfo = plotModel.filter((plot: any) => plot.id === 71)[0]

  return (
    <>
      <Paper
        className="Category-Item"
        elevation={2}
        sx={{
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          rowGap: 0,
          minWidth: "300px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: 1.5, pt: 1.5, display: "flex", alignItems: "center", borderBottom: `1px solid ${grey[400]}` }}>
          <Typography fontSize={"1rem"} fontWeight={600}>
            {"Model Statistics"}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Tooltip title={"Model Statistics"}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Grid sx={{ p: 2 }} container spacing={3}>
          {Object.keys(statistics).map((key: string) => (
            <Grid xs={12} item container spacing={2}>
            {statistics[key].map((metric: any) => (<Grid xs={12} md={6} item>
              <Paper sx={{p: 2}}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight={600}>{metric.name}</Typography>
                  <Typography sx={{color: metric.avgDiff > 0 ? green[400] : red[400]}}>{parseInt(metric.avgDiff)}%</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography fontSize={22}>{parseFloat(metric.value).toFixed(3)}</Typography>
                </Box>
              </Paper>
            </Grid>))}
          </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}
export default ModelStatistics
