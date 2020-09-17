import React, { useEffect } from 'react'

export default function ConfirmDialog(props: { isActive: any, title: string, desc: string, button1: string, button2?: string, func: any }) {

    const [isActive, setIsActive] = props.isActive
    const handleModalClose = () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setIsActive(false)
    }
    const openModal = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
    }

    useEffect(() => {
        if(isActive) openModal()
        else handleModalClose()
    }, [isActive])
    
    return (
        <div className={`modal ${isActive ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{ maxWidth: "90%", maxHeight: "60%" }}>
                <div className="box pt-4">
                    <h1 className="has-text-weight-bold has-text-dark is-size-4"><span className="icon is-small has-text-warning mr-2"><i className="fa fa-exclamation-triangle key"></i></span>&nbsp;{props.title}</h1>
                    <p className="my-5">{props.desc}</p>
                    <div className="buttons mt-5">
                        <button className="button is-danger  has-text-weight-bold" onClick={props.func}>{props.button1}</button>
                        <button className="button is-dark  has-text-weight-bold" onClick={handleModalClose}>{props.button2 || "Cancel"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
