import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import InfoIcon from "@mui/icons-material/Info"
import TableContainer from "@mui/material/TableContainer"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import { IPlotModel } from "../../../shared/models/plotmodel.model"
import { styled } from "@mui/styles"
import { useState } from "react"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import Button from "@mui/material/Button"
import grey from "@mui/material/colors/grey"
import { dummyData } from "../../../shared/data/metrics-dummy"
import { VegaLite } from "react-vega"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

interface ITableComponent {
  width: string
  children?: React.ReactNode
}

const ComparativeEvaluation = (props: ITableComponent) => {
  const { width } = props
  const [selectedOption, setSelectedOption] = useState<string>("Accuracy")
  const [viewOption, setViewOption] = useState("table")

  const handleOption = (e: { target: { value: string } }) => {
    setSelectedOption(e.target.value)
  }

  const handleChange = (value: string) => (e: {}) => {
    setViewOption(value)
  }

  return (
    <>
      <Paper
        className="Category-Item"
        elevation={2}
        sx={{
          borderRadius: 4,
          width: width,
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
          minWidth: "300px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 1,
            display: "flex",
            alignItems: "center",
            borderBottom: `1px solid ${grey[400]}`,
          }}
        >
          <Typography fontSize={"1rem"} fontWeight={600}>
            {"Comparative Evaluation of Experiment Variants"}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Tooltip
            title={
              "Metrics about every single model that was trained on the pipeline"
            }
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            px: 1.5,
            pt: 1.5,
            display: "flex",
            alignItems: "center",
            width: "auto",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography fontSize={"0.8rem"}>Color by</Typography>
            <FormControl
              sx={{ m: 1, minWidth: 120, maxHeight: 120 }}
              size="small"
            >
              <Select
                value={selectedOption}
                sx={{ fontSize: "0.8rem" }}
                onChange={handleOption}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 250,
                      maxWidth: 300,
                    },
                  },
                }}
              >
                <MenuItem value={"Accuracy"}>Accuracy</MenuItem>
                <MenuItem value={"Recall"}>Recall</MenuItem>
                <MenuItem value={"Precision"}>Precision</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              py: "0.5rem",
              px: "0.8rem",
              display: "flex",
              columnGap: 2,
              bgcolor: grey[200],
              borderRadius: 10,
            }}
          >
            <Button
              variant="text"
              sx={{
                borderRadius: 10,
                color: "black",
                bgcolor: viewOption === "table" ? "white" : "transparent",
              }}
              disableRipple
              size="small"
              onClick={handleChange("table")}
            >
              Table
            </Button>
            <Button
              variant="text"
              sx={{
                borderRadius: 10,
                color: "black",
                bgcolor:
                  viewOption === "parallel coordinates"
                    ? "white"
                    : "transparent",
              }}
              disableRipple
              size="small"
              onClick={handleChange("parallel coordinates")}
            >
              Parallel Coordinates
            </Button>
          </Box>
          <Box>
            <Button variant="contained">Save Selected Configuration</Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {viewOption === "table" && (
            <TableContainer component={Box} sx={{ width: "99%" }}>
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {Object.keys(dummyData[0]).map((key, index) => (
                      <TableCell key={`table-header-${key}-${index}`}>
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.map((row, index) => (
                    <StyledTableRow hover key={`table-row-${index}`}>
                      {Object.values(row).map((value, idx) => (
                        <StyledTableCell key={`table-cell-${value}-${index}`}>
                          {value}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {viewOption === "parallel coordinates" && (
            <VegaLite
              actions={false}
              style={{ width: "90%" }}
              spec={{
                width: "container",
                height: 300,
                // autosize: { type: "fit", contains: "padding", resize: true },
                data: {
                  values: dummyData,
                },
                transform: [
                  { window: [{ op: "count", as: "index" }] },
                  {
                    fold: [
                      "split_proportion",
                      "max_depth",
                      "min_child_weight",
                      "learning_rate",
                      "n_estimators",
                      "Precision",
                      "Recall",
                      "Accuracy",
                      "Runtime",
                    ],
                  },
                  {
                    window: [
                      { op: "min", field: "value", as: "min" },
                      { op: "max", field: "value", as: "max" },
                    ],
                    groupby: ["key"],
                  },
                  {
                    calculate:
                      "(datum.value - datum.min) / (datum.max-datum.min)",
                    as: "norm_val",
                  },
                  {
                    calculate: "(datum.min + datum.max) / 2",
                    as: "mid",
                  },
                ],
                layer: [
                  {
                    mark: { type: "rule", color: "#ccc", tooltip: null },
                    encoding: {
                      detail: { aggregate: "count", type: "quantitative" },
                      x: { type: "nominal", field: "key" },
                    },
                  },
                  {
                    mark: "line",
                    encoding: {
                      color: { type: "nominal", field: "species" },
                      detail: { type: "nominal", field: "index" },
                      opacity: { value: 0.3 },
                      x: { type: "nominal", field: "key" },
                      y: {
                        type: "quantitative",
                        field: "norm_val",
                        axis: null,
                      },
                      tooltip: [
                        {
                          field: "split_proportion",
                        },
                        {
                          field: "max_depth",
                        },
                        {
                          field: "min_child_weight",
                        },
                        {
                          field: "learning_rate",
                        },
                        {
                          field: "n_estimators",
                        },
                        {
                          field: "Precision",
                        },
                        {
                          field: "Recall",
                        },
                        {
                          field: "Accuracy",
                        },
                        {
                          field: "Runtime",
                        },
                      ],
                    },
                  },
                  {
                    encoding: {
                      x: { type: "nominal", field: "key" },
                      y: { value: 0 },
                    },
                    layer: [
                      {
                        mark: { type: "text", style: "label" },
                        encoding: {
                          text: {
                            aggregate: "max",
                            field: "max",
                            type: "quantitative",
                          },
                        },
                      },
                      {
                        mark: {
                          type: "tick",
                          style: "tick",
                          size: 8,
                          color: "#ccc",
                        },
                      },
                    ],
                  },
                  {
                    encoding: {
                      x: { type: "nominal", field: "key" },
                      y: { value: 150 },
                    },
                    layer: [
                      {
                        mark: { type: "text", style: "label" },
                        encoding: {
                          text: {
                            aggregate: "min",
                            field: "mid",
                            type: "quantitative",
                          },
                        },
                      },
                      {
                        mark: {
                          type: "tick",
                          style: "tick",
                          size: 8,
                          color: "#ccc",
                        },
                      },
                    ],
                  },
                  {
                    encoding: {
                      x: { type: "nominal", field: "key" },
                      y: { value: 300 },
                    },
                    layer: [
                      {
                        mark: { type: "text", style: "label" },
                        encoding: {
                          text: {
                            aggregate: "min",
                            field: "min",
                            type: "quantitative",
                          },
                        },
                      },
                      {
                        mark: {
                          type: "tick",
                          style: "tick",
                          size: 8,
                          color: "#ccc",
                        },
                      },
                    ],
                  },
                ],
                config: {
                  axisX: {
                    domain: false,
                    labelAngle: 0,
                    tickColor: "#ccc",
                    title: null,
                  },
                  view: { stroke: null },
                  style: {
                    label: {
                      baseline: "middle",
                      align: "right",
                      dx: -5,
                      tooltip: null,
                    },
                    tick: { orient: "horizontal", tooltip: null },
                  },
                },
              }}
            />
          )}
        </Box>
      </Paper>
    </>
  )
}
export default ComparativeEvaluation
