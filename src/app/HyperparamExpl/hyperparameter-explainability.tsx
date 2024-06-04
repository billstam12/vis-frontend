import Box from "@mui/material/Box"
import { useAppDispatch, useAppSelector } from "../../store/store"
import LinePlot from "../DashboardItems/Plots/line-plot"
import TableComponent from "../DashboardItems/Tables/table"
import ContourPlot from "../DashboardItems/Plots/contour-plot"
import ParallelCoordinatePlot from "../DashboardItems/Plots/parallel-coordinate-plot"
import ComparativeEvaluation from "../DashboardItems/Tables/comparativeEvaluation"

const HyperparameterExplainability = () => {
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
            <ComparativeEvaluation width={"100%"} />
            {Object.keys(
              explInitialization.hyperparameterExplanation.plots,
            ).map((plotKey, index) => {
              if (plotKey === "2dpdp") {
                return (
                  <ContourPlot
                    key={`${plotKey}-plot`}
                    plotModel={
                      explInitialization.hyperparameterExplanation.plots[
                        plotKey as keyof typeof explInitialization.hyperparameterExplanation.plots
                      ] || null
                    }
                    options={
                      explInitialization.hyperparameterExplanation
                        .hyperparameterNames
                    }
                    width={"48%"}
                  />
                )
              } else {
                return (
                  <LinePlot
                    key={`${plotKey}-plot`}
                    plotModel={
                      explInitialization.hyperparameterExplanation.plots[
                        plotKey as keyof typeof explInitialization.hyperparameterExplanation.plots
                      ] || null
                    }
                    options={
                      explInitialization.hyperparameterExplanation
                        .hyperparameterNames
                    }
                    width={"48%"}
                  />
                )
              }
            })}
          </Box>
          <Box>
            {Object.keys(
              explInitialization.hyperparameterExplanation.tables,
            ).map((plotKey, index) => (
              <TableComponent
                key={`${plotKey}-table`}
                children={<ParallelCoordinatePlot width={"100%"} />}
                width={"100%"}
                plotModel={
                  explInitialization.hyperparameterExplanation.tables[
                    plotKey as keyof typeof explInitialization.hyperparameterExplanation.tables
                  ] || null
                }
              />
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  )
}
export default HyperparameterExplainability
