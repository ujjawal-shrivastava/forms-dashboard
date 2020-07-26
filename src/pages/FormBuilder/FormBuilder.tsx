import React, { useState } from 'react'
import FormSidebar from './FormComponents/FormSidebar'
import FormView from './FormComponents/FormView'
import SidebarItem from './FormComponents/SidebarItem'
import HeadSection from './FormComponents/HeadSection'

export default function FormBuilder() {
    return (
        <section className="section pt-5">
            <p><strong className="has-text-weight-bold is-size-4 ml-5 ">Create New Form</strong></p>
            <div className="columns">
                <FormSidebar>
                    <SidebarItem />
                    <SidebarItem />
                    <SidebarItem />
                    <SidebarItem />
                </FormSidebar>
                <FormView />
            </div>
        </section>
    )
}
