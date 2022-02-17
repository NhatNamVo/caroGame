import React, { useState, useEffect } from "react";
import Board from "./board/Board";
import Modal from "./modal/Modal";
import Timer from "./timer/Timer";
import './Game.css';

const Game = ({ players, stopPlay }) => {
  const [isNext, setIsNext] = useState(false);
  const [sizeBoard, setSizeBoard] = useState(30);
  const [historySelect, setHistorySelect] = useState(() => {
    const size = sizeBoard * sizeBoard;
    return new Array(size).fill(null);
  });
  const [currentCell, setCurrentCell] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const [time, setTime] = useState({min: 0, sec: 0});

  const handleClick = (cellid) => {
    const arr = [...historySelect];
    if (!arr[cellid - 1]) {
      arr[cellid - 1] = isNext ? "X" : "O";
      setHistorySelect(arr);
      setCurrentCell(cellid - 1);
      setIsNext(!isNext);
    }
  };

  const calculatorWin = () => {
    const type = historySelect[currentCell];
    let isWin = false;

    // horizonal
    for (let i = currentCell - 4; i < currentCell + 4; i++) {
      if (Math.floor(i / sizeBoard) !== Math.floor((i + 4) / sizeBoard))
        continue;
      if (i + 4 > currentCell + 4) break;
      const result = historySelect
        .slice(i, i + 5)
        .every((item) => item === type);
      if (result) {
        if (historySelect[i - 1] === null || historySelect[i + 5] === null) {
          if (
            Math.floor((i - 1) / sizeBoard) === Math.floor(i / sizeBoard) ||
            Math.floor((i + 5) / sizeBoard) === Math.floor(i / sizeBoard)
          ) {
            isWin = true;
            break;
          }
        }
      }
    }
    if (!!isWin) {
      winnerResult(type);
      return;
    }

    // vertical
    for (
      let i = currentCell - sizeBoard * 4;
      i < currentCell + sizeBoard * 4;
      i += sizeBoard
    ) {
      if (i < 0) continue;
      if (i + sizeBoard * 4 > currentCell + sizeBoard * 4) break;
      const result = [
        historySelect[i],
        historySelect[i + sizeBoard * 1],
        historySelect[i + sizeBoard * 2],
        historySelect[i + sizeBoard * 3],
        historySelect[i + sizeBoard * 4],
      ].every((item) => item === type);
      if (result) {
        if (
          !historySelect[i - sizeBoard] ||
          !historySelect[i + sizeBoard * 5]
        ) {
          isWin = true;
          break;
        }
      }
    }

    if (!!isWin) {
      winnerResult(type);
      return;
    }

    //
    for (
      let i = currentCell - (sizeBoard + 1) * 4;
      i < currentCell + (sizeBoard + 1) * 4;
      i += sizeBoard + 1
    ) {
      if (i < 0) continue;
      let isErr = false;
      for (let j = i; j <= i + 4; j++) {
        if (Math.floor(j / sizeBoard) !== Math.floor(i / sizeBoard)) {
          isErr = true;
          break;
        }
      }
      if (!!isErr) continue;
      if (
        i + (sizeBoard + 1) * 4 >
        currentCell + currentCell + (sizeBoard + 1) * 4
      )
        break;
      const result = [
        historySelect[i],
        historySelect[i + (sizeBoard + 1) * 1],
        historySelect[i + (sizeBoard + 1) * 2],
        historySelect[i + (sizeBoard + 1) * 3],
        historySelect[i + (sizeBoard + 1) * 4],
      ].every((item) => item === type);
      if (result) {
        if (
          !historySelect[i - (sizeBoard + 1)] ||
          !historySelect[i + (sizeBoard + 1) * 5]
        ) {
          isWin = true;
          break;
        }
      }
    }

    if (!!isWin) {
      winnerResult(type);
      return;
    }

    //
    for (
      let i = currentCell - (sizeBoard - 1) * 4;
      i < currentCell + (sizeBoard - 1) * 4;
      i += sizeBoard - 1
    ) {
      if (i < 0) continue;
      let isErr = false;
      for (let j = i; j >= i - 4; j--) {
        if (Math.floor(j / sizeBoard) !== Math.floor(i / sizeBoard)) {
          isErr = true;
          break;
        }
      }
      if (!!isErr) continue;
      if (
        i + (sizeBoard - 1) * 4 >
        currentCell + currentCell + (sizeBoard - 1) * 4
      )
        break;
      const result = [
        historySelect[i],
        historySelect[i + (sizeBoard - 1) * 1],
        historySelect[i + (sizeBoard - 1) * 2],
        historySelect[i + (sizeBoard - 1) * 3],
        historySelect[i + (sizeBoard - 1) * 4],
      ].every((item) => item === type);
      if (result) {
        if (
          !historySelect[i - (sizeBoard - 1)] ||
          !historySelect[i + (sizeBoard - 1) * 5]
        ) {
          isWin = true;
          break;
        }
      }
    }

    if (!!isWin) {
      winnerResult(type);
      return;
    }
  };

  const winnerResult = (type) => {
    switch (type) {
      case "X":
        setWinner(players.player2);
        break;
      case "O":
        setWinner(players.player1);
        break;
    }
    setIsPopup(true);
  };

  const handleSetTime = (min, sec) => {
    setTime({min, sec});
  };

  const turnoff = () => {
    setHistorySelect(()=>{
        const size = sizeBoard * sizeBoard;
        return new Array(size).fill(null);
    });
    setWinner(null);
    setTime({min:0, sec:0.1});
    setIsPopup(false);
  };

  const handleTimeOut = () => {
    setWinner("");
    setIsPopup(true);
  };

  useEffect(() => {
    if (!!currentCell) {
      calculatorWin();
    }
  }, [currentCell]);

  return (
    <>
      <Timer
        isPopup={isPopup}
        calTime={handleSetTime}
        timeOut={handleTimeOut}
        time = {time}
      />
      <div id="container">
        <div id="player1">{players.player1}</div>
        <Board
          choseCell={handleClick}
          table={historySelect}
          size={sizeBoard}
          cellId={currentCell}
        />
        <div id="player2">{players.player2}</div>
      </div>

      {isPopup ? <Modal winner={winner} turnoff={turnoff} time={time} stopPlay={stopPlay}/> : ""}
    </>
  );
};

export default Game;
