import React from 'react'
import HeadSection from './HeadSection/HeadSection'
import BaseArea from './SectionBuilder/BaseArea'

export default function FormView() {
    return (
        <div className="column">
            <HeadSection />
            <BaseArea/>
        </div>
    )
}
