import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate=useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        if(userName.trim().length==0 || email.trim().length==0 || password.trim().length==0){
            return alert("Input should be filled")
        }
        console.log(userName, email, password);
        try {
            const response=await axios.post("http://localhost:3000/register",{userName,email,password})
            console.log(response.data);
            if(response.status==201){
                alert("Successfully registered")
              navigate("/")
            }
        } catch (error) {
           console.error(error.response.data.message);
        }

    }
    return (
        <>
            <div>Register</div>
            <div style={{ marginTop: "10px" }}>
                <form action="" onSubmit={submit}>
                    <div style={{ display: 'flex' }}>
                        <label htmlFor="username">UserName</label> <input autoComplete='username' type="text" name="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label> <input autoComplete='email' type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="password">password</label> <input autoComplete='current-password' type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Register