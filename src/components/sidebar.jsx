import React, { useState } from 'react'
import { tasks } from './tasks'

const Sidebar = ({ setTask, active,setActive}) => {
    const time = tasks.map(({ time }) => time)
    return (
        <div>
            <h5 className="text-center">{Math.floor(time.reduce((acc, curr) => acc + curr) / 60)} Minutes Workout </h5>
            {tasks.map((task, index) => {
                return (
                    <div
                        className={`task d-flex align-items-baseline ${active.id === task.id ? 'bg-success': ""} px-1  `}
                        onClick={() => {
                            setActive(task)
                            setTask(index)
                        }} key={task.id} >
                        <h5 className='me-3' >{task.task}</h5>
                        <p className='me-2' >{task.time}</p>
                        <p>{task.type}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Sidebar
