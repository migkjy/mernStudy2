import './App.css'
import React from 'react'

function WelcomePage(props) {
    return (
        <>
            <h1>welcome to the page, {props.username}</h1>
        </>
    )
}

export default WelcomePage
