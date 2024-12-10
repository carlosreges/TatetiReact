import React, { useState } from 'react';

function App() {
  // State to track the game board matrix, player turn, and winner
  const [matriz, setMatriz] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [turno, setTurno] = useState('X');
  const [ganador, setGanador] = useState(null);

  /**
   * Handles click events on the game board.
   * Updates the matrix and checks for a winner.
   * @param {number} row - The row of the clicked square.
   * @param {number} col - The column of the clicked square.
   */
  const handleClick = (row, col) => {
    // Revisa que el espacio esté vacío y que no haya ganador
    if (matriz[row][col] === 0 && ganador === null) {
      // Actualiza el estado del juego
      const newMatriz = [...matriz];
      //Coloca el símbolo del jugador
      newMatriz[row][col] = turno;
      // Actualiza el estado
      setMatriz(newMatriz);
      // Cambia el turno
      setTurno(turno === 'X' ? 'O' : 'X');

      //El ganador se da cuando hay un tres en línea (checkWinner)
      //El empate de da cuando checkWinner es null y no quedan espacios libres
      // Revisa si hay ganador
      const winner = checkWinner(newMatriz);
      if (winner) {
        setGanador(winner);//verifica que hay un ganador en cada jugada
      } else if (checkEmpate(newMatriz)) {// Revisa si hay empate cuando checkEmpate es true
        setGanador('Empate');//indica que es un empate
      }
    }
  };

// Condiciones de ganador para el Tatetí
// El primero que logre 3 en línea (checkWinner == 'X' || 'O') gana

// Si no hay espacios libres (checkEmpate == true) y no hay tres en línea (checkWinner == null), se declara empate 
const checkEmpate = (matrix) => {
    for (let i = 0; i < 3; i++) {//Ingresa en cada índice de la matriz [0, 1, 2], [0, 1, 2], [0, 1, 2]
      for (let j = 0; j < 3; j++) {//Ingresa en cada elemento dentro de la matriz 0, 1, 2
        if (matrix[i][j] === 0) {//verifica que hay espacios libres
          return false; //si hay espacios libres, retorna false
        }              
      }
    }
    return true;//si no hay espacios libres, retorna true
  };
  /**
   * Checks the matrix for a winner.
   * @param {Array} matrix - The current state of the game board.
   * @returns {string|null} - Returns the winner ('X' or 'O') or null if no winner.
   */
  const checkWinner = (matrix) => {
    // lines es un array de 8 arrays, cada uno de los cuales contiene 3 índices
    // que representan las 3 posiciones de una fila, columna o diagonal en la
    // matriz del tablero de juego. Estos índices se utilizan para verificar
    // si hay un ganador en el juego.
    //
    // Por ejemplo, el primer array [0, 1, 2] representa la primera fila
    // del tablero, y se utiliza para verificar si hay un ganador en esa fila.
    // De manera similar, el segundo array [3, 4, 5] representa la segunda
    // fila, y así sucesivamente.
    //
    // Los arrays [0, 3, 6], [1, 4, 7] y [2, 5, 8] representan las columnas
    // del tablero, y los arrays [0, 4, 8] y [2, 4, 6] representan las diagonales.
    
    const line = [
      [0, 1, 2], // fila 1
      [3, 4, 5], // fila 2
      [6, 7, 8], // fila 3
      [0, 3, 6], // columna 1
      [1, 4, 7], // columna 2
      [2, 5, 8], // columna 3
      [0, 4, 8], // diagonal 1
      [2, 4, 6]  // diagonal 2
    ];
    
    // o
    
    const lines = [];
    for (let i = 0; i < 3; i++) {
      lines.push([i * 3, i * 3 + 1, i * 3 + 2]); // filas
      lines.push([i, i + 3, i + 6]); // columnas
    }
    lines.push([0, 4, 8]); // diagonal 1
    lines.push([2, 4, 6]); // diagonal 2

    const recorrer = lines.map((obj, i)=>obj[i]);
    console.log(recorrer);


    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const fila = Math.floor(a / 3);
      const columna = a % 3;
      if (matrix[fila][columna] && matrix[fila][columna] === matrix[Math.floor(b / 3)][b % 3] && matrix[fila][columna] === matrix[Math.floor(c / 3)][c % 3]) {
        return matrix[fila][columna];
      }
    }
    return null;
  };

  /**
   * Renders a square button for the game board.
   * @param {number} row - The row of the square.
   * @param {number} col - The column of the square.
   * @returns {JSX.Element} - A button element representing a square.
   */
  const renderSquare = (row, col) => {
    return (
      <button
        className={`square ${matriz[row][col] === turno ? 'current-player' : ''} ${
          ganador === turno ? 'winner' : ''
        }`}
        onClick={() => handleClick(row, col)}
      >
        {matriz[row][col]}
      </button>
    );
  };

  // Render the game board and current winner
  return (
    <div className="game-board">
      <div className="board-row">
        {renderSquare(0, 0)}
        {renderSquare(0, 1)}
        {renderSquare(0, 2)}
      </div>
      <div className="board-row">
        {renderSquare(1, 0)}
        {renderSquare(1, 1)}
        {renderSquare(1, 2)}
      </div>
      <div className="board-row">
        {renderSquare(2, 0)}
        {renderSquare(2, 1)}
        {renderSquare(2, 2)}
      </div>
      {ganador && (
      <div className="winner">
        {ganador === 'Empate' ? 'No hay ganador, es un empate' : `El ganador es: ${ganador}`}
      </div>
    )}
    </div>
  );
}

export default App;