import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller, FormProvider } from "react-hook-form";


const Home = () => {
    const navigate = useNavigate()
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            firstPseudo: '',
            secondPseudo: ''
        }
    });

    const onSubmit = async (data) => {
        await console.log(data)
        navigate('/pong')
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-r from-green-400 to-blue-500  flex justify-between">
            <div className='flex h-screen w-1/3 justify-center items-center'>
                <div className='bg-gray-700 h-5/6 w-9/12 rounded-2xl p-4 flex-col flex items-center'>
                    <h2 className="font-bold text-white text-2xl text-center">Derniers matchs !</h2>
                    <div className="flex justify-around w-full mt-5">
                        <div className="flex flex-col">
                            <h3 className="text-white">Joueur 1</h3>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-white">Score</h3>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white">Joueur 2</h3>
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-2/3 h-screen flex items-center flex-col">
                <h1 className='font-bold mt-8 text-4xl text-white mb-auto'>Pong Game !</h1>
                <div className='flex flex-col justify-center items-center w-full'>
                    <form id='form' className="flex w-full justify-around" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="firstPseudo"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="flex justify-center items-center flex-col">
                                    <p className='text-2xl text-white mb-4'>Pseudo du joueur 1</p>
                                    <input className="px-5 py-3 rounded outline-none" placeholder='Lorenzo' {...field} />
                                </div>
                            )}
                        />
                        <button type='submit' form='form' className="w-32 justify-self-center h-32 rounded-full focus:outline-none border-white border-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                                <polygon style={{ fill: '#F9FAFB' }} points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69" />
                            </svg>
                        </button>
                        
                        <Controller
                            name="secondPseudo"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className="flex justify-center items-center flex-col">
                                    <p className='text-2xl text-white mb-4'>Pseudo du joueur 2</p>
                                    <input className="px-5 py-3 rounded outline-none" placeholder='Lorenzo' {...field} />
                                </div>
                            )}
                        />
                    </form>
                    {(errors['firstPseudo'] || errors['secondPseudo']) && (
                        <div className="absolute py-3 px-6 bg-red-500 rounded " style={{ top: 'calc(50% + 120px)' }}>
                            <p className="font-bold text-white">Vous devez entrer deux pseudos pour pouvoir jouer !</p>
                        </div>
                    )}



                </div>
                <p className="mb-8 font-thin text-white mt-auto">Made with ♥ by Lorenzo</p>
            </div>
        </div>
    )
}

export default Home


