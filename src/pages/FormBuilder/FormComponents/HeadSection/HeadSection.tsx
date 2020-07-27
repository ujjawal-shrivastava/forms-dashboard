import React from 'react'
import Colors from './Colors'

export default function HeadSection() {
    return (
        <div className="box mt-4">
            <strong className=" is-size-5 has-text-dark">Form Details</strong><br />
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Title</label>
                <div className="control field-body">
                    <input className="input" type="text" placeholder="Form Title" />
                </div>
            </div>
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Description</label>
                <div className="control field-body">
                    <textarea className="textarea" placeholder="Form Description" />
                </div>
            </div>
            <div className="field is-horizontal mt-3">
                <label className="label field-label is-normal">Visibility</label>
                <div className="control field-body mt-2">
                    <label className="radio mr-2">
                        <input type="radio" name="visibility" checked value="open"></input>
                                &nbsp;Open
                    </label>
                    <label className="radio ml-2">
                        <input type="radio" name="visibility" value="closed" />
                                &nbsp;Closed
                        </label>
                </div>
            </div>
            <div className="field is-horizontal mt-3 ">
                <label className="label field-label is-normal">Theme Color</label>
                <div className="control field-body mt-1">
                    <Colors />
                </div>
            </div>
        </div>
    )
}
