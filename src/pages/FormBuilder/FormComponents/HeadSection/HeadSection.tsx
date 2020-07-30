import React, {useContext} from 'react'
import Colors from './Colors'
import { FormContext } from '../../FormContext'


export default function HeadSection() {
    const [state, setState] = useContext(FormContext)
    document.title=`${state.title || "Untitled"} - DeForm`

    
    //State Handling Functions
    const handleTitleChange = (value:string)=>{
        setState((current:any) => ({ ...current, title:value}))
    }

    const handleDescChange = (value:string)=>{
        setState((current:any) => ({ ...current, description:value}))
    }

    const handleVisibleChange = (value:boolean)=>{
        setState((current:any) => ({ ...current, isOpen:value}))
    }

    return (
        <div className="box mt-4">
            <strong className=" is-size-5 has-text-dark">Form Details</strong><br />
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Title</label>
                <div className="control field-body">
                    <input className="input" type="text" placeholder="Form Title" value={state.title} onChange={(e)=>{handleTitleChange(e.target.value)}}/>
                </div>
            </div>
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Description</label>
                <div className="control field-body">
                    <textarea className="textarea" placeholder="Form Description" value={state.description} onChange={(e)=>{handleDescChange(e.target.value)}} />
                </div>
            </div>
            <div className="field is-horizontal mt-3">
    <label className="label field-label is-normal">Visibility</label>
                <div className="control field-body mt-2">
                    <label className="radio mr-2">
                        <input type="radio" name="visibility" checked={state.isOpen} value="open" onChange={(e)=>{handleVisibleChange(e.target.checked)}}></input>
                                &nbsp;Open
                    </label>
                    <label className="radio ml-2">
                        <input type="radio" name="visibility" checked={!state.isOpen} value="closed" onChange={(e)=>{handleVisibleChange(!e.target.checked)}} />
                                &nbsp;Closed
                        </label>
                </div>
            </div>
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Theme Color</label>
                <div className="control field-body mt-1">
                    <Colors />
                </div>
            </div>
        </div>
    )
}
