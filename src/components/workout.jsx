import React, { useCallback, useEffect, useRef, useState } from 'react'
import { tasks } from './tasks'

const Workout = ({ index, setIndex, setActive, currentIndex ,timer,isFinished,setIsFinished}) => {
    let [timeWidth, setTimeWidth] = useState(0);
    const [isPaused, setIsPaused] = useState(false)
    // const [isFinished,setIsFinished] = useState(false)
    let [workoutSecondsDone, setWorkoutSecondsDone] = useState({})
    const intervalRef = useRef()
    // let timer = useRef(tasks[currentIndex].time);
    const currentIndexRef = useRef(index) // store current index to stayed updated across renders
    let workoutDone = [...tasks].splice(0, currentIndex) // display workout done from zero to current  

    // calculate the remaining time from current activity to last one
    const workoutRemaining = [...tasks].splice(currentIndex),
        workoutRemainingSeconds = workoutRemaining.map(({ time }) => time).reduce((acc, curr) => acc + curr, 0);

    // calculate time passed from zero to current activity with checking on time to increase width range
    const workoutTargetAvg = workoutDone.map(({ time }) => time === 10 ? 1.92308 : 5.76923).reduce((acc, curr) => acc + curr, 0);

    const handleStartTimer = useCallback(() => {
        setIsPaused(!isPaused)
        intervalRef.current = setInterval(() => {
            if (currentIndexRef.current === tasks.length -1 && timer.current == 0) { // if all workout are finished then clear interval
                setIsPaused(true)
                setIsFinished(true)
                return()=>clearInterval(intervalRef.current)
            } else {
                timer.current -= 1;
                setTimeWidth((prevWidth) => prevWidth + (100 / tasks[currentIndexRef.current].time))
                if (timer.current < 0) {
                    setIndex((prevIndex) => {
                        currentIndex = prevIndex + 1;
                        setActive(tasks[currentIndex])
                        timer.current = tasks[currentIndex].time
                        return currentIndex
                    });
                }
                setIsFinished(false)
            }



        }, 1000)
        return () => clearInterval(intervalRef.current)
    }, [setActive, setIndex, setIsPaused])

    useEffect(() => {
        setIndex(currentIndex)
        currentIndexRef.current = index // update state from sidebar
        // calculate minutes and seconds from beggening activity to current one
        workoutSecondsDone = {
            workoutMinutes: workoutDone.map(({ time }) => time).reduce((acc, curr) => acc + curr, 0) / 60,
            workoutSeconds: workoutDone.map(({ time }) => time).reduce((acc, curr) => acc + curr, 0) % 60
        }
        setWorkoutSecondsDone(workoutSecondsDone) // to update every time when currentIndex change
        setActive(tasks[currentIndex])
        setTimeWidth(0)
        // update timer when index change
        timer.current = tasks[currentIndex].time

    }, [index, currentIndex, setIndex])

    const handlePauseTimer = () => {
        setIsPaused(!isPaused)
        clearInterval(intervalRef.current)
    }


    const handleReset = () => {
        setIndex(0)
        setActive(tasks[0])
        setTimeWidth(0)
        timer.current = tasks[0].time
        clearInterval(intervalRef.current)
        setIsPaused(false)
    }

    return (
        <div className={` d-flex flex-column align-items-center w-75 mx-auto workout`}>
            <h1 className={`${tasks[index].time > 10 ? 'text-warning' : "text-success"} text-center`} > {isFinished? 'Workout Completed 🎉' : tasks[index].task} </h1>
            <h4>
                {isFinished ? '🎉🎉🎉🎉🎉':
                    workoutRemaining.length == 1 ? "Last activity , almost done" :
                    workoutRemaining.length === 0 ? '' : 'next: ' + tasks[index + 1].task
                }
            </h4>
            <h1 className='text-success'>00: {isFinished? '00' : timer.current} </h1>
            {/* Current Activity Time Progress Bar */}
            <div className=" w-100 rounded bg-light overflow-hidden" style={{ height: "20px" }} >
                <div className="h-100 rounded bg-success " style={isFinished? {width:'100%'} :{ width: timeWidth + '%' }}></div>
            </div>
            {/* Workout Time Range */}
            <div className="time mt-5 w-100 d-flex justify-content-between">
                <p className="h4">
                    {Math.floor(workoutSecondsDone.workoutMinutes) < 10 ? '0' + Math.floor(workoutSecondsDone.workoutMinutes) : Math.floor(workoutSecondsDone.workoutMinutes)}
                    : {workoutSecondsDone.workoutSeconds < 10 ? '0' + workoutSecondsDone.workoutSeconds % 60 : workoutSecondsDone.workoutSeconds} </p>

                <p className="h4">{Math.floor(workoutRemainingSeconds / 60) < 10 ? '0' + Math.floor(workoutRemainingSeconds / 60) : Math.floor(workoutRemainingSeconds / 60)}
                    : {workoutRemainingSeconds % 60 < 10 ? '0' + workoutRemainingSeconds % 60 : workoutRemainingSeconds % 60}</p>
            </div>
            {/* Workout Progress Bar */}
            <div className="w-100 rounded bg-light" style={{ height: "20px" }} >
                <div className="h-100 rounded bg-success " style={isFinished? {width:'100%'} : { width: workoutTargetAvg + "%"}}></div>
            </div>
            <div className="control_timer d-flex justify-content-between w-100">
                <button type='button' className="btn btn_pause text-light fs-3 border-dark btn-outline-dark" onClick={handlePauseTimer} disabled={!isPaused} >Pause</button >
                <button type="button" className="btn btn_start text-light fs-3 border-dark btn-outline-dark " onClick={handleStartTimer} disabled={isPaused === true ? isPaused : isPaused} >Start</button>
                <button type="button" className="btn text-light fs-3 " onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Workout
