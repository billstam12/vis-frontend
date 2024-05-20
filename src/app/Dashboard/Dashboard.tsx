import { useEffect } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import { fetchPdpPipeline } from "../../store/slices/explainabilitySlice"
import Grid from "@mui/material/Grid"
import grey from "@mui/material/colors/grey"
import DashboardTitle from "./dashboard-title"
import DashboardItems from "./dashboard-items"

const Dashboard = () => {
//   const { pdppipeline } = useAppSelector(
//     (state: RootState) => state.explainability,
//   )
//   const dispatch = useAppDispatch()

//   useEffect(() => {
//     dispatch(
//       fetchPdpPipeline({
//         xaitype: "pipeline",
//         method: "pdp",
//         feature1: "Model__lr",
//         feature2: "null",
//       }),
//     )
//   }, [])

  return (
    <>
      <Grid
        sx={{ maxWidth: "100vw", minHeight: "100vh", bgcolor: grey[50], flexDirection: "column", display: "flex", rowGap: 10}}
      >
        <DashboardTitle />
        <DashboardItems />
      </Grid>
    </>
  )
}

export default Dashboard
