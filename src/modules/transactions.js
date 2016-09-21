// ------------------------------------
// Constants
// ------------------------------------
import { SERVER_BASE } from '../consts'
const TRANSACTIONS_URL = SERVER_BASE + 'transactions'

const TRANSACTIONS_LOAD_FINISH = 'TRANSACTIONS_LOAD_FINISH'

// ------------------------------------
// Actions
// ------------------------------------
export function loadTransactions () {
  return (dispatch, getState) => {
    fetch(TRANSACTIONS_URL).then((response) => {
      response.json().then((data) => {
        dispatch(transactionsLoadFinish(data))
      })
    })
  }
}

function transactionsLoadFinish (transactions) {
  return { type: TRANSACTIONS_LOAD_FINISH, payload: transactions }
}

export const actions = {
  loadTransactions
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TRANSACTIONS_LOAD_FINISH] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function transactionsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
