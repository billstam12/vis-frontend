import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import grey from "@mui/material/colors/grey"
import { Dispatch, SetStateAction, useState } from "react"
import { useAppSelector } from "../../store/store"
import Button from "@mui/material/Button"

interface IDashboardTitle {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

const DashboardTitle = (props: IDashboardTitle) => {
  const { explInitialization } = useAppSelector(state => state.explainability)
  const { value, setValue } = props

  const handleChange = (newValue: number) => (event: React.SyntheticEvent) => {
    console.log(newValue)
    if (value === newValue) return;
    setValue(newValue)
  }

  return (
    <Grid
      className="dashboard-title"
      item
      xs={12}
      sx={{
        px: 2,
        py: 1,
        bgcolor: grey[300],
        display: "flex",
        height: "3.5rem",
        columnGap: 1,
      }}
    >
      <Button
        variant="text"
        sx={{
          borderRadius: 10,
          color: "black",
          bgcolor: value === 0 ? "white" : "transparent",
          fontSize: "0.8rem",
          textTransform: "none",
          ":hover": { bgcolor: grey[400] },
        }}
        size="small"
        disableRipple
        onClick={handleChange(0)}
      >
        Experiment Variant Analysis
      </Button>
      <Button
        sx={{
          borderRadius: 10,
          color: "black",
          bgcolor: value === 1 ? "white" : "transparent",
          fontSize: "0.8rem",
          textTransform: "none",
          ":hover": { bgcolor: grey[400] },
        }}
        size="small"
        disableRipple
        onClick={handleChange(1)}
      >
        Experiment 71
      </Button>
      {/* <Tabs value={value} onChange={handleChange(1)}>
        <Tab
          key={`data-exploration-tab`}
          label={"Data Exploration"}
          sx={{ textTransform: "none" }}
          disableRipple
        />
        {explInitialization &&
          Object.keys(explInitialization).map((key, index) => (
            <Tab
              key={`${key}-tab`}
              label={
                key === "featureExplanation"
                  ? "Feature Explanation"
                  : "Hyperparameter Explanation"
              }
              sx={{ textTransform: "none" }}
              disableRipple
            />
          ))}
      </Tabs> */}
    </Grid>
  )
}

export default DashboardTitle
