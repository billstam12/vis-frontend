import { Axis, Features } from "./initialization.model";

export interface plotModel {
    explainability_type: string;
    explanation_method: string;
    explainability_model: string;
    plot_name: string;
    plot_descr: string;
    plot_type: string;
    features: Features;
    xAxis: Axis;
    yAxis: Axis;
    zAxis: Axis;
    table_contents: Map<string, string[]>;
  }