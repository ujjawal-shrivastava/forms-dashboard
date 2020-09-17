import React, {useContext} from 'react'
import './Dashboard.scss'
import forms from '../../assets/forms.svg';
import Card from './Components/Card';
import Actions from './Components/Actions';
import YourForms from './Components/YourForms';
import Responses from './Components/Responses';
import { Redirect } from 'react-router-dom';
import {UserContext} from '../../UserContext'

export default function Dashboard() {
    const [user, setUser] = useContext(UserContext)
    document.title = "Dashboard - DeForm";
    if(!user.auth) return(<Redirect to="/login" />)
    return (
        <section className="section">
            <div className="columns mb-5">
                {console.log(document.cookie)}
                <Card title="Forms" value="10" color="#eb3b5a" img={forms}/>
                <Card title="Responses" value="101" color="#ff9f43" img={forms}/>
                <Card title="Visits" value="180" color="#34495e" img={forms}/>
            </div>
            <p className="is-size-4 has-text-weight-bold mb-3 ml-3" style={{ color: '#3d3d3d' }}>Recent</p>
            <div className="columns">
                <YourForms />
                <Responses />
            </div>
            <Actions />
        </section>
    )
}
