import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { VegaLite } from "react-vega"
import { fetchPdpPipeline } from "../../store/slices/explainabilitySlice"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import grey from "@mui/material/colors/grey"

const createData = (data: any, xName: string, yName: string) => {
  const xAxis = JSON.parse(data.pdphpval)[0]
  const yAxis = JSON.parse(data.pdpvalues)[0]
  const finalForm = xAxis.map((val: any, index: number) => {
    return { [xName]: val, [yName]: yAxis[index] }
  })
  return finalForm
}

const DashboadItems = () => {
  const { pdppipeline } = useAppSelector(
    (state: RootState) => state.explainability,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchPdpPipeline({
        xaitype: "pipeline",
        method: "pdp",
        feature1: "Model__lr",
        feature2: "null",
      }),
    )
  }, [])

  useEffect(() => {
    if (pdppipeline) {
      console.log(createData(pdppipeline, "Model__lr", "Values"))
    }
  }, [pdppipeline])

  return (
    <Grid container sx={{ px: 5, display: "flex", justifyContent: "center" }}>
      <Grid item sx={{ width: ["100%", "85%"] }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 4,
            p: 3,
            width: "100%",
            bgcolor: grey[300],
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          <Box className="Item-Title">
            <Typography fontSize={"1.5rem"}>
              Hyperparameter Explainability
            </Typography>
          </Box>
          <Box className="Items-Container" sx={{ display: "flex", justifyContent: "space-around", py: 3, flexWrap: 'wrap', gap: 4 }}>
            <Paper
              className="Category-Item"
              elevation={2}
              sx={{ borderRadius: 2, width: "max-content", display: "flex", flexDirection: "column", rowGap: 2}}
            >
              <Box sx={{ p: 1.5 }}>
                <Typography fontSize={"0.8rem"}>
                  Partial Dependence Plot (PDP)
                </Typography>
              </Box>
              <Box sx={{px: 2}}>
                {pdppipeline !== null && (
                  <VegaLite
                    actions={false}
                    spec={{
                      width: 300,
                      height: 200,
                      data: {
                        values: createData(pdppipeline, "Model__lr", "Values"),
                      },
                      mark: { type: "line", tooltip: true },
                      encoding: {
                        x: { field: "Model__lr", type: "nominal" },
                        y: { field: "Values", type: "quantitative" },
                      },
                    }}
                  />
                )}
              </Box>
            </Paper>
            <Paper
              className="Category-Item"
              elevation={2}
              sx={{ borderRadius: 4, width: "max-content", display: "flex", flexDirection: "column", rowGap: 2,}}
            >
              <Box sx={{ p: 1.5 }}>
                <Typography fontSize={"0.8rem"}>
                  Partial Dependence Plot (PDP)
                </Typography>
              </Box>
              <Box sx={{px: 2}}>
                {pdppipeline !== null && (
                  <VegaLite
                    actions={false}
                    spec={{
                      width: 300,
                      height: 200,
                      data: {
                        values: createData(pdppipeline, "Model__lr", "Values"),
                      },
                      mark: { type: "line", tooltip: true },
                      encoding: {
                        x: { field: "Model__lr", type: "nominal" },
                        y: { field: "Values", type: "quantitative" },
                      },
                    }}
                  />
                )}
              </Box>
            </Paper>
            <Paper
              className="Category-Item"
              elevation={2}
              sx={{ borderRadius: 4, width: "max-content", display: "flex", flexDirection: "column", rowGap: 2}}
            >
              <Box sx={{ p: 1.5 }}>
                <Typography fontSize={"0.8rem"}>
                  Partial Dependence Plot (PDP)
                </Typography>
              </Box>
              <Box sx={{px: 2}}>
                {pdppipeline !== null && (
                  <VegaLite
                    actions={false}
                    spec={{
                      width: 300,
                      height: 200,
                      data: {
                        values: createData(pdppipeline, "Model__lr", "Values"),
                      },
                      mark: { type: "line", tooltip: true },
                      encoding: {
                        x: { field: "Model__lr", type: "nominal" },
                        y: { field: "Values", type: "quantitative" },
                      },
                    }}
                  />
                )}
              </Box>
            </Paper>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default DashboadItems
