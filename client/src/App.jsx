import { RouterProvider } from "react-router-dom";
import router from "./router";
import { io } from "socket.io-client";
import { useEffect } from "react";

/** Buat ngeCONNECT client ke Server, nanti link ini harus diganti sesuai deployment */
const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    /** buat ngeLISTEN kalo client terconnect ke server keperluan debugging doang */
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    /** matiin event listener pada proses unmounting */
    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
