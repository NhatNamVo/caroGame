import React, {useState,useEffect} from 'react';
import './Modal.css';
const Modal = ({winner,turnoff, time, stopPlay}) => {
    const [isShow, setIsshow] = useState(false);


    const handleContinue = () => {
        const timer = setTimeout(() =>{
            setIsshow(false);
        }, 500);
        const offTimer = setTimeout(() =>{
            turnoff();        
        }, 800);
        return () => {
            clearTimeout(offTimer);
            clearTimeout(timer);
        }
    };

    const handleStop = () => {
        stopPlay();
    }

    useEffect(() => {
        const timer = setTimeout(() =>{
            setIsshow(true)
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    },[]);

    return (
        <div className="modal-container">
            <div className={"modal-body " + (isShow?"show":"")}>
                {winner?(<p>Chúc mừng {winner} đã chiến thắng</p>):"Kết quả hòa"}
                {winner?(<p>Trong thời gian {time.min?time.min + " phút":""} {Math.round(time.sec)} giây</p>):""}
                <div>
                    <button onClick={handleContinue}>Chơi lại</button>
                    <button onClick={handleStop}>Dừng</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
