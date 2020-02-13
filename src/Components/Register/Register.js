import React, {useState} from 'react';
import Button from '../Button/Button';
import TextLink from '../TextLink/TextLink';
import Main from '../../Features/Main/Main';
import Bkg from '../../Features/BackgroundSidebar/BackgroundSidebar';
import axios from 'axios';

export default function Register(props) {
    const [regData, setRegData] = useState({first_name:'', username:'', password:'', email:'', position:''});
    const [error, setError] = useState('')
    const [usernameError, setUsernameError] = useState({username:''})
    const [emailError, setEmailError] = useState({email:''})


    if(localStorage.token_key){
        props.history.push('/')
    }


    const formData = (e) => {
        setRegData({...regData, [e.target.id]: e.target.value})
    }

    //send to api route
    const subForm = () => {

        for (let x in regData){
            if (regData[x] === ''){
                setError(`${x[0].toUpperCase()+x.slice(1)} is empty, enter valid input`);
                break;
            }
        }

        if (!(regData.first_name === '' || regData.username === '' || regData.password ==='' || regData.email === '' || regData.position === '')){
            const config = {headers: { 'Content-type': 'application/json' }}

            axios.post('http://127.0.0.1:8000/api/users/', regData, config)
            .then(res => {
                if(res.status === 201){
                    localStorage.setItem('registered','Registration Successful, Please Login')
                    props.history.push('/login');
            }})
            .catch(err => {
                if(err.response !== undefined){
                    // console.log(err.response)
                    setUsernameError({...err.response.data, [err.response.data.username]: err.response.data[0]})
                    setEmailError({...err.response.data, [err.response.data.email]: err.response.data[0]})
                }
            })
        }
    }

    return (
        <>
        <Bkg />
        <Main width={65}>
        <form>
            <h4>Create profile</h4>
            <div class="form-row">
                <div class="col">
                    <div class="form-group">
                        <label for="first_name">Full Name</label>
                        <input type="text" class="form-control" id="first_name" onChange={formData} ></input>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control" id="username" onChange={formData}></input>
                        <small id="usernameHelp" class="form-text text-muted">{usernameError.username}</small>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="password">Pasword</label>
                <input type="password" class="form-control" id="password" onChange={formData}></input>
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={formData}></input>
                <small id="emailHelp" class="form-text text-muted">{emailError.email}</small>
            </div>

            <div class="form-group">
                <label for="position">Position</label>
                <select class="form-control" id="position" onChange={formData}>
                    <option selected disabled>Choose position</option>
                    <option >Deca Dev</option>
                    <option>Staff</option>
                    <option>Product Manager</option>
                    <option>Tech Lead</option>
                </select>
            </div>
            <div>
                {error}
            </div>

            <div class="submit-section">
                <Button title='Join Now' fnc={subForm} />
                <TextLink title='Login' LinkTo='/login' />
            </div>
        </form>
        </Main>
        </>
    )
}
