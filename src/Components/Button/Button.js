import React from 'react';
import {Link} from "react-router-dom";

function Button({title, LinkTo, fnc}) {
    return (
        <Link class="btn btn-success" style={buttonStyle} to={LinkTo} onClick={fnc}>{title}</Link>
    )
}

const buttonStyle = {
    width: "10rem",
    borderRadius: "0.5rem"
}


export default Button