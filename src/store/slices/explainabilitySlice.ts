import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { IInitialization } from "../../shared/models/initialization.model";
import { IPlotModel } from "../../shared/models/plotmodel.model";
import { IDataExplorationRequest } from "../../shared/models/dataexploration.model";

const handleInitialization = (payload: IInitialization) => {
  const newPayload = {featureExplanation: {
    ...payload.featureExplanation, modelMetrics: JSON.parse(payload.featureExplanation.modelMetrics)
  }, hyperparameterExplanation: {
    ...payload.hyperparameterExplanation, pipelineMetrics: JSON.parse(payload.hyperparameterExplanation.pipelineMetrics)
  }
}
  return newPayload
}

const handleGetExplanation = (
  initializationState: IInitialization | null,
  plotMod: IPlotModel,
) => {
  console.log(plotMod)
  if (initializationState) {
    const newState: IInitialization = {
      ...initializationState,
      [plotMod.explainabilityType as keyof IInitialization]: {
        ...initializationState[
          plotMod.explainabilityType as keyof IInitialization
        ],
        [plotMod.tableContents !== null ? "tables" : "plots"]: {
          ...initializationState[
            plotMod.explainabilityType as keyof IInitialization
          ][plotMod.tableContents !== null ? "tables" : "plots"],
          [plotMod.explanationMethod]: plotMod,
        },
      },
    }
    return newState
  } else {
    return null
  }
}

interface IExplainability {  
    loading: string;
    initLoading: boolean;
    explInitialization: IInitialization | null;
    error: string | null;
    misclassifiedInstances: any[];
}

const initialState: IExplainability = {
    loading: "false",
    initLoading: false,
    explInitialization: null, 
    error: null,
    misclassifiedInstances: [],
};

// explainabilitySlice
export const explainabilitySlice = createSlice({
    name: "explainability",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInitialization.fulfilled, (state, action) => {
            state.explInitialization = handleInitialization(action.payload);
            state.initLoading = false;
        })
        .addCase(fetchExplanation.fulfilled, (state, action) => {
            state.explInitialization = handleGetExplanation(state.explInitialization, action.payload);
            state.loading = "false"
        })
        .addCase(fetchMisclassifiedInstances.fulfilled, (state, action) => {
            state.misclassifiedInstances = action.payload;
            state.loading = "false"
        })
        .addCase(fetchExplanation.pending, (state) => {
          state.loading = "true";
        })
        .addCase(fetchExplanation.rejected, (state) => {
            state.loading = "false";
        })
        .addMatcher(isPending(fetchInitialization, fetchMisclassifiedInstances), (state) => {
            state.initLoading = true;
        })
        .addMatcher(isRejected(fetchInitialization, fetchMisclassifiedInstances), (state) => {
            state.initLoading = false;
            state.error = "Failed to fetch data";
        })
    }
});

//Thunk Calls for fetching data

const apiPath = 'api/';

export const fetchInitialization = createAsyncThunk('explainability/fetch_initialization', 
  async (payload: {modelName: string, pipelineQuery: IDataExplorationRequest, modelQuery: IDataExplorationRequest} ) => {
    const requestUrl = apiPath + "initialization";
    //TODO: This should be changed in order to make dynamic calls
    
    return axios.post<any>(requestUrl, payload).then((response) => response.data);
});

export const fetchExplanation = createAsyncThunk('explainability/fetch_explanation', 
async (payload: {explanationType: string, explanationMethod: string, model: string, feature1: string, feature2: string} ) => {
    const requestUrl = apiPath + "explainability";
    return axios.post<any>(requestUrl, payload).then((response) => response.data);
});

export const fetchMisclassifiedInstances = createAsyncThunk('explainability/fetch_misclassified_instances', 
async () => {
// TODO: make this dynamic
// async (payload: IDataExplorationRequest) => {
    const payload = {
      datasetId: "file:///home/pgidarakos/OLDIES/CSVSXXP/misclassified_instances.csv",
      columns: [],
      aggFunction:"ll",
      filters: [],
      scaler: "z",
      limit: 10
    }
    const requestUrl = apiPath + "visualization/data";
    return axios.post<any>(requestUrl, payload).then((response) => response.data);
});


//Reducer exports

export const { } = explainabilitySlice.actions

export default explainabilitySlice.reducer
