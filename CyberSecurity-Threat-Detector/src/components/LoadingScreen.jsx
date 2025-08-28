import React from 'react'

export default function LoadingScreen() {
  return (
    <div className='loading-screen-container'>
        <div className='loading-content'>
            <div className='modern-spinner'></div>
            <h2 className='loading-title'>Loading Vulnerabilities</h2>
            <p className='loading-subtitle'>Fetching latest security data...</p>
        </div>
    </div>
  )
}