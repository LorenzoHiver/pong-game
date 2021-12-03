import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import moment from 'moment'


const Home = () => {
    const navigate = useNavigate()
    const [matchs, setMatchs] = useState([])
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            firstPseudo: '',
            secondPseudo: ''
        }
    });

    const getScorePlayer = (score, player) => score ? Number(score.split('-')[player]) : null
    const onSubmit = async ({ firstPseudo, secondPseudo }) => {
        await axios.post(`${process.env.REACT_APP_API_URL}matchs`, { firstPseudo, secondPseudo })
        navigate('/pong')
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}matchs`)
            .then(res => {
                const matchs = res.data;
                setMatchs(matchs)
            })
    }, [])

    return (
        <div className="h-screen w-screen flex bg-white justify-between overflow-hidden">
            <div className='flex h-screen w-1/3 justify-center items-center ' style={{ background: '#7d5fff' }}>
                <div className='h-5/6 w-9/12 rounded-2xl p-4 flex-col flex items-center overflow-y-auto '>
                    <h2 className="font-bold text-gray-50 text-2xl max-h-screen text-center mb-2">Derniers matchs ! <span className='font-normal'>🕹️</span></h2>
                    {matchs && matchs.filter((match) => match.score).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt)).slice(0, 9).map(({ firstPseudo, score, secondPseudo }) => (
                        <div className="flex justify-between items-center w-full mt-5 bg-gray-50 py-3 px-6 rounded">
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
                    ))}


                </div>
            </div>
            <div className="w-2/3 bg-gray-50 h-screen flex items-center flex-col">
                <h1 className='font-bold mt-8 text-4xl text-white mb-auto text-gray-800'>Pong Game ! <span className='font-normal'>🏓</span></h1>
                <div className='flex flex-col justify-center items-center w-full'>
                    <form id='form' className="flex w-full justify-around" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="firstPseudo"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="flex justify-center items-center flex-col">
                                    <input className="px-5 py-3 rounded outline-none bg-white border-4 text-gray-800 font-bold" style={{ borderColor: '#7D5FFF' }} placeholder='Joueur 1' {...field} />
                                </div>
                            )}
                        />
                        <button type='submit' form='form' className="w-32 justify-self-center h-32 rounded-full focus:outline-none border-8" style={{ borderColor: '#7D5FFF' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                                <polygon style={{ fill: '#1F2937' }} points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69" />
                            </svg>
                        </button>

                        <Controller
                            name="secondPseudo"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="flex justify-center items-center flex-col">

                                    <input className="px-5 py-3 rounded outline-none border-4 bg-white text-gray-800 font-bold" style={{ borderColor: '#7D5FFF' }} placeholder='Joueur 2' {...field} />
                                </div>
                            )}
                        />
                    </form>
                    {(errors['firstPseudo'] || errors['secondPseudo']) && (
                        <div className="absolute py-3 px-6 bg-red-500 rounded " style={{ top: 'calc(50% + 120px)' }}>
                            <p className="font-bold text-white">Veuillez saisir les pseudos des joueurs pour jouer ! <span className='font-normal'>🚀</span></p>
                        </div>
                    )}



                </div>
                <div className='px-8 py-3 absolute rounded flex flex-col justify-center items-center' style={{ bottom: "120px",background: '#7D5FFF' }}>
                    <p className="mb-1 text-center text-gray-50">Le <span className="font-bold ">Joueur 1</span> doit utiliser les touches <span className="font-bold text-xl">A</span> et <span className="font-bold text-xl">Q</span></p>
                    <p className="text-gray-50 mb-1 text-center">Le <span className="font-bold">Joueur 2</span> doit utiliser les flèches 🔼 et 🔽</p>
                    <p className="mb-1 text-gray-50 text-center">La touche <span className="font-bold">ESPACE</span> permet de lancer la balle</p>
                </div>

                <p className="mb-6 font-bold mt-auto  text-white text-gray-800">Made with <span className='font-normal'>❤️</span> by Lorenzo.</p>
            </div>
        </div>
    )
}

export default Home


