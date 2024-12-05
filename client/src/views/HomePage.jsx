import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchAsync } from "../app/user-slice";

export default function HomePage({ base_url }) {
  const [highscore, setHighscore] = useState(0);

  async function fetchHighScore() {
    try {
      const { data } = await axios.get(`${base_url}/highscore`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setHighscore(data.highscore);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchHighScore();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-40">
        {/* High Score */}
        <div className="text-center mb-8">
          <h2 className="text-2xl text-yellow-400">HIGH SCORE</h2>
          <p className="text-white text-xl mt-2">{highscore}</p>
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
    </>
  );
}
