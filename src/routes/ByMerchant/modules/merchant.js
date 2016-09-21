// ------------------------------------
// Constants
// ------------------------------------

import { SERVER_BASE } from '../../../consts'
const MERCHANTS_URL = SERVER_BASE + 'merchants'

const MERCHANT_LOAD_FINISH = 'MERCHANT_LOAD_FINISH'

// ------------------------------------
// Actions
// ------------------------------------
export function loadMerchants () {
  return (dispatch, getState) => {
    fetch(MERCHANTS_URL).then((response) => {
      response.json().then((data) => {
        dispatch(merchantLoadFinish(data))
      })
    })
  }
}

function merchantLoadFinish (merchants) {
  return { type: MERCHANT_LOAD_FINISH, payload: merchants }
}

export const actions = {
  loadMerchants
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MERCHANT_LOAD_FINISH] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function merchantReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
