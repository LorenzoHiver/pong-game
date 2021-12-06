import React from 'react'

const Item = ({ firstPseudo, secondPseudo, getScorePlayer, score, delay }) => {

    return (
        <div className="flex justify-between items-center w-full mt-5 bg-gray-50 py-3 px-6 rounded" style={{ animation: `opacity .35s ease-in`, animationDelay: `${delay}s`, animationFillMode: 'both' }}>
            <div className="flex w-1/3 text-left">
                <p>{getScorePlayer(score, 0) > getScorePlayer(score, 1) ? '🏆' : '🤡'}</p>
                <h3 className="font-bold capitalize ml-3 uppercase">{firstPseudo}</h3>
            </div>
            <div className="flex justify-between px-6 w-1/3 text-xl">
                <h3 className="font-bold" style={{ color: (getScorePlayer(score, 1) < getScorePlayer(score, 0)) && '#7D5FFF' }}>{score.split('-')[0]}</h3>
                <h3 className="font-bold" style={{ color: (getScorePlayer(score, 1) > getScorePlayer(score, 0)) && '#7D5FFF' }}>{score.split('-')[1]}</h3>
            </div>
            <div className="flex justify-end w-1/3 text-right">
                <h3 className="font-bold capitalize mr-3 uppercase">{secondPseudo}</h3>
                <p>{getScorePlayer(score, 0) < getScorePlayer(score, 1) ? '🏆' : '🤡'}</p>
            </div>
        </div>
    )
}

export default Item
