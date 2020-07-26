import React, { useState } from 'react'

export default function FormSidebar(props: any) {
    return (
        <div className="column is-one-fifth toolbar" style={{top:`${(props.navHidden &&(window.innerWidth < 1200))?"-200px":"2rem"}`}}>
            <div className="box  mt-4" style={{ 
                padding: "0.5rem", 
                backgroundColor: "#4d4d4d", 
                maxHeight: "100%", 
                overflowX: "hidden", 
                display: "flex", 
                justifyContent: "center",
                }}>
                <div className="toolbar-list">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
