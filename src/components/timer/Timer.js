import React, { useEffect, useState } from "react";
import './Timer.css';
let myInterval;

const Timer = ({ isPopup, calTime, timeOut, time }) => {
  const [min, setMin] = useState(time.min);
  let [sec, setSec] = useState(time.sec);

  useEffect(() => {
    myInterval = setInterval(() => {
      if(min <20 && !isPopup){
        setSec(sec + 1);
      }
      else{
        clearInterval(myInterval);
      }
      if (sec > 60) {
        setMin(min + 1);
        setSec(0);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  },[sec]);

  useEffect(() => {
    if (min === 20) {
        timeOut();
    }
  }, [min]);

  useEffect(() => {
    if (!!isPopup) {
      calTime(min, sec);
    }
  }, [isPopup]);

  useEffect(() => {
    setMin(time.min);
    setSec(time.sec);
  },[time])

  return (
    <div className="timerContainer">
      <span>{min/10>=1?min:"0"+min}</span>
      <span>   :   </span>
      <span>{Math.round(sec)/10>=1?Math.round(sec):"0" + Math.round(sec)}</span>
    </div>
  );
};

export default Timer;
