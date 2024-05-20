import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import grey from "@mui/material/colors/grey"
import { useState } from "react"

const DashboardTitle = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid
      className="dashboard-title"
      item
      xs={12}
      sx={{ px: 2, bgcolor: grey[300], display: "flex", height: "3.5rem" }}
    >
      <Typography fontSize={"2rem"} sx={{ py: 1 }}>
        Experiment 1
      </Typography>
      <Box sx={{ flex: 1 }} />
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
      </Tabs>
    </Grid>
  )
}

export default DashboardTitle
