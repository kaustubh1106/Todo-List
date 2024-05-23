import React,{ useState } from 'react'

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

  return (
    <div>
      <form>
        <input type='text' name="username" onChange={handleChange} placeholder='your username'></input>
        <input type='text' name="email" onChange={handleChange} placeholder='your email'></input>
        <input type='password' name="password" onChange={handleChange} placeholder='your password'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Signup
