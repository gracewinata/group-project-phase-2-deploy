import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { themeContext } from "../context/themeContext";

export default function Nav() {
  const navigate = useNavigate();

  const {currentTheme,setCurrentTheme} = useContext(themeContext)

  const theme = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5']

  function handleTheme() {
    const randomNum = Math.floor(Math.random() * 5)
    setCurrentTheme(theme[randomNum])
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <nav id="Navbar" className="flex items-center justify-between p-4 z-10 top-0 sticky">
        {/* Site Name */}
        <div className="text-yellow-300 text-xl">
          <Link to={"/"}>Memory Master</Link>
        </div>
        <div className="text-yellow-300 text-xl">
          <Link to={"/TicTacToe/play"}>Tic Tac Toe</Link>
        </div>
        {/* Navbar Buttons */}
        <div className="flex gap-4">
          <Link to ={"/chatroom"} className="bg-blue-600 hover:bg-blue-400 text-black font-bold py-2 px-4 border-2 border-black rounded-lg shadow-md transition duration-200">
              Chat
          </Link>
          <Link to={"/leaderboard"} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 border-2 border-black rounded-lg shadow-md transition duration-200">
            Leaderboard
          </Link>
          <Link to={"/history"} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 border-2 border-black rounded-lg shadow-md transition duration-200">
            History
          </Link>
          <Link to={"/profile"} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 border-2 border-black rounded-lg shadow-md transition duration-200">
            Edit Profile
          </Link>
          <button className="bg-red-900 hover:bg-red-300 text-black font-bold py-2 px-4 border-2 border-black rounded-lg shadow-md transition duration-200" onClick={handleLogout}>
            Logout
          </button>
          <button className="bg-black hover:bg-white text-white hover:text-black font-bold py-2 px-4 border-2 border-black rounded-lg shadow-md transition duration-200"
          onClick={handleTheme}>
            Theme
          </button>
        </div>
      </nav>
    </>
  );
}
