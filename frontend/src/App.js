
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar"
import Login from "./component/Login/Login.jsx"
import Signup from "./component/Signup/Signup.jsx"
import Home from "./component/Home/Home.jsx"
import AddTask from "./component/AddTask/AddTask.jsx"
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute.jsx';
import { userAuth } from './Context/Context.js'
function App() {
  axios.defaults.withCredentials = true;


  const [LoggedIn, setLoggedIn] = useState(false)
  const checkLog = async () => {
    try {
      const result = await axios.get("http://localhost:8000/")
      if (result.status == 200) {
        setLoggedIn(true)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    checkLog()
  }, [])

  return (
    <Router>
      <userAuth.Provider value={LoggedIn}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute element={Home} />
            }
          />
          <Route
            path="/addtasks"
            element={
              <ProtectedRoute element={AddTask} />
            }
          />
        </Routes>
      </userAuth.Provider>
    </Router>
  );
}

export default App;