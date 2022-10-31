import axios from "axios";
import {createAsyncThunk} from '@reduxjs/toolkit'

export const actionGetFinana = createAsyncThunk('finana/reducerGetFinana', async (id) => {
  const response = await axios.get(`https://finanasafe.cc/v1/p2p_transactions/${id}`)
  return await response.data.payload
})

export const actionSendFinana = createAsyncThunk('finana/reducerGetFinana', async (id) => {
  const response = await axios.put(`https://finanasafe.cc/v1/p2p_transactions/${id}/paid`)
  return await response.data.payload
})

export const actionCancelFinana = createAsyncThunk('finana/reducerGetFinana', async (id) => {
  const response = await axios.put(`https://finanasafe.cc/v1/p2p_transactions/${id}/cancel`)
  return await response.data.payload
})
