import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function ChatRoom(){
    const [username, setUsername] = useState('')
    // const [room, setRoom] = useState('')
    const navigate = useNavigate()


    async function handleSubmit(e){
        e.preventDefault()
        localStorage.setItem('username', username)
       
        navigate('/chatpage')
     
    }


    return(
        <>
        <div className="flex justify-center items-center mt-20">
        <div className="bg-white bg-opacity-20 text-white rounded-lg shadow-lg p-6 w-96">
          
            {/* Edit Form */}
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-yellow-300 font-bold mb-2">
                Username
                </label>
                <input id="username" type="text" name= "username" className="w-full px-3 py-2 rounded-lg bg-gray-900 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                onChange={(e)=>setUsername(e.target.value)} />
            </div>
            {/* <div className="mb-4">
                <label htmlFor="room-select">Choose Room:  </label>
                <select name="room" id="room" className="w-full px-3 py-2 rounded-lg bg-gray-900 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none">
                    <option value="">-- Choose Room --</option>
                    <option value="Room 1">Room 1</option>
                    <option value="Room 2">Room 2</option>
                    <option value="Room 3">Room 3</option>
                    <option value="Room 4">Room 4</option>
                    <option value="Room 5">Room 5</option>
                    <option value="Room 6">Room 6</option>
                </select>

                </div> */}
            {/* Save Button */}
            <div className="flex justify-center mt-6">
                <button type="submit" className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-300 transition duration-200">
                Enter Chat
                </button>
            </div>
            </form>
        </div>
        </div>
        </>
    )
}