import Logo from '../assets/WebsiteIcon.png'
import React from 'react'

export default function Header() {
  return (
    <div className='header-container'>
        {/*This is the title with small paragraph of my webpage */}
        <h2>CyberSentinel</h2>
        <p>Global cyber intelligence platform</p>

        {/*2 buttons that I will come back to eventually */}
        <button>Live Feed</button>
        <button>Export</button>
    </div>
  )
}
