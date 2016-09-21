// ------------------------------------
// Constants
// ------------------------------------

const SERVER_BASE = 'http://localhost:3000/'
const CATEGORIES_URL = SERVER_BASE + 'categories'

const CATEGORY_LOAD_FINISH = 'CATEGORY_LOAD_FINISH'

// ------------------------------------
// Actions
// ------------------------------------
export function loadCategories () {
  return (dispatch, getState) => {
    fetch(CATEGORIES_URL).then((response) => {
      response.json().then((data) => {
        dispatch(categoryLoadFinish(data))
      })
    })
  }
}

function categoryLoadFinish (categories) {
  return { type: CATEGORY_LOAD_FINISH, payload: categories }
}

export const actions = {
  loadCategories
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CATEGORY_LOAD_FINISH] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function categoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
