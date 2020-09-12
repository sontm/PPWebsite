import { useMemo } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const increaseCart = () => (dispatch) => {
  return dispatch({
    type: 'INCREASE_CART',
  })
}

let store

const initialState = {
  cartNum: 3
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'INCREASE_CART':
          return {...state, cartNum: state.cartNum+1};
      default:
          return state
  }
};

const combinedReducer = combineReducers({
  modalReducer
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    console.log("%%%%%%%%%%%%% HYDRATE-----------------")
    console.log(state)
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    //if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const makeStore = context => createStore(reducer, bindMiddleware([thunkMiddleware]))

export const wrapper = createWrapper(makeStore, {debug: true})
