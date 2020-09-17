import React, { Component } from 'react';

type CheckboxComponentProps = {
    title: string,
    isReq: boolean,
    properties: any
}

export default class CheckboxComponent extends Component<CheckboxComponentProps> {

    render() {
        return (
            <div className="field mt-5">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control">
                    {this.props.properties.options.map((value: any, index: number) => {
                        return (
                            <label key={value.index} className="checkbox mr-3">
                                <input type="checkbox" />
                                    &nbsp;{value.title}
                            </label>
                        )
                    })}
                </div>
            </div>
        )
    }
}