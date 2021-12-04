import React, { useState, useEffect, useContext } from "react"
import Sketch from "react-p5"
import { store } from '../store'
import axios from 'axios'
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom'

import hit from '../assets/songs/hit.mp3'
import bad from '../assets/songs/bad.mp3'


let windowWidth = window.innerWidth / 1.3
let windowHeight = window.innerHeight / 1.3
let paddleWidth = 16
let paddleHeight = 150
let paddleStep = windowHeight / 120
let borderOffset = 20
let diameter = 20

let xPaddleLeft = borderOffset
let yPaddleLeft = windowHeight / 2
let xPaddleRight = windowWidth - borderOffset - paddleWidth
let yPaddleRight = windowHeight / 2
let leftServeXpos = xPaddleLeft + paddleWidth + diameter / 2
let leftServeYpos = yPaddleLeft + (0.5 * paddleHeight)
let yBall = leftServeYpos
let xBall = leftServeXpos
let xBallSpeed = 7
let yBallSpeed = 7

let started = false
let leftServe = true
let rightServe = false


const Pong = () => {
    const { state, dispatch } = useContext(store);
    const [leftScore, setLeftScore] = useState(0)
    const [rightScore, setRightScore] = useState(0)
    const [hitPlaySong] = useSound(hit);
    const [badPlaySong] = useSound(bad);
    const navigate = useNavigate()

    //p5 Canvas Setup
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(windowWidth, windowHeight, "p2d").parent(canvasParentRef)
    }

    useEffect(() => {
        dispatch({ type: 'UPDATE_SCORE', payload: { score: leftScore + '-' + rightScore, firstPseudo: state.firstPseudo, secondPseudo: state.secondPseudo, id: state.id } })
        axios.put(`${process.env.REACT_APP_API_URL}matchs`, { score: leftScore + '-' + rightScore, id: state.id })
            .then(() => {
                if (leftScore >= 3 || rightScore >= 3) {
                    navigate('/')
                }
            })

    }, [dispatch, leftScore, rightScore])

    //p5 Canvas Re-draw method
    const draw = (p5) => {
        p5.keyIsDown()
        p5.background(249, 250, 251)

        // global pause - when not started or serve in progress
        if (started) {
            xBall += xBallSpeed
            yBall += yBallSpeed
        }

        if (p5.keyIsDown(65)) {
            yPaddleLeft -= paddleStep
            moveBallDuringLeftServe(leftServe)
            moveBallDuringRightServe(rightServe)

            boundToWindow()
        }

        if (p5.keyIsDown(81)) {
            yPaddleLeft += paddleStep

            moveBallDuringLeftServe(leftServe)
            moveBallDuringRightServe(rightServe)

            boundToWindow()
        }

        if (p5.keyIsDown(40)) {
            yPaddleRight += paddleStep

            moveBallDuringLeftServe(leftServe)
            moveBallDuringRightServe(rightServe)

            boundToWindow()
        }

        if (p5.keyIsDown(38)) {
            yPaddleRight -= paddleStep

            moveBallDuringLeftServe(leftServe)
            moveBallDuringRightServe(rightServe)

            boundToWindow()
        }

        // Detect collision with left paddle
        // if hit with upper half of paddle, redirect up, if lower half, redirect down
        if (
            xBall <= 0 + xPaddleLeft + paddleWidth + borderOffset + (diameter / 2) &&
            yBall < yPaddleLeft + paddleHeight &&
            yBall >= yPaddleLeft
        ) {
            if (
                yBall >= yPaddleLeft &&
                yBall < (yPaddleLeft + (0.5 * paddleHeight))
            ) {
                yBallSpeed = Math.abs(yBallSpeed) * 1.07
                xBallSpeed = Math.abs(xBallSpeed) * 1.07 
                hitPlaySong()
            }
            if (
                yBall > (yPaddleLeft + (0.5 * paddleHeight)) &&
                yBall <= (yPaddleLeft + paddleHeight)
            ) {
                yBallSpeed = Math.abs(yBallSpeed) * 1.07
                xBallSpeed = Math.abs(xBallSpeed) * 1.07
                hitPlaySong()
            }
        }
        // points only if behind left wall
        else if (xBall < diameter / 2) {
            xBallSpeed *= -1
            // setScore({ score: String((Number(score.split('-')[0]) + 1) + score.split('-')[1]) })
            setRightScore(rightScore + 1)
            badPlaySong()
            started = false
            // put ball for left serve
            xBall = xPaddleLeft + paddleWidth + diameter / 2
            yBall = yPaddleLeft + (0.5 * paddleHeight)
            leftServe = true
        }

        // Detect collision with right paddle
        // if hit with upper half of paddle, redirect up, if lower half, redirect down
        if (
            xBall >= windowWidth - borderOffset - paddleWidth - (diameter / 2) &&
            yBall <= yPaddleRight + paddleHeight &&
            yBall >= yPaddleRight
        ) {
            if (
                yBall >= yPaddleRight &&
                yBall < (yPaddleRight + (0.5 * paddleHeight))
            ) {
                yBallSpeed = Math.abs(yBallSpeed) * -1
                xBallSpeed = Math.abs(xBallSpeed) * -1
                hitPlaySong()
            }
            if (
                yBall > (yPaddleRight + (0.5 * paddleHeight)) &&
                yBall <= (yPaddleRight + paddleHeight)
            ) {
                yBallSpeed = Math.abs(yBallSpeed)
                xBallSpeed = Math.abs(xBallSpeed) * -1
                hitPlaySong()
            }
        }
        // points if behind right wall
        // pause game and do serve position for the lost point user
        else if (xBall + diameter / 2 > windowWidth) {
            xBallSpeed *= -1
            setLeftScore(leftScore + 1)
            badPlaySong()
            started = false
            // put ball for right serve
            xBall = xPaddleRight - diameter / 2
            yBall = yPaddleRight + (0.5 * paddleHeight)
            rightServe = true
        }

        bounceTopBottom()

        // Draw paddle left
        p5.fill(31, 41, 55)
        p5.noStroke()
        p5.rect(xPaddleLeft, yPaddleLeft, paddleWidth, paddleHeight)

        // Draw paddle right
        p5.fill(31, 41, 55)
        p5.noStroke()
        p5.rect(xPaddleRight, yPaddleRight, paddleWidth, paddleHeight)

        drawStaticItems(p5)

        // Draw ball (top layer)
        p5.fill(31, 41, 55)
        p5.ellipse(xBall, yBall, diameter, diameter)

    }

    const bounceTopBottom = () => {
        // bounce from top and bottom
        if (yBall < diameter / 2 || yBall > windowHeight - diameter) {
            yBallSpeed *= -1
        }
    }
    const moveBallDuringRightServe = (moveBallDuringRightServe) => {
        if (moveBallDuringRightServe) {
            xBall = xPaddleRight - diameter / 2
            yBall = yPaddleRight + (0.5 * paddleHeight)
        }
    }

    const moveBallDuringLeftServe = (moveBallDuringLeftServe) => {
        if (moveBallDuringLeftServe) {
            xBall = xPaddleLeft + paddleWidth + diameter / 2
            yBall = yPaddleLeft + (0.5 * paddleHeight)
        }
    }

    const boundToWindow = () => {
        if (yPaddleLeft <= 0) yPaddleLeft = 0
        if (yPaddleLeft + paddleHeight >= windowHeight) yPaddleLeft = windowHeight - paddleHeight
        if (yPaddleRight <= 0) yPaddleRight = 0
        if (yPaddleRight + paddleHeight >= windowHeight) yPaddleRight = windowHeight - paddleHeight
    }

    const drawStaticItems = (p5) => {
        // Draw middle line
        p5.fill(125, 95, 255)
        p5.rect((windowWidth - paddleWidth) / 2, 0, paddleWidth / 2, windowHeight)

    }

    const keyPressed = (e) => {
        //space bar to launch game
        if (e.keyCode === 32) {
            started = true
            if (leftServe) {
                xBallSpeed = Math.abs(xBallSpeed);
            }
            if (rightServe) {
                xBallSpeed = Math.abs(xBallSpeed) * -1;
            }
            leftServe = false;
            rightServe = false;
        }

        moveBallDuringLeftServe(leftServe)
        moveBallDuringRightServe(rightServe)

        boundToWindow()
    }

    return (
        <Sketch setup={setup} keyPressed={keyPressed} draw={draw} style={{ border: '8px solid #7D5FFF', borderRadius: '10px' }} />
    )
}

export default Pong
