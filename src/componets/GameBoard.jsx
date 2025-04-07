import {board, updateBoard} from '../constants.js';

export function GameBoard (){
    return (
    <section className='game'>
        {
          board.map((item, index) => {
          return (
            <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
         })
        }
      </section>
)}