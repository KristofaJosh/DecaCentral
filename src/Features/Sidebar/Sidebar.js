import React from 'react'
import './sidebar.css'

export default function Sidebar(props) {
    return (
        <div style={{width:`${props.width}%`, background:`${props.fill}`}}>
            {props.children}
        </div>
    )
}
