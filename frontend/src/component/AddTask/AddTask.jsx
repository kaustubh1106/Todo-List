import React, { useState,useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';


const AddTask = () => {
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        title: "",
        priority: "",
        comp: ""
    })
    
    const handleChange = (e) => {
        const value = e.target.value
        const _name = e.target.name
        setformData(() => (
            {
                ...formData,
                [_name]: value
            }
        ))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const headers = {
            "Content-Type": "multipart/form-data"
        }
        try {
            const res = await axios.post(
                "http://localhost:8000/addtasks",
                formData, { headers }
            )
            console.log(res)
            navigate("/home")

        } catch (e) {
            if (e.response.status === 404) {
                navigate("/login")
            }
            else if (e.response.status === 405) {
                navigate("/login")
            }
            else {
                console.log(e)
            }
        }
    }
    return (
        <div>
            <form>
                <input type='text' name="title" onChange={handleChange} placeholder='title'></input>
                <input type='text' name="priority" onChange={handleChange} placeholder='priority'></input>
                <input type='text' name="comp" onChange={handleChange} placeholder='comp'></input>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default AddTask
