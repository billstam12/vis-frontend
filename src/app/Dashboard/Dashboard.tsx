import { useEffect, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import { fetchInitialization } from "../../store/slices/explainabilitySlice"
import Grid from "@mui/material/Grid"
import grey from "@mui/material/colors/grey"
import DashboardTitle from "./dashboard-title"
import DashboardItems from "./dashboard-items"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import FeatureExplainability from "../FeatureExpl/feature-explainability"

const Dashboard = () => {
  const { explInitialization, initLoading } = useAppSelector(
    state => state.explainability,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchInitialization({ modelName: "I2Cat_Phising_model" }))
  }, [])

  const [value, setValue] = useState(0)

  return (
    <>
      {console.log(explInitialization)}
      <Grid
        sx={{
          maxWidth: "100vw",
          minHeight: "100vh",
          // bgcolor: grey[50],
          flexDirection: "column",
          display: "flex",
          rowGap: 10,
          justifyContent: initLoading ? "center" : "start",
          textAlign: initLoading ? "center" : "start",
        }}
      >
        {initLoading && explInitialization === null ? (
          <Box sx={{ height: "100%", width: "100%" }}>
            <CircularProgress size={"10rem"}/>
            <Typography fontSize={"1.5rem"} color={grey[500]}>Initializing page please stand by...</Typography>
          </Box>
        ) : (
          <>
            <DashboardTitle value={value} setValue={setValue} />
            {value === 0 ? <FeatureExplainability /> : <DashboardItems />}
          </>
        )}
      </Grid>
    </>
  )
}

export default Dashboard
