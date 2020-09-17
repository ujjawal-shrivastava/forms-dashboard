import React, { useEffect } from 'react'

export default function NumberField(props: any) {
    const [error, setError] = props.error
    const [item, setItem] = props.item

    useEffect(()=>{
        setItem((old: any) => {
            old = { ...old }
            old.props.error = "Please enter a valid numerical value!"
            old["props"]["validation"] = "^[0-9]{0,}$"
            return old
        })
    },[])

    const handleTitle = (value: string) => {
        let regexp: RegExp = /^.{1,}$/
        setError((old: any) => {
            old = { ...old }
            old.title = regexp.test(value) ? "" : "Title cannot be empty."
            return old
        })
        setItem((old: any) => {
            old = { ...old }
            old.title = value
            return old
        })
    }

    const handlePlaceholder = (value: string) => {
        let regexp: RegExp = /^.{1,}$/
        setError((old: any) => {
            old = { ...old }
            old.placeholder = regexp.test(value) ? "" : "Placeholder cannot be empty."
            return old
        })
        setItem((old: any) => {
            old = { ...old }
            old.props["placeholder"] = value
            return old
        })
    }

    const handleValue = (value: string) => {
        let regexp: RegExp = /^[a-z_0-9]{3,}$/
        setError((old: any) => {
            old = { ...old }
            old.value = regexp.test(value) ? "" : "Unique Value must be at least 3 character long and can only contain 'a-z 0-9 _' ."
            return old
        })
        setItem((old: any) => {
            old = { ...old }
            old["value"] = value
            return old
        })
    }

    const handleRequired = (value: boolean) => {
        setItem((old: any) => {
            old = { ...old }
            old["isReq"] = value
            return old
        })
    }


    const handleDefaultValue = (value: string) => {
        setItem((old: any) => {
            old = { ...old }
            old["props"]["defaultValue"] = value
            return old
        })
    }

    const handleMin = (value: number) => {
        setItem((old: any) => {
            old = { ...old }
            old.props.min = value
            return old
        })
    }

    const handleMax = (value: number) => {
        setItem((old: any) => {
            old = { ...old }
            old.props.max = value
            return old
        })
    }
    
    

    return (
        <div>
            <div className="field">
                <label className="label is-normal">Title</label>
                <div className="control field-body">
                    <input className={`input ${error.title ? "is-danger" : ""}`} type="text" placeholder="Field Title" value={item.title} onChange={(e) => { handleTitle(e.target.value) }} />
                </div>
                <p className="help is-danger">{error.title}</p>
            </div>
            <div className="field">
                <label className="label is-normal">Placeholder</label>
                <div className="control field-body">
                    <input className={`input ${error.placeholder ? "is-danger" : ""}`} type="text" placeholder="Field Placeholder" defaultValue={item.title} onChange={(e) => { handlePlaceholder(e.target.value) }} />
                </div>
                <p className="help is-danger">{error.placeholder}</p>
            </div>
            <div className="field">
                <label className="label is-normal">Unique Value</label>
                <div className="control field-body">
                    <input className={`input ${error.value ? "is-danger" : ""}`} type="text" placeholder="Value for Response Header" value={item.value || ""} onChange={(e) => { handleValue(e.target.value) }} />
                </div>
                <p className="help is-danger">{error.value}</p>
            </div>
            <div className="field">
                <label className="label is-normal">Required</label>
                <div className="control field-body">
                    <label className="checkbox">
                        <input type="checkbox" checked={item.isReq} onChange={(e) => { handleRequired(e.target.checked) }} />
                        &nbsp;Required Field
                    </label>
                </div>
            </div>
            <div className="field">
                <label className="label is-normal">Default Value</label>
                <div className="control field-body">
                    <input className="input" type="text" placeholder="Default Value" onChange={(e) => { handleDefaultValue(e.target.value) }} />
                </div>
            </div>
            <div className="field">
                <label className="label is-normal">Min Value</label>
                <div className="control field-body">
                    <input className="input" type="number" placeholder="Min Value" value={item.props.min || ""} onChange={(e) => { handleMin(parseInt(e.target.value)) }} />
                </div>
            </div>
            <div className="field">
                <label className="label is-normal">Max Value</label>
                <div className="control field-body">
                    <input className="input" type="number" placeholder="Max Value" value={item.props.max || ""} onChange={(e) => { handleMax(parseInt(e.target.value)) }} />
                </div>
            </div>
        </div>
    )
}
