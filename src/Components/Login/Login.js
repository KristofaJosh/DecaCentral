import React, {useState} from 'react'
import Button from '../Button/Button'
import TextLink from '../TextLink/TextLink'
import './login.css'
import Main from '../../Features/Main/Main';
import Bkg from '../../Features/BackgroundSidebar/BackgroundSidebar'
import axios from 'axios';

export default function Login(props) {

    
    const [logData, setLogData] = useState({email:'', password:''});
    const [error, setError] = useState('We\'ll never share your email with anyone else.');
    const [token, setToken] = useState('');


    if(localStorage.token_key){
        props.history.push('/')
    }else{
        localStorage.setItem('token_key', token)
        // console.log(token)
    }


    const formData = (e) => {
        setLogData({...logData,[e.target.name]: e.target.value})
    }

    const config = {     
        headers: { 
            'Content-type': 'application/json', 
        }
    }

    //send to api route
    const subForm = () => {

        // http://127.0.0.1:8000/auth/token/login/

        // returns token

        // console.log(logData)



        localStorage.registered = '';

        if (logData.username !== '' && logData.password !== ''){
            axios.post('http://127.0.0.1:8000/auth/login/', logData, config)
                .then(res => {
                    console.log(res.data)
                 setToken(res.data)
                //goto dashboard
                props.history.push('/')

            })
            .catch(err => {
                // console.log(err.response)
                if(err.response.status === 400){
                    setError('Wrong Username or Password')
                }else{
                    setError('Enter your email address')
                }
            })
        }else{
            setError('Enter your email address and/or password')
        }
    }


    return (
        <>
        <Bkg />
        <Main width={65}>
        <div style={{color:'green'}}>{localStorage.registered || ''}</div>
        <br/>
        <form onSubmit = {subForm}>
            <h4>Login</h4>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email:</label>
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={formData} required></input>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password:</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={formData} required></input>
            </div>
            <small id="emailHelp" className="form-text text-muted">{error}</small>

            <div className="submit-section">
                <Button title='Login' fnc={subForm} />
                <TextLink title='Create an account' LinkTo='/register' />
            </div>
        </form>
        </Main>
        </>
    )
}
