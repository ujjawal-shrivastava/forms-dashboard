import React from 'react'

export default function YourForms() {
    return (
        <div className="column is-one-third">
            <nav className="panel is-success" style={{ backgroundColor: '#ffffff' }}>
                <p className="panel-heading">
                    Your Forms
                </p>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fa fa-book" aria-hidden="true"></i>
                    </span>
                            Enactus Fest Registration Form
                        </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fa fa-book" aria-hidden="true"></i>
                    </span>
                            Enactus Interview Form
                        </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fa fa-book" aria-hidden="true"></i>
                    </span>
                            Hello Fraanz Form
                        </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fa fa-book" aria-hidden="true"></i>
                    </span>
                            No Form
                        </a>
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fa fa-code-branch" aria-hidden="true"></i>
                    </span>
                            daniellowtw/infboard
                        </a>
                <div className="panel-block">
                    <button className="button is-success is-fullwidth" onClick={()=>{window.location.pathname="/forms"}} >
                        Show All Forms
                    </button>
                </div>
            </nav>

        </div>
    )
}
