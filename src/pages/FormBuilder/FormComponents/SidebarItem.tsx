import React from 'react'

export default function SidebarItem() {
    return (
        <div className="my-button">
            <button className="button mx-2 is-small is-dark" style={{ borderRadius: "50%" }}>
                <span className="icon is-small">
                    <i className="fa fa-plus fa-lg"></i>
                </span>
            </button>
            <p className="button-text is-size-7">
                Add Component
            </p>
        </div>
    )
}
