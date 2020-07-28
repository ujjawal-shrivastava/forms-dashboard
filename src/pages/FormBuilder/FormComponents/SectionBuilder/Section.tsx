import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import BaseComponent from '../ComponentBuilder/BaseComponent'

export default function Section(props: any) {
    const state = props.state
    const setState = props.setState
    const handleDragEnd = ({ destination, source }: any) => {
        if (!destination) { return }
        if ((destination.index === source.index) && (destination.droppableId === source.droppableId)) { return }

        const itemCopy = { ...state["sections"][props.section]["components"][source.index] }
        setState((prev: any) => {
            prev = { ...prev }
            prev["sections"][props.section]["components"].splice(source.index, 1)
            prev["sections"][props.section]["components"].splice(destination.index, 0, itemCopy)
            return prev
        })
    }
    return (
        <div className="drop-section" >
            <div className="section-title has-text-white has-text-weight-bold">
                <p>{props.section.title}</p>
                <span className="icon">
                    <i className="fa fa-trash-o"></i>
                </span>
            </div>
        <Droppable droppableId={props.index.toString()}>
            {(provided) => {
                return (
                    <div className="section" ref={provided.innerRef}{...provided.droppableProps} style={{padding:"0.5rem 1.6rem"}}>
                        {props.section["components"].map((value: any, index: number) => {
                            return (
                                <Draggable draggableId={value.id} index={index} >
                                    {(provided: any) => {
                                        return (
                                            <div ref={provided.innerRef} {...provided.draggableProps}>
                                                <BaseComponent key={index} component={value} dragHandle={provided.dragHandleProps}/>
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
