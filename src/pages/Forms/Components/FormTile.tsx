import React from 'react'
import '../Forms.scss'
import { Link } from 'react-router-dom';

interface Form {
    formid: string,
    title: string,
    open: boolean,
    published: boolean,
    responses: number,
    views: number
}

export default function FormTile(props: { form: Form, preview:any, deleteActive:any,shareActive:any, currentForm:any}) {

    const getPreview = props.preview
    const [deleteActive, setDeleteActive] = props.deleteActive
    const [currentForm, setCurrentForm] = props.currentForm
    const [shareActive, setShareActive] = props.shareActive

    const length = 42;

    return (
        <div className="box" style={{ padding: "0rem", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", overflow: "hidden", margin: "1rem 0rem" }} >
            <div className="tile-index" title="Click to Copy Form ID">
                <p id="formid" className="has-text-white has-text-weight-bold is-size-7">{props.form.formid}</p>
            </div>

            <div className="tile-data">
                <p title={props.form.title} className="px-4 py-4 has-text-dark has-text-weight-semibold" style={{ wordBreak: "normal" }}>{(props.form.title.length > length) ? (props.form.title.substring(0, length) + "...") : props.form.title}</p>
                <div style={{ padding: "0.8rem" }}>
                    <span className="tag is-danger has-text-weight-bold is-light is-rounded mr-1 " style={{cursor:"pointer"}} title="Total Responses on this form" onClick={()=>{window.location.pathname = `/responses/${props.form.formid}`}}>{props.form.responses} Responses</span>
    <span className="tag is-warning has-text-weight-bold is-light is-rounded mx-1 " title="Total Visits on this form">{props.form.views} Views</span>
                    <span className={`tag is-link ${props.form.open ?"":"is-light"} has-text-weight-bold is-rounded mx-1 my-3`} title={`Form is ${props.form.open ? "Open" : "Closed"} for responses`}>{props.form.open ? "Open" : "Closed"}</span>
                    <span className={`tag is-success ${props.form.published ?"":"is-light"} has-text-weight-bold is-rounded ml-1 my-3`} title={`Form is ${props.form.published ? "Published and Shareable" : "Saved but not published"}`}>{props.form.published ? "Published" : "Draft"}</span>
                </div>
            </div>
            <div className="tile-control">

                {props.form.published ? <div title="Share Form" onClick={()=>{
                    setShareActive(true)
                    setCurrentForm(props.form.formid)
                }} className="button-control">
                    <span className="icon has-text-black" style={{ alignSelf: "center" }}>
                        <i className="fa fa-share-alt"></i>
                    </span>
                </div> : <div title="Preview Form" className="button-control" onClick={()=>{getPreview({variables:{formid:props.form.formid}})}}>
                        <span className="icon has-text-black" style={{ alignSelf: "center" }}>
                            <i className="fa fa-eye"></i>
                        </span>
                    </div>}
                <Link title="Edit Form" to={`/edit/${props.form.formid}`} className="button-control">
                    <span className="icon has-text-black" style={{ alignSelf: "center" }}>
                        <i className="fa fa-pencil"></i>
                    </span>
                </Link>
                <div title="Delete Form" className="button-control" onClick={()=>{
                    document.body.style.top = `-${window.scrollY}px`;
                    document.body.style.width = "100%";
                    document.body.style.position = 'fixed';
                    setDeleteActive(true)
                    setCurrentForm(props.form.formid)
                }}>
                    <span className="icon has-text-black" style={{ alignSelf: "center" }}>
                        <i className="fa fa-trash-o"></i>
                    </span>
                </div>

            </div>
        </div>
    )
}
