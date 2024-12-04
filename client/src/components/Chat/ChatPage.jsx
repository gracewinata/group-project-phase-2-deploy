import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatPage({socket}){
    const [messageSent, setMessageSent] = useState('')
    const [messages, setMessages] = useState([])

    function handleSubmit(e){
        e.preventDefault()
        socket.emit("message:new", messageSent)
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
            {messages.map(msg =>{
                return(
                    <>
                    
                    <div className={msg.from === localStorage.username ? "flex flex-col items-start" : "flex flex-col items-end"}>
                    <div className="text-sm font-medium">{msg.from === localStorage.username ? "You" : msg.from}</div>
                    <div className="text-base">{msg.message}</div>
                    </div>
                    </>

                )
            })}
           
           
        </div>
        </div>


        {/* input messages */}
        <link
            rel="stylesheet"
            href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
        />



        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
            <label htmlFor="chat" className="sr-only">
                Your message
            </label>
            <div className="flex items-center py-2 px-3 bg-black bg-opacity-10 rounded-lg dark:bg-gray-700">
                <button  type="submit"
                className="inline-flex justify-center p-2 bg-red-700 text-white  text-sm cursor-pointer hover:bg-red-500 dark:text-blue-500 dark:hover:bg-gray-600">
                Leave</button>
                <textarea
                id="chat"
                rows={1}
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                defaultValue={""}
                onChange={(e)=>setMessageSent(e.target.value)}
                />
                <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                </button>
                <button  type="submit"
                className="inline-flex justify-center p-2 bg-green-600 text-white  text-sm cursor-pointer hover:bg-red-500 dark:text-blue-500 dark:hover:bg-gray-600">
                Send</button>
            </div>
            </form>
        </div>
        </div>
        
{/* 
            <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-base-200 text-gray-800 p-10">
                <div className="flex flex-col flex-grow w-full max-w-xl bg-base-100 shadow-xl rounded-lg overflow-hidden">
                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                        {messages.map(msg => {
                            return (
                                <>
                                    <div className={msg.from == localStorage.username ? "chat chat-start flex flex-col" : "chat chat-end flex flex-col"}>
                                        <div>{msg.from == localStorage.username ? "You" : msg.from}</div>
                                        <div className="chat-bubble chat-bubble-accent">{msg.message}</div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    <form className="bg-accent p-4 flex flex-row" onSubmit={handleSubmit}>
                        <input onChange={(e) => setMessageSent(e.target.value)} className="flex items-center w-full rounded px-3" type="text" placeholder="Type your message…" />
                        <button className="btn btn-base-100 ml-4" type='submit'>Send</button>
                    </form>
                </div>
            
            </div> */}
        </>
    )
}