import React from 'react'

export default function Color(props:{code:string, text:string, selected:string,change:CallableFunction}) {
    return (
        <button className={`button mx-2 is-small ${(props.code===props.selected)?"is-dark":"is-light"} `} style={{ borderRadius: "30px", transition:"ease 0.3s" }} onClick={()=>{props.change(props.code)}}>
            <span className="icon mr-1">
                <i className="fa fa-circle " style={{color:`${props.code}`}}></i>
            </span>
            <span>
                {props.text}
            </span>
        </button>
    )
}
