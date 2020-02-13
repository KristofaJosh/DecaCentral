import React from 'react';
import './main.css';

export default function Main(props) {
    return (
        <div className="main" style={{width:`${props.width}%`}}>
            <div className="inner-main">
                {props.children}
            </div>
        </div>
    )
}
