import React from 'react';
import {Link} from 'react-router-dom';
import './cards.css';
import Arrow from './rightarrow.png'

export default function Cards({heading, textcontent, link, img, type}) {
    let ccs = 'card ';
    let fw = 700;
    let fs = 2;
    let fst = 1.5;
    let fwt = 1;
    let show = 'none';

    if (type !== 'small'){
        fw = 800;
        fs = 2.5;
        fst = 2;
        fwt = 400;
    }

    if (link){
        show = 'display'
    }
    return (
        <div className={ccs+type} id='card'>
            <div className="card-text">
                <p style={{fontWeight:`${fw}`, fontSize:`${fs}rem`}}>{heading}</p>
                <p style={{fontWeight:`${fwt}`, fontSize:`${fst}rem`}}>{textcontent}</p>
                <Link style={{color:'green', 
                fontSize:`${fst}rem`, textDecoration: 'underline',
                display:`${show}`
            }} 
                to='/?'>{link}
                <span><img src={Arrow} alt='right'></img></span>
                </Link>
            </div>
            <div className='card-logo'>
                <img src={img} alt="flat art"></img>
            </div>
        </div>
    )
}
