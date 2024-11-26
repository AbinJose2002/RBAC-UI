import React from 'react'

import './Home.css'
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Projects from '../Pages/Projects/Projects';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Permission from '../Pages/Permission/Permission';
import Roles from '../Pages/Roles/Roles';
import User from '../Pages/User/User';

export default function Home(props) {
    const background = {
        backgroundColor: '#E8E6F4'
    }
    return (
        <div className='home' style={background}>
            <Breadcrumb project={props.project} item={props.item} />
            <Routes >
                <Route path='/' element={<Dashboard/>}></Route>
                <Route path='/project' element={<Projects project={props.project} setProject={props.setProject} />}></Route>
                <Route path='/permissions' element={<Permission />}></Route>
                <Route path='/roles' element={<Roles />}></Route>
                <Route path='/users' element={<User />}></Route>
            </Routes>
        </div>
    )
}
