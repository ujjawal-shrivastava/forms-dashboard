import React from 'react'


interface SidebarItemsProps {
    icon:string,
    text:string,
    clickHandler?:any
}


export default function SidebarItem(props:SidebarItemsProps) {
    return (
        <div className="my-button" onClick={props.clickHandler}>
            <button className="button mx-2 is-small is-dark" style={{ borderRadius: "50%" }}>
                <span className="icon is-small">
                    <i className={`fa ${props.icon} fa-lg`}></i>
                </span>
            </button>
            <p className="button-text is-size-7">
                {props.text}
            </p>
        </div>
    )
}
