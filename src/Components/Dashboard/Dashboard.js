import React, {useState, useEffect} from "react";

import Sidebar from '../../Features/Sidebar/Sidebar';
import Main from '../../Features/Main/Main';

import Navlink from '../MenuLinks/MenuLinks';

import deca_logo from "../../decagon-logo.png";
import dashboard_icon from "./images/icons/outline.svg";
import createprofile_icon from "./images/icons/grad.png";
import profile_icon from "./images/icons/user.png";
import task_icon from "./images/icons/warning.png";
import team_icon from "./images/icons/user_group.png";
import image1 from "./images/flatarts/image1.png";
import image2 from "./images/flatarts/image2.png";
import image3 from "./images/flatarts/image3.png";
// import image4 from "./images/flatarts/image4.png";
import image5 from "./images/flatarts/image5.png";

import Card from '../Cards/Cards';

import TextLink from '../TextLink/TextLink'

import axios from 'axios'

// import {Redirect} from 'react-router-dom';

import './dashboardstyle.css'

export default function Dashboard(props) {
  //get logged user data

  const [user, setUser] = useState('Hi There')
  const [message, setMessage] = useState('Scroll down to login to view your profile. You can update your profile to remove this message after login.')
  const [logout, setLogout] = useState('')
  const [position, setPosition] = useState('')
  const [loggin, setLoggin] = useState(<TextLink title='Login' LinkTo='/login'/>)

  const logoutFn = () => {
    props.history.push('/login')
    localStorage.clear();
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users/5')
      .then(res => {
        if(localStorage.token_key){
          // let token = 'Token '+localStorage.token_key;
          // console.log(token)
          setUser('Hello '+res.data.first_name)

          if (res.data.password){
            setMessage(res.data.password)
          }
          setPosition('Deca Dev')
          setLoggin('')
          setLogout(<TextLink title='Log Out' click={logoutFn} styled={{color: '#2D2F48', fontSize: '1.7rem', fontWeight: '700'}} />)
        }
      })
  },[user])



  return (
    <>
        <Sidebar width={20}  fill='linear-gradient(180deg, #2D2F48 0%, #09090E 100%) 0% 0% no-repeat padding-box'>
        <div className='inner-menu'>
          <div id='menu-logo'>
              <img src={deca_logo} alt='logo'></img>
            </div>
            <div className="menu">
              <div className="nav-link active">
                <Navlink img={dashboard_icon} text='Dashboard' color='#2D2F48' LinkTo='/register'/>
              </div>
              <div className="nav-link">
                <Navlink img={createprofile_icon} text='Create Profile' LinkTo={null}/>
              </div>
              <div className="nav-link">
                <Navlink img={profile_icon} text='Dashboard' />
              </div>
              <div className="nav-link">
                <Navlink img={task_icon} text='Task' />
              </div>
              <div className="nav-link">
                <Navlink img={team_icon} text='Create Team'/>
              </div>
            </div>
        </div>

        </Sidebar>

        <Main width={80}>

          <div className='deca-central'>
            <h1 style={{fontWeight:'700'}}>Decagon Central</h1>
            {logout}
          </div>

          

          <Card heading= { user || 'Hi There' }
          textcontent={ message || 'Login to view your dashboard'}
          img={image2}
          />

          <div className='row'>
            <div className='col'>
            <Card heading='Find an employee' 
          textcontent='lorem ipsum bal adf df eaer adfadfa sdfa ewre  rwerwerw erweadfad adfdf ewrer adf' 
          type='small'
          img={image2}
          link='Search Employee'
          />
            </div>
            <div className='col'>
            <Card heading='Find a Dev' 
          textcontent='lorem ipsum bal adf df eaer adfadfa sdfa ewre  rwerwerw erweadfad adfdf ewrer adf' 
          type='small'
          img={image3}
          link='Search Dev'
          />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
            <Card heading='Update profile' 
          textcontent='lorem ipsum bal adf df eaer adfadfa sdfa ewre  rwerwerw erweadfad adfdf ewrer adf' 
          type='small'
          img={image1}
          link='Update profile'
          />
            </div>
            <div className='col'>
            <Card heading='Update Password' 
          textcontent='lorem ipsum bal adf df eaer adfadfa sdfa ewre  rwerwerw erweadfad adfdf ewrer adf' 
          type='small'
          img={image5}
          link='Update profile'
          />
            </div>
          </div>

          <div className='footer'>
            <div>
              <span>{loggin}</span>
              <span><TextLink title={position} /></span>
            </div>
          </div>
        </Main>
    </>
  );
}