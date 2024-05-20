import { createSlice, createAsyncThunk, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { fetchData } from "../data/explainabilityAPI";
import axios from "axios";
import { defaultValue } from "../../shared/models/explainability.request.model";

interface IExplainability {  
    status: boolean;
    data: any;
    error: string | null;
    pdppipeline: any;
    pdpmodel: any;
    alepipeline: any;
    alemodel: any;
    pdp2dpipeline: any;
    counterfactualspipeline: any;
}

const initialState: IExplainability = {
    status: false,
    data: null, 
    error: null,
    pdppipeline: null,
    pdpmodel: null,
    alepipeline: null,
    alemodel: null,
    pdp2dpipeline: null,
    counterfactualspipeline: null,
};

// Create a function to generate async thunk for fetching data
const createFetchDataThunk = (sliceName: string, xaitype: string): any => {
    return createAsyncThunk(
        `${sliceName}/fetchData`,
        async ({ feature1, method,feature2 }: { feature1: string; method: string; feature2: string; }) => {
            try {
                const response = await fetchData(feature1, xaitype, method,feature2);
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch data');
            }
        }
    );
};

// Create separate thunks for each slice
export const fetchDataForCounterfactualsPipelineSlice = createFetchDataThunk('counterfactualspipeline', 'pipeline');

// explainabilitySlice
export const explainabilitySlice = createSlice({
    name: "explainability",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPdpPipeline.fulfilled, (state, action) => {
            state.pdppipeline = action.payload;
        })
        .addCase(fetchAlePipeline.fulfilled, (state, action) => {
            state.alepipeline = action.payload;
        })
        .addCase(fetchPdp2dPipeline.fulfilled, (state, action) => {
            state.pdp2dpipeline = action.payload;
        })
        .addCase(fetchPdpModel.fulfilled, (state, action) => {
            state.pdpmodel = action.payload;
        })
        .addCase(fetchAleModel.fulfilled, (state, action) => {
            state.alemodel = action.payload;
        })
        .addMatcher(isPending(fetchPdpPipeline, fetchAlePipeline, fetchPdp2dPipeline, fetchPdpModel, fetchAleModel), (state) => {
            state.status = true;
        })
        .addMatcher(isRejected(fetchPdpPipeline, fetchAlePipeline, fetchPdp2dPipeline, fetchPdpModel, fetchAleModel), (state) => {
            state.status = false;
            state.error = "Failed to fetch data";
        })
    }
});

//Thunk Calls for fetching data

const apiPath = 'api/visualization/explainability/i2cat_desktop_features';

export const fetchDataNew = createAsyncThunk('explainability/data', async (payload: {xaitype: string, method: string, feature1: string, feature2: string} ) => {
    const { xaitype, method, feature1, feature2 } = payload;
    const requestUrl = apiPath;
    const payl = {...defaultValue, explainabilityType: xaitype, explainabilityMethod: method, additionalParams: {feature1, feature2}};
    return axios.post<any>(requestUrl, payl).then((response) => response.data);
});

export const fetchPdpPipeline = createAsyncThunk('explainability/pdp_pipeline', async (payload: {xaitype: string, method: string, feature1: string, feature2: string} ) => {
    const { xaitype, method, feature1, feature2 } = payload;
    const requestUrl = apiPath;
    const payl = {...defaultValue, explainabilityType: xaitype, explainabilityMethod: method, additionalParams: {feature1, feature2}};
    return axios.post<any>(requestUrl, payl).then((response) => response.data);
});

export const fetchAlePipeline = createAsyncThunk('explainability/ale_pipeline', async (payload: {xaitype: string, method: string, feature1: string, feature2: string} ) => {
    const { xaitype, method, feature1, feature2 } = payload;
    const requestUrl = apiPath;
    const payl = {...defaultValue, explainabilityType: xaitype, explainabilityMethod: method, additionalParams: {feature1, feature2}};
    return axios.post<any>(requestUrl, payl).then((response) => response.data);
});

export const fetchPdp2dPipeline = createAsyncThunk('explainability/pdp2d_pipeline', async (payload: {xaitype: string, method: string, feature1: string, feature2: string} ) => {
    const { xaitype, method, feature1, feature2 } = payload;
    const requestUrl = apiPath;
    const payl = {...defaultValue, explainabilityType: xaitype, explainabilityMethod: method, additionalParams: {feature1, feature2}};
    return axios.post<any>(requestUrl, payl).then((response) => response.data);
});

export const fetchPdpModel = createAsyncThunk('explainability/pdp_model', async (payload: {xaitype: string, method: string, feature1: string, feature2: string} ) => {
    const { xaitype, method, feature1, feature2 } = payload;
    const requestUrl = apiPath;
    const payl = {...defaultValue, explainabilityType: xaitype, explainabilityMethod: method, additionalParams: {feature1, feature2}};
    return axios.post<any>(requestUrl, payl).then((response) => response.data);
});

export const fetchAleModel = createAsyncThunk('explainability/ale_model', async (payload: {xaitype: string, method: string, feature1: string, feature2: string} ) => {
    const { xaitype, method, feature1, feature2 } = payload;
    const requestUrl = apiPath;
    const payl = {...defaultValue, explainabilityType: xaitype, explainabilityMethod: method, additionalParams: {feature1, feature2}};
    return axios.post<any>(requestUrl, payl).then((response) => response.data);
});


//Reducer exports

export const { } = explainabilitySlice.actions

export default explainabilitySlice.reducer
