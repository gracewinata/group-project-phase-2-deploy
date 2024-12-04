import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function ChatRoom(){
    const [username, setUsername] = useState('')

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
                <input id="username" type="text" name= "username" className="w-full px-3 py-2 rounded-lg  text-black border border-gray-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
                onChange={(e)=>setUsername(e.target.value)} />
            </div>
           
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