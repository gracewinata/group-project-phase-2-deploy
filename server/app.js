// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const { router } = require("./routers");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const express = require("express");
const app = express();
const server = http.createServer(app);
const port = 3000;

/** Buat nyimpan semua roomstate dan skor setiap pemain didalamny */
const roomStates = {};
const allUsers = {};
const allRooms = [];

/** Inisialisasi Socket ( frontend mana saja yang bisa buat request ke socket kita) */
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

/** Connnection is made n log is ran everytime somebody clicks on 2 Player ( which leads to selectroompage being rendered )  */
io.on("connection", (socket) => {
  // tic tac toe seno
  allUsers[socket.id] = {
    socket: socket,
    online: true,
  };

  socket.on("request_to_play", (data) => {
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id !== key) {
        opponentPlayer = user;
        break;
      }
    }

    if (opponentPlayer) {
      allRooms.push({
        player1: opponentPlayer,
        player2: currentUser,
      });

      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
        playingAs: "circle",
      });

      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName,
        playingAs: "cross",
      });

      currentUser.socket.on("playerMoveFromClient", (data) => {
        opponentPlayer.socket.emit("playerMoveFromServer", {
          ...data,
        });
      });

      opponentPlayer.socket.on("playerMoveFromClient", (data) => {
        currentUser.socket.emit("playerMoveFromServer", {
          ...data,
        });
      });
    } else {
      currentUser.socket.emit("OpponentNotFound");
    }
  });

  socket.on("disconnect", function () {
    const currentUser = allUsers[socket.id];
    currentUser.online = false;
    currentUser.playing = false;

    for (let index = 0; index < allRooms.length; index++) {
      const { player1, player2 } = allRooms[index];

      if (player1.socket.id === socket.id) {
        player2.socket.emit("opponentLeftMatch");
        break;
      }

      if (player2.socket.id === socket.id) {
        player1.socket.emit("opponentLeftMatch");
        break;
      }
    }
  });



  // chat
  console.log('a user connected', socket.id)
  socket.emit("welcome", "Hello" + socket.id)

  if(socket.handshake.auth){
      console.log('username: ' + socket.handshake.auth.username)
  }

  socket.on("message:new", (message)=>{
      io.emit("message:update", {
          from: socket.handshake.auth.username,
          message
      })
  })

  //////
  
  console.log("User connected:", socket.id);

  /** Handle createroom (server side) */
  socket.on("createRoom", (roomName) => {
    console.log(`createRoom event received with roomName: ${roomName}`);
    // receives the createRoom emit from the client
    socket.join(roomName); // uses the roomName data as a unique identifier for that room
    console.log(`Room created: ${roomName}`); //for logging purpose to show room is created
    socket.emit("roomCreated", roomName); // Confirm room creation to the client
  });

  /** Handle joinroom ( server side ) */
  socket.on("joinRoom", (roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName); // Check if the room exists
    if (room) {
      socket.join(roomName); // Add the socket to the room
      console.log(`User ${socket.id} joined room: ${roomName}`);
      socket.emit("roomJoined", `Joined room: ${roomName}`); // Notify the client
    } else {
      console.log(`Room ${roomName} does not exist`);
      socket.emit("roomJoined", "Room does not exist"); // Notify the client
    }
  });

  /** Handle Sequence generation n broadcasting it to all users */
  socket.on("sequenceGenerated", ({ roomName, sequence }) => {
    io.to(roomName).emit("sequenceGenerated", { sequence });
  });

  /** Handle game-over */
  socket.on("gameOver", ({ roomName, score }) => {
    // Ngebuat roomstate baru kalo belum ada
    if (!roomStates[roomName]) {
      roomStates[roomName] = {};
    }

    /** Ngeupdate state player tsb di room itu */
    roomStates[roomName][socket.id] = { score, gameOver: true };

    // Ngecek kalo semua player di room tsb sudah game-over atau belum
    const players = roomStates[roomName];
    const allGameOver = Object.values(players).every((player) => player.gameOver);
    if (allGameOver) {
      // Determine the winner
      const winner = Object.entries(players).reduce((highest, [playerId, data]) => {
        return data.score > (highest.score || 0) ? { id: playerId, score: data.score } : highest;
      }, {});

      // Broadcast the winner to all players in the room
      io.to(roomName).emit("winnerDetermined", {
        winnerId: winner.id,
        winnerScore: winner.score,
      });

      // Clean up the room state after determining the winner
      delete roomStates[roomName];
    }
  });

  /** Handle when player disconnects */
  socket.on("disconnect", () => {
    // Iterate through all rooms to find the disconnected player
    for (const roomName in roomStates) {
      if (roomStates[roomName][socket.id]) {
        // Remove the player from the room state
        delete roomStates[roomName][socket.id];

        // If the room becomes empty, delete the room
        if (Object.keys(roomStates[roomName]).length === 0) {
          console.log(`Room ${roomName} is empty and has been deleted`);
          delete roomStates[roomName];
        }
      }
    }
  });
});


server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



// module.exports = app;
