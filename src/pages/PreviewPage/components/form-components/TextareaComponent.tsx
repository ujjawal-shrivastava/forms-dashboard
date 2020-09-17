import React, { Component } from 'react';

type TextareaComponentProps = {
    title: string,
    isReq: boolean,
    properties: any
}

export default class TextareaComponent extends Component<TextareaComponentProps> {

    render() {
        return (
            <div className="field mt-5">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control">
                    <textarea className="textarea" placeholder={this.props.properties.placeholder}></textarea>
                </div>
            </div>
        )
    }
}