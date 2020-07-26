import React from 'react'

export default function YourForms() {
    return (
        <div className="column is-one-third">
            <nav className="panel is-success" style={{ backgroundColor: '#ffffff' }}>
                <p className="panel-heading">
                    Your Forms
                        </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Search" />
                        <span className="icon is-left">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                    </p>
                </div>
                <p className="panel-tabs is-success">
                    <a className="is-active">All</a>
                    <a>Open</a>
                    <a>Closed</a>
                    <a>Draft</a>
                </p>
                <a className="panel-block is-active">
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
                <a className="panel-block">
                    <span className="panel-icon">
                        <i className="fa fa-code-branch" aria-hidden="true"></i>
                    </span>
                                mojs
                        </a>
                <div className="panel-block">
                    <button className="button is-success is-fullwidth">
                        Show All Forms
                            </button>
                </div>
            </nav>

        </div>
    )
}
