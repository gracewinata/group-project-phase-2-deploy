import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Toastify from "toastify-js";

export default function RoomSelectPage({ base_url }) {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  /** Ini buat inisialisasi koneksi socket, autoconnect set to false to prevent memory leak */
  const socket = io(`${base_url}`, { autoConnect: false });

  /** Ngehandle CREATE room */
  async function handleCreateRoom() {
    try {
      if (roomName.trim()) {
        socket.connect();
        socket.emit("createRoom", roomName);
        socket.on("roomCreated", () => {
          navigate(`/play/${roomName}`);
        });
      } else {
        Toastify({
          text: `Room name cannot be empty`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#FF0000",
            color: "#FEF2BF",
            border: "3px solid #000000",
            borderRadius: "10px",
            boxShadow: "4px 4px #000000",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "14px",
            padding: "10px 15px",
            textAlign: "center",
          },
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** Ngehandle JOIN room */
  async function handleJoinRoom() {
    try {
      if (roomName.trim()) {
        socket.connect();
        socket.emit("joinRoom", roomName);
        socket.on("roomJoined", (msg) => {
          if (!msg.includes("does not exist")) {
            navigate(`/play/${roomName}`);
          } else {
            Toastify({
              text: `Room does not exist`,
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "bottom",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "#FF0000",
                color: "#FEF2BF",
                border: "3px solid #000000",
                borderRadius: "10px",
                boxShadow: "4px 4px #000000",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "14px",
                padding: "10px 15px",
                textAlign: "center",
              },
            }).showToast();
          }
        });
      } else {
        Toastify({
          text: `Room name cannot be empty`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#FF0000",
            color: "#FEF2BF",
            border: "3px solid #000000",
            borderRadius: "10px",
            boxShadow: "4px 4px #000000",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "14px",
            padding: "10px 15px",
            textAlign: "center",
          },
        }).showToast();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    /** Ini buat clean up */
    return () => {
      socket.off("roomCreated");
      socket.off("roomJoined");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="roomselectbody bg-[#011f3f] flex justify-center items-center min-h-screen">
        <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-[#fef2bf] text-2xl mb-6">Room Selection</h1>
          <input type="text" placeholder="Enter Room Name" className="w-full px-4 py-2 mb-4 border-4 border-[#fef2bf] bg-[#011f3f] text-[#fef2bf] text-center rounded-md focus:outline-none focus:ring-4 focus:ring-yellow-300" onChange={(e) => setRoomName(e.target.value)} />
          <div className="flex justify-between space-x-4">
            <button className="w-1/2 py-2 bg-[#fef2bf] text-black font-bold border-4 border-[#fef2bf] rounded-md hover:bg-yellow-400 hover:scale-105 transition-transform" onClick={handleCreateRoom}>
              Create Room
            </button>
            <button className="w-1/2 py-2 bg-[#fef2bf] text-black font-bold border-4 border-[#fef2bf] rounded-md hover:bg-yellow-400 hover:scale-105 transition-transform" onClick={handleJoinRoom}>
              Join Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
