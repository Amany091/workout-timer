import React, { useCallback, useEffect, useRef, useState } from 'react'
import { tasks } from './tasks'

const Workout = ({ index, setTask, setActive }) => {
    let [timerValue, setTimerValue] = useState(tasks[index].time);
    let [timeWidth, setTimeWidth] = useState(0);
    let [workOutWidth, setWorkOutWidth] = useState(0)
    let [workoutMinutes, setWorkoutMinutes] = useState(0)
    let [workoutSeconds, setWorkoutSeconds] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const time = tasks.map(({ time }) => time).reduce((acc, curr) => acc + curr) / 60;
    const intervalRef = useRef()

    // callback used to avoid re-render after changing index to keep values and improve performance 
    const handleStartTimer = useCallback(() => {
        intervalRef.current = setInterval(() => {
            if (timerValue <= 0) {
                setTask(index + 1)
                // setTimerValue(tasks[index+1].time)
                setActive(tasks[index + 1])
            }
            setIsPaused(!isPaused)
            setTimerValue(timerValue -= 1);

            setTimeWidth((prevWidth) => prevWidth + (100 / tasks[index].time))
            setWorkOutWidth((prevTime) => prevTime + 0.4000)
            setWorkoutSeconds(workoutSeconds += 1)

            if (workoutSeconds > 59) {
                setWorkoutMinutes(workoutMinutes + 1)
                setWorkoutSeconds(0)
            }

        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [index, timerValue, setTimerValue, timeWidth, workOutWidth, workoutSeconds, workoutMinutes])

    useEffect(() => {
        setActive(tasks[index])
        setTimeWidth(0)
        setTimerValue(tasks[index].time) // update value after re-render 

    }, [index])

    const handlePauseTimer = () => {
        setIsPaused(!isPaused)
        clearInterval(intervalRef.current)
    }

    const handleReset = () => {
        setTask(0)
        setActive(tasks[0])
        setTimeWidth(0)
        setTimerValue(tasks[0].time)
        setWorkOutWidth(0)
        setWorkoutMinutes(0)
        setWorkoutSeconds(0)
        clearInterval(intervalRef.current)
    }

    return (
        <div className='w-50 d-flex flex-column mt-5 align-items-center workout'>
            <h1 className={`${tasks[index].time > 10 ? 'text-warning' : "text-success"} text-center`} > {tasks[index].task} </h1>
            <h4>next : {tasks[index + 1].task} </h4>
            <h1 className='text-success'>00: {timerValue} </h1>
            <div className=" w-100 rounded bg-light" style={{ height: "20px" }} >
                <div className="h-100 rounded bg-success " style={{ width: timeWidth + '%' }}></div>
            </div>
            <div className="time mt-5 w-100 d-flex justify-content-between">
                <p className="h4">{workoutMinutes < 10 ? `0${workoutMinutes}` : workoutMinutes} : {workoutSeconds < 10 ? `0${workoutSeconds}` : workoutSeconds} </p>
                <p className="h4">{Math.floor(time)}</p>
            </div>
            <div className="w-100 rounded bg-light" style={{ height: "20px" }} >
                <div className="h-100 rounded bg-success " style={{ width: workOutWidth + "%" }}></div>
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
