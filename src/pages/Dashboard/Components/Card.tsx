import React from 'react'

interface CardProps {
    color:string,
    img?:any,
    value:string,
    title:string,
}

export default function Card(props:CardProps) {
    return (
        <div className="column">
            <div className="box statbox" style={{ backgroundImage: `url(${props.img})`, backgroundColor: `${props.color}` }}>
                <p className="is-size-1 has-text-white has-text-weight-bold has-text-right">
                    {props.value}
                        </p>
                <p className="is-size-5 has-text-white has-text-right">
                    {props.title}
                        </p>
            </div>
        </div>
    )
}
