import React, { useEffect } from 'react'

export default function CustomField(props: any) {
    const [error, setError] = props.error
    const [item, setItem] = props.item

    useEffect(()=>{
        setItem((old: any) => {
            old = { ...old }
            if(!old.props.error) old.props.error = "Please enter a valid value!"
            if(!old.props.validation) old["props"]["validation"] = "^.{1,}$"
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

    const handleValidation = (value: string) => {
        let regexp: RegExp = /^.{1,}$/
        setError((old: any) => {
            old = { ...old }
            old.validation = regexp.test(value) ? "" : "Validation Regex cannot be empty."
            return old
        })
        setItem((old: any) => {
            old = { ...old }
            old["props"]["validation"] = value
            return old
        })
    }

    const handleCustomError = (value: string) => {
        let regexp: RegExp = /^.{1,}$/
        setError((old: any) => {
            old = { ...old }
            old.customError = regexp.test(value) ? "" : "Custom error cannot be empty."
            return old
        })
        setItem((old: any) => {
            old = { ...old }
            old.props.error = value
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
            <label className="label is-normal">Validation</label>
            <div className="field has-addons">
                <p className="control">
                    <a className="button is-static">
                        /
                    </a>
                </p>
                <p className="control">
                    <input className="input" type="text" placeholder="Validation Regex" value={item.props.validation || ""} onChange={(e) => { handleValidation(e.target.value) }} />
                </p>
                <p className="control">
                    <a className="button is-static">
                        /
                    </a>
                </p>
            </div>
            <div className="field">
                <label className="label is-normal">Custom Error</label>
                <div className="control field-body">
                    <input className={`input ${error.customError ? "is-danger" : ""}`} type="text" placeholder="Custom Error" value={item.props.error || ""} onChange={(e) => { handleCustomError(e.target.value) }} />
                </div>
                <p className="help is-danger">{error.customError}</p>
            </div>
            <div className="field">
                <label className="label is-normal">Default Value</label>
                <div className="control field-body">
                    <input className="input" type="text" placeholder="Default Value" onChange={(e) => { handleDefaultValue(e.target.value) }} />
                </div>
            </div>
        </div>
    )
}
