import Logo from '../assets/WebsiteIcon.png'
import React from 'react'

export default function Header() {
  return (
    <div className='header-container'>
        {/* <img className='website-logo' src={Logo} alt="Website logo" /> */}
        <h2>CyberSentinel</h2>
        <p>Global cyber intelligence platform</p>

        <button>Live Feed</button>
        <button>Export</button>
    </div>
  )
}
