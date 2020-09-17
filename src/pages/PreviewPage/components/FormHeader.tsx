import React from 'react';

type FormHeaderProps = {
    title: string
    description: string
    author: string
    formid: string
    verified:boolean
}

export default function FormHeader(props: FormHeaderProps) {
    return (
        <div className="container mb-5" id="form-header">
            <div className="box px-0 py-0 is-clipped">
                <div className="titleboxbg">
                    <div className="titlebox">
                        <p className="title is-capitalized is-size-3 has-text-weight-bold" >
                            {props.title}
                        </p>
                        <div className="descbox is-size-6 has-text-weight-medium  ">
                            <div dangerouslySetInnerHTML={{ __html: props.description }} />
                        </div>
                        <div className="field is-grouped is-grouped-multiline">
                            <div className="control">
                                <div className="tags has-addons">
                                    <span className="tag is-dark is-size-7 has-text-weight-bold"><span className="icon is-size-7 is-small has-text-white" title="Verified Account">
                                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                                    </span></span>
                                    <span className="tag is-link is-size-7 has-text-weight-bold">
                                        {props.author}
                                        {props.verified?
                                        <span className="icon ml-1 is-size-7 is-small has-text-white" title="Verified Account">
                                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                                    </span>:""}
                                    </span>
                                    
                                </div>
                            </div>
                            <div className="control">
                                <div className="tags has-addons">
                                    <span className="tag is-dark is-size-7 has-text-weight-bold"><span className="icon is-size-7 is-small has-text-white" title="Verified Account">
                                        <i className="fa fa-qrcode" aria-hidden="true"></i>
                                    </span></span>
                                    <span className="tag is-danger is-size-7 has-text-weight-bold">{props.formid}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}