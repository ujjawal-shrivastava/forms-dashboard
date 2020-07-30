import React, {useContext} from 'react'
import { FormContext } from '../../FormContext'

export default function Color(props:{code:string, text:string}) {
    const [state, setState] = useContext(FormContext)
    return (
        <button className={`button mx-2 is-small ${(props.code===state.bgtheme)?"is-dark":"is-light"} `} style={{ borderRadius: "30px", transition:"ease 0.3s" }} onClick={()=>{setState((current:any)=>({...current, bgtheme:props.code }))}}>
            <span className="icon mr-1">
                <i className="fa fa-circle " style={{color:`${props.code}`}}></i>
            </span>
            <span>
                {props.text}
            </span>
        </button>
    )
}
