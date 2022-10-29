import {configureStore} from '@reduxjs/toolkit';
import finanaReducer from "../redux/reducer/reducerFinana";

export const store = configureStore({
  reducer: {
    finana: finanaReducer,
  },
});