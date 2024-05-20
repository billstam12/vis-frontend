interface IExplainabilityRequest {
  modelId: string | null;
  explainabilityType: string | null;
  explainabilityMethod: string | null;
  visualizationType: string | null;
  constraints: {};
  additionalParams: {
    feature1: string | null;
    feature2: string | null;
  }
}

export const defaultValue: IExplainabilityRequest = {
  modelId: "UNSW_NB15_model",
  explainabilityType: null,
  explainabilityMethod: null,
  visualizationType: "line",
  constraints: {},
  additionalParams: {
    feature1: null,
    feature2: null,
  },
}
