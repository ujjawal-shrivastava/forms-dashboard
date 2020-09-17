import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext'

type NotFoundProps = {
    code?: string,
    title?: string,
    desc?: string,
    buttonText?: string,
    buttonLink?: string,
    labelColor?: string

}

export default function NotFound(props: NotFoundProps) {
    const [user, setUser] = useContext(UserContext)
    if (!user.auth) return (<Redirect to="/login" />)
    return (
            <div className="section columns is-centered " style={{alignSelf:"center", justifySelf:"center"}}>
                <div className="column is-three-quarters is-mobile">
                    <div >
                        <div className="box px-0 py-0 is-clipped" style={{ minWidth: "60%", height: "50%" }}>
                            <div className="errorbox" style={{ backgroundColor: (props.labelColor || "#6ab04c") }}>
                                <p className="ss-capitalized is-size-4 has-text-weight-bold has-text-white py-3">
                                    {props.code || "404"}
                                </p>
                            </div>
                            <div className="errorContent py-5 px-5">
                                <p className="title is-size-3 has-text-weight-bold has-text-black">{props.title || "Page Not Found!"}</p>
                                <p className="is-size-6 has-text-weight-light has-text-grey-whiter mb-5">{props.desc || "The page you requested was not found on this server. The page is removed or the link is broken."}</p>
                                <Link to={props.buttonLink || "/"} className="button is-dark is-rounded">{props.buttonText || "Back to Home"}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
