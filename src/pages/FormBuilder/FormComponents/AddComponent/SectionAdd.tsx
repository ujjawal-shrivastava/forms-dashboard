import React, { useContext, useState } from 'react'
import { FormContext } from '../../FormContext'
import { v4 } from 'uuid'

export default function SectionAdd(props: any) {
    const [state, setState] = useContext(FormContext)
    const [title, setTitle] = useState("")
    const [position, setPosition]= useState("-1")
    const [isActive, setIsActive] = props.isActive

    const handleSave = () => {
        const item = {
            id: v4(),
            title: title,
            components:[]
        }
        var newState = { ...state }

        if(+position<0) newState["sections"].push(item) 
        else  newState["sections"].splice(position,0,item)
        setState(newState)
        handleClose()
    }


    const handleClose = () => {
        setIsActive(false)
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    return (
        <div className={`modal ${isActive ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card" style={{ maxWidth: "90%" }}>
                <header className="modal-card-head">
                    <p className="modal-card-title is-size-5 has-text-weight-semibold">{`Add Section`}</p>
                    <button onClick={handleClose} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label is-normal">Title</label>
                        <div className="control field-body">
                            <input className="input" type="text" placeholder="Section Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                    </div>
                    <div className="field">
                    <label className="label is-normal">Position</label>
                        <div className="control">
                            <div className="select">
                                <select defaultValue={"-1"} onChange={(e)=>{setPosition(e.target.value)}}>
                                <option value={"-1"} key={-1}>End</option>
                                    {state["sections"].map((_:any,index:number)=>{
                                        return(<option value={index.toString()} key={index}>Position {`${index+1}`}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={handleSave}>Add Section</button>
                    <button className="button" onClick={handleClose}>Cancel</button>
                </footer>
            </div>
        </div>

    )
}
