import React, { Component } from 'react';

type RadioComponentProps = {
    title: string,
    isReq: boolean,
    properties: any
}

export default class RadioComponent extends Component<RadioComponentProps> {

    render() {
        return (
            <div className="field mt-5">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control">
                    {this.props.properties.options.map((value:any, index:number) => {
                        return (
                            <label key={index} className="radio mr-2">
                                <input type="radio" name="question" />
                                &nbsp;{value.title}
                            </label>
                            
                        )
                    })}
                </div>
            </div>
        )
    }
}