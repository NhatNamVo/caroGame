import React, { useEffect, useState } from "react";
import audio from "../../assets/audio/beatHome.mp3";
import "./FormInput.css";
const Forminput = ({ handleStart }) => {
  let data = {};

  const onClick = (e) => {
    if (data.player1) {
      document.querySelector("input#player1").classList.remove("active");
    }
    if (data.player2) {
      document.querySelector("input#player2").classList.remove("active");
    }
    if (data.player1 && data.player2) {
      handleStart(data);
    } else {
      if (!data.player1) {
        document.querySelector("input#player1").classList.add("active");
      }
      if (!data.player2) {
        document.querySelector("input#player2").classList.add("active");
      }
    }
  };

  const handleNamePlayer = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    data = { ...data, [name]: value };
  };

  return (
    <div className="formInput">
      <iframe
      style={{position: 'absolute', zIndex: -1}}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/EKR4NERNHPQ?autoplay=1"
        title="YouTube video player"
        allow="autoplay"
      ></iframe>
      <h1>
        <span>CA</span>RO <span>GAME</span>
      </h1>
      <div className="formInput__body">
        <div>
          <input
            onChange={handleNamePlayer}
            id="player1"
            className="form"
            type="text"
            name="player1"
            placeholder="Nhập tên người chơi 1"
          />
        </div>
        <div>
          <input
            onChange={handleNamePlayer}
            id="player2"
            className="form"
            type="text"
            name="player2"
            placeholder="Nhập tên người chơi 2"
          />
        </div>
      </div>
      <button onClick={onClick}>Bắt đầu</button>
    </div>
  );
};

export default Forminput;
