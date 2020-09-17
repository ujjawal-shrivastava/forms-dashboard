import React, { useEffect } from 'react'
import * as Qrcode from 'qrcode.react';
import * as Copy from 'copy-text-to-clipboard'
import { toast as superToast } from 'bulma-toast'

export default function ShareDialog(props: { isActive: any, form: string }) {

    useEffect(() => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
    }, [])

    const [isActive, setIsActive] = props.isActive
    const handleModalClose = () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setIsActive(false)
    }
    return (
        <div className={`modal ${isActive ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{ maxWidth: "90%", maxHeight: "90%" }}>
                <div className="box pt-2">
                    <div className="mt-1 mb-5" style={{ flexDirection: "row", display: "flex", alignItems: "center", justifyContent:"space-between"}}>
                        <h1 className="is-size-5 has-text-weight-bold has-text-black">Share</h1>
                        <p  onClick={handleModalClose}><span className="icon has-text-grey-whiter is-size-5">
                            <i className="fa fa-times"></i>
                        </span></p>

                    </div>
                    <div className="has-text-centered">
                        <div className="mb-5" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div className="px-2 py-2 has-text-centered" style={{ background: "#3d3d3d", padding: "1.6rem", borderRadius: "5px 5px 5px 5px" }}>
                                <Qrcode.default value={`${process.env.REACT_APP_FRONTEND_URL}${props.form}`} renderAs="svg" includeMargin={true} />
                                <p className="has-text-white is-size-7 has-text-weight-bold">DeForm : {props.form}</p>
                            </div>
                        </div>
                        <p title="Click to copy link"className="tag is-link is-size-6" style={{cursor:"pointer"}} onClick={()=>{
                            Copy.default(`${process.env.REACT_APP_FRONTEND_URL}${props.form}`)
                            superToast({
                                message: `Link Copied`,
                                type: "is-black",
                                position: "center",
                                duration: 1000,
                                animate: { in: 'fadeIn', out: 'fadeOut' },
                            });
                        }}>{`${process.env.REACT_APP_FRONTEND_URL}${props.form}`}</p>
                        <p className="is-size-7 has-text-weight-light mt-5">Your form is ready to be shared, <strong>Click the link to copy</strong>. Share the link or QR Code with others, so that they can fill the form! </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
