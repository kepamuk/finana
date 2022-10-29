import axios from "axios";
import {reducerGetFinana} from "../reducer/reducerFinana";

export const actionGetFinana = (id) => dispatch => {
  axios.get(`https://finanasafe.cc/v1/p2p_transactions/${id}`)
    .then(res => {
      dispatch(reducerGetFinana(res.data.payload))
    })
}

export const actionSendFinana = (id) => dispatch => {
  axios.put(`https://finanasafe.cc/v1/p2p_transactions/${id}/paid`)
    .then(res => {
      dispatch(reducerGetFinana(res.data.payload))
    })
}

export const actionCancelFinana = (id) => dispatch => {
  axios.put(`https://finanasafe.cc/v1/p2p_transactions/${id}/cancel`)
    .then(res => {
      dispatch(reducerGetFinana(res.data.payload))
    })
}