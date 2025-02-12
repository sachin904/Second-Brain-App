import { DashBoard } from "./pages/Dashboard"

import './App.css'
import { SignupPage } from "./pages/SignupPage"
import { SigninPage } from "./pages/signinPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return<div>
    <BrowserRouter>
       <Routes  >
       <Route index element={<SignupPage/>} ></Route>
           <Route path="/signup" element={<SignupPage/>} ></Route>
           <Route path="/signin" element={<SigninPage/>} ></Route>
           <Route path="/DashBoard" element={<DashBoard/>} ></Route>
           <Route ></Route>
           <Route ></Route>
       </Routes>
    </BrowserRouter>
  </div>

  
}

export default App
