import { plotModel } from "./plotmodel.model";

export interface IInitialization {
  model: {
    features_names: string[];
    plots: {
      pdp: plotModel | null;
      pdp2d: plotModel | null;
      ale: plotModel | null;
    };
    tables: {
      counterfactuals: {
        content: plotModel | null;
      };
      influence_functions: {
        content: plotModel | null;
      };
    };
  };
  pipeline: {
    hyperparameter_names: string[];
    plots: {
      pdp: plotModel | null;
      pdp2d: plotModel | null;
      ale: plotModel | null;
    };
    tables: {
      counterfactuals: {
        content: plotModel | null;
      };
    };
  };
}

export interface InitializationRequest {
    model_name: string;
}

export interface Features {
  feature1: string;
  feature2: string;
}

export interface Axis {
  axis_name: string;
  axis_values: number[];
  axis_type: string;
}
