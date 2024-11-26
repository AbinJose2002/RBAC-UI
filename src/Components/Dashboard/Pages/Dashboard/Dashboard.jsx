import React from 'react';
import './Dashboard.css';
import project from '../../../../assets/project.gif'
import user from '../../../../assets/user.gif'
import role from '../../../../assets/role.gif'
import permission from '../../../../assets/permission.gif'
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Permission from '../Permission/Permission'
import Projects from '../Projects/Projects'
import User from '../User/User'
import Roles from '../Roles/Roles'
import { Padding } from '@mui/icons-material';

export default function Dashboard() {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <div className="item-container">
                <Link to='/project' className='box'>
                    <div className="box">
                        <img src={project} width='25' height='25' alt="Placeholder" className="image" />
                        <div className="text-container">
                            <div className="text-title">Project</div>
                            <div className="text-description">View Projects</div>
                        </div>
                    </div>
                </Link>
                <Link to='/users' className='box'>
                    <div className="box">
                        <img src={user} width='25' height='25' alt="Placeholder" className="image" />
                        <div className="text-container">
                            <div className="text-title">Users</div>
                            <div className="text-description">View Users</div>
                        </div>
                    </div>
                </Link>
                <Link to='/roles' className='box'>
                    <div className="box">
                        <img src={role} width='25' height='25' alt="Placeholder" className="image" />
                        <div className="text-container">
                            <div className="text-title">Role</div>
                            <div className="text-description">View Roles</div>
                        </div>
                    </div>
                </Link>
                <Link to='/permissions' className='box'>
                    <div className="box">
                        <img src={permission} width='25' height='25' alt="Placeholder" className="image" />
                        <div className="text-container">
                            <div className="text-title">Permission</div>
                            <div className="text-description">View Permissions</div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="permission-calender row">
                <div className="col-lg-8 col-sm-12">
                    <Permission />
                </div>
                <div className="col-lg-4 col-sm-12" style={{paddingTop: '1em'}}>
                    <h4>Date</h4>
                    <Calendar
                        onChange={setDate}
                        value={date}
                    />
                </div>
            </div>

            <div className="user-role row">
                <div className="col-lg-4 col-sm-12">
                    <Projects />
                </div>
                <div className="col-lg-4 col-sm-12">
                    <User />
                </div>
                <div className="col-lg-4 col-sm-12">
                    <Roles />
                </div>
            </div>

        </>
    );
}