import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { fetchData } from "./dataAPI"

export interface DataSliceState {  
    status: "idle" | "loading" | "failed"
}

const initialState: DataSliceState = {
    status: 'idle'
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const dataSlice = createAppSlice({
  name: "data",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    getData: create.asyncThunk(
      async (query: any) => {
        const response = await fetchData(query)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: data => data.status,
  },
})
console.log(dataSlice);

// Action creators are generated for each case reducer function.
export const { } =
  dataSlice.actions
console.log(dataSlice.actions);

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus } = dataSlice.selectors
console.log(selectStatus);
