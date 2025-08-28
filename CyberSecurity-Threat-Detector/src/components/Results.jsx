/**
 * Results.jsx
 * This component displays the search results for cybersecurity threats.
 * It includes a search bar, a reset button, and a table of vulnerabilities.
 * The table supports pagination and allows users to view more details about each threat in a modal.
 * It uses Redux for state management and custom hooks for filtering threats.
 * Displays a table of vulnerabilities
 * When a CVE ID is clicked, it opens a modal with more details
 */


import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { filterActions } from '../store/filter'
import { useFilteredThreats } from '../hooks/useFilteredThreats'
import Modal from './Modal'

export default function Results() {

    const searchedTerm = useSelector(state => state.filter.searchTerm)
    const submittedTerm = useSelector(state => state.filter.submittedTerm)
    const dispatch = useDispatch()
    const filteredThreats = useFilteredThreats()

    //this tracks the page the user is currently on
    const [currentPage, setCurrentPage] = useState(1)

    //displays a certain number of rows to show per page
    //the default is 7
    const [itemsPerPage, setItemsPerPage] = useState(7)

    //state to track if modal is open or closed
    const [isModalOpen, setIsModalOpen] = useState(false)

    //state to track which CVE is selected for modal display
    const [selectedCVE, setSelectedCVE] = useState(null)

    //updates the search term in the redux store as user types
    function handleInputChange(event) {
        dispatch(filterActions.setSearchTerm(event.target.value))
        console.log(searchedTerm)
    }

    //when user presses enter, it sets the submitted term in the redux store
    function inputEnterPressed(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(filterActions.setSubmittedTerm(event.target.value))
        }
    }

    //when user clicks reset button, it clears the search and submitted terms in the redux store
    function resetButtonPressed() {
        dispatch(filterActions.setReset())
        setCurrentPage(1)

    }

    //opens the modal and sets the selected CVE
    function openModal(vulnerability) {
        setSelectedCVE(vulnerability)
        setIsModalOpen(true)
    }

    //closes the modal and clears the selected CVE
    function closeModal() {
        setIsModalOpen(false)
        setSelectedCVE(null)
    }

    //when the submitted term changes, it triggers an API call
    useEffect(() => {
        if (submittedTerm) {
            console.log(submittedTerm)
            //trigger API call here
        }
    }, [submittedTerm])

    //this is the last index of items for this page
    const lastItemIndex = currentPage * itemsPerPage

    //this is the starting index
    const firstItemIndex = lastItemIndex - itemsPerPage
   
    //the range of page data that should show on the webpage
    const thisPageItem = filteredThreats.slice(firstItemIndex, lastItemIndex)

    //stores the total number of pages we need
    const totalPages = Math.ceil(filteredThreats.length / itemsPerPage)

    // Generate pagination buttons logic
    const getPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5; // Number of page buttons to show, so at most 5 pages will be shown
        const halfVisiblePages = Math.floor(maxVisiblePages / 2); 
        
    
        let startPage = Math.max(1, currentPage - halfVisiblePages);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // Adjust if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        // First page button
        if (startPage > 1) {
            buttons.push(
                <button key={1} onClick={() => setCurrentPage(1)}>
                    1
                </button>
            );
            
            // Add ellipsis if needed
            if (startPage > 2) {
                buttons.push(<span key="start-ellipsis">...</span>);
            }
        }
        
        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button 
                    key={i} 
                    onClick={() => setCurrentPage(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        
        // Last page button
        if (endPage < totalPages) {
            // Add ellipsis if needed
            if (endPage < totalPages - 1) {
                buttons.push(<span key="end-ellipsis">...</span>);
            }
            
            buttons.push(
                <button key={totalPages} onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                </button>
            );
        }
        
        return buttons;
    }

    return (
        <div className='results-container'>
           <div className='search-section-container'>
            {/* Search bar and reset button */}
                <div className='search-field'>
                    <input 
                        onKeyDown={inputEnterPressed} 
                        value={searchedTerm} 
                        onChange={handleInputChange} 
                        type="text" 
                        placeholder='Enter a threat or CVE ID...' 
                    />
                </div>
                
                <button className='reset-btn' onClick={resetButtonPressed}>
                    Reset
                </button>
            </div>

            {/* Vulnerabilities table */}
            <div className='vulnerabilities-section'>
                <h2>Vulnerabilities ({filteredThreats.length})</h2>
                <div className='table-wrapper'>
                    <table className='vulnerabilities-table'>
                    <thead>
                        <tr>
                            <th>CVE ID</th>
                            <th>VENDOR/PRODUCT</th>
                            <th>VULNERABILITY</th>
                            <th>DATE ADDED</th>
                            <th>DUE DATE</th>
                            <th>RANSOMEWARE</th>
                            <th></th>
                        </tr>
                    </thead>

                    {/* Display the current page's items */}
                    <tbody>
                        {thisPageItem.map((threat, index) => (
                            <tr key={index}>
                                <td ><button className='cveID' title='View more info' onClick={() => openModal(threat)}>{threat.cveID || 'N/A'}</button></td>
                                <td>{threat.vendorProject}</td>
                                <td>{threat.vulnerabilityName} </td>
                                <td>{threat.dateAdded} </td>
                                <td className='dueDate'>{threat.dueDate} </td>
                                <td className='knownUnknown'>{threat.knownRansomwareCampaignUse} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                
                {/* Pagination controls */}
                {totalPages > 1 && (
                    <nav className="pagination">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        
                        {getPaginationButtons()}
                        
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </nav>
                )}
            </div>

            {/* Modal for detailed CVE info */}
            <Modal
            vulnerability={selectedCVE}
            modalOpen={isModalOpen}
            closeModal={closeModal}
            />
        </div>
    )
}