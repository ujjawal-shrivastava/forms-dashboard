import React, { useEffect } from 'react'
import { v4 } from 'uuid'
import { toast as superToast } from 'bulma-toast'

export default function SelectField(props: any) {
    const [error, setError] = props.error
    const [item, setItem] = props.item

    useEffect(() => {
        if (!item.props.options) {
            setItem((old: any) => {
                old = { ...old }
                var opt = {
                    title: "New Option",
                    value: "new_option_" + v4().substring(1, 4),
                }
                old["props"]["options"] = [opt,]
                return old
            })
        }
    }, [])


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

    const handleOptionTitle = (value: string, index: number) => {
        setItem((old: any) => {
            old = { ...old }
            old.props.options[index].title = value
            return old
        })
    }

    const handleOptionValue = (value: string, index: number) => {
        setItem((old: any) => {
            old = { ...old }
            old.props.options[index].value = value
            return old
        })
    }

    const handleAddOption = (index: number) => {
        setItem((old: any) => {
            old = { ...old }
            var opt = {
                title: "New Option",
                value: "new_option_" + v4().substring(1, 4),
            }
            old.props.options.splice(index + 1, 0, opt)
            return old
        })
    }

    const handleDelOption = (index: number) => {
        if(item.props.options.length===1){
            superToast({
                message: `Choice Field should at least contain one option!`,
                type: "is-black",
                position: "top-center",
                duration: 2000,
                animate: { in: 'fadeIn', out: 'fadeOut' },
                dismissible: true,
                pauseOnHover: true
              });
              return
        }

        setItem((old: any) => {
            old = { ...old }
            old.props.options.splice(index, 1)
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
            <label className="label is-normal">Options</label>
            <div>
                {
                    item.props.options ? item.props.options.map((value: any, index: number) => {
                        return (
                            <div key={index} style={{ margin: "1rem", background: "#dcdde1", padding: "1rem", borderRadius: "10px 10px 10px 10px" }}>
                                <label className="label is-normal">{`Option #${index + 1}`}</label>
                                <div className="field">
                                    <label className="label is-normal">Title</label>
                                    <div className="control field-body">
                                        <input className={`input`} type="text" placeholder="Field Title" value={item.props.options[index].title} onChange={(e) => { handleOptionTitle(e.target.value, index) }} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label is-normal">Value</label>
                                    <div className="control field-body">
                                        <input className={`input`} type="text" placeholder="Field Title" value={item.props.options[index].value} onChange={(e) => { handleOptionValue(e.target.value, index) }} />
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button className="button is-link is-small" onClick={() => { handleAddOption(index) }}>
                                        Add New
                                        </button>
                                    {/*<button className={`button is-small ${item.props.defaultOption===index?"is-static":"is-dark"}`} onClick={() => { handleDefaultOption(index) }}>
                                    {item.props.defaultOption===index?"Default":"Make Default"}
                                        </button>*/
                                    }
                                    <button className="button is-danger is-small" onClick={() => { handleDelOption(index) }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    }) : ""
                }
            </div>
        </div>
    )
}
