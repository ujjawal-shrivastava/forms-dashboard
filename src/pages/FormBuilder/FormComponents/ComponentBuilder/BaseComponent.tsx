import React, {useContext, useState} from 'react'
import { FormContext } from '../../FormContext'
import FieldEdit from '../EditComponents/FieldEdit'


export default function BaseComponent(props: any) {
    const [state, setState] = useContext(FormContext)
    const [modalActive, setModalActive] = useState(false)

    const delItem =()=>{
        setState((old:any)=>{
            old={...old}
            old["sections"][props.sectionIndex]["components"].splice(props.fieldIndex,1)
            return old
        })
        return
    }

    const handleEdit = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        setModalActive(true)
    }

    return (
        <div className="box" style={{ padding: "0rem", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", overflow: "hidden", margin: "1rem 0rem" }} >
            {modalActive ? <FieldEdit isActive={[modalActive, setModalActive]} section={props.sectionIndex} fieldIndex={props.fieldIndex} /> : <div></div>}
            <div className="component-data">
                <p className="px-4 py-4 has-text-dark has-text-weight-semibold" style={{wordBreak:"normal"}}>{props.component.title.toUpperCase()}</p>
                <div style={{ padding: "0.8rem" }}>
                    <span className="tag is-link has-text-weight-bold is-success is-light is-rounded">{props.component.type.toUpperCase()}</span>
                </div>
            </div>
            <div className="component-control">
                <div className="edit-control" onClick={handleEdit}>
                    <span className="icon has-text-white" style={{ alignSelf: "center"}}>
                        <i className="fa fa-pencil"></i>
                    </span>
                </div>
                <div className="delete-control" onClick={delItem}>
                    <span className="icon has-text-white" style={{ alignSelf: "center" }} >
                        <i className="fa fa-trash-o"></i>
                    </span>
                </div>
                <div {...props.dragHandle} className="move-control">
                    <span className="icon has-text-white" style={{ alignSelf: "center"}}>
                        <i className="fa fa-arrows"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}
