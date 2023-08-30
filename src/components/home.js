import React from "react"
import { useState } from "react"
import { login, register } from "../utils"
import '../App.css'
import { useNavigate } from "react-router-dom"



const Home = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    

    useEffect(() => {
        let cookie = getCookie("jwt-token")
        if (cookie !== false) {
            navigate('/loggedIn')
        }
    })
    
    const loginHandler = async (event) => {
        event.preventDefault()
        let loginRes = await login(username, email, password)
        console.log(loginRes)
        if (loginRes.message === "Success"){
            navigate('/weather')
        } else {
            console.log(loginRes)
        }
    }

    const registerHandler = async (event) => {
        event.preventDefault()
        console.log(await register(username, email, password))
        
    }

    return (
        <div className="Home">
            <div className="LoginBox">
                <h2>Login below</h2>
                <form onSubmit={loginHandler} className="LoginForm">
                    <label className="LoginLabel">Username
                        <input onChange={(event) => setUsername(event.target.value)}></input>
                    </label>
                    <br></br>
                    <label className="LoginLabel">Email
                        <input onChange={(event) => setEmail(event.target.value)}></input>
                    </label>
                    <br></br>
                    <label className="LoginLabel">Password
                        <input onChange={(event) => setPassword(event.target.value)}></input>
                    </label>
                    <br></br>
                    <button type='submit'>Login</button>
                </form>
                <br></br>
            </div>
            <div className="RegisterBox">
                <h2>Please register below</h2>
                <form onSubmit={registerHandler} className="RegisterForm">
                    <label className="RegisterLabel">Username &nbsp; 
                        <input onChange={(e) => {setUsername(e.target.value)}}></input>
                    </label>
                    <br></br>
                    <label className="RegisterLabel">Email &nbsp; 
                        <input  onChange={(e) => {setEmail(e.target.value)}}></input>
                    </label>
                    <br></br>
                    <label className="RegisterLabel">Password &nbsp; 
                        <input type='password'  onChange={(e) => {setPassword(e.target.value)}}></input>
                    </label>
                    <br></br>
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    )

}

export default Home