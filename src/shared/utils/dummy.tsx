import { IInitialization } from "../models/initialization.model";

const InitializationDummy = {
    model: {
      features_names: ["feature1", "feature2", "feature3"],
      plots: {
        pdp: null,
        pdp2d: null,
        ale: null,
      },
      tables: {
        counterfactuals: {
          content: null,
        },
        influence_functions: {
          content: null,
        },
      },
    },
    pipeline: {
      hyperparameter_names: ["hyperparameter1", "hyperparameter2", "hyperparameter3"],
      plots: {
        pdp: null,
        pdp2d: null,
        ale: null,
      },
      tables: {
        counterfactuals: {
          content: null,
        },
      },
    },
  } as IInitialization;