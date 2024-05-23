import { useEffect, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import { fetchPdpPipeline } from "../../store/slices/explainabilitySlice"
import Grid from "@mui/material/Grid"
import grey from "@mui/material/colors/grey"
import DashboardTitle from "./dashboard-title"
import DashboardItems from "./dashboard-items"

const Dashboard = () => {

  const [value, setValue] = useState(0)

  return (
    <>
      <Grid
        sx={{ maxWidth: "100vw", minHeight: "100vh", bgcolor: grey[50], flexDirection: "column", display: "flex", rowGap: 10}}
      >
        <DashboardTitle value={value} setValue={setValue}/>
        <DashboardItems />
      </Grid>
    </>
  )
}

export default Dashboard
