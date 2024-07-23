import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Login = () => {
   
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    useEffect(()=>{ //IF THE USER LOGGED THERE SHOULD HAVE TOKEN IN LOCAL STORAGE, IF IT PRESENT NOT SHOW THE LOGIN PAGE AGAIN IT WILL BE DIRECTED TO HOMEPAGE
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home')
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])



    const submit = async (e) => {
        e.preventDefault()
        if(email.trim().length==0 || password.trim().length==0){
            return alert("Input should be filled")
        }
        try {
            const response=await axios.post("http://localhost:3000/login",{email,password})
            console.log(response.data);
            if(response.data.token){ //AFTER GETTING RESPONSE TAKE TOKEN FROM RESPONSE AND PUT IT INTO THE LOCAL STORAGE
                localStorage.setItem('token',response.data.token);
                navigate('/home')
              }
        } catch (error) {
           console.error(error.response.data.message);
        }

    }

 
    return (
        <>
            <div>
             
            <form action="" onSubmit={submit}>
        
                    <div>
                        <label htmlFor="email">Email</label> <input autoComplete='email' type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="password">password</label> <input autoComplete='current-password' type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>

                </form>

            </div>
            <div>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </>

    )
}

export default Login