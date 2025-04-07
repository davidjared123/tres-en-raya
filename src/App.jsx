// import { useState } from 'react'
import './App.css'
import { useState } from 'react'

const Square = ({children,isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

const TURNS = {
  X: '✕',
  O: '◯'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }
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
