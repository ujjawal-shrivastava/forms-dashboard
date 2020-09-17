import React, { useState } from 'react'
import Footer from '../../components/Footer'
import './Register.scss'
import { useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { toast as superToast } from 'bulma-toast'

const REGISTER = gql`
  mutation register($name:String!,$email: String!, $password: String!) {
    register(name:$name, email:$email, password:$password) {
      email
      name
    }

  }
`;

 const Register = withRouter(({history}) => {
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "", password2: "", terms: false })
    const [dataError, setDataError] = useState({
        name: "",
        email: "",
        password: [],
        password2: "",
        terms: ""
    })

    const [api_register, { data, loading, error }] = useMutation(REGISTER, { errorPolicy: 'all' });

    const validateName = (value: string) => {
        const newData = { ...registerData }
        const regex = /\w{1,}/
        setDataError((current: any) => {
            current = { ...current }
            current.name = regex.test(value) ? "" : "Name cannot be empty and should not contain any special character!"
            return current
        })
        newData.name = value
        setRegisterData(newData)
    }

    const validateEmail = (value: string) => {
        const newData = { ...registerData }
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        setDataError((current: any) => {
            current = { ...current }
            current.email = regex.test(value) ? "" : "Invalid email!"
            return current
        })
        newData.email = value
        setRegisterData(newData)
    }

    const validatePassword = (value: string) => {
        const newData = { ...registerData }
        const regex: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        setDataError((current: any) => {
            current = { ...current }
            current.password = regex.test(value) ? [] : ["Contain a LOWERCASE letter", "Contain an UPPERCASE letter", "Contain a SPECIAL character", "Contain a NUMBER", "Be at least 8 characters long"]
            return current
        })
        newData.password = value
        setRegisterData(newData)
    }

    const validatePassword2 = (value: string) => {
        const newData = { ...registerData }
        const regex = /.{1,}/
        setDataError((current: any) => {
            current = { ...current }
            current.password2 = regex.test(value) ? ((value === newData.password) ? "" : "Passwords dont match!") : "Confirm Password cannot be empty!"
            return current
        })
        newData.password2 = value
        setRegisterData(newData)
    }

    const validateTerms = (value: boolean) =>{
        const newData = { ...registerData }
        setDataError((current: any) => {
            current = { ...current }
            current.terms = value?"":"Accept terms to register!"
            return current
        })
        newData.terms = value
        setRegisterData(newData)
    }

    const register = () => {
        validateName(registerData.name)
        validateEmail(registerData.email)
        validatePassword(registerData.password)
        validatePassword2(registerData.password2)
        validateTerms(registerData.terms)

        if(dataError.email || dataError.name || dataError.password.length || dataError.password2 || dataError.terms || !registerData.email || !registerData.name || !registerData.password || !registerData.password || !registerData.terms) return

        api_register({ variables: {name:registerData.name, email:registerData.email, password:registerData.password }}).then(({data, errors}) => {
            if(!errors){
            superToast({
                message: `Great <strong>${data.register.name}</strong>, You are successfully registered! Now login to your account...`,
                type: "is-black",
                position: "top-center",
                duration: 2000,
                animate: { in: 'fadeIn', out: 'fadeOut' },
                dismissible: true,
                pauseOnHover: true
              });
              history.push("/login", data.register.email)
            }
            
          });
    }

    return (
        <div className="register-view columns is-centered" onKeyPress={(event) => {
            var code = event.keyCode || event.which
            if (code === 13) register()
        }}>
            <div className="column is-two-fifths is-vcentered">
                <div className="box" style={{marginTop:"4rem"}}>
                    <p className="text has-text-centered mb-5"><strong>REGISTER</strong></p>
                    <p className="has-text-danger has-text-centered has-text-weight-bold mb-4 is-size-7">{error ? (error.graphQLErrors.length ? error.graphQLErrors[0].message : "") : ""}</p>
                    <div className="field">
                        <div className="control">
                            <input className={`input ${dataError.name ? "is-danger" : ""}`} type="text" placeholder="Display Name" value={registerData.name} onChange={(e) => { validateName(e.target.value) }} />
                        </div>
                        <p className="help is-danger">{dataError.name}</p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className={`input ${dataError.email ? "is-danger" : ""}`} type="email" placeholder="Email" value={registerData.email} onChange={(e) => { validateEmail(e.target.value) }} />
                        </div>
                        <p className="help is-danger">{dataError.email}</p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className={`input ${dataError.password.length ? "is-danger" : ""}`} type="password" placeholder="Password" value={registerData.password} onChange={(e) => { validatePassword(e.target.value) }} />
                        </div>
                        <p className="help is-danger">{dataError.password.length ? "Password should:" : ""} </p>
                            <ol className="help is-danger ml-5">
                                {dataError.password.map((value: string, index: number) => {
                                    return (<li key={index}>{value}</li>)
                                })}
                            </ol>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className={`input ${dataError.password2 ? "is-danger" : ""}`} type="password" placeholder="Confirm Password" value={registerData.password2} onChange={(e) => { validatePassword2(e.target.value) }} />
                        </div>
                        <p className="help is-danger">{dataError.password2}</p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" checked={registerData.terms} onChange={(e)=>{validateTerms(e.target.checked)}} />
                                &nbsp;I agree to the <a className="is-link" href="/terms">terms and conditions</a>.
                            </label>
                        </div>
                        <p className="help is-danger">{dataError.terms}</p>
                    </div>
                    <div className="field mb-3">
                        <div className="control">
                            <button className="button is-link is-fullwidth" onClick={register} disabled={loading}>{loading?"Registering....":"Register"}</button>
                        </div>
                    </div>
                    <p className="has-text-right is-size-7 is-link mt-0"><a href="/login">Already registered?</a></p>
                </div>
                <Footer />
            </div>

        </div>
    )
})

export default Register