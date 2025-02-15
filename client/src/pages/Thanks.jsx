import React from 'react'
import "../styles/thanks.css"

const Thanks = () => {
  return (
    <div className="container">
      <main className="main">
        <h1 className="title">Thank You for Your Purchase!</h1>
        <p className="description">We appreciate your business and hope you enjoy your new items.</p>
        <a href="/" className="button">
          Return to Home
        </a>
      </main>
    </div>
  )
}

export default Thanks