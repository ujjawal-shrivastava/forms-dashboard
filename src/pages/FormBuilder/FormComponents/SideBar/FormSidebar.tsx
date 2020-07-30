import React, { useState, useContext } from 'react'
import SidebarItem from './SidebarItem'
import { FormContext } from '../../FormContext'
import { v4 } from 'uuid'
import SectionAdd from '../AddComponent/SectionAdd'


export default function FormSidebar(props: any) {
    const [state,setState] = useContext(FormContext)
    const [sectionActive, setSectionActive] = useState(false)

    const addItem = ()=>{
        const item = {
            id: v4(),
            type: "text",
            title: "New Field",
            props: {}
        }
        var newState = {...state}
        newState["sections"][newState["sections"].length-1]["components"].push(item)
        setState(newState)
    }

    const addSection = ()=>{
        /*const section = {
            id: v4(), 
            title: "Untitled Section*",
            components:[]
        }
        var newState = {...state}
        newState["sections"].push(section)
        setState(newState)*/

        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        setSectionActive(true)
    }

    return (
        <div className="column is-one-fifth toolbar" style={{ top: `${props.navHidden ? ((window.innerWidth < 800) ? "-180px" : "-1rem") : "3rem"}` }}>
            <div className="box  mt-4" style={{
                padding: "0.5rem",
                backgroundColor: "#4d4d4d",
                maxHeight: "100%",
                overflowX: "hidden",
                display: "flex",
                justifyContent: "center",
            }}>
                
                {sectionActive ? <SectionAdd isActive={[sectionActive, setSectionActive]} /> : <div></div>}
                <div className="toolbar-list">
                    <SidebarItem icon="fa-plus" text="Field" clickHandler={addItem} />
                    <SidebarItem icon="fa-file-o" text="Section" clickHandler={addSection} />
                    <SidebarItem icon="fa-floppy-o" text="Save" />
                    <SidebarItem icon="fa-share" text="Export" />
                    <SidebarItem icon="fa-eye" text="Preview" />
                    <SidebarItem icon="fa-globe" text="Publish" />
                </div>
            </div>
        </div>
    )
}
