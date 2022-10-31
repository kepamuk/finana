import {createSlice} from '@reduxjs/toolkit';
import {actionGetFinana} from "../action/actionFinana";

const initialState = {
  finana: {},
  load: false,
};

export const finanaSlice = createSlice({
  name: 'finana',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionGetFinana.fulfilled, (state, action) => {
      state.finana = action.payload
    })
  },
});

export default finanaSlice.reducer;