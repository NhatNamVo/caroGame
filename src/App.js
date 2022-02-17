import { useState, useEffect } from "react";
import "./App.css";
import Forminput from "./components/form/FormInput";
import Game from "./components/Game";
import Loading from "./components/loadding/Loading";

function App() {
  // const player = {player1: 'Nam',player2: 'Vũ'};
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleStart = (data) => {
    setPlayer({player1: data.player1, player2: data.player2});
  };

  const stopPlay = () => {
    setLoading(true);
    setPlayer(null);
    const timeOut = setTimeout(()=> {
      setLoading(false);
    },5000);
  };

  useEffect(() =>{
    const timeOut = setTimeout(()=> {
      setLoading(false);
    },3000);
  },[]);

  if(!!loading) return (<Loading/>)

  return (
    <>
      <div className={"main " + (player?"main1":"")}>
      {player?<Game players={player} stopPlay={stopPlay}/>:<Forminput handleStart = {handleStart}/>}
      </div>
    </>
    
  );
}

export default App;
