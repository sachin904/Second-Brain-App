import { DashBoard } from "./pages/Dashboard"

import './App.css'
import { SignupPage } from "./pages/SignupPage"
import { SigninPage } from "./pages/signinPage"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"

function App() {
  return<div>
    <BrowserRouter>
       <Routes  >
        <Route path="/secondBrain/" element={<Layout/>}>
       <Route index element={<SignupPage/>} ></Route>
           <Route path="/secondBrain/signup" element={<SignupPage/>} ></Route>
           <Route path="/secondBrain/signin" element={<SigninPage/>} ></Route>
           <Route path="/secondBrain/DashBoard" element={<DashBoard/>} ></Route>
           </Route>
             <Route path="/" element={<RedirectToProject />} />
       </Routes>
    </BrowserRouter>
  </div>

  
}
function Layout() {
  return (
    <div className="h-screen flex flex-col items-center">
     <div>
      <Header />
     </div>
      
    
      
      <div>
        <Outlet />
      </div>
    </div>
  );
}
import { Navigate } from 'react-router-dom';
function RedirectToProject() {
  return <Navigate to="/secondBrain" />;
}


export default App;
