import React from 'react';
import {Link } from "react-router-dom";

export default function TextLink({title, LinkTo, styled, click}) {

    if (!styled){
        styled = TextStyle
    }

    return (
        <Link style={styled} onClick={click} to={LinkTo}>{title}</Link>
    )
}

const TextStyle = {
    color: '#000',
    marginLeft: '1.5rem',
    textDecoration: 'none'
}