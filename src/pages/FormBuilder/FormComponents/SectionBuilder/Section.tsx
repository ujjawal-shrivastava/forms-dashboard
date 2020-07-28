import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import BaseComponent from '../ComponentBuilder/BaseComponent'

export default function Section(props: any) {
    return (
        <div className="drop-section" >
            <div className="section-title has-text-white has-text-weight-bold">
                <p>{props.section.title}</p>
                <div className="section-control-box">
                    <span className="icon mx-2" style={{cursor:"pointer"}}>
                        <i className="fa fa-pencil"></i>
                    </span>
                    <span className="icon mx-2" style={{cursor:"pointer"}} onClick={()=>{props.delSection(props.index)}}>
                        <i className="fa fa-trash-o"></i>
                    </span>
                </div>
            </div>
        <Droppable droppableId={props.index.toString()}>
            {(provided) => {
                return (
                    <div className="section" ref={provided.innerRef}{...provided.droppableProps} style={{padding:"0.5rem 1.6rem"}}>
                        {props.section["components"].map((value: any, index: number) => {
                            return (
                                <Draggable draggableId={value.id} index={index} key={value.id}>
                                    {(provided: any) => {
                                        return (
                                            <div ref={provided.innerRef} {...provided.draggableProps}>
                                                <BaseComponent sectionIndex={props.index} fieldIndex={index} component={value} dragHandle={provided.dragHandleProps} {...props}/>
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
