import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import SignUpPage from "../views/SignUpPage";
import HomePage from "../views/HomePage";
import BaseLayout from "../views/BaseLayout";
import Toastify from "toastify-js";
import Leaderboard from "../views/Leaderboard";
import HistoryPage from "../views/HistoryPage";
import ProfilePage from "../views/ProfilePage";
import PlayPage from "../views/PlayPage";
import RoomSelectPage from "../views/RoomSelectPage";
import MultiPlayPage from "../views/MultiPlayPage";
import TicTacToe from "../components/TicTacToe/tictactoe";
import TicTacToeLanding from "../components/TicTacToe/TicTacToeLanding";
import Chat from "../components/Chat/Chat";
import ChatRoom from "../components/Chat/ChatRoom";
import { io } from "socket.io-client";
import ChatPage from "../components/Chat/ChatPage";

const base_url = "http://localhost:3000";

const socket = io("http://localhost:3000", {
  autoConnect: false
})

const router = createBrowserRouter([
  {
    element: <BaseLayout/>,
    children:[
      {
        path: '/tictactoe/',
        element: <TicTacToeLanding/>
      },
      {
        path: '/tictactoe/play',
        element: <TicTacToe/>
      },
      {
        path: '/chatroom',
        element: <ChatRoom socket={socket}/>,
        loader: () => {
          if (!localStorage.username) {
              return redirect('/chatroom')
          }

          return null
      }

      },
      {
        path: '/chatpage',
        element: <ChatPage socket={socket}/>,
        loader: () => {
          if (!localStorage.username) {
              return redirect('/chatroom')
          }

          return null
      }
      }

    ]
  },
  {
    path: "/login",
    element: <LoginPage base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You are already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#34D399", // Vibrant green for success
            color: "#FEF2BF", // Light yellow text
            border: "3px solid #000000", // Thick black border
            borderRadius: "10px", // Rounded corners
            boxShadow: "4px 4px #000000", // Retro shadow effect
            fontFamily: "'Press Start 2P', cursive", // Retro font
            fontSize: "14px", // Consistent font size
            padding: "10px 15px", // Add padding for spacing
            textAlign: "center", // Center the text
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <SignUpPage base_url={base_url} />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: `You have to log in first`,
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000", // Bright red for errors
            color: "#FEF2BF", // Light yellow text
            border: "3px solid #000000", // Thick black border
            borderRadius: "10px", // Rounded corners
            boxShadow: "4px 4px #000000", // Retro shadow effect
            fontFamily: "'Press Start 2P', cursive", // Retro font
            fontSize: "14px", // Consistent font size
            padding: "10px 15px", // Add padding for spacing
            textAlign: "center", // Center the text
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage base_url={base_url} />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard base_url={base_url} />,
      },
      {
        path: "/history",
        element: <HistoryPage base_url={base_url} />,
      },
      {
        path: "/profile",
        element: <ProfilePage base_url={base_url} />,
      },
    ],
  },
  {
    path: "/play",
    element: <PlayPage base_url={base_url} />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: `You have to log in first`,
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
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/play/:roomName",
    element: <MultiPlayPage base_url={base_url} />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: `You have to log in first`,
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
        return redirect("/login");
      }
      return null;
    },
  },
  {
    path: "/room",
    element: <RoomSelectPage base_url={base_url} />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: `You have to log in first`,
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
        return redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
