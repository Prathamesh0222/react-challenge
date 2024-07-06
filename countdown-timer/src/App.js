import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [start, setStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId,setTimerId] = useState(0);

  const handleStart = () => {
    setStart(true);
  }

  const handleReset = () => {
    setStart(false);
  }
  
  const handleInput = (e) => {
    console.log(e.target.id,e.target.value);
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if(id === 'hours'){
      setHours(value);
    }else if(id==='minutes'){
      setMinutes(value);
    }else {
      setSeconds(value);
    }
  }

  const runTimer = (sec,min,hr,tid)=>{
    if(sec>0){
      setSeconds((s)=>s-1);
    }else if(sec===0 && min>0){
      setMinutes((m)=>m-1);
      setSeconds(59);
    }else{
      setHours((h)=>h-1);
      setMinutes(59);
      setSeconds(59);
    }
  }

  useEffect(()=>{
    let tid;
    if(start){
      tid = setInterval(()=>{
        runTimer(seconds,minutes,hours,tid);
      },1000)
      setTimerId(tid);
    }

    return()=> {
      clearInterval(tid);
    }

  },[hours,minutes,seconds,start])

  console.log(hours,minutes,seconds);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {!start && <div className="input-container">
        <div className="input-box">
          <input onChange={handleInput} id="hours" placeholder="HH" />
          <input onChange={handleInput} id="minutes" placeholder="MM" />
          <input onChange={handleInput} id="seconds" placeholder="SS" />
        </div>
        <button
          onClick={handleStart}
          className='timer-button'>Start</button>
      </div>}
      {
        start && <div className='show-container'>
          <div className='timer-box'>
            <div>{hours}</div>
            <span>:</span>
            <div></div>
            <span>:</span>
            <div>10</div>
          </div>
          <div className='action-box'>
            <button className='timer-button'>Pause</button>
            <button onClick={handleReset} className='timer-button'>Reset</button>
          </div>
        </div>
      }
    </div>

  );
}

export default App;
