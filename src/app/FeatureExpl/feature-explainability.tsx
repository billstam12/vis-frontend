import Box from "@mui/material/Box"
import { useAppDispatch, useAppSelector } from "../../store/store"
import LinePlot from "../DashboardItems/Plots/line-plot"
import TableComponent from "../DashboardItems/Tables/table"
import ParallelCoordinatePlot from "../DashboardItems/Plots/parallel-coordinate-plot"
import ComparativeEvaluation from "../DashboardItems/Tables/comparativeEvaluation"

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
            my: "3rem",
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
                  width={"48%"}
                />
              ),
            )}
          </Box>
          <Box>
            {Object.keys(explInitialization.featureExplanation.tables).map(
              (plotKey, index) => (
                <TableComponent
                  key={`${plotKey}-table`}
                  width={"100%"}
                  children={<ParallelCoordinatePlot width={"100%"} />}
                  plotModel={
                    explInitialization.featureExplanation.tables[
                      plotKey as keyof typeof explInitialization.featureExplanation.tables
                    ] || null
                  }
                />
              ),
            )}
          </Box>
        </Box>
      ) : null}
    </>
  )
}
export default FeatureExplainability
