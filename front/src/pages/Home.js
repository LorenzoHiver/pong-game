import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import moment from 'moment'

import { store } from '../store'
import Item from '../organisms/Item'
import Input from '../atoms/Input'
import PlayButton from '../atoms/PlayButton';
import Box from '../atoms/Box'
import Error from '../atoms/Error'

const Home = () => {
    const { state, dispatch } = useContext(store);
    const navigate = useNavigate()
    const [matchs, setMatchs] = useState([])
    const [filtredMatchsList, setFiltredMatchsList] = useState()
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            firstPseudo: '',
            secondPseudo: ''
        }
    });

    const getScorePlayer = (score, player) => score ? Number(score.split('-')[player]) : null

    const onSubmit = async ({ firstPseudo, secondPseudo }) => {
        const match = await axios.post(`${process.env.REACT_APP_API_URL}matchs`, { firstPseudo, secondPseudo })
        await dispatch({ type: 'SET_PSEUDOS', payload: { firstPseudo, secondPseudo, id: match.data.id } })
        navigate('/pong')
    };

    const filtredMatchs = (matchs, type, value) => {
        switch (type) {
            case 'name':
                const filtredMatchsByName = matchs.filter((match) => match.firstPseudo.toUpperCase().includes(value.toUpperCase()) || match.secondPseudo.toUpperCase().includes(value.toUpperCase()))
                return filtredMatchsByName
            default:
                return matchs
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}matchs`)
            .then(res => {
                const { data: matchs } = res;
                setMatchs(matchs)
                setFiltredMatchsList(matchs)
            })
    }, [])

    return (
        <div className="h-screen w-screen flex bg-white justify-between overflow-hidden">

            <div className='flex h-screen w-1/3 justify-center items-center flex-col' style={{ background: '#7d5fff' }}>
                <div className='h-5/6 w-9/12 rounded-2xl p-4 flex-col flex items-center overflow-y-auto mt-8'>
                    <h2 className="font-bold text-gray-50 text-2xl max-h-screen text-center mb-8">Derniers matchs ! <span className='font-normal'>🕹️</span></h2>
                    {filtredMatchsList && filtredMatchsList.filter((match) => match.score).sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt)).slice(0, 9).map(({ firstPseudo, score, id, secondPseudo }, i) => (
                        <Item delay={i * 0.2} key={id} firstPseudo={firstPseudo} score={score} secondPseudo={secondPseudo} getScorePlayer={getScorePlayer} />
                    ))}
                </div>
                <div className='flex mt-auto mb-12'>
                    <Input placeholder='Rechercher un pseudo ?' onChange={((e) => setFiltredMatchsList(filtredMatchs(matchs, 'name', e.target.value)))} />
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
                                    <Input {...field} placeholder='Joueur 1' />
                                </div>
                            )}
                        />
                        <PlayButton />
                        <Controller
                            name="secondPseudo"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="flex justify-center items-center flex-col">
                                    <Input {...field} placeholder='Joueur 2' />
                                </div>
                            )}
                        />
                    </form>
                    {(errors['firstPseudo'] || errors['secondPseudo']) && (
                        <Error text="Veuillez saisir les pseudos des joueurs pour lancer la partie !" emoji="🚀" />
                    )}
                </div>

                <Box style={{ bottom: "120px", background: '#7D5FFF' }}>
                    <p className="mb-1 text-center text-gray-50">Le <span className="font-bold ">Joueur 1</span> doit utiliser les touches <span className="font-bold text-xl">A</span> et <span className="font-bold text-xl">Q</span></p>
                    <p className="text-gray-50 mb-1 text-center">Le <span className="font-bold">Joueur 2</span> doit utiliser les flèches 🔼 et 🔽</p>
                    <p className="mb-1 text-gray-50 text-center">La touche <span className="font-bold">ESPACE</span> permet de lancer la balle</p>
                    <p className="mb-1 text-gray-50 text-center">Le premier joueur à <span className="font-bold">5 points</span> gagne la partie</p>
                </Box>

                <p className="mb-6 font-bold mt-auto  text-white text-gray-800">Made with <span className='font-normal'>❤️</span> by Lorenzo.</p>
            </div>
        </div>
    )
}

export default Home


