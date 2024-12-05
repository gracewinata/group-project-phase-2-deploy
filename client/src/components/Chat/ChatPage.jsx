import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatPage({socket}){
    const [messageSent, setMessageSent] = useState('')
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        socket.emit("message:new", messageSent)
    }

    function handleLeave(){
        navigate('/chatroom')
    }

    useEffect(()=>{
        socket.auth ={
            username: localStorage.username
        }

        socket.connect()

        socket.on("message:update", (newMessage)=>{
            setMessages(current =>{
                return [...current, newMessage]
            })
        })

        return ()=>{
            socket.off("message:update")
            socket.disconnect()
        }
    },[])

    return(
        <>


        <div className="flex flex-col justify-between items-center h-screen p-20">
        <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-2">
            {/* Messages go here */}
            {messages.map((msg, index) => {
                return (
                <div 
                    key={index} 
                    className={`flex flex-col ${msg.from === localStorage.username ? "items-start" : "items-end"}`}
                >
                    <div className="text-sm font-medium">
                    {msg.from === localStorage.username ? "You" : msg.from}
                    </div>
                    <div 
                    className={`text-base p-3 rounded-lg max-w-xs ${
                        msg.from === localStorage.username
                        ? "bg-blue-500 text-white"  // User's message bubble (blue)
                        : "bg-gray-200 text-black"  // Other person's message bubble (grey)
                    } break-words`}
                    >
                    {msg.message}
                    </div>
                </div>
                );
            })}
            </div>
        </div>

        {/* Input messages */}
        <link
            rel="stylesheet"
            href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
        />

        <div className="max-w-2xl mx-auto w-200">
            <form onSubmit={handleSubmit}>
            <label htmlFor="chat" className="sr-only">Your message</label>
            <div className="flex items-center py-2 px-3 bg-black bg-opacity-10 rounded-lg dark:bg-gray-700">
                <button
                type="submit"
                className="inline-flex justify-center p-2 bg-red-700 text-white text-sm cursor-pointer hover:bg-red-500 dark:text-blue-500 dark:hover:bg-gray-600"
                onClick={handleLeave}
                >
                Leave
                </button>
                <textarea
                id="chat"
                rows={1}
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                defaultValue={""}
                onChange={(e) => setMessageSent(e.target.value)}
                />
                <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                ></button>
                <button
                type="submit"
                className="inline-flex justify-center p-2 bg-green-600 text-white text-sm cursor-pointer hover:bg-red-500 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                Send
                </button>
            </div>
            </form>
        </div>
        </div>


        

        </>
    )
}