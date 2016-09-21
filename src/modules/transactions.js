// ------------------------------------
// Constants
// ------------------------------------
import { SERVER_BASE } from '../consts'
const TRANSACTIONS_URL = SERVER_BASE + 'transactions'
const TRANSACTIONS_BY_CATEGORY_URL = SERVER_BASE + 'categories/:id/transactions'
const TRANSACTIONS_BY_MERCHANT_URL = SERVER_BASE + 'merchants/:id/transactions'

const TRANSACTIONS_LOAD_FINISH = 'TRANSACTIONS_LOAD_FINISH'

// ------------------------------------
// Actions
// ------------------------------------
export function loadTransactions ({ category, merchant }) {
  let url = TRANSACTIONS_URL
  if (category) {
    url = TRANSACTIONS_BY_CATEGORY_URL.replace(':id', category)
  } else if (merchant) {
    url = TRANSACTIONS_BY_MERCHANT_URL.replace(':id', merchant)
  }
  return (dispatch, getState) => {
    fetch(url).then((response) => {
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
