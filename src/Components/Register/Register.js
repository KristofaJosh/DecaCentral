import React, {useState} from 'react';
import Button from '../Button/Button';
import TextLink from '../TextLink/TextLink';
import Main from '../../Features/Main/Main';
import Bkg from '../../Features/BackgroundSidebar/BackgroundSidebar';
import axios from 'axios';

export default function Register(props) {
    const [regData, setRegData] = useState({fullname:'', username:'', password:'', email:'', position:''});
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState({username:''});
    const [emailError, setEmailError] = useState({email:''});


    if(localStorage.token_key){
        props.history.push('/')
    };


    const formData = (e) => {
        setRegData({...regData, [e.target.id]: e.target.value})
    };

    //send to api route
    const subForm = () => {

        for (let x in regData){
            if (regData[x] === ''){
                setError(`${x[0].toUpperCase()+x.slice(1)} is empty, enter valid input`);
                break;
            }
        };

        if (!(regData.fullname === '' || regData.username === '' || regData.password ==='' || regData.email === '' || regData.position === '')){
            const config = {headers: { 'Content-type': 'application/json' }};

            
            axios.post('https://deca-central-api.herokuapp.com/users/', regData, config)
            .then(res => {
                if(res.status === 201){
                    localStorage.setItem('registered','Registration Successful, Please Login');
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
    };

    return (
        <>
        <Bkg />
        <Main width={65}>
        <form>
            <h4>Create profile</h4>
            <div className="form-row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" className="form-control" id="fullname" onChange={formData} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" onChange={formData}/>
                        <small id="usernameHelp" className="form-text text-muted">{usernameError.username}</small>
                    </div>
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" onChange={formData}/>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={formData}/>
                <small id="emailHelp" className="form-text text-muted">{emailError.email}</small>
            </div>

            <div className="form-group">
                <label htmlFor="position">Position</label>
                <select className="form-control" id="position" onChange={formData}>
                    <option selected disabled>Choose position</option>
                    <option value='DD'>Deca Dev</option>
                    <option value='ST'>Staff</option>
                    <option value='PM'>Product Manager</option>
                    <option value='TL'>Tech Lead</option>
                </select>
            </div>
            <div>
                {error}
            </div>

            <div className="submit-section">
                <Button title='Join Now' fnc={subForm} />
                <TextLink title='Login' LinkTo='/login' />
            </div>
        </form>
        </Main>
        </>
    )
}
