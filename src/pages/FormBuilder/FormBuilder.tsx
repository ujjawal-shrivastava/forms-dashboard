import React, {useContext, useEffect, useState} from 'react'
import FormSidebar from './FormComponents/SideBar/FormSidebar'
import FormView from './FormComponents/FormView'
import { FormProvider } from './FormContext'
import { Prompt } from 'react-router'
import {UserContext} from '../../UserContext'
import { Redirect } from 'react-router-dom';
import NotFound from '../NotFound/NotFound'

export default function FormBuilder(props: any) {
    const [user, setUser] = useContext(UserContext)
    const [formid, setFormid] = useState("")
    const [error, setError] = useState({title:"",description:""})
    const [notFound, setNotFound] = useState(false)
    const shouldBlockNavigation = false
    if(!user.auth) return(<Redirect to="/login" />)
    if (notFound) {
        return(<NotFound />)
    }
    return (
        <React.Fragment>
            <Prompt
                when={shouldBlockNavigation}
                message='You have unsaved changes, are you sure you want to leave?'
            />
            <FormProvider>
                <section className="section pt-5">
    <p><strong className="has-text-weight-bold is-size-4 ml-5 ">{formid?`Edit Form ( ${formid} )`:"Create New Form"}</strong></p>
                    <div className="columns">
                        <FormSidebar navHidden={props.navHidden} formData={props.formData} formError={[error, setError]} formid={[formid, setFormid]} notFound={[notFound, setNotFound]}/>
                        <FormView formError={[error, setError]}/>
                    </div>
                </section>
            </FormProvider>
        </React.Fragment>
    )
}
