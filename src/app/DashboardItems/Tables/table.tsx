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
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import { IPlotModel } from "../../../shared/models/plotmodel.model"

interface ITableComponent {
  width: string
  plotModel: IPlotModel | null
}

const TableComponent = (props: ITableComponent) => {
  const { width, plotModel } = props


  return (
    <Paper
      className="Category-Item"
      elevation={2}
      sx={{
        borderRadius: 4,
        width: width,
        display: "flex",
        flexDirection: "column",
        rowGap: 0,
        minWidth: "300px",
        overflow: "hidden"
      }}
    >
      <Box sx={{ px: 1.5, pt: 1.5, display: "flex", alignItems: "center" }}>
        <Typography fontSize={"1rem"} fontWeight={600}>
          {plotModel?.plotName || "Plot name"}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Tooltip title={plotModel?.plotDescr || "This is a description"}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <TableContainer component={Box} sx={{width: "99%"}}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {Object.keys(plotModel?.tableContents || {}).map(
                  (key, index) => (
                    <TableCell key={`table-header-${key}-${index}`}>
                      {key}
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {plotModel?.tableContents[Object.keys(plotModel.tableContents)[0]].values.map(
                (value, index) => {

                  return (
                    <TableRow key={`table-row-${index}`}>
                      {Object.keys(plotModel?.tableContents || {}).map(
                        (key, idx) => (
                          <TableCell key={`table-cell-${key}-${index}`}>
                            {plotModel?.tableContents[Object.keys(plotModel.tableContents)[idx]].values[index]}
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  )
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  )
}
export default TableComponent
