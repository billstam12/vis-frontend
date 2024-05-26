import {IPlotModel } from "./plotmodel.model";

export interface IInitialization {
  featureExplanation: {
    featureNames: string[];
    plots: {
      pdp: IPlotModel | null;
      pdp2d: IPlotModel | null;
      ale: IPlotModel | null;
    };
    tables: {
      counterfactuals: {
        content: IPlotModel | null;
      };
      influenceFunctions: {
        content: IPlotModel | null;
      };
    };
  };
  hyperparameterExplanation: {
    hyperparameterNames: string[];
    plots: {
      pdp: IPlotModel | null;
      pdp2d: IPlotModel | null;
      ale: IPlotModel | null;
    };
    tables: {
      counterfactuals: {
        content: IPlotModel | null;
      };
    };
  };
}

export interface InitializationRequest {
    modelName: string;
}

export interface Features {
  feature1: string;
  feature2: string;
}

export interface Axis {
  axisName: string;
  axisValues: number[];
  axisType: string;
}
