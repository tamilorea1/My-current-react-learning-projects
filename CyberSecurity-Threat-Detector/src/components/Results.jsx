
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { filterActions } from '../store/filter'
import { useFilteredThreats } from '../hooks/useFilteredThreats'

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

    function handleInputChange(event) {
        dispatch(filterActions.setSearchTerm(event.target.value))
        console.log(searchedTerm)
    }

    function inputEnterPressed(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(filterActions.setSubmittedTerm(event.target.value))
        }
    }

    function resetButtonPressed(params) {
        dispatch(filterActions.setSearchTerm(''))
        dispatch(filterActions.setSubmittedTerm(''))
        setCurrentPage(1)

    }

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
        <div>
            <input 
                onKeyDown={inputEnterPressed} 
                value={searchedTerm} 
                onChange={handleInputChange} 
                type="text" 
                placeholder='Enter a threat' />

            <button onClick={resetButtonPressed}>
                Reset
            </button>

            <div>
                <h2>Vulnerabilities ({filteredThreats.length})</h2>
                <table>
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

                    <tbody>
                        {thisPageItem.map((threat, index) => (
                            <tr key={index || threat.id}>
                                <td>{threat.cveID || 'N/A'}</td>
                                <td>{threat.vendorProject}</td>
                                <td>{threat.vulnerabilityName} </td>
                                <td>{threat.dateAdded} </td>
                                <td>{threat.dueDate} </td>
                                <td>{threat.knownRansomwareCampaignUse} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
        </div>
    )
}


//TO DO WHEN I GET BACK
//3) After those then we can style :)