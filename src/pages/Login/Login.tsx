import React, {useState} from 'react'
import Footer from '../../components/Footer'
import './Login.scss'

export default function Login() {
    const [error, setError] = useState({
        email:"",
        password:""
    })

    const input_fields = {
        email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        password: /^[#\w@_-]{8,20}$/,
      }

    const validate = (field:any, regex:RegExp) =>{
        if (regex.test(field.value)){
            field.className += 'input';

        } else {
            field.className = 'input is-danger';
        }
    }

    return (
        <div className="login-view columns is-centered">
            <div className="column is-two-fifths">
                <div className="box">
                    <p className="text has-text-centered mb-5"><strong>LOGIN</strong></p>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="text" placeholder="Email" onKeyUp={
                                (e) => {
                                    validate(e.target, input_fields["email"])
                                }
                                }/>
                        </div>
                    <p className="help is-danger">{error["email"]}</p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" onKeyUp={
                                (e) => {
                                    validate(e.target, input_fields["password"])
                                }
                                } />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" />
                                &nbsp;Remember Me
                            </label>
                        </div>
                    </div>
                    <div className="field mb-3">
                        <div className="control">
                            <button className="button is-link is-fullwidth" disabled>Login</button>
                        </div>
                    </div>
                    <p className="has-text-right is-size-7 is-link mt-0"><a href="/forgot-password">Forgot Password?</a></p>
                </div>
                <Footer />
            </div>

        </div>
    )
}
