import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";

const Login = () => {
    const appState = useContext(AppContext);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [alertMessage, setAlertMessage] = useState('');

    const logInCliced = async (e: Event) => {
        e.preventDefault();
        if (loginData.email === '' || loginData.password === '') {
            setAlertMessage('Please insert email and password!');
        };
        setAlertMessage('');
        let response = await IdentityService.Login('account/login', loginData);
        if (!response.ok) {
            setAlertMessage(response.messages![0]);
        } else {
            setAlertMessage('');
            appState.setAuthInfo(response.data!.jwt, response.data!.firstname, response.data!.lastname);
        }
    }


    return (
        <>
            {appState.jwt !== null ? <Redirect to="/" /> : null}

            <h1>Login</h1>
            <form onSubmit={(e) => logInCliced(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr/>
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger}/>
                            <div className="form-group">
                                <label htmlFor="Input_Email">Email</label>
                                <input value={loginData.email} onChange={e => setLoginData({...loginData, email: e.target.value})}  className="form-control" type="email" id="Input_Email" name="Input.Email" placeholder="user@example.com"  autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Password</label>
                                <input value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} className="form-control" type="password" id="Input_Password" name="Input.Password" placeholder="Input your current password..." autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => logInCliced(e.nativeEvent)} type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    )

}

export default Login;
