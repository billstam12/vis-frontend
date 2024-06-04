import Box from "@mui/material/Box"
import { VegaLite, Vega } from "react-vega"

interface ILineplot {
  width: string
}

const ParallelCoordinatePlot = (props: ILineplot) => {
  const { width } = props

  return (
    <>
      <Box sx={{ width: "99%", px: 1 }}>
        <VegaLite
          actions={false}
          style={{ width: "90%" }}
          spec={{
            width: "container",
            height: 300,
            // autosize: { type: "fit", contains: "padding", resize: true },
            data: {
              url: "https://vega.github.io/vega-lite/data/penguins.json",
            },
            transform: [
              { filter: "datum['Beak Length (mm)']" },
              { window: [{ op: "count", as: "index" }] },
              {
                fold: [
                  "Beak Length (mm)",
                  "Beak Depth (mm)",
                  "Flipper Length (mm)",
                  "Body Mass (g)",
                ],
              },
              {
                joinaggregate: [
                  { op: "min", field: "value", as: "min" },
                  { op: "max", field: "value", as: "max" },
                ],
                groupby: ["key"],
              },
              {
                calculate: "(datum.value - datum.min) / (datum.max-datum.min)",
                as: "norm_val",
              },
              {
                calculate: "(datum.min + datum.max) / 2",
                as: "mid",
              },
            ],
            layer: [
              {
                mark: { type: "rule", color: "#ccc", strokeWidth: 2 },
                encoding: {
                  detail: { aggregate: "count" },
                  x: { field: "key" },
                },
              },
              {
                mark: "line",
                encoding: {
                  color: { type: "nominal", field: "Species" },
                  detail: { type: "nominal", field: "index" },
                  opacity: { value: 0.3 },
                  x: { type: "nominal", field: "key" },
                  y: { type: "quantitative", field: "norm_val", axis: null },
                  tooltip: [
                    {
                      type: "quantitative",
                      field: "Beak Length (mm)",
                    },
                    {
                      type: "quantitative",
                      field: "Beak Depth (mm)",
                    },
                    {
                      type: "quantitative",
                      field: "Flipper Length (mm)",
                    },
                    {
                      type: "quantitative",
                      field: "Body Mass (g)",
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
                      text: { aggregate: "max", field: "max" },
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
                      text: { aggregate: "min", field: "mid" },
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
                    mark: { type: "text", style: "label", },
                    encoding: {
                      text: { aggregate: "min", field: "min" },
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
                tickColor: "black",
                title: null,
              },
              view: { stroke: null },
              style: {
                label: { baseline: "middle", align: "right", dx: -5 },
                tick: { orient: "horizontal" },
              },
            },
          }}
        />
      </Box>
    </>
  )
}

export default ParallelCoordinatePlot
