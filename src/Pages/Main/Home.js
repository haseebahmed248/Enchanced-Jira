import React from 'react'
import J_AppBar from '../Components/J_AppBar'
import '../CSS/Home.css'
import Sidebar from '../Components/SideBar'
import UseSocket from '../Components/UseSocket'


export default function Home(){
    UseSocket();
    return (
        <div className='home--container'>
        
            <J_AppBar />
            <Sidebar />
        </div>
    )
}