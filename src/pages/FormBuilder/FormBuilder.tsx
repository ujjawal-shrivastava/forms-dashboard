import React, { useState } from 'react'
import FormSidebar from './FormComponents/SideBar/FormSidebar'
import FormView from './FormComponents/FormView'
import SidebarItem from './FormComponents/SideBar/SidebarItem'

export default function FormBuilder(props: any) {
    document.title = "Untitled* - DeForm";
    return (
        <section className="section pt-5">
            <p><strong className="has-text-weight-bold is-size-4 ml-5 ">Create New Form</strong></p>
            <div className="columns">
                <FormSidebar navHidden={props.navHidden}>
                    <SidebarItem icon="fa-plus" text="Field" />
                    <SidebarItem icon="fa-file-o" text="Section" />
                    <SidebarItem icon="fa-pencil" text="Edit" />
                    <SidebarItem icon="fa-floppy-o" text="Save" />
                    <SidebarItem icon="fa-eye" text="Preview" />
                    <SidebarItem icon="fa-globe" text="Publish" />
                </FormSidebar>
                <FormView />
            </div>
        </section>
    )
}
