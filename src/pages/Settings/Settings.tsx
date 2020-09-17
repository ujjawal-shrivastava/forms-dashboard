import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import './Settings.scss'
import ChangeName from './ChangeName';
import ChangePassword from './ChangePassword';

export default function Settings() {
    const [user, setUser] = useContext(UserContext)
    const [changeNameActive, setChangeNameActive] = useState(false)
    const [changePasswordActive, setChangePasswordActive] = useState(false)
    document.title = "Settings - DeForm";
    if (!user.auth) return (<Redirect to="/login" />)

    const changeName = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        setChangeNameActive(true)
    }

    const changePassword = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        setChangePasswordActive(true)
    }

    return (
        <div className="columns is-mobile is-centered mb-0">
            <div className="column is-full" style={{maxWidth:"768px"}}>
                {changeNameActive ? <ChangeName isActive={[changeNameActive, setChangeNameActive]} /> : <div></div>}
                {changePasswordActive ? <ChangePassword isActive={[changePasswordActive, setChangePasswordActive]} /> : <div></div>}
                <section className="section">
                    <p className="title is-size-4">
                        Account Settings
                        </p>
                    <div className="box my-5" style={{ padding: "0rem", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", overflow: "hidden", margin: "1rem 0rem" }}>
                        <div className="tile-index" title="Display Name">
                            <p id="formid" className="has-text-white has-text-weight-bold is-size-7">Name</p>
                        </div>
                        <div className="tile-data">
                            <p title="Your Display Name" className="px-4 py-4 has-text-dark has-text-weight-semibold" >{user.name || "No Display Name"}</p>
                        </div>
                        <button className="button is-dark is-small has-text-weight-bold my-1 mr-3" onClick={changeName} >Change</button>
                    </div>
                    <div className="box my-5" style={{ padding: "0rem", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", overflow: "hidden", margin: "1rem 0rem" }}>
                        <div className="tile-index" title="Your Email">
                            <p id="formid" className="has-text-white has-text-weight-bold is-size-7">Email</p>
                        </div>
                        <div className="tile-data">
                            <p title="Your Email" className="px-4 py-4 has-text-dark has-text-weight-semibold" style={{ wordBreak:"break-word" }} >{user.email}</p>
                        </div>
                        {user.verified?<button className="button is-dark is-small has-text-weight-bold my-1 mr-3 is-static">Verified</button>:
                        <button className="button is-info is-small has-text-weight-bold my-1 mr-3">Get Verified</button>}
                        
                    </div>
                    <div className="mt-3 mx-3">
                    <button className="button button-control is-dark is-normal has-text-weight-bold my-3 is-fullwidth" onClick={changePassword} ><span className="icon is-small"><i className="fa fa-key"></i></span><span>Change Password</span></button>
                    <button className="button is-danger is-normal has-text-weight-bold my-3 is-fullwidth"><span className="icon is-small"><i className="fa fa-trash-o"></i></span><span>Delete Account</span></button>
                    </div>
                </section>
            </div>
        </div>
    )
}
