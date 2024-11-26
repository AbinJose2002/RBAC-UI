import React from 'react'

import './Home.css'
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Projects from '../Pages/Projects/Projects';
import { Route, Routes } from 'react-router-dom';

export default function Home(props) {
    return (
        <div className='home'>
            <Breadcrumb project={props.project} item={props.item} />
            <Routes >
                <Route path='/project' element={<Projects project={props.project} setProject={props.setProject} />}></Route>
            </Routes>
        </div>
    )
}
