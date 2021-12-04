import React, { useState, useContext } from 'react'
import Pong from '../organisms/Pong'
import { store } from '../store'

function App() {
  const { state, dispatch } = useContext(store);
  return (
    <>
      {state && (
        <div className="flex-col flex bg-gray-50 justify-center items-center h-screen w-screen">
          <div className="flex justify-around m-4" style={{ width: '75vw' }}>
            <p className='font-bold text-gray-800 text-2xl' style={{ color: Number }}>{state.firstPseudo}: {state.score.split('-')[0]} point{Number(state.score.split('-')[0]) <= 1 ? '' : 's'}</p>
            <p className='font-bold text-gray-800 text-2xl'>{state.secondPseudo}: {state.score.split('-')[1]} point{Number(state.score.split('-')[1]) <= 1 ? '' : 's'}</p>
          </div>
          <Pong />
        </div>
      )}
    </>
  );
}

export default App;
