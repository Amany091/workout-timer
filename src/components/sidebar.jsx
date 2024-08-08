import React, { useEffect, useState } from 'react'
import { tasks } from './tasks'

const Sidebar = ({index, setIndex, active, setActive,currentIndex }) => {
    const workoutSeconds = [...tasks].map(({ time }) => time).reduce((acc, curr) => acc + curr)
    useEffect(() => {
        setIndex(index)
        currentIndex = index
    }, [currentIndex, index])
    return (
        <div>
            <h5 className="text-center">{Math.floor(workoutSeconds /60)} Minutes Workout and {workoutSeconds %60} seconds </h5>
            {[...tasks].map((task, index) => {
                return (
                    <div
                        className={`task d-flex align-items-baseline ${active.id === task.id ? 'bg-success': ""} px-1  `}
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
