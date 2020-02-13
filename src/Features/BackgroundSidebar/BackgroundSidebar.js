import React from 'react';
import './backgroundsidebar.css';
import deca_logo from '../../decagon-logo.png';
import Sidebar from '../Sidebar/Sidebar';

export default function BackgroundImage() {
    return (
        <Sidebar width={35}>
        <div className="first-section">
            <div className='container'>
                <img src={deca_logo} alt="logo" />
                <p>
                    Decagon is a software engineering institute ushering in a new
                    phase of tech-powered growth and prosperity in Nigeria by training
                    and deploying an army of leader-developers.
                </p>
            </div>
        </div>
        </Sidebar>
    )
}
