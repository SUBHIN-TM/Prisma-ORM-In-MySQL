import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";


const Home = () => {
    const navigate = useNavigate()
    const [isMarked, setIsMarked] = useState(false)

    useEffect(() => {
        attendenceGet()
    },[isMarked])


    const attendenceGet = async () => {
        try {
            const response = await axios.get('http://localhost:3000/attendenceChecking')
            console.log(response.data.message);
            if (response.status === 200) {
                console.log(response.data.message);
               setIsMarked(true)
            } else {
                setIsMarked(false);
            }
        } catch (error) {
            console.error(error);
        }
    }


const attendenceMarking=async()=>{
    try {
        const response= await axios.post("http://localhost:3000/attendenceMarking")
        if( response.status == 200){
            console.log(response.data.message);
            setIsMarked(true)
        }
    } catch (error) {
        console.error(error);
    }


}

    const logout = () => { //LOG OUT FUNCTION
        localStorage.removeItem('token');
        navigate('/')
    }


    return (
        <>
            <div>
                Home <br />
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                {isMarked ? (<h1>Present</h1>) : (
                    <div>
                        <h1>Absent</h1> <button onClick={attendenceMarking} >Mark Attendence</button>
                    </div>
                )}
            </div>
        </>

    )
}

export default Home