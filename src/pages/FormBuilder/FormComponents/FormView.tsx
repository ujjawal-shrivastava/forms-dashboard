import React, { useState } from 'react'
import HeadSection from './HeadSection/HeadSection'
import {v4} from 'uuid'
import BaseArea from './SectionBuilder/BaseArea'

export default function FormView() {

    const item1 = {
        id: v4(),
        type: "text",
        title: "Name",
        props: {}
    }

    const item2 = {
        id: v4(),
        type: "email",
        title: "Email",
        props: {}
    }

    const item3 = {
        id: v4(),
        type: "number",
        title: "Roll. No.",
        props: {}
    }

    const item4 = {
        id: v4(),
        type: "choice",
        title: "Gender",
        props: {}
    }

    const item5 = {
        id: v4(),
        type: "multiple",
        title: "Hobbies",
        props: {}
    }


    const [state, setState] = useState(
        {
            "sections": [
                {
                    id: v4(),
                    title: "Personal Details",
                    components: [item1, item2, item5]
                },
                {
                    id: v4(),
                    title: "College Details",
                    components: [item3, item4]
                }
            ]
        }
    )

    return (
        <div className="column">
            <HeadSection />
            <BaseArea state={state} setState={setState} />
        </div>
    )
}
