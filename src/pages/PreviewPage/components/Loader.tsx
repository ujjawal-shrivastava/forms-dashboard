import React from 'react';


export default function Loader() {
    return (
        <div className="flexer">
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <div className="has-text-centered mt-2 has-text-white has-text-weight-bold">
                    LOADING
                </div>
            </div>
    )
}