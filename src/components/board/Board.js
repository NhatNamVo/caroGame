import React, {useRef, useEffect, useState} from "react";

const Board = ({size,choseCell, cellId, table}) => {
    const boardRef = useRef();
    const [cellSize, setCellSize] = useState(0);
    
    const renderCell = () => {
        const cell = [];
        for(let i = 1; i<=size; i++){
            const row = [];
            for(let j = 1; j<=size; j++){
                const key = j + (i-1)*size;
                row.push(<div key={key} data-cell={key} className="cell" style={{width: cellSize + 'px', height: cellSize+ 'px'}}><span>{table[key-1]?table[key-1]:""}</span></div>);
            }
            const column = <div key={i} className="row">{row}</div>
            cell.push(column);
        }
        return cell;
    };

    const handleClick = (e) => {
        const cellSelected = e.target.closest('.cell');
        if(!!cellSelected) {
            choseCell(cellSelected.dataset.cell);
        }
    }
    useEffect(()=> {
        setCellSize(()=>{
            return boardRef.current.clientWidth/size;
        });
        window.addEventListener('resize',()=>{
            setCellSize(()=>{
                return boardRef.current.clientWidth/size;
            });
            
        });
        return () => {
            window.removeEventListener('resize',()=>{
                
                setCellSize(()=>{
                    return boardRef.current.clientWidth/size;
                });
            
            });
        };
        
    }, [])

  return (
      <>
        <div ref={boardRef} id="board-container" onClick={handleClick}>
            {renderCell()}
        </div>
      </>
  );
};

export default Board;
