import React from 'react'

export default function PillBtn({click,checked}) {
    return (
        <label className="switch details__switch">
            <input type="checkbox" checked={checked} onChange={click} />
            <span className="slider round"></span>
        </label>
    )
}
