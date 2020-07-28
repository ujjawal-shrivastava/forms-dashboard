import React, { useState } from 'react'
import FormSidebar from './FormComponents/SideBar/FormSidebar'
import FormView from './FormComponents/FormView'
import SidebarItem from './FormComponents/SideBar/SidebarItem'
import {v4} from 'uuid'

export default function FormBuilder(props: any) {
    document.title = "Untitled* - DeForm";
    const item1 = {
        id: v4(),
        type: "text",
        title: "Name",
        props: {}
    }

    const item2 = {
        id: v4(),
        type: "email",
        title: "Email",
        props: {}
    }

    const item3 = {
        id: v4(),
        type: "number",
        title: "Roll. No.",
        props: {}
    }

    const item4 = {
        id: v4(),
        type: "choice",
        title: "Gender dhhfhdfd dfjhdfjd bdufhudf uhdfiosfs ijsdfodf jshdfuishdf hhdsfiuisdf hisdfiusdf buisdfuisdf ugsdfgsdf buisdfduisdf isdfguisdgf biusdgfiugsdf bisdfigusdf",
        props: {}
    }

    const item5 = {
        id: v4(),
        type: "multiple",
        title: "Hobbies",
        props: {}
    }


    const [state, setState] = useState(
        {
            "sections": [
                {
                    id: v4(),
                    title: "Personal Details",
                    components: [item1, item2, item5]
                },
                {
                    id: v4(),
                    title: "College Details",
                    components: [item3, item4]
                }
            ]
        }
    )

    const addItem = ()=>{
        const item = {
            id: v4(),
            type: "text",
            title: "New Field",
            props: {}
        }

        setState((old:any)=>{
            old={...old}
            var last = 0
            console.log("Adding Item at ", last)
            old["sections"][last]["components"].push(item)
            return old
        })
    }

    const addSection = ()=>{
        const section = {
            id: v4(),
            title: "New Section",
            components: []
        }
        setState((old:any)=>{
            old={...old}
            old["sections"].push(section)
            return old
        })
        return
    }

    const delItem =(sectionIndex:number, fieldIndex:number)=>{
        console.log("Deleted Item at ",sectionIndex, fieldIndex)
        setState((old:any)=>{
            old={...old}
            old["sections"][sectionIndex]["components"].splice(fieldIndex,1)
            return old
        })
        return
    }

    const delSection =(sectionIndex:number)=>{
        console.log("Deleted Section at ",sectionIndex)
        setState((old:any)=>{
            old={...old}
            old["sections"].splice(sectionIndex,1)
            return old
        })
        return
    }


    return (
        <section className="section pt-5">
            <p><strong className="has-text-weight-bold is-size-4 ml-5 ">Create New Form</strong></p>
            <div className="columns">
                <FormSidebar navHidden={props.navHidden}>
                    <SidebarItem icon="fa-plus" text="Field" clickHandler={addItem} />
                    <SidebarItem icon="fa-file-o" text="Section" clickHandler={addSection} />
                    <SidebarItem icon="fa-floppy-o" text="Save" />
                    <SidebarItem icon="fa-share" text="Export" />
                    <SidebarItem icon="fa-eye" text="Preview" />
                    <SidebarItem icon="fa-globe" text="Publish" />
                </FormSidebar>
                <FormView state={state} setState={setState} delSection={delSection} delItem={delItem}/>
            </div>
        </section>
    )
}
