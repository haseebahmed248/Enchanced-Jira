import React from 'react'
import J_AppBar from '../Components/J_AppBar'
import '../CSS/Home.css'
import Sidebar from '../Components/SideBar'


export default function Home(){
    return (
        <div className='home--container'>
            <J_AppBar />
            <Sidebar />
        </div>
    )
}