import React, { Component } from 'react';

type SelectComponentProps = {
    title: string,
    isReq: boolean,
    properties: any
}

export default class SelectComponent extends Component<SelectComponentProps> {

    render() {
        return (
            <div className="field mt-5">
                <label className="label">{this.props.title}&nbsp;<span className="has-text-danger">{this.props.isReq ? "*" : ""}</span></label>
                <div className="control">
                    <div className="select">
                        <select>
                        {this.props.properties.options.map((value:any, index:number) => {
                        return (
                        <option value={value.value}>{value.title}</option>
                        )
                    })}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}