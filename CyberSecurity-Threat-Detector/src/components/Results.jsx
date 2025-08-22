
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { filterActions } from '../store/filter'
import { useFilteredThreats } from '../hooks/useFilteredThreats'

export default function Results() {

    const searchedTerm = useSelector(state => state.filter.searchTerm)

    const submittedTerm = useSelector(state => state.filter.submittedTerm)

    const dispatch = useDispatch()

    const filteredThreats = useFilteredThreats()

    function handleInputChange(event) {
        // event.preventDefault()

        dispatch(filterActions.setSearchTerm(event.target.value))
        console.log(searchedTerm)
    }

    function inputEnterPressed(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            dispatch(filterActions.setSubmittedTerm(event.target.value))
        }
    }

    useEffect(() => {
        if (submittedTerm) {
            console.log(submittedTerm)
            //trigger API call here
        }
    }, [submittedTerm])

  return (
    <div>
        <input 
        onKeyDown={inputEnterPressed} 
        value={searchedTerm} 
        onChange={handleInputChange} 
        type="text" 
        placeholder='Enter a threat' />

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
              {filteredThreats.map((threat, index) => (
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
        </div>

    </div>
  )
}


//TO DO WHEN I GET BACK
//1) Pagination for the many vulnerabilities
//2) Reset button to clear all searches
//3) After those then we can style :)