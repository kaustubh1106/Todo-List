import React,{useEffect}  from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from "axios"
import "./Navbar.css"






const Navbar = () => {
  const navigate = useNavigate();
    const checkLog = async ()=>{
        try{
            const result = await axios.get("http://localhost:8000/")
            console.log(result)
        }catch(e){
            if(e.response.status==404 || e.response.status==405){
                navigate("/login")
            }
            else{
                console.log(e)
            }
        }
    }
    useEffect(() => {
        checkLog()
    }, [])
  return (
    <div className='navbar'>
      <h1 className="navbar-heading">To Do.</h1>
      <div className="navbar-links">
       <Link to = "/login" >Login</Link>
       <Link to = "/signup" >SignUp</Link>
      </div>
    </div>
  )
}

export default Navbar
