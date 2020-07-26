import React from 'react'

export default function HeadSection() {
    return (
        <div className="box mt-4">
                <strong className="has-text-weight-bold is-size-5">Form Details</strong><br />
                <div className="field is-horizontal mt-3 ">
                    <label className="label field-label is-normal">Title</label>
                    <div className="control field-body">
                        <input className="input" type="email" placeholder="Form Title" />
                    </div>
                </div>
                <div className="field is-horizontal mt-3 ">
                    <label className="label field-label is-normal">Description</label>
                    <div className="control field-body">
                        <textarea className="textarea" placeholder="Form Description" />
                    </div>
                </div>
            </div>
    )
}
