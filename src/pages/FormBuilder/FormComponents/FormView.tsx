import React from 'react'
import HeadSection from './HeadSection/HeadSection'
import BaseArea from './SectionBuilder/BaseArea'

export default function FormView(props:any) {
    return (
        <div className="column">
            <HeadSection />
            <BaseArea {...props} />
        </div>
    )
}
