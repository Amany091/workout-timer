import './App.css';
import Sidebar from './components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workout from './components/workout';
import { useEffect, useState } from 'react';


function App() {
  const [active, setActive] = useState({})
  const [index, setIndex] = useState(0) // get the index of displyed task
  let currentIndex = index

  useEffect(() => {
    setIndex(index)
    currentIndex = index
 },[index,currentIndex])
  
  return (
    <div className="App d-flex justify-content-evenly text-light bg-dark p-2">
      <Workout  currentIndex = {currentIndex} index={index} setIndex={setIndex} setActive={setActive} />
      <Sidebar index={index} setIndex = {setIndex} active={active} setActive={setActive} currentIndex={currentIndex} />
    </div>
  );
}

export default App;
