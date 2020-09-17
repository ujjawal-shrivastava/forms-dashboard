import React, { Component, createElement } from 'react';
import TextComponent from './TextComponent';
import TextareaComponent from './TextareaComponent';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';
import CheckboxComponent from './CheckboxComponent';

type SectionProps = {
    title:string,
    components:any,
}

type Components= {
    type: string,
    title: string,
    isReq: boolean,
    props:any
}



const ComponentsMap: Map<string, any> = new Map();
ComponentsMap.set("text",TextComponent);
ComponentsMap.set("textarea",TextareaComponent);
ComponentsMap.set("radio",RadioComponent);
ComponentsMap.set("select",SelectComponent);
ComponentsMap.set("checkbox",CheckboxComponent);

export default class FormSection extends Component<SectionProps> {
     renderComponents =(components: Array<Components>) => {       
        return (components.map(
            (value, index) => {
                if (ComponentsMap.has(value.type)){
                    return(
                        createElement(
                            ComponentsMap.get(value.type),{
                                type:value.type,
                                title:value.title,
                                isReq:value.isReq,
                                properties:value.props                              
                            }
                        )
                    )
                }

                return (
                <h1>There is an Invalid Component!</h1>
                )

            }
        ))
    }
    
    render() {
        return (
            <div className="box">
                {this.props.title?<p className="is-size-5 mb-4 has-text-left has-text-weight-bold" >{this.props.title}</p>:<div></div>}
                {this.renderComponents(this.props.components)}
            </div>
        )
    }
}