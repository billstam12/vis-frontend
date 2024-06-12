import Box from "@mui/material/Box"
import { useAppDispatch, useAppSelector } from "../../store/store"
import LinePlot from "../DashboardItems/Plots/line-plot"
import Grid from "@mui/material/Grid"
import { Typography } from "@mui/material"
import InstanceClassification from "../DashboardItems/Plots/instance-classification"
import ConfusionMatrix from "../DashboardItems/Plots/confusion-matrix"
import { useState } from "react"
import CounterfactualsTable from "../DashboardItems/Tables/counterfactuals-table"
import ClassificationStatistics from "../DashboardItems/Tables/model-statistics"

interface IFeatureExplainability {
  variantId: number
}

const FeatureExplainability = (props: IFeatureExplainability) => {
  const { explInitialization } = useAppSelector(state => state.explainability)
  const { variantId } = props
  const [point, setPoint] = useState(null)
  const dispatch = useAppDispatch()

  return (
    <>
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
              columnGap: 1,
              rowGap: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: "1.5rem" }}
            >
            Summary
            </Typography>
                <ClassificationStatistics
                  key={`ale-plot`}
                  variantId={variantId}
                  plotModel={explInitialization.hyperparameterExplanation.pipelineMetrics}
                />
            </Box>
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
              Experiment Variant {variantId}:
            </Typography>
            <Typography variant="body1">Classification Report</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InstanceClassification
                key={`instance-classification`}
                point={point}
                setPoint={setPoint}
                plotData={explInitialization.featureExplanation.modelInstances}
              />
            </Grid>
            {/* <Grid container item xs={12}  spacing={2}> */}
              <Grid item md={6} xs={12}>
                {point ? (
                  <CounterfactualsTable
                    key={`counterfactuals-table`}
                    plotModel={
                      explInitialization.featureExplanation.tables
                        .counterfactuals
                    }
                    width={"auto"}
                  />
                ) : (
                  <ConfusionMatrix key={`confusion-matrix`} metrics={explInitialization.hyperparameterExplanation.pipelineMetrics} variantId={variantId} />
                )}
              {/* </Grid> */}
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
              Experiment Variant {variantId}:
            </Typography>
            <Typography variant="body1">Features Explainability</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LinePlot
                key={`pdp-plot`}
                plotModel={
                  explInitialization.featureExplanation.plots.pdp || null
                }
                options={explInitialization.featureExplanation.featureNames}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LinePlot
                key={`ale-plot`}
                plotModel={
                  explInitialization.featureExplanation.plots.ale || null
                }
                options={explInitialization.featureExplanation.featureNames}
              />
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </>
  )
}
export default FeatureExplainability
