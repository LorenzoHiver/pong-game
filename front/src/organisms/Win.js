import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Delayed from 'react-delayed'

const Win = ({ winner }) => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, [3500])
    })

    return (
        <div className='fixed w-screen bg-gray-700 bg-opacity-50 flex justify-content items-center rounded h-screen' >
            <div className="w-screen bg-gray-50 mx-auto flex justify-center items-center rounded" style={{ animation: 'banner 1s ease-in', height: '25vh' }}>
                <Delayed mounted={true} mountAfter={300}>
                    <p className='text-2xl' style={{ animation: 'opacity .8s ease-in' }}>Le joueur <span className='font-bold text-4xl'>{winner}</span> est le grand vainqueur ! 👑</p>
                </Delayed>
            </div>
        </div>
    )
}

export default Win
