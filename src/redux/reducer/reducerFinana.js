import {createSlice} from '@reduxjs/toolkit';
import {actionSendFinana} from "../action/actionFinana";

const initialState = {
  finana: {},
  load: false,
};

export const finanaSlice = createSlice({
  name: 'finana',
  initialState,
  reducers: {
    reducerGetFinana: (state, {payload}) => {
      state.finana = payload;
    }
  },
});

export const { reducerGetFinana } = finanaSlice.actions;

export default finanaSlice.reducer;