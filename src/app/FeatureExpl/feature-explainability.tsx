import Box from "@mui/material/Box"
import { useAppDispatch, useAppSelector } from "../../store/store"
import LinePlot from "../DashboardItems/Plots/line-plot"
import TableComponent from "../DashboardItems/Tables/table"
import ParallelCoordinatePlot from "../DashboardItems/Plots/parallel-coordinate-plot"
import ComparativeEvaluation from "../DashboardItems/Tables/comparativeEvaluation"
import Grid from "@mui/material/Grid"
import { Typography } from "@mui/material"
import ContourPlot from "../DashboardItems/Plots/contour-plot"
import ScatterPlot from "../DashboardItems/Plots/scatter-plot"
import InstanceClassification from "../DashboardItems/Plots/instance-classification"
import ConfusionMatrix from "../DashboardItems/Plots/confusion-matrix"

const FeatureExplainability = () => {
  const { explInitialization } = useAppSelector(state => state.explainability)
  const dispatch = useAppDispatch()

  return (
    <>
    {console.log(explInitialization)}
      {explInitialization ? (
        <Box
          sx={{
            px: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: 4,
            my: "3rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: "1.5rem" }}
            >
              Experiment Variant 71:
            </Typography>
            <Typography variant="body1">Classification Report</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InstanceClassification
                key={`instance-classification`}
                plotData={
                  explInitialization.featureExplanation.modelMetrics
                }
              />
            </Grid>
            <Grid container item xs={12} md={6} spacing={2}>
              <Grid item xs={12}>
                <ConfusionMatrix
                  key={`confusion-matrix`}
                  plotData={
                    null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <LinePlot
                  key={`ale-plot`}
                  plotModel={
                    explInitialization.hyperparameterExplanation.plots.ale ||
                    null
                  }
                  options={
                    explInitialization.hyperparameterExplanation
                      .hyperparameterNames
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: "1.5rem" }}
            >
              Experiment Variant 71:
            </Typography>
            <Typography variant="body1">Features Explainability</Typography>
          </Box>
        </Box>
      ) : null}
    </>
  )
}
export default FeatureExplainability
