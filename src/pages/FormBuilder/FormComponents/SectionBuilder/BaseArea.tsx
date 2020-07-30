import React, { useContext } from 'react'
import Section from './Section'
import { DragDropContext} from 'react-beautiful-dnd'
import { FormContext } from '../../FormContext'

export default function BaseArea(props: any) {
    const [state, setState] =useContext(FormContext)
    const handleDrag= (result:any)=>{
        const destination = result.destination
        const source = result.source
        if(!destination) {return}
        if((destination.droppableId === source.droppableId)&& (destination.index === source.index)) {return}

        const item = {...state["sections"][source.droppableId]["components"][source.index]}

        setState((old:any)=>{
            old ={...old}
            old["sections"][source.droppableId]["components"].splice(source.index, 1)
            old["sections"][destination.droppableId]["components"].splice(destination.index,0,item)
            return old
        })
    }
    return (
        <DragDropContext onDragEnd={handleDrag}>
            {state["sections"].map((value: any, index: number) => {
                return (
                    <Section index={index} section={value} key={index} />
                )
            })}
        </DragDropContext>
    )
}
