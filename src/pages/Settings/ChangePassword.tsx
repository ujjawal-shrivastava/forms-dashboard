import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost'
import { toast as superToast } from 'bulma-toast'

const CHANGE_PASSWORD = gql`
  mutation changePassword($old:String!, $new:String!) {
    changePassword(old:$old,new:$new) 
  }
`;

export default function ChangePassword(props: any) {
    const [user, setUser] = useContext(UserContext)
    const [changeData, setChangeData] = useState({old:"",new:"",new2:""})
    const [changeError, setChangeError] = useState({old:"",new:[],new2:""})
    const [isActive, setIsActive] = props.isActive

    const [changePassword, { error }] = useMutation(CHANGE_PASSWORD, { errorPolicy: 'all' });


    const validateOld = (value: string) => {
        setChangeData((current:any)=>({...current,old:value}))
        setChangeError((current:any) => {
            let newError = {...current}
            let regexp: RegExp = /^.{1,}$/
            newError.old = regexp.test(value) ? "" : "Current Password cannot be empty!"
            return newError
        })
    }
    const validateNew = (value: string) => {
        setChangeData((current:any)=>({...current,new:value}))
        setChangeError((current:any) => {
            let newError = {...current}
            let regexp: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            newError.new = regexp.test(value) ? [] : ["Contain a LOWERCASE letter","Contain an UPPERCASE letter","Contain a SPECIAL character", "Contain a NUMBER","Be at least 8 characters long"]
            return newError
        })
    }
    const validateNew2 = (value: string) => {
        setChangeData((current:any)=>({...current,new2:value}))
        setChangeError((current:any) => {
            let newError = {...current}
            let regexp: RegExp = /^.{1,}$/
            newError.new2 = regexp.test(value)?((value===changeData.new) ? "" : "New Passwords dont match!"):"Confirm Password cannot be empty!"
            return newError
        })
    }

    const handleChange = () => {
        validateOld(changeData.old)
        validateNew(changeData.new)
        validateNew2(changeData.new2)

        if (changeError.old || changeError.new.length || changeError.new2 || !changeData.old || !changeData.new || !changeData.new2) return

        changePassword({ variables: { old:changeData.old, new:changeData.new}}).then(({ data, errors }) => {
            if (!errors) {
                superToast({
                    message: `Successfully changed password for ${user.email}!`,
                    type: "is-black",
                    position: "top-center",
                    duration: 2000,
                    animate: { in: 'fadeIn', out: 'fadeOut' },
                    dismissible: true,
                    pauseOnHover: true
                  });
                handleClose()
        }
    }
        )}


    const handleClose = () => {
            setIsActive(false)
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        return (
            <div className={`modal ${isActive ? "is-active" : ""}`} onKeyPress={(event) => {
                var code = event.keyCode || event.which
                if (code === 13) handleChange()
            }}>
                <div className="modal-background"></div>
                <div className="modal-card" style={{ maxWidth: "90%" }}>
                    <header className="modal-card-head">
                        <p className="modal-card-title is-size-5 has-text-weight-semibold">Change Password</p>
                        <button onClick={handleClose} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                    <p className="has-text-danger has-text-centered has-text-weight-bold mb-4 is-size-7">{error?(error.graphQLErrors.length?error.graphQLErrors[0].message:""):""}</p>
                        <div className="field">
                            <label className="label is-normal">Current Password</label>
                            <div className="control field-body">
                                <input className={`input ${changeError.old ? "is-danger" : ""}`} type="password" placeholder="Current Password" value={changeData.old} onChange={(e) => { validateOld(e.target.value) }} />
                            </div>
                            <p className="help is-danger">{changeError.old}</p>
                        </div>
                        <div className="field">
                            <label className="label is-normal">New Password</label>
                            <div className="control field-body">
                                <input className={`input ${changeError.new.length ? "is-danger" : ""}`} type="password" placeholder="New Password" value={changeData.new} onChange={(e) => { validateNew(e.target.value) }} />
                            </div>
                            <p className="help is-danger">{changeError.new.length?"Password should:":""}</p>
                            <ol className="help is-danger ml-5">
                             {changeError.new.map((value:string, index:number)=>{
                                 return(<li key={index}>{value}</li>)
                             })}
                            </ol>
                        </div>
                        <div className="field">
                            <label className="label is-normal">Confirm New Password</label>
                            <div className="control field-body">
                                <input className={`input ${changeError.new2 ? "is-danger" : ""}`} type="password" placeholder="Confirm New Password" value={changeData.new2} onChange={(e) => { validateNew2(e.target.value) }} />
                            </div>
                            <p className="help is-danger">{changeError.new2}</p>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={handleChange}>Change Password</button>
                        <button className="button" onClick={handleClose}>Cancel</button>
                    </footer>
                </div>
            </div>

        )
    }
