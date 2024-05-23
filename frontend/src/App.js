
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar"
import Login from "./component/Login/Login.jsx"
import Signup from "./component/Signup/Signup.jsx"
function App() {
  return (
    <Router>
        <Navbar/>

        <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        </Routes>
    </Router>
  );
}

export default App;
