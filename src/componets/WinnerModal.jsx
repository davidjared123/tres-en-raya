export function WinnerModal({winner}) {
    
       if (winner === null) return null
    return (
        <section className=''>
       
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
  
    
        </section>
    )
}