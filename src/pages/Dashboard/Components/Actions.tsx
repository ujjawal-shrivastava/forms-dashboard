import React from 'react'
import art from '../../../assets/art.svg';
export default function Actions() {
    return (
        <div className="box">
            <p className="is-size-4 has-text-weight-bold mb-3 ml-3" style={{ color: '#5b5b5b' }}>Actions</p>
            <div className="columns">
                <div className="column">

                </div>
                <div className="column" style={{ display: "flex", justifyContent: "center" }}>
                    <img src={art} style={{ minWidth: "200px" }} />
                </div>
            </div>
        </div>
    )
}
