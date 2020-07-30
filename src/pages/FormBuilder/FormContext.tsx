import React, { useState, createContext } from 'react'
import { v4 } from 'uuid'

type ItemType = {
    id: string,
    title: string,
    props: {}
}

type SectionType = {
    id: string,
    title: string,
    components: [ItemType]
}

type FormType = {
    formid: string,
    title: string,
    description: string,
    author: string,
    bgtheme: string,
    isOpen: boolean,
    sections:[SectionType]
}



export const FormContext = createContext<any>({})

export function FormProvider(props: any) {

    const [state, setState] = useState(
        {
            formid: "",
            title: "",
            description: "",
            author: "Ujjawal Shrivastava",
            bgtheme: "#2ecc71",
            isOpen: true,
            sections: [
                {
                    id: v4(),
                    title: "",
                    components: []
                },
            ]
        }
    )

    return (
        <FormContext.Provider value={[state, setState]} >
            {props.children}
        </FormContext.Provider>
    )
}
