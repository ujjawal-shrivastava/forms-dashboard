import React from 'react'

export default function Responses() {
    return (
        <div className="column is-two-thirds">
            <nav className="panel is-link" style={{ backgroundColor: '#ffffff', display: "flex", flexDirection: "column" }}>
                <p className="panel-heading">
                    Responses
                        </p>
                <div className="panel-block" style={{ height: "inherit" }}>

                </div>
                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth">
                        Show all responses
                            </button>
                </div>
            </nav>

        </div>
    )
}
