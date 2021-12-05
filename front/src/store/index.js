import React, { createContext, useReducer } from 'react'

const initialState = {}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { firstPseudo, secondPseudo, score, id, winner } = action.payload
    switch (action.type) {
      case 'SET_PSEUDOS':
        const newState = { firstPseudo, secondPseudo, score: '0-0', id, winner }
        return newState
      case 'UPDATE_SCORE':
        const scoreState = { firstPseudo, secondPseudo, score, id, winner }
        console.log(scoreState)
        return scoreState
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
