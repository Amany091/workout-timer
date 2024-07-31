import React, { useCallback, useEffect, useRef, useState } from 'react'
import { tasks } from './tasks'

const Workout = ({ index, setTask, setActive }) => {
    let [timerValue, setTimerValue] = useState(tasks[index].time);
    let [timeWidth, setTimeWidth] = useState(0);
    const [isPaused, setIsPaused] = useState(false)
    let [workoutSecondsDone, setWorkoutSecondsDone] = useState({}) // store time acheived from beggining to current actiivity
    const intervalRef = useRef()

    const workoutTotalSeconds = [...tasks].map(({ time }) => time),// final time
        workoutSeconds = workoutTotalSeconds.reduce((acc, curr) => acc + curr, 0) % 60,
        workoutMinutes = workoutTotalSeconds.reduce((acc, curr) => acc + curr, 0) / 60;

    const workoutRemaining = [...tasks].splice(index),
        workoutRemainingSeconds = workoutRemaining.map(({ time }) => time).reduce((acc, curr) => acc + curr, 0); // calculate the remaining time from current activity to last one

    const workoutTargetAvg = [...tasks].splice(0, index).map(({ time }) => time === 10 ? 1.92308 : 5.76923).reduce((acc, curr) => acc + curr, 0) // calculate the target acheived from begining to current activity

    useEffect(() => {
        setTask(index)
        workoutSecondsDone = {
            workoutMinutes: [...tasks].splice(0, index).map(({ time }) => time).reduce((acc, curr) => acc + curr, 0) / 60,
            workoutSeconds: [...tasks].splice(0, index).map(({ time }) => time).reduce((acc, curr) => acc + curr, 0) % 60
        }
        setWorkoutSecondsDone(workoutSecondsDone) // to update every time when index change
        setActive(tasks[index])
        setTimeWidth(0)
        setTimerValue(tasks[index].time) // update value when index change  
    }, [index])

    const handleStartTimer = useCallback(() => {
        intervalRef.current = setInterval(() => {
            
            if (Math.floor(workoutMinutes) === workoutSecondsDone.workoutMinutes && workoutSeconds === workoutSecondsDone.workoutSeconds) {
                clearInterval(intervalRef.current)
            }
            
            if (timerValue <= 0) {
                setTask(index + 1);
                console.log("new Index inside function handler", index)
                setActive(tasks[index])
                setTimerValue(tasks[index].time)
            } else {
                setTimerValue(timerValue -= 1);
                console.log("timerValue", timerValue)
            }
            
            console.log("old Index :", index)
            setIsPaused(!isPaused)
            setTimeWidth((prevWidth) => prevWidth + (100 / tasks[index].time)) // Progress Bar Activity
        }, 1000)

        return () => clearInterval(intervalRef.current)
    },[index, index, timeWidth, workoutSecondsDone,timerValue ])

    const handlePauseTimer = () => {
        setIsPaused(!isPaused)
        clearInterval(intervalRef.current)
    }

    const handleReset = () => {
        setTask(0)
        setActive(tasks[0])
        setTimeWidth(0)
        setTimerValue(tasks[0].time)
        clearInterval(intervalRef.current)
    }

    console.log("index changed outer function handler", index)
    
    return (
        <div className='w-50 d-flex flex-column mt-5 align-items-center workout'>
            <h1 className={`${tasks[index].time > 10 ? 'text-warning' : "text-success"} text-center`} > {Math.floor(workoutMinutes) === workoutSecondsDone.workoutMinutes && workoutSeconds === workoutSecondsDone.workoutSeconds ? 'Workout Completed' : tasks[index].task} </h1>
            <h4>{workoutRemaining.length == 1 ? "Last activity , almost done" : 'next: ' + tasks[index + 1].task} </h4>
            <h1 className='text-success'>00: {timerValue} </h1>
            {/* Current Activity Time Progress Bar */}
            <div className=" w-100 rounded bg-light" style={{ height: "20px" }} >
                <div className="h-100 rounded bg-success " style={{ width: timeWidth + '%' }}></div>
            </div>
            {/* Workout Time Range */}
            <div className="time mt-5 w-100 d-flex justify-content-between">
                <p className="h4">{Math.floor(workoutSecondsDone.workoutMinutes) < 10 ? '0' + Math.floor(workoutSecondsDone.workoutMinutes) : Math.floor(workoutSecondsDone.workoutMinutes)} : {workoutSecondsDone.workoutSeconds < 10 ? '0' + workoutSecondsDone.workoutSeconds % 60 : workoutSecondsDone.workoutSeconds} </p>
                
                <p className="h4">{Math.floor(workoutRemainingSeconds / 60) < 10 ? '0' + Math.floor(workoutRemainingSeconds / 60) : Math.floor(workoutRemainingSeconds / 60)}: {workoutRemainingSeconds % 60 < 10 ? '0' + workoutRemainingSeconds % 60 : workoutRemainingSeconds % 60}</p>
            </div>
            {/* Workout Progress Bar */}
            <div className="w-100 rounded bg-light" style={{ height: "20px" }} >
                <div className="h-100 rounded bg-success " style={{ width: workoutTargetAvg + "%" }}></div>
            </div>
            <div className="control_timer d-flex justify-content-between w-100">
                <button type='button' className="btn text-light fs-3 border-dark btn-outline-dark" onClick={handlePauseTimer} disabled={!isPaused} >Pause</button >
                <button type="button" className="btn text-light fs-3 border-dark btn-outline-dark " onClick={handleStartTimer} disabled={isPaused} >Start</button>
                <button type="button" className="btn text-light fs-3 " onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Workout
