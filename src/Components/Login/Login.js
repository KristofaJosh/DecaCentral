import React, {useState} from "react";
import Button from "../Button/Button";
import TextLink from "../TextLink/TextLink";
import "./login.css";
import Main from "../../Features/Main/Main";
import Bkg from "../../Features/BackgroundSidebar/BackgroundSidebar";
import axios from "axios";

export default function Login(props) {
    const [logData, setLogData] = useState({email: "", password: ""});
    const [error, setError] = useState([
        "",
        "We'll never share your email with anyone else."
    ]);
    const [fetching, setFetching] = useState(false);
    const [token, setToken] = useState("");


    if (localStorage.token_key) {
        props.history.push("/");
    } else {
        localStorage.setItem("token_key", token);
        // console.log(token)
    }

    const formData = e => {
        setLogData({...logData, [e.target.name]: e.target.value});
    };

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };




    //send to api route
    const subForm = () => {
        // http://127.0.0.1:8000/auth/token/login/

        // returns token

        // console.log(logData)

        localStorage.registered = "";

        if (logData.email !== "" && logData.password !== "") {
            setFetching(true);
            axios
                .post("https://deca-central-api.herokuapp.com/auth/login/", logData, config)
                .then(res => {
                    // console.log(res.data)
                    setToken(res.data);
                    //goto dashboard
                    setFetching(false)
                    props.history.push("/");

                })
                .catch(err => {
                    // console.log(err.response);
                    setFetching(false);
                    if (err.response.status === 400) {
                        setError(["error", "Wrong Username or Password"]);
                    } else if (logData.email !== "" && err.response.status === 404) {
                        setError(["error", "User does not exist"]);
                    } else {
                        setError(["error", "Enter your email address"]);
                    }
                });
        } else {
            setError(["error", "Enter your email address and/or password"]);
        }
    };

    return (
        <>
            <Bkg/>
            <Main width={65}>
                <div style={{color: "green"}}>{localStorage.registered || ""}</div>
                <br/>
                <form onSubmit={subForm}>
                    <h4>Login</h4>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={formData}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={formData}
                            required
                        />
                    </div>
                    <small id="emailHelp" className="form-text text-muted">
                        <span className={error[0]}>{error[1]}</span>
                    </small>

                    <div className="submit-section">

                        <Button title={fetching ? <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                            : "Login"} fnc={subForm}/>
                        <TextLink title="Create an account" LinkTo="/register"/>
                    </div>
                </form>
            </Main>
        </>
    );
}

