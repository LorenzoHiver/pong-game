import React, { useState, useEffect, useContext } from "react"
import Sketch from "react-p5"
import { store } from '../store'
import axios from 'axios'
import useSound from 'use-sound';

import hit from '../assets/songs/hit.mp3'
import bad from '../assets/songs/bad.mp3'


const Pong = () => {
    const { state, dispatch } = useContext(store);
    const [leftScore, setLeftScore] = useState(0)
    const [rightScore, setRightScore] = useState(0)
    const [hitPlaySong] = useSound(hit)
    const [badPlaySong] = useSound(bad)

    const windowWidth = window.innerWidth / 1.3 //canvas width
    const windowHeight = window.innerHeight / 1.3 //canvas height

    let paddleWidth = 16
    let paddleHeight = 150
    let paddleStep = windowHeight / 70 //paddle move speed
    let borderOffset = 15 //padding X
    let diameter = 20 //diamater of the ball

    let xPaddleLeft = borderOffset
    let yPaddleLeft = windowHeight / 2.3
    let xPaddleRight = windowWidth - borderOffset - paddleWidth
    let yPaddleRight = windowHeight / 2.3
    let leftServeXpos = xPaddleLeft + paddleWidth + diameter / 2
    let leftServeYpos = yPaddleLeft + (0.5 * paddleHeight)
    let yBall = leftServeYpos
    let xBall = leftServeXpos
    let xBallSpeed = 7
    let yBallSpeed = 7

    let started = false
    let leftServe = true
    let rightServe = false

    useEffect(() => {
        axios.put(`${process.env.REACT_APP_API_URL}matchs`, { score: leftScore + '-' + rightScore, id: state.id })
            .then(async () => {
                if (leftScore >= 3 || rightScore >= 3) {
                    return dispatch({ type: 'UPDATE_SCORE', payload: { score: leftScore + '-' + rightScore, firstPseudo: state.firstPseudo, secondPseudo: state.secondPseudo, id: state.id, winner: leftScore >= 3 ? state.firstPseudo : state.secondPseudo } })
                }
                dispatch({ type: 'UPDATE_SCORE', payload: { score: leftScore + '-' + rightScore, firstPseudo: state.firstPseudo, secondPseudo: state.secondPseudo, id: state.id, winner: '' } })
            })

    }, [dispatch, leftScore, rightScore])

    //p5 create canvas
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(windowWidth, windowHeight, "p2d").parent(canvasParentRef)
    }

    //p5 draw method
    const draw = (p5) => {
        p5.background(249, 250, 251)

        // wait space touch to launch
        if (started) {
            xBall += xBallSpeed
            yBall += yBallSpeed
        }

        //move bar when keyIsDown see https://keycode.info/ to know key code

        if (p5.keyIsDown(65)) {
            yPaddleLeft -= paddleStep
            moveBallWhenLeftServe(leftServe)
            moveBallWhenRightServe(rightServe)

            boundToWindow()
        }

        if (p5.keyIsDown(81)) {
            yPaddleLeft += paddleStep

            moveBallWhenLeftServe(leftServe)
            moveBallWhenRightServe(rightServe)

            boundToWindow()
        }

        if (p5.keyIsDown(40)) {
            yPaddleRight += paddleStep

            moveBallWhenLeftServe(leftServe)
            moveBallWhenRightServe(rightServe)

            boundToWindow()
        }

        if (p5.keyIsDown(38)) {
            yPaddleRight -= paddleStep

            moveBallWhenLeftServe(leftServe)
            moveBallWhenRightServe(rightServe)

            boundToWindow()
        }

        // detect paddle left colision
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

        // detect paddle right colision
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

        drawMiddleBar(p5)

        // Draw ball (top layer)
        p5.fill(31, 41, 55)
        p5.ellipse(xBall, yBall, diameter, diameter)

    }

    const bounceTopBottom = () => {
        if (yBall < diameter / 2 || yBall > windowHeight - diameter) {
            yBallSpeed *= -1
            return
        }
        return
    }
    const moveBallWhenRightServe = (moveBallWhenRightServe) => {
        if (moveBallWhenRightServe) {
            xBall = xPaddleRight - diameter / 2
            yBall = yPaddleRight + (0.5 * paddleHeight)
            return
        }
        return
    }

    const moveBallWhenLeftServe = (moveBallWhenLeftServe) => {
        if (moveBallWhenLeftServe) {
            xBall = xPaddleLeft + paddleWidth + diameter / 2
            yBall = yPaddleLeft + (0.5 * paddleHeight)
            return
        }
        return
    }

    const boundToWindow = () => {
        if (yPaddleLeft <= 0) yPaddleLeft = 0
        if (yPaddleLeft + paddleHeight >= windowHeight) yPaddleLeft = windowHeight - paddleHeight
        if (yPaddleRight <= 0) yPaddleRight = 0
        if (yPaddleRight + paddleHeight >= windowHeight) yPaddleRight = windowHeight - paddleHeight
    }

    const drawMiddleBar = (p5) => {
        p5.fill(125, 95, 255)
        p5.rect((windowWidth - paddleWidth) / 2, 0, paddleWidth / 2, windowHeight)
        return
    }

    const handlePress = (e) => {
        //press space bar to launch game
        if (e.keyCode === 32) {
            started = true
            if (leftServe) {
                xBallSpeed = 7;
                yBallSpeed = 7
            }
            if (rightServe) {
                xBallSpeed = 7 * -1;
                yBallSpeed = 7 * -1;
            }
            leftServe = false;
            rightServe = false;
        }

        moveBallWhenLeftServe(leftServe)
        moveBallWhenRightServe(rightServe)

        boundToWindow()
        return
    }

    return (
        <Sketch setup={setup} keyPressed={handlePress} draw={draw} style={{ border: '8px solid #7D5FFF', borderRadius: '10px' }} />
    )
}

export default Pong
