import './App.css';
import Sidebar from './components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workout from './components/workout';
import { useEffect, useRef, useState } from 'react';
import { tasks } from './components/tasks';


function App() {
  const [active, setActive] = useState({})
  const [index, setIndex] = useState(0) // get the index of displyed task
  const[isFinished,setIsFinished] = useState(false)
  let currentIndex = index
  let timerRef = useRef(tasks[currentIndex].time)

  useEffect(() => {
    setIndex(index)
    currentIndex = index
 },[index,currentIndex])
  
  return (
    <div className="App d-lg-flex justify-content-evenly text-light bg-dark p-2">
      <Workout
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        timer={timerRef}
        currentIndex={currentIndex}
        index={index}
        setIndex={setIndex}
        setActive={setActive} />
      
      <Sidebar
        isFinished={isFinished}
        setIsFinished={setIsFinished}
        index={index} setIndex={setIndex}
        active={active} setActive={setActive}
        timer={timerRef}
        currentIndex={currentIndex} />
    </div>
  );
}

export default App;
