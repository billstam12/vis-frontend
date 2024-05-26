import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import grey from "@mui/material/colors/grey"
import { Dispatch, SetStateAction, useState } from "react"
import { useAppSelector } from "../../store/store"

interface IDashboardTitle {
  value: number
  setValue: Dispatch<SetStateAction<number>>;
}

const DashboardTitle = (props: IDashboardTitle) => {
  const {explInitialization} = useAppSelector(state => state.explainability)
  const {value, setValue} = props;

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
      {/* <Typography fontSize={"2rem"} sx={{ py: 1 }}>
        Experiment 1
      </Typography>
      <Box sx={{ flex: 1 }} /> */}
      <Tabs
        value={value}
        onChange={handleChange}
      >
        {explInitialization && Object.keys(explInitialization).map((key, index) => (
          <Tab key={`${key}-tab`} label={key === "featureExplanation" ? "Feature Explanation" : "Hyperparameter Explanation"} sx={{textTransform: "none"}} disableRipple />
        ))}
      </Tabs>
    </Grid>
  )
}

export default DashboardTitle
