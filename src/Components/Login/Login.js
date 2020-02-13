import React, {useState} from 'react'
import Button from '../Button/Button'
import TextLink from '../TextLink/TextLink'
import './login.css'
import Main from '../../Features/Main/Main';
import Bkg from '../../Features/BackgroundSidebar/BackgroundSidebar'
import axios from 'axios';

export default function Login(props) {

    
    const [logData, setLogData] = useState({username:'', password:''});
    const [error, setError] = useState('We\'ll never share your email with anyone else.');
    const [token, setToken] = useState('');


    if(localStorage.token_key){
        props.history.push('/')
    }else{
        localStorage.setItem('token_key', token)
        console.log(token)
    }


    const formData = (e) => {
        setLogData({...logData,[e.target.name]: e.target.value})
    }

    const config = {     
        headers: { 
            'Content-type': 'application/json' 
        }
    }

    //send to api route
    const subForm = () => {
        localStorage.registered = '';

        if (logData.username !== '' && logData.password !== ''){
            axios.post('http://localhost:8000/auth/', logData, config)
            .then(res => {
                 setToken(res.data.token)
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
            <div class="form-group">
                <label for="exampleInputEmail1">Email:</label>
                <input type="text" name='username' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={formData} required></input>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password:</label>
                <input type="password" name='password' class="form-control" id="exampleInputPassword1" onChange={formData} required></input>
            </div>
            <small id="emailHelp" class="form-text text-muted">{error}</small>

            <div class="submit-section">
                <Button title='Login' fnc={subForm} />
                <TextLink title='Create an account' LinkTo='/register' />
            </div>
        </form>
        </Main>
        </>
    )
}
