import React, { useContext, useEffect } from 'react'
import Pong from '../organisms/Pong'
import Win from '../organisms/Win'
import { store } from '../store'
import { useNavigate } from 'react-router'

function App() {
  const { state, dispatch } = useContext(store);
  const navigate = useNavigate()

  useEffect(() => {
    if(!state.score) {
      navigate('/')
    }
  }, [state.score])

  return (
    <>
      {state.score && (
        <div className="flex-col flex bg-gray-50 justify-center items-center h-screen w-screen">
          {state.winner && (
            <Win winner={state.winner} />
          )}
          <div className="flex justify-around m-4" style={{ width: '75vw' }}>
            <div className='flex w-50 justify-center flex-col items-center'>
              <p className='text-gray-800 text-xl' >{state.firstPseudo} </p>
              <p className='font-bold text-gray-800 text-2xl' >{state.score.split('-')[0]} point{Number(state.score.split('-')[0]) <= 1 ? '' : 's'}</p>
            </div>
            <div className='flex w-50 justify-center flex-col items-center'>
              <p className='text-gray-800 text-xl'>{state.secondPseudo} </p>
              <p className='font-bold text-gray-800 text-2xl'>{state.score.split('-')[1]} point{Number(state.score.split('-')[1]) <= 1 ? '' : 's'}</p>
            </div>

          </div>
          <Pong />
        </div>
      )}
    </>
  );
}

export default App;
