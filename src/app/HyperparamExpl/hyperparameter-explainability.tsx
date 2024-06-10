import Box from "@mui/material/Box"
import { useAppDispatch, useAppSelector } from "../../store/store"
import LinePlot from "../DashboardItems/Plots/line-plot"
import ContourPlot from "../DashboardItems/Plots/contour-plot"
import ParallelCoordinatePlot from "../DashboardItems/Plots/parallel-coordinate-plot"
import ComparativeEvaluation from "../DashboardItems/Tables/comparative-evaluation"
import Grid from "@mui/material/Grid"

const HyperparameterExplainability = () => {
  const { explInitialization } = useAppSelector(state => state.explainability)

  return (
    <>
      {explInitialization ? (
        <Box
          sx={{
            px: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 4,
            my: "3rem",
          }}
        >
          {/* <Box sx={{ display: "flex", gap: 4, flexFlow: "wrap" }}> */}
            <ComparativeEvaluation width={"100%"} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ContourPlot
                  key={`2dpdp-plot`}
                  plotModel={
                    explInitialization.hyperparameterExplanation.plots["2dpdp"] ||
                    null
                  }
                  options={
                    explInitialization.hyperparameterExplanation
                      .hyperparameterNames
                  }
                />
              </Grid>
              <Grid container item xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                  <LinePlot
                    key={`pdp-plot`}
                    plotModel={
                      explInitialization.hyperparameterExplanation.plots.pdp ||
                      null
                    }
                    options={
                      explInitialization.hyperparameterExplanation
                        .hyperparameterNames
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
            
        </Box>
      ) : null}
    </>
  )
}
export default HyperparameterExplainability
