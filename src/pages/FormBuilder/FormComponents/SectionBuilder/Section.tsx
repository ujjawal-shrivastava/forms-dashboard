import React, { useContext, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import BaseComponent from '../ComponentBuilder/BaseComponent'
import { FormContext } from '../../FormContext'
import { v4 } from 'uuid'
import BaseEditComponent from '../EditComponents/BaseEditComponent'

export default function Section(props: any) {
    const [state, setState] = useContext(FormContext)
    const [modalActive, setModalActive] = useState(false)

    const addItem = () => {
        const item = {
            id: v4(),
            type: "text",
            title: "New Field",
            props: {}
        }

        var newState = { ...state }

        newState["sections"][props.index]["components"].push(item)
        setState(newState)
    }

    const delSection = () => {
        if (props.index < 1) return
        setState((old: any) => {
            old = { ...old }
            old["sections"].splice(props.index, 1)
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
        <div className="drop-section" >
            {modalActive ? <BaseEditComponent isActive={[modalActive, setModalActive]} section={props.index}/> : <div></div>}
            <div className="section-title has-text-white has-text-weight-bold">
                <span className="tag is-light">{`#${props.index + 1}`}</span>
                <p className="mx-3" style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{props.section.title}</p>
                <div className="section-control-box">
                    <span className="icon mx-2" style={{ cursor: "pointer" }} onClick={addItem}>
                        <i className="fa fa-plus"></i>
                    </span>
                    <span className="icon mx-2" style={{ cursor: "pointer" }} onClick={handleEdit}>
                        <i className="fa fa-pencil"></i>
                    </span>
                    <span className="icon mx-2" style={{ cursor: "pointer" }} onClick={delSection}>
                        <i className="fa fa-trash-o"></i>
                    </span>
                </div>

            </div>

            
            <Droppable droppableId={props.index.toString()}>
                {(provided) => {
                    return (
                        <div className="section" ref={provided.innerRef}{...provided.droppableProps} style={{ padding: "0.5rem 1.6rem" }}>
                            {(props.section["components"].length === 0) ? <div onClick={addItem} className="field-placeholder">CLICK TO ADD NEW FIELD</div> : <div></div>}
                            {
                                props.section["components"].map((value: any, index: number) => {
                                    return (
                                        <Draggable draggableId={value.id} index={index} key={value.id}>
                                            {(provided: any) => {
                                                return (
                                                    <div ref={provided.innerRef} {...provided.draggableProps}>
                                                        <BaseComponent sectionIndex={props.index} fieldIndex={index} component={value} dragHandle={provided.dragHandleProps} />
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>


        /*<div className="drop-section" >
            <div className="section-title has-text-white has-text-weight-bold">
                <p>{props.section.title}</p>
                <span className="icon">
                    <i className="fa fa-arrows"></i>
                </span>
            </div>
            <div className="section">
                <Droppable droppableId={state["sections"][props.section].id}>
                    {(provided) => {
                        return (
                            <div ref={provided.innerRef}{...provided.droppableProps}>
                                {state["sections"][props.section]["components"].map((value: any, index: number) => {
                                    return (
                                        <Draggable draggableId={value.id} index={index}>
                                            {(provided: any) => {
                                                return (
                                                    <BaseComponent component={value} ref={provided.innerRef} {...provided.draggableProps} dragHandle={{ ...provided.dragHandleProps }} />
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </div>
        </div>*/
    )
}
