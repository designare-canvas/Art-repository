import React from 'react'
import Navbar from './components/navbar/Navbar';
import Data from './components/allPostsShow/ImageListShow'
import Login from './components/SignIn/Login';
function App() {
    return (
        <div>
          <Navbar />  
          <Data/>
        <Login />
        
        </div>
    )
}

export default App
