import React,{ useState } from 'react'
import axios from "axios"
const Signup = () => {
    const [formData, setformData] = useState({
        username:"",
        email:"",
        password:""
    })

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
            "http://localhost:8000/signup",
            formData , {headers}
        )
        console.log(res)
    }catch(e){
            console.log(e)
        }
    }

  return (
    <div>
      <form>
        <input type='text' name="username" onChange={handleChange} placeholder='your username'></input>
        <input type='text' name="email" onChange={handleChange} placeholder='your email'></input>
        <input type='password' name="password" onChange={handleChange} placeholder='your password'></input>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Signup
