import React, { useState } from 'react'
import Pong from '../organisms/Pong'

function App() {
  const [score, setScore] = useState({ left: 0, right: 0 })
  return (
    <div className="flex-col flex bg-gray-700 justify-center items-center h-screen w-screen">
      <div className="flex justify-around m-4" style={{ width: '75vw' }}>
        <p className='font-bold text-white text-2xl'>Local: {score.left} point{score.left < 1 ? '' : 's'}</p>
        <p className='font-bold text-white text-2xl'>Visiteur: {score.right} point{score.right < 1 ? '' : 's'}</p>
      </div>
      <Pong changeScore={setScore} score={score} />
    </div>
  );
}

export default App;
