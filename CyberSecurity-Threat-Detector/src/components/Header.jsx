import Logo from '../assets/WebsiteIcon.png'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldVirus, faSpinner, faWaveSquare, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { exportToCSV } from '../utility/exportCSV';
import { useFilteredThreats } from '../hooks/useFilteredThreats';

export default function Header() {
  const [isLiveFeedActivated, setIsLiveFeedActivated] = useState(false)

  const [exportIsLoading, setExportIsLoading] = useState(false)

  const filteredThreats = useFilteredThreats()


  function liveFeedToggle() {
    setIsLiveFeedActivated(!isLiveFeedActivated)

    if (!isLiveFeedActivated) {
      // Show a more sophisticated notification
      console.log('Live feed activated! 🔴 LIVE')
    } else {
      console.log('Live feed deactivated')
    }
  }

  async function handleExport() {
    if (filteredThreats.length === 0) {
      alert('No data available to export')
      return;
    }

    setExportIsLoading(true) // loading is starting
      //create a filename with the current date
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const filename = `vulnerabilities_${formattedDate}.csv`;

    await new Promise(resolve => setTimeout(resolve, 1500))
    //export the data 
    exportToCSV(filteredThreats, filename)

    setExportIsLoading(false) //end loading
  }

  

  return (
    <div className='header-container'>
      {/* Title section */}
      <div className='header-left'>
        <div className='title-section'>
          <h2>
            <FontAwesomeIcon 
              icon={faShieldVirus} 
              bounce 
              style={{color: "#35a7ffff"}} 
            /> 
            CyberSentinel
          </h2>
          <p>CISA Known Exploited Vulnerabilities Dashboard</p>
        </div>
      </div>
      
      {/* Button section */}
      <div className='header-right'>
        <button 
          onClick={liveFeedToggle}
          className={`live-feed ${isLiveFeedActivated ? 'live-feed-active' : ''}`}
          title={isLiveFeedActivated ? 'Click to deactivate live feed' : 'Click to activate live feed'}
        >
          {isLiveFeedActivated ? (
            <>
              <FontAwesomeIcon icon={faWaveSquare} />
              LIVE
            </>
          ) : (
            'Live Feed'
          )}
        </button>
        
        <button 
        className={`exportBtn ${exportIsLoading ? 'exporting' : ''}`} 
          title='Export vulnerability data' 
          onClick={handleExport}
          disabled={exportIsLoading} // ← Disable button during export
        >
          {exportIsLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              Exporting...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faDownload} />
              Export
            </>
          )}
        </button>
      </div>

      
    </div>
  )
}