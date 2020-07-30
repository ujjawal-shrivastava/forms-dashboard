import React, { useContext } from 'react'
import FormSidebar from './FormComponents/SideBar/FormSidebar'
import FormView from './FormComponents/FormView'
import { FormProvider } from './FormContext'

export default function FormBuilder(props: any) {
    return (
        <FormProvider>
            <section className="section pt-5">
                <p><strong className="has-text-weight-bold is-size-4 ml-5 ">Create New Form</strong></p>
                <div className="columns">
                    <FormSidebar navHidden={props.navHidden} />
                    <FormView />
                </div>
            </section>
        </FormProvider>
    )
}
