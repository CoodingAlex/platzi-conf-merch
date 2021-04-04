import { useState } from 'react'
import initialState from '../initialState'

const useInitialState = () => {
  const [counter, setCounter] = useState(0)
  const addCounter = () => {
    setCounter(counter + 1)
    return counter
  } 
  const [state, setState] = useState(initialState)

  const addToCart = payload => {
    setState({
      ...state,
      cart: [...state.cart,{...payload,index: addCounter()}]
    })
  }

  const removeFromCart = payload => {
    setState({
      ...state,
      cart: state.cart.filter(item => item.index !== payload.index)
    })
  }

  const addToBuyer = payload => {
    setState({
      ...state,
      buyer: [...state.buyer,payload]
    })
  }

  const addNewOrder = payload => {
    setState({
      ...state,
      orders: [...state.orders, payload]
    })
  }
  return{
    removeFromCart,
    addToCart,
    state,
    addToBuyer,
    addNewOrder
  }
}

export default useInitialState
