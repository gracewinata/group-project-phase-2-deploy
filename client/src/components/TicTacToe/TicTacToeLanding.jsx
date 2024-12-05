import { Link } from 'react-router-dom'
import './TicTacToe.css'



export default function TicTacToeLanding(){
    return(
        <>
        <div className="flex flex-col items-center justify-center mt-40">
        <div className="landingHome">
        {/* High Score */}
        <div className="text-center mb-8">
          <h2 className="text-2xl text-yellow-400">HIGH SCORE</h2>
          <p className="text-white text-xl mt-2"></p>
        </div>
        {/* Start New Game */}
        <div className="text-center mb-8">
          <h1 className="text-4xl text-yellow-400">START NEW GAME</h1>
        </div>
        {/* Player Options */}
        <div className="flex flex-col items-center space-y-4">
          <Link to={"/play"} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-lg shadow-md transition duration-200">
            1 Player
          </Link>
          <Link to={"/room"} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-lg shadow-md transition duration-200">
            2 Player
          </Link>
        </div>
      </div>
      </div>
        </>
    )
}