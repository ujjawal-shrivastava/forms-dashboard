import React, { useState, useContext } from 'react'
import { withRouter, Redirect, Link} from 'react-router-dom'
import Footer from '../../components/Footer'
import './Login.scss'
import { useMutation } from 'react-apollo-hooks';
import {gql} from 'apollo-boost'
import {UserContext} from '../../UserContext'
import { toast as superToast } from 'bulma-toast'

const LOGIN= gql`
  mutation login($email: String!, $password: String!, $long:Boolean) {
    login(email:$email, password:$password, long:$long) {
      token
      long
      email
      name
      verified
    }

  }
`;



const Login = withRouter(({location }) =>{
    const [user, setUser] = useContext(UserContext)
    const [loginData, setLoginData] = useState({ email: location.state?location.state.toString():"", password: "", rememberme:false })
    const [loginError, setLoginError] = useState({
        email: "",
        password: ""
    })

    const [api_login, { data, loading, error}] = useMutation(LOGIN, { errorPolicy: 'all'});

    const input_fields = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /^.{1,}$/,
    }


    const validateEmail = (value: string) => {
        const newData = {...loginData}
        const regex = input_fields.email
        setLoginError((current:any)=>{
            current ={...current}
            current.email=regex.test(value)?"":"Invalid Email"
            return current
        })
        newData.email=value
        setLoginData(newData)
    }

    const validatePassword = (value: string) => {
        const newData = {...loginData}
        const regex = input_fields.password
        setLoginError((current:any)=>{
            current ={...current}
            current.password=regex.test(value)?"":"Password cannot be empty"
            return current
        })
        newData.password=value
        setLoginData(newData)
    }

    const handleRemember=(value:boolean)=>{
        setLoginData((current:any) => ({ ...current, rememberme:value}))
    }

    const login = ()=>{
        validatePassword(loginData.password)
        validateEmail(loginData.email)
        if(loginData.email && loginData.password && !loginError.email && !loginError.password){
            api_login({ variables: { email:loginData.email, password:loginData.password, long:loginData.rememberme }}).then(({data, errors}) => {
                if(!errors){
                    const newuser ={
                        email:data.login.email,
                        long:data.login.long,
                        name:data.login.name,
                        verified:data.login.verified,
                        auth:true
                    }
                setUser(newuser)
                sessionStorage.setItem("user",JSON.stringify(newuser))
                if(loginData.rememberme) localStorage.setItem("user",JSON.stringify(newuser))
                superToast({
                    message: `Welcome ${data.login.name}, You have successfully logged in!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                  });
                }
                
              });
        }
        return
    }
    

    return (
        
       <div className="login-view columns is-centered" onKeyPress={(event)=>{
        var code = event.keyCode || event.which
        if(code===13) login()
    }}>
           {user.auth?<Redirect to="/" />:""}
            <div className="column is-two-fifths">
                <div className="box is-full">
                    <p className="text has-text-centered mb-3"><strong>LOGIN</strong></p>
                    <p className="has-text-danger has-text-centered has-text-weight-bold mb-4 is-size-7">{error?(error.graphQLErrors.length?error.graphQLErrors[0].message:""):""}</p>
                    <div className="field">
                        <div className="control">
                            <input className={`input ${loginError["email"]?"is-danger":""}`} type="email" placeholder="Email" value={loginData.email} onChange={(e) => { validateEmail(e.target.value) }} />
                        </div>
                        <p className="help is-danger">{loginError["email"]}</p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className={`input ${loginError["password"]?"is-danger":""}`} type="password" placeholder="Password" value={loginData.password} onChange={
                                (e) => {
                                    validatePassword(e.target.value)
                                }
                            } />
                        </div>
                        <p className="help is-danger">{loginError["password"]}</p>
                    </div>
                    <div className="field">
                        <div className="control">
                        <label className="checkbox" >
                                <input type="checkbox" value="remember" onChange={(e)=>{handleRemember(e.target.checked)}} />
                                <span>Remember Me</span>
                        </label>
                        </div>
                    </div>
                        
                    <Link to="/login" className="field mb-3">
                        <div className="control">
                            <button className="button is-link is-fullwidth mx-1 my-1" onClick={login} disabled={loading}>{loading?"Logging in....":"Login"}</button>
                        </div>
                    </Link>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <p className="has-text-left is-size-7 is-link mt-0"><a href="/register">Not Registered?</a></p>
                        <p className="has-text-right is-size-7 is-link mt-0"><a href="/forgot">Forgot Password?</a></p>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}
)
export default Login