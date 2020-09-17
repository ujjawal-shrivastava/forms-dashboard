import React from 'react'

export default function Type(props:any) {
    const [item, setItem] = props.item

    const IconsMap: Map<string, string> = new Map();
    IconsMap.set("text", "fa-font")
    IconsMap.set("long", "fa-paragraph")
    IconsMap.set("email", "fa-at")
    IconsMap.set("company", "fa-building-o")
    IconsMap.set("number", "fa-hand-peace-o")
    IconsMap.set("phone", "fa-phone")
    IconsMap.set("name", "fa-user")
    IconsMap.set("choice", "fa-dot-circle-o")
    IconsMap.set("dropdown", "fa-chevron-down")
    IconsMap.set("multiple", "fa-check-square-o")
    IconsMap.set("custom", "fa-scissors")

    const getIcon = ()=>{
        if (IconsMap.has(props.type)) {
            return (IconsMap.get(props.type))     
        }
    }
    return (
        <button className={`button is-small ${(props.type===item.type)?"is-dark":"is-light"} `} style={{ borderRadius: "30px", transition:"ease 0.3s" }} onClick={()=>{
            const newItem = {...item}
            newItem.type = props.type
            setItem(newItem)
        }}>
            <span className="icon mr-1">
                <i className={`fa ${getIcon()}`} style={{color:` ${(props.type===item.type)?"white":"black"} `}}></i>
            </span>
            <span>
                {props.type.toUpperCase()}
            </span>
        </button>
    )
}
