import React, { useContext } from 'react'
import Colors from './Colors'
import { FormContext } from '../../FormContext'


export default function HeadSection(props: any) {
    const [state, setState] = useContext(FormContext)
    const [formError, setFormError] = props.formError
    document.title = `${state.title || "Untitled"} - DeForm`


    //State Handling Functions
    const handleTitleChange = (value: string) => {
        setState((current: any) => ({ ...current, title: value }))
    }

    const handleDescChange = (value: string) => {
        setState((current: any) => ({ ...current, description: value }))
    }

    const handleVisibleChange = (value: boolean) => {
        setState((current: any) => ({ ...current, isOpen: value }))
    }

    return (
        <div className="box mt-4">
            <strong className=" is-size-5 has-text-dark">Form Details</strong><br />
            <div className="field is-horizontal mt-5 ">
                <label className="label field-label">Form ID&nbsp;:&nbsp;</label>
                <div className="control field-body">
                    <p className="is-size-6 has-text-weight-light">{`${state.formid || "-"}`}</p>
                </div>
            </div>
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Title</label>
                <div className="control  field-body">
                    <input className={`input ${formError.title ? "is-danger" : ""}`} type="text" placeholder="Form Title" value={state.title} onChange={(e) => { handleTitleChange(e.target.value) }} />
                </div>

            </div>
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Description</label>
                <div className="control field-body">
                    <textarea className={`textarea ${formError.description ? "is-danger" : ""}`} placeholder="Form Description (You can use HTML as well)" value={state.description} onChange={(e) => { handleDescChange(e.target.value) }} />
                </div>
            </div>
            <div className="field is-horizontal mt-3">
                <label className="label field-label is-normal">Visibility</label>
                <div className="control field-body mt-2">
                    <label className="radio mr-3">
                        <input type="radio" name="visibility" checked={state.isOpen} value="open" onChange={(e) => { handleVisibleChange(e.target.checked) }}></input>
                        <span>Open</span>
                    </label>
                    <label className="radio ml-3">
                        <input type="radio" name="visibility" checked={!state.isOpen} value="closed" onChange={(e) => { handleVisibleChange(!e.target.checked) }} />
                        <span>Closed</span>
                    </label>
                </div>
            </div>
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Theme Color</label>
                <div className="control field-body mt-1">
                    <Colors />
                </div>
            </div>
            <div className="field is-horizontal mt-5 ">
                <label className="label field-label">Added&nbsp;:&nbsp;</label>
                <div className="control field-body">
                    <p className="is-size-6 has-text-weight-light">{state.updated}</p>
                </div>
            </div>
            <div className="field is-horizontal mt-5 ">
                <label className="label field-label">Updated&nbsp;:&nbsp;</label>
                <div className="control field-body">
                    <p className="is-size-6 has-text-weight-light">{state.updated}</p>
                </div>
            </div>
            <div className="field is-horizontal mt-5 ">
                <label className="label field-label">Views&nbsp;:&nbsp;</label>
                <div className="control field-body">
                    <p className="is-size-6 has-text-weight-light">{`${state.views} Views`}</p>
                </div>
            </div>
        </div>
    )
}
