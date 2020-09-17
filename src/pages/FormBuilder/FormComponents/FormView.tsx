import React, { useState } from 'react'
import HeadSection from './HeadSection/HeadSection'
import BaseArea from './SectionBuilder/BaseArea'

export default function FormView(props:any) {
    const [error, setError] = props.formError
    return (
        <div className="column">
            <HeadSection formError={[error, setError]} />
            <BaseArea/>
        </div>
    )
}
