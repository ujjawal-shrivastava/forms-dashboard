import React, { Component } from 'react';


type TextComponentProps = {
    title: string,
    isReq: boolean,
    properties: any
}

export default class TextComponent extends Component<TextComponentProps> {

    render() {
        return (
            <div className="field pb-2">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control ">
                    <input className="input" type="text" placeholder={this.props.properties.placeholder || this.props.title} />
                </div>
                {//<p className="help is-danger">This email is invalid</p>} this.props.properties.placeholder
    }
            </div>
        )
    }
}