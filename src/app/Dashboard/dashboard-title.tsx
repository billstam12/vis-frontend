import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import grey from "@mui/material/colors/grey"
import { Dispatch, SetStateAction, useState } from "react"
import { useAppSelector } from "../../store/store"
import Button from "@mui/material/Button"
import StarsIcon from '@mui/icons-material/Stars';

interface IDashboardTitle {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

const DashboardTitle = (props: IDashboardTitle) => {
  const { explInitialization, tabs } = useAppSelector(state => state.explainability)
  const { value, setValue } = props

  const handleChange = (newValue: number) => (event: React.SyntheticEvent) => {
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
        pt: 1,
        bgcolor: grey[300],
        display: "flex",
        height: "3.5rem",
        columnGap: 0,
      }}
    >
      <Button
        variant="text"
        sx={{
          borderRadius: "20px 20px 0px 0px",
          px: 2,
          color: "black",
          bgcolor: value === 0 ? "white" : "transparent",
          border: value !== 0 ? `1px solid ${grey[400]}` : "none",
          borderBottom: "none",
          fontSize: "0.8rem",
          textTransform: "none",
          ":hover": { bgcolor: value !== 0 ? grey[400] : "white" },
          boxShadow: "0 0 -25px 0 #001f3f",
          zIndex: value === 0 ? 1 : 0
        }}
        size="small"
        disableRipple
        onClick={handleChange(0)}
      >
        Experiment Variant Analysis
      </Button>
      <Button
        sx={{
          borderRadius: "20px 20px 0px 0px",
          px: 2,
          color: "black",
          bgcolor: value === 1 ? "white" : "transparent",
          border: value !== 1 ? `1px solid ${grey[400]}` : "none",
          borderBottom: "none",
          fontSize: "0.8rem",
          textTransform: "none",
          ":hover": { bgcolor: value !== 1 ? grey[400] : "white" },
          marginLeft: -1,
          zIndex: value === 1 ? 1 : 0,
        }}
        startIcon={<StarsIcon />}
        size="small"
        disableRipple
        onClick={handleChange(1)}
      >
        Variant 71
      </Button>
      {tabs.map((tab, index) => ( <Button
        sx={{
          borderRadius: "20px 20px 0px 0px",
          px: 2,
          color: "black",
          bgcolor: value === 1 ? "white" : "transparent",
          border: value !== 1 ? `1px solid ${grey[400]}` : "none",
          borderBottom: "none",
          fontSize: "0.8rem",
          textTransform: "none",
          ":hover": { bgcolor: value !== 1 ? grey[400] : "white" },
          marginLeft: -1,
          zIndex: value === index + 2 ? 1 : 0,
        }}
        size="small"
        disableRipple
        onClick={handleChange(1)}
      >
        Variant {tab.id}
      </Button>))}
    </Grid>
  )
}

export default DashboardTitle
