import { useState } from "react";

const App = () => {
  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const title = ["T", "i", "c", "T", "a", "c", "T", "o", "e"];
  const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


  const checkWinner = (updatedBoard) => {
    for (let [a, b, c] of winningCombinations) {
      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        return updatedBoard[a];
      }
    }
    return updatedBoard.every(cell => cell) ? "Draw" : null;
  };

  const handleArray = (index) => {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = turn;
    const result = checkWinner(updatedBoard);

    setBoard(updatedBoard);
    if (result) {
      setWinner(result);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col gap-10 items-center bg-black justify-center h-screen w-full">
      <div className="text-4xl sm:text-6xl font-bold flex gap-2">
        {title.map((letter, index) => (
          <div key={index} className={`cursor-default ${index % 2 === 0 ? "text-pink-500" : "text-blue-400"}`}>{letter}</div>
        ))}
      </div>

      <div className=" w-[300px] h-[300px]  sm:w-full max-w-[400px] sm:h-full max-h-[400px] flex flex-wrap justify-evenly gap-1 items-center">
        {board.map((box, index) => (
          <div key={index} onClick={() => handleArray(index)} className={`w-[32%] h-[32%] hover:w-[31.5%] hover:h-[31.5%] transition duration-300 ease-in-out bg-zinc-800 border-white  hover:bg-zinc-900 cursor-pointer rounded-xl  ${box === 'X' ? "text-blue-400" : "text-red-400"} flex items-center justify-center text-4xl sm:text-6xl font-bold`}>{box}</div>
        ))}
      </div>

      {winner && (
        <div className="text-white font-bold text-xl sm:text-3xl mt-4 flex  flex-col items-center gap-4">
          {winner === "Draw" ? "It's a Draw!" : `Congrats ... Winner is "${winner}"`}
          <button onClick={resetGame} className="bg-green-500 border-2 border-black text-2xl transition duration-800 ease-in-out hover:ring-2 ring-green-400 px-3 py-1 rounded-lg text-white font-semibold">Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;
