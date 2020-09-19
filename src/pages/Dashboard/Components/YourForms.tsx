import React from 'react'

export default function YourForms(props: any) {
    const data = props.data
    const emptyRows = []
    if(data.length<5){
        for(var _i = data.length; _i < 5; _i++){
            emptyRows.push("")
        }
    }
    return (
        <div className="column is-one-third">
            <nav className="panel is-success" style={{ backgroundColor: '#ffffff' }}>
                <p className="panel-heading">
                    Your Forms
                </p>
                {data.map((value: any, index: number) => {
                    return (
                        <a key={index} className="panel-block" onClick={()=>{window.location.pathname = `/edit/${value.formid}`}}>
                            <span className="panel-icon">
                                <i className="fa fa-book" aria-hidden="true"></i>
                            </span>
                    <small><strong>{value.formid}</strong>- {value.title.substring(0, 28)}</small>
                        </a>
                    )
                })}
                {emptyRows.map((value:string,index: number) => {
                    return (
                        <a key={index} className="panel-block">
                            <span className="panel-icon">
                            </span>
                            <span>

                            </span>
                        </a>
                    )
                })}
                <div className="panel-block">
                    <button className="button is-success is-fullwidth" onClick={() => { window.location.pathname = "/forms" }} >
                        Show All Forms
                    </button>
                </div>
            </nav>

        </div>
    )
}
