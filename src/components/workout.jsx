import React, { useCallback, useEffect, useRef, useState } from 'react'
import { tasks } from './tasks'

const Workout = ({ index, setTask, setActive }) => {
    let [timeWidth, setTimeWidth] = useState(0);
    const [isPaused, setIsPaused] = useState(false)
    let [workoutSecondsDone, setWorkoutSecondsDone] = useState({})
    let [currentIndex, setCurrentIndex] = useState(index)
    const intervalRef = useRef()
    let timer = useRef(tasks[index].time);
    // let currentIndex = index
    // currentIndex = index // to update currentIndex in sidebar
    console.log('currentIndex outer function', currentIndex)

    // calculate total minutes and seconds
    const workoutTotalSeconds = [...tasks].map(({ time }) => time),
        workoutSeconds = workoutTotalSeconds.reduce((acc, curr) => acc + curr, 0) % 60,
        workoutMinutes = workoutTotalSeconds.reduce((acc, curr) => acc + curr, 0) / 60;

    // calculate the remaining time from current activity to last one
    const workoutRemaining = [...tasks].splice(currentIndex),
        workoutRemainingSeconds = workoutRemaining.map(({ time }) => time).reduce((acc, curr) => acc + curr, 0);

    // calculate time passed from zero to current activity with checking on time to increase width range
    const workoutTargetAvg = [...tasks].splice(0, currentIndex).map(({ time }) => time === 10 ? 1.92308 : 5.76923).reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {
        setTask(index)
        setCurrentIndex(index)
        console.log(currentIndex)
        // calculate minutes and seconds from beggening activity to current one
        workoutSecondsDone = {
            workoutMinutes: [...tasks].splice(0, index).map(({ time }) => time).reduce((acc, curr) => acc + curr, 0) / 60,
            workoutSeconds: [...tasks].splice(0, index).map(({ time }) => time).reduce((acc, curr) => acc + curr, 0) % 60
        }
        setWorkoutSecondsDone(workoutSecondsDone) // to update every time when currentIndex change
        setActive(tasks[index])
        setTimeWidth(0)
        // update timer when currentIndex change
        timer.current = tasks[index].time
    }, [index,currentIndex])
    
    const handleStartTimer = useCallback(() => {
        setIsPaused(!isPaused)
        setCurrentIndex(index)
        intervalRef.current = setInterval(() => {
            console.log('currentIndex inside function', currentIndex)
            timer.current -= 1;
            // if timer leaves to the end stop interval 
            if (Math.floor(workoutMinutes) === workoutSecondsDone.workoutMinutes && workoutSeconds === workoutSecondsDone.workoutSeconds) {
                clearInterval(intervalRef.current)
            }
            if (timer.current <= 0) {
                currentIndex++

                // setTimeWidth(0)
                setTask(currentIndex);
                setActive(tasks[currentIndex])
                timer.current = tasks[currentIndex].time
                
            }
            // console.log('currentIndex inside function ', currentIndex)
            // increase width of progress bar by calculating the precentege of time 
            setTimeWidth((prevWidth) => prevWidth + (100 / tasks[currentIndex].time))
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [ currentIndex,timeWidth, workoutSecondsDone, isPaused])

    const handlePauseTimer = () => {
        setIsPaused(!isPaused)
        clearInterval(intervalRef.current)
    }


    const handleReset = () => {
        setTask(0)
        setActive(tasks[0])
        setTimeWidth(0)
        timer.current = tasks[0].time
        clearInterval(tasks[currentIndex].time)
    }

    return (
        <div className='w-50 d-flex flex-column mt-5 align-items-center workout'>
            <h1 className={`${tasks[index].time > 10 ? 'text-warning' : "text-success"} text-center`} > {Math.floor(workoutMinutes) === workoutSecondsDone.workoutMinutes && workoutSeconds === workoutSecondsDone.workoutSeconds ? 'Workout Completed' : tasks[index].task} </h1>
            <h4>{workoutRemaining.length == 1 ? "Last activity , almost done" : 'next: ' + tasks[index + 1].task} </h4>
            <h1 className='text-success'>00: {timer.current} </h1>
            {/* Current Activity Time Progress Bar */}
            <div className=" w-100 rounded bg-light overflow-hidden" style={{ height: "20px" }} >
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
                <button type='button' className="btn btn_pause text-light fs-3 border-dark btn-outline-dark" onClick={handlePauseTimer} disabled={!isPaused} >Pause</button >
                <button type="button" className="btn btn_start text-light fs-3 border-dark btn-outline-dark " onClick={handleStartTimer} disabled={isPaused} >Start</button>
                <button type="button" className="btn text-light fs-3 " onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Workout
