import React, { useState } from 'react'
import Color from './Color'

export default function Colors() {
    const [currentColor, setCurrentColor] =useState("#2ecc71")
    const colors =[
        {
            text:"red",
            code:"#ff3f34"
        },
        {
            text:"green",
            code:"#2ecc71"
        },
        {
            text:"blue",
            code:"#45aaf2"
        },
        {
            text:"yellow",
            code:"#f9ca24"
        },
        {
            text:"black",
            code:"#000000"
        },
        {
            text:"violet",
            code:"#3c40c6"
        },
        {
            text:"dark green",
            code:"#27ae60"
        },
        {
            text:"dark blue",
            code:"#3498db"
        },
        {
            text:"orange",
            code:"#fa8231"
        },
        {
            text:"pink",
            code:"#fc5c65"
        },
        {
            text:"grey",
            code:"#3d3d3d"
        },
        {
            text:"teal",
            code:"#16a085"
        },
        {
            text:"pearl",
            code:"#1e272e"
        },
        {
            text:"silver",
            code:"#95a5a6"
        }
    ]
    return (
        <p className="buttons">
            {colors.map((value:any,index)=>{
                return(<Color key={index} text={value.text.toUpperCase()} code={value.code} selected={currentColor} change={setCurrentColor} />)
            })}
        </p>
    )
}
