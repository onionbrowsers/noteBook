import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'

function Header(props) {
    const navigate = useNavigate()
    function back() {
        navigate(-1)
    }
    return (
        <div className="page-header">
            <h2>React Router Demo</h2>
            {props.children}

            <button onClick={back}>回退</button>
        </div>
    )
}

export default Header
