import { WINNER_COMBOS } from "../constants"  
  
export const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null
  }

  export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

export const updateBoard = (index)=>{
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