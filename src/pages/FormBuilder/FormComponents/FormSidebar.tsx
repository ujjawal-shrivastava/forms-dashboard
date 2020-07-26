import React from 'react'

export default function FormSidebar(props:any) {
    return (
        <div className="column is-one-fifth toolbar">
            <div className="box  mt-4" style={{ padding:"0.5rem",backgroundColor: "#4d4d4d", maxHeight: "100%", overflowX: "hidden", display: "flex", justifyContent: "center" }}>
                <div className="toolbar-list">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
