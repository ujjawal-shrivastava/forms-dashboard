import React from 'react'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="columns is-gapless">
                <div className="column is-full">
                    <div style={{display:"grid",gridTemplateRows:"auto 1fr auto"}}>
                        <div className="sidebar-top">
                            <p className="has-text-white has-text-centered is-size-4 footer-logo">
                                POCKETLIB<span className="is-size-6" style={{ verticalAlign: "top" }}><sup>™</sup></span>
                            </p>
                        </div>
                        <div style={{
                            backgroundColor:"#ffffff",
                        }}>
                            hello
                        </div>
                        <div className="sidebar-top">
                            <p className="has-text-white has-text-centered is-size-4 footer-logo">
                                POCKETLIB<span className="is-size-6" style={{ verticalAlign: "top" }}><sup>™</sup></span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
