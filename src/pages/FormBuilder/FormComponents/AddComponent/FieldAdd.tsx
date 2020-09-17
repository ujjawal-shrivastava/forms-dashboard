import React, { useContext, useState, createElement } from 'react'
import { FormContext } from '../../FormContext'
import { v4 } from 'uuid'
import TextField from '../Fields/TextField'
import LongField from '../Fields/LongField'
import EmailField from '../Fields/EmailField'
import NumberField from '../Fields/NumberField'
import CustomField from '../Fields/CustomField'
import Type from './Type'
import PhoneField from '../Fields/PhoneField'
import NameField from '../Fields/NameField'
import RadioField from '../Fields/RadioField'
import CheckboxField from '../Fields/CheckboxField'
import SelectField from '../Fields/SelectField'
import CompanyField from '../Fields/CompanyField'

export default function FieldAdd(props: any) {
    const [state, setState] = useContext(FormContext)
    const [error, setError] = useState({
        title: "",
    })
    //const [type, setType] = useState("text")
    const [isNext, setIsNext] = useState(false)
    const [item, setItem] = useState({
        id: v4(),
        title: "New Field",
        value: "new_field_" + v4().substring(1, 4),
        type: "text",
        isReq: false,
        props: {}
    })

    const [isActive, setIsActive] = props.isActive

    const checkProperties = (obj: any) => {
        for (var key in obj) {
            if (obj[key] !== null && obj[key] != "")
                return false;
        }
        return true;
    }

    const handleNext = () => {
        setIsNext(true)
    }

    const handleSave = () => {
        if (!checkProperties(error)) return
        var newState = { ...state }
        const pos = (props.section || props.section === 0) ? props.section : newState["sections"].length - 1
        newState["sections"][pos]["components"].push(item)
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
    const ComponentsMap: Map<string, any> = new Map();
    ComponentsMap.set("text", { field: TextField, desc: "A Basic Text Input Field" });
    ComponentsMap.set("long", { field: LongField, desc: "Text Input Field  for long" });
    ComponentsMap.set("number", { field: NumberField, desc: "Text Input that only validates numbers (0-9)" });
    ComponentsMap.set("name", { field: NameField, desc: "Text Field that validates names (alphabets and space)" });
    ComponentsMap.set("phone", { field: PhoneField, desc: "Number Input that only validates 10-digit numbers" });
    ComponentsMap.set("email", { field: EmailField, desc: "Email input that only validates correct email format" });
    ComponentsMap.set("company", { field: CompanyField, desc: "Email input that only validates given organizational email" });
    ComponentsMap.set("choice", { field: RadioField, desc: "Multiple choice where user can select only one option" });
    ComponentsMap.set("multiple", { field: CheckboxField, desc: "Multiple choice where user can select multiple options" });
    ComponentsMap.set("dropdown", { field: SelectField, desc: "Dropdown where user can select only one option" });
    ComponentsMap.set("custom", { field: CustomField, desc: "Text Field with Custom Validation and Error" });
    
    
    const showAdd = () => {
        if (ComponentsMap.has(item.type)) {
            return (
                createElement(ComponentsMap.get(item.type).field, {
                    item: [item, setItem],
                    error: [error, setError]
                }))
        }
        return (
            <h1>There is an Invalid Component!</h1>
        )
    }

    const showTypes = () => {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "space-between"}}>
                <div className="field " style={{alignSelf:"center"}}>
                    <div className="control">
                    <p className="buttons is-centered" >
                        {Array.from(ComponentsMap.keys()).map((value: string, index: number) => {
                            return (<Type type={value} key={index} item={[item, setItem]} />)
                        })}
                    </p>
                    </div>
                </div>
                <div className="mt-4 has-text-centered has-background-info-light " style={{alignSelf:"center", width:"fit-content",overflowWrap:"break-word", borderRadius:"10px",padding:"0.3rem", lineHeight:"0.8rem"}}>
                    <span className="is-size-7 has-text-info has-text-weight-semibold">{ComponentsMap.get(item.type).desc.toUpperCase()}</span>
                </div>
            </div>
        )
    }

    return (
        <div className={`modal ${isActive ? "is-active" : ""}`} onKeyPress={(event) => {
            var code = event.keyCode || event.which
            if (code === 13) handleSave()
        }}>
            <div className="modal-background"></div>
            <div className="modal-card" style={{ maxWidth: "90%", maxHeight: "60%" }}>
                <header className="modal-card-head">
                    <p className="modal-card-title is-size-5 has-text-weight-semibold">{isNext ? `Add ${item.type.toUpperCase()} Field` : "Select Field Type"}</p>
                    <button onClick={handleClose} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    {isNext ? showAdd() : showTypes()}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={isNext ? handleSave : handleNext}>{isNext ? "Add Field" : "Next"}</button>
                    <button className="button" onClick={handleClose}>Cancel</button>
                </footer>
            </div>
        </div>

    )
}
