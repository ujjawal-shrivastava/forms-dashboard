import React, { useState } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import '../Login/Login.scss'
import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'
import { toast as superToast } from 'bulma-toast'
import Loading from '../../components/Loading/Loading';

const FORGOT_VERIFY = gql`
  query forgotPasswordVerify($token:String!) {
      forgotPasswordVerify(token:$token)
  }
`;

const FORGOT_RESET = gql`
  mutation forgotPasswordReset($token:String!, $new:String!) {
      forgotPasswordReset(token:$token, new:$new){
          email
          name
      }
  }
`;



const Forgot = withRouter(({ history, location, match}) => {
    const [resetData, setResetData] = useState({ new: "", new2: "" })
    const [resetError, setResetError] = useState({
        new: [],
        new2: ""
    })


    const { loading: verify_loading, error: verify_error } = useQuery(FORGOT_VERIFY, {variables:{token:match.params.id}, errorPolicy: 'all' })
    const [api_reset, { loading, error, data }] = useMutation(FORGOT_RESET, { errorPolicy: 'all' });

    if(verify_loading){return(<Loading />)}
    if(verify_error){return(<div>Link Invalid or Expired!</div>)}

    const validateNew = (value: string) => {
        const newData = { ...resetData }
        const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        setResetError((current: any) => {
            current = { ...current }
            current.new = regex.test(value) ? [] : ["Contain a LOWERCASE letter", "Contain an UPPERCASE letter", "Contain a SPECIAL character", "Contain a NUMBER", "Be at least 8 characters long"]
            return current
        })
        newData.new = value
        setResetData(newData)
    }

    const validateNew2 = (value: string) => {
        setResetData((current: any) => ({ ...current, new2: value }))
        setResetError((current: any) => {
            let newError = { ...current }
            let regexp: RegExp = /^.{1,}$/
            newError.new2 = regexp.test(value) ? ((value === resetData.new) ? "" : "New Passwords dont match!") : "Confirm Password cannot be empty!"
            return newError
        })
    }

    const reset = () => {
        validateNew(resetData.new)
        validateNew2(resetData.new2)
        if (resetError.new.length || resetError.new2 || !resetData.new || !resetData.new2) return
        api_reset({ variables: { new: resetData.new, token: match.params.id } }).then(({ data, errors }) => {
            if (!errors) {
                superToast({
                    message: `Great ${data.forgotPasswordReset.name}, Now login with new Password!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                });
                history.push("/login", data.forgotPasswordReset.email)
            }
        });
        return
    }


    return (

        <div className="login-view columns is-centered" onKeyPress={(event) => {
            var code = event.keyCode || event.which
            if (code === 13) reset()
        }}>
            <div className="column is-two-fifths">
                <div className="box is-full">
                    <p className="text has-text-centered mb-3"><strong>RESET PASSWORD</strong></p>
                    <p className="has-text-danger has-text-centered has-text-weight-bold mb-4 is-size-7">{error ? (error.graphQLErrors.length ? error.graphQLErrors[0].message : "") : ""}</p>

                    <div className="field">
                        <div className="control">
                            <input className={`input ${resetError.new.length ? "is-danger" : ""}`} type="password" placeholder="New Password" value={resetData.new} onChange={
                                (e) => {
                                    validateNew(e.target.value)
                                }
                            } />
                        </div>
                        <p className="help is-danger">{resetError.new.length ? "Password should:" : ""}</p>
                        <ol className="help is-danger ml-5">
                            {resetError.new.map((value: string, index: number) => {
                                return (<li key={index}>{value}</li>)
                            })}
                        </ol>
                    </div>
                    <div className="field">
                        <div className="control field-body">
                            <input className={`input ${resetError.new2 ? "is-danger" : ""}`} type="password" placeholder="Confirm New Password" value={resetData.new2} onChange={(e) => { validateNew2(e.target.value) }} />
                        </div>
                        <p className="help is-danger">{resetError.new2}</p>
                    </div>
                    <div className="field mb-3">
                        <div className="control">
                            <button className="button is-link is-fullwidth mx-1 my-1" onClick={reset} disabled={loading}>{loading ? "Resetting...." : "Reset"}</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}
)
export default Forgot
