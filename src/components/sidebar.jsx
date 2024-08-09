import React, { useEffect, useState } from 'react'
import { tasks } from './tasks'

const Sidebar = ({ index, setIndex, active, setActive, currentIndex,timer,isFinished }) => {
    const workoutSeconds = [...tasks].map(({ time }) => time).reduce((acc, curr) => acc + curr)
    const finished = [...tasks].splice(0, currentIndex).length
    const unFinished = [...tasks].splice(currentIndex).length
    
    useEffect(() => {
        setIndex(index)
        currentIndex = index
    }, [currentIndex, index,isFinished,timer.current])
    return (
        <div className='my-4' >
            <h5 className=" my-3 ">{Math.floor(workoutSeconds / 60)} Minutes Workout and {workoutSeconds % 60} seconds </h5>
            <div className="d-flex justify-content-between mb-2 ">
            <h5> done: { isFinished ? tasks.length :  finished}</h5>
            <h5> un finished: {isFinished? 0 : unFinished} </h5>
            </div>
            {[...tasks].map((task, index) => {
                return (
                    <div
                        className={`task d-flex align-items-baseline  ${active.id === task.id ? 'bg-success': ""} px-1 `}
                        onClick={() => {
                            setActive(task)
                            setIndex(index)
                            currentIndex = index
                        }} key={task.id} >
                        <h5 className='me-3' >{task.task}</h5>
                        <p className='me-2' >{task.time}s</p>
                        <p>{task.type}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar
