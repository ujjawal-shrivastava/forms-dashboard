import React from 'react'

export default function ComponentControl(props:any) {
    return (
        <div>
            <span className="icon has-text-white" style={{ alignSelf: "center", backgroundColor:`${props.color}` }}>
                <i className={`fa ${props.icon}`}></i>
            </span>
        </div>
    )
}
