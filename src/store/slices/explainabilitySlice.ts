import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { IInitialization } from "../../shared/models/initialization.model";
import { IPlotModel } from "../../shared/models/plotmodel.model";

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
}

const initialState: IExplainability = {
    loading: "false",
    initLoading: false,
    explInitialization: null, 
    error: null,
};

// explainabilitySlice
export const explainabilitySlice = createSlice({
    name: "explainability",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInitialization.fulfilled, (state, action) => {
            state.explInitialization = action.payload;
            state.initLoading = false;
        })
        .addCase(fetchExplanation.fulfilled, (state, action) => {
            state.explInitialization = handleGetExplanation(state.explInitialization, action.payload);
            state.loading = "false"
        })
        .addCase(fetchExplanation.pending, (state) => {
          state.loading = "true";
        })
        .addCase(fetchExplanation.rejected, (state) => {
            state.loading = "false";
        })
        .addMatcher(isPending(fetchInitialization), (state) => {
            state.initLoading = true;
        })
        .addMatcher(isRejected(fetchInitialization), (state) => {
            state.initLoading = false;
            state.error = "Failed to fetch data";
        })
    }
});

//Thunk Calls for fetching data

const apiPath = 'api/';

export const fetchInitialization = createAsyncThunk('explainability/fetch_initialization', async (payload: {modelName: string} ) => {
    const requestUrl = apiPath + "initialization";
    //TODO: This should be changed in order to make dynamic calls
    
    return axios.post<any>(requestUrl, payload).then((response) => response.data);
});

export const fetchExplanation = createAsyncThunk('explainability/fetch_explanation', 
async (payload: {explanationType: string, explanationMethod: string, model: string, feature1: string, feature2: string} ) => {
    const requestUrl = apiPath + "explainability";
    return axios.post<any>(requestUrl, payload).then((response) => response.data);
});


//Reducer exports

export const { } = explainabilitySlice.actions

export default explainabilitySlice.reducer
