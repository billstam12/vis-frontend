import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useEffect, useState } from "react"
import { VegaLite } from "react-vega"
import { RootState, useAppDispatch, useAppSelector } from "../../store/store"
import grey from "@mui/material/colors/grey"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import MenuList from "@mui/material/MenuList"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import LinePlot from "../DashboardItems/Plots/line-plot"

const createData = (data: any, xName: string, yName: string) => {
  const xAxis = JSON.parse(data.pdphpval)[0]
  const yAxis = JSON.parse(data.pdpvalues)[0]
  const finalForm = xAxis.map((val: any, index: number) => {
    return { [xName]: val, [yName]: yAxis[index] }
  })
  return finalForm
}

const DashboadItems = () => {
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Grid container sx={{ px: 5, display: "flex", justifyContent: "center" }}>
      <Grid item sx={{ width: ["100%", "85%"] }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 4,
            p: 3,
            width: "100%",
            bgcolor: grey[300],
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          <Box
            className="Item-Title"
            sx={{ display: "flex", columnGap: 2, alignItems: "center" }}
          >
            <Typography fontSize={"1.5rem"}>
              Hyperparameter Explainability
            </Typography>
            <Button
              id="basic-button"
              variant="contained"
              onClick={handleClick}
              sx={{ textTransform: "none", fontSize: "1rem" }}
            >
              Filters
              <FilterAltIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuList dense>
                  <ListItemText sx={{px: 2, color: grey[600]}}>Select Hyperparameter</ListItemText>
                <MenuItem>
                  <ListItemText inset>Model__lr</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText inset>Double</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box
            className="Items-Container"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              p: 0,
              flexWrap: "wrap",
              gap: 1,
              borderRadius: 4,
            }}
          >
          <LinePlot width={"50%"} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
export default DashboadItems
