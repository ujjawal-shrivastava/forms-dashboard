import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Footer from '../../components/Footer'
import '../Login/Login.scss'
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'
import { toast as superToast } from 'bulma-toast'

const FORGOT_REQUEST = gql`
  mutation forgotPassword($email:String!) {
      forgotPassword(email:$email)
  }
`;

const ForgotRequest = withRouter(({ history }) => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [completed, setCompleted] = useState(false)
    const [api_request, { loading, error, data }] = useMutation(FORGOT_REQUEST, { errorPolicy: 'all' });


    if (completed) {return(<div>GO and CHECK your EMAIL!</div>)}
    const validateEmail = (value: string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        setEmailError(() => {
            const newError = regex.test(value) ? "" : "Invalid email format!"
            return newError
        })
        setEmail(value)
    }

    const forgot = () => {
        validateEmail(email)
        if (!email || emailError) return
        api_request({ variables: { email: email } }).then(({ data, errors }) => {
            if (!errors) {
                superToast({
                    message: `Password Reset Link has been sent to your email!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                });
                setCompleted(true)
            }
        });
        return
    }

    return (

        <div className="login-view columns is-centered" onKeyPress={(event) => {
            var code = event.keyCode || event.which
            if (code === 13) forgot()
        }}>
            <div className="column is-two-fifths">
                <div className="box is-full">
                    <p className="text has-text-centered mb-3"><strong>FORGOT PASSWORD</strong></p>
                    <p className="has-text-danger has-text-centered has-text-weight-bold mb-4 is-size-7">{error ? (error.graphQLErrors.length ? error.graphQLErrors[0].message : "") : ""}</p>

                    <div className="field">
                        <div className="control">
                            <input className={`input ${emailError ? "is-danger" : ""}`} type="email" placeholder="Account Email" value={email} onChange={
                                (e) => {
                                    validateEmail(e.target.value)
                                }
                            } />
                        </div>
                        <p className="help is-danger">{emailError}</p>
                        </div>
                        <div className="field mb-3">
                            <div className="control">
                                <button className="button is-link is-fullwidth" onClick={forgot} disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</button>
                            </div>
                        </div>
                        <p className="has-text-left is-size-7 is-link mt-0"><a href="/login">← Back to Login</a></p>
                    </div>
                    <Footer />
                </div>
        </div>
    )
}
)
export default ForgotRequest
