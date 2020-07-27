import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'

interface Props{
    title:string,
    change:any,
    isActive:boolean,
    route:string
}


export default function NavbarItem(props:Props) {
    //const [isActive, setIsActive]= useState(false)
    return (
        <Link to={props.route} className={`navbar-item nav-trans ${props.isActive?"is-active is-tab":""}`}
            onClick={
                ()=>{
                    props.change(props.route)
                }
            }
        >
            {props.title}
      </Link>
    )
}
