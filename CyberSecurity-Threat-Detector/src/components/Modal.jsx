
import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTimes, faExclamationTriangle, faBuilding, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function useLockBodyScroll(lock) {
  useEffect(() => {
    //grabs the original style that my body had before the modal
    const originalStyle = window.getComputedStyle(document.body).overflow;

    //lock here is modalOpen
    if (lock) {
        //locks scrolling for the user 
      document.body.style.overflow = "hidden";
    } else {
        //reverts back to orginal style of the body
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}


export default function Modal({vulnerability, modalOpen, closeModal}) {
    //if this is false, no modal should appear
  useLockBodyScroll(modalOpen);


  //checks if we click outside the modal
  //if we do, we should close the modal
  //else we keep the modal up
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  //if the key pressed is escape, then we close the modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  //useEffect runs when modalOpen changes
  //if the modal just opened:
  //add the keyDown listener and lock scrolling so that users can't scroll the background while in the modal
  //if the modal closes:
  //remove the keyDown listener and restore the scrolling
  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    //   document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    //   document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

   if (!modalOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Vulnerability Details</h2>
          <button 
            className="modal-close" 
            onClick={closeModal}
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="vulnerability-detail-section">
            <div className="detail-item">
              <FontAwesomeIcon icon={faExclamationTriangle} className="detail-icon" />
              <div className="detail-content">
                <label>CVE ID:</label>
                <span className="cve-id">{vulnerability.cveID || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-item">
              <FontAwesomeIcon icon={faBuilding} className="detail-icon" />
              <div className="detail-content">
                <label>Vendor/Product:</label>
                <span>{vulnerability.vendorProject}</span>
              </div>
            </div>

            <div className="detail-item full-width">
              <label>Vulnerability Name:</label>
              <p className="vulnerability-description">{vulnerability.vulnerabilityName}</p>
            </div>

            <div className="detail-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="detail-icon" />
              <div className="detail-content">
                <label>Date Added:</label>
                <span>{vulnerability.dateAdded}</span>
              </div>
            </div>

            <div className="detail-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="detail-icon" />
              <div className="detail-content">
                <label>Due Date:</label>
                <span className="due-date">{vulnerability.dueDate}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-content">
                <label>Ransomware Campaign:</label>
                <span className={`ransomware-status ${vulnerability.knownRansomwareCampaignUse?.toLowerCase()}`}>
                  {vulnerability.knownRansomwareCampaignUse}
                </span>
              </div>
            </div>

            {vulnerability.shortDescription && (
              <div className="detail-item full-width">
                <label>Description:</label>
                <p className="vulnerability-description">{vulnerability.shortDescription}</p>
              </div>
            )}

            {vulnerability.requiredAction && (
              <div className="detail-item full-width">
                <label>Required Action:</label>
                <p className="required-action">{vulnerability.requiredAction}</p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={closeModal} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
