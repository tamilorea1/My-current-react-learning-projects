import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faRedo } from "@fortawesome/free-solid-svg-icons";


export default function Error({error, onRetry}) {
  return (
<div className="error-state">
      <div className="error-content">
        <FontAwesomeIcon 
          icon={faTriangleExclamation} 
          className="error-icon"
        />
        <h3>Unable to Load Data</h3>
        <p>{error}</p>
        <button onClick={onRetry} className="retry-button">
          <FontAwesomeIcon icon={faRedo} />
          Retry
        </button>
      </div>
    </div>  )
}
