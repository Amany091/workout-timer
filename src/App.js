import './App.css';
import Sidebar from './components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workout from './components/workout';
import { useState } from 'react';


function App() {
  const [active, setActive] = useState({})
  const [task,setTask] = useState(0) // get the index of displyed task
  return (
    <div className="App d-flex justify-content-evenly text-light bg-dark p-2">
      <Workout index={task} setTask={setTask} setActive={setActive} />
      <Sidebar  setTask = {setTask} active={active} setActive={setActive} />
    </div>
  );
}

export default App;
