import React from 'react'

export default function BaseComponent(props: any) {
    return (
        <div className="box" style={{ padding: "0rem", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", overflow: "hidden", margin: "1rem 0rem" }} >
            <div style={{display:"flex", flexDirection:"row", alignItems:'center',justifyContent:"space-between", width:"100%"}}>
                <p className="px-4 py-4" style={{wordBreak:"break-word"}}>{props.component.title.toUpperCase()}</p>
                <div style={{ padding: "0.8rem" }}>
                    <span className="tag is-link has-text-weight-bold is-success is-light is-rounded">{props.component.type.toUpperCase()}</span>
                </div>
            </div>
            <div className="component-control">
                <div className="delete-control">
                    <span className="icon has-text-white" style={{ alignSelf: "center" }}>
                        <i className="fa fa-trash-o"></i>
                    </span>
                </div>
                <div {...props.dragHandle} className="move-control">
                    <span className="icon has-text-white" style={{ alignSelf: "center" }}>
                        <i className="fa fa-arrows"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}