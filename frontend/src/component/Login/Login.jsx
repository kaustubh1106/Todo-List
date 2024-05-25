import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {
    const [formData, setformData] = useState({
        username:"",
        password:""
    })
    const navigate = useNavigate();


    const handleChange = (e)=>{
        const value =e.target.value
        const _name = e.target.name
        setformData(()=>(
            {
                ...formData,
                [_name] : value
            }
        ))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const headers = {
            "Content-Type" : "multipart/form-data"
        }
        try{
        const res = await axios.post(
            "http://localhost:8000/login",
            formData , {headers}
        )
        console.log(res)
        navigate("/home")
       
    }catch(e){
        if(e.response.status=== 400){
            navigate("/login")
        }
        else if(e.response.status=== 401){
            navigate("/signup")
        }
        else{
            console.log(e)
        }
    }
    }
  return (
    <div>
      <form>
      <input type='text' name="username" onChange={handleChange} placeholder='your username'></input>
        <input type='password' name="password" onChange={handleChange} placeholder='your password'></input>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Login
