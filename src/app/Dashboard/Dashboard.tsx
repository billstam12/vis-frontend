import { useEffect, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import { fetchInitialization } from "../../store/slices/explainabilitySlice"
import Grid from "@mui/material/Grid"
import grey from "@mui/material/colors/grey"
import DashboardTitle from "./dashboard-title"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import FeatureExplainability from "../FeatureExpl/feature-explainability"
import HyperparameterExplainability from "../HyperparamExpl/hyperparameter-explainability"
import DataExploration from "../DataExploration/data-exploration"
import { defaultDataExplorationRequest } from "../../shared/models/dataexploration.model"

const Dashboard = () => {
  const { explInitialization, initLoading } = useAppSelector(
    state => state.explainability,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchInitialization({
        modelName: "I2Cat_Phising_model",
        pipelineQuery: {
          ...defaultDataExplorationRequest,
          datasetId: "file:///I2Cat_phising/metrics/I2Cat_phising_metrics.csv",
        },
        modelInstancesQuery: {
          ...defaultDataExplorationRequest,
          datasetId:
            "file:///I2Cat_phising/metrics/I2Cat_phising_instances.csv",
        },
        modelConfusionQuery: {
          ...defaultDataExplorationRequest,
          datasetId:
            "file:///I2Cat_phising/metrics/I2Cat_phising_confusion_matrix.csv",
        },
      }),
    )
  }, [])

  const [value, setValue] = useState(0)

  return (
    <>
      <Grid
        sx={{
          maxWidth: "100vw",
          minHeight: "100vh",
          flexDirection: "column",
          display: "flex",
          justifyContent: initLoading ? "center" : "start",
          textAlign: initLoading ? "center" : "start",
        }}
      >
        {initLoading && explInitialization === null ? (
          <Box sx={{ height: "100%", width: "100%" }}>
            <CircularProgress size={"10rem"} />
            <Typography fontSize={"1.5rem"} color={grey[500]}>
              Initializing page...
            </Typography>
          </Box>
        ) : (
          <>
            <DashboardTitle value={value} setValue={setValue} />
            {value === 0 && <HyperparameterExplainability />}
            {value === 1 && <FeatureExplainability />}
          </>
        )}
      </Grid>
    </>
  )
}

export default Dashboard
