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
import LinePlot from "../DashboardItems/Plots/line-plot"
import TableComponent from "../DashboardItems/Tables/table"

const FeatureExplainability = () => {
  const { explInitialization } = useAppSelector(state => state.explainability)
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
            gap: 4,
          }}
        >
          <Box sx={{ display: "flex", gap: 4, flexFlow: "wrap" }}>
            {Object.keys(explInitialization.featureExplanation.plots).map(
              (plotKey, index) => (
                <LinePlot
                  key={`${plotKey}-plot`}
                  plotModel={
                    explInitialization.featureExplanation.plots[
                      plotKey as keyof typeof explInitialization.featureExplanation.plots
                    ] || null
                  }
                  options={explInitialization.featureExplanation.featureNames}
                  width={"45%"}
                />
              ),
            )}
          </Box>
          <Box>
            {Object.keys(explInitialization.featureExplanation.tables).map(
              (plotKey, index) => (
                <TableComponent key={`${plotKey}-table`} width={"100%"} />
              ),
            )}
          </Box>
        </Box>
      ) : null}
    </>
  )
}
export default FeatureExplainability
