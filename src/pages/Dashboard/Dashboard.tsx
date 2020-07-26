import React from 'react'
import art from '../../assets/art.svg';

export default function Dashboard() {
    document.title = "Dashboard - DeForm™";
    return (
        <section className="section">
            
            <div className="columns mb-5">
                <div className="column">
                    <div className="box" style={{ backgroundColor: "#eb3b5a", display: "flex", flexDirection: "column" }}>
                        <p className="is-size-1 has-text-white has-text-weight-bold has-text-right">
                            10
                        </p>
                        <p className="is-size-5 has-text-white has-text-right">
                            Forms
                        </p>
                    </div>
                </div>
                <div className="column">
                    <div className="box" style={{ backgroundColor: "#ff9f43" }}>
                        <p className="is-size-1 has-text-white has-text-weight-bold has-text-right">
                            101
                    </p>
                        <p className="is-size-5 has-text-white has-text-right">
                            Responses
                    </p>
                    </div>
                </div>
                <div className="column">
                    <div className="box" style={{ backgroundColor: "#34495e" }}>
                        <p className="is-size-1 has-text-white has-text-weight-bold has-text-right">
                            180
                        </p>
                        <p className="is-size-5 has-text-white has-text-right">
                            Visits
                        </p>
                    </div>
                </div>
            </div>
            <p className="is-size-4 has-text-weight-bold mb-3 ml-3" style={{ color: '#5b5b5b' }}>Recent</p>
            <div className="columns">
                <div className="column is-one-third">
                    <nav className="panel is-success" style={{backgroundColor:'#ffffff'}}>
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
                <div className="column is-two-thirds">
                <nav className="panel is-link" style={{backgroundColor:'#ffffff', display:"flex", flexDirection:"column"}}>
                        <p className="panel-heading">
                            Responses
                        </p>
                        <div className="panel-block" style={{height:"inherit"}}>
                            
                        </div>
                        <div className="panel-block">
                            <button className="button is-link is-outlined is-fullwidth">
                                Show all responses
                            </button>
                        </div>
                    </nav>
                
                </div>
            </div>
            <div className="box">
            <p className="is-size-4 has-text-weight-bold mb-3 ml-3" style={{ color: '#5b5b5b' }}>Actions</p>
            <div className="columns">
                <div className="column">

                </div>
                <div className="column" style={{display:"flex",justifyContent:"center"}}>
                <img src={art} style={{minWidth:"200px"}}/>
                </div>
            </div>
            </div>
        </section>
    )
}
