// import { useState } from 'react'
import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { Square } from './componets/Square.jsx'





function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)



  // Reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // Actualizando el Board 
const updateBoard = (index)=>{
    if (board[index] || winner ) return
    
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    // Cambios de turnos
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // checkWinner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }


  }

  return (
    <>
    <main className='board'>
      <h1>Tres en raya!</h1>
      <button onClick={resetGame}>Comenzar de Nuevo</button>
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

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      
      <section className=''>
      {
        winner != null && (
          <section className='winner winner-modal'>
            <div className='text'> 
              <h2 className='winner-text'>
                { winner === false ? 'Empate' : 'Ganador'}
              </h2>
              <header className='win'>
              {
                winner && <Square>{winner}</Square>
              }
              </header>

              <footer>
                <button onClick={resetGame}>Comenzar de Nuevo</button>
              </footer>
            </div>
          </section>

        ) 
      }
      </section>
    </main>
    </>
  )
}

export default App
