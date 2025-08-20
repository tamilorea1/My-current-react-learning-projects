
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { filterActions } from '../store/filter'



export default function FilteredSection() {

    const threats = useSelector(state => state.threats.threats)
    

    //gets the initial state of the selected vendor dropdown which is 'All'
    const selectedVendor = useSelector(state => state.filter.selectedVendor) 

    //gets the initial state of the ransomware dropdown which is 'All'
    const selectedRansomware = useSelector(state => state.filter.selectedRansomware)

    //used to access all actions from the filter.js file
    const dispatch = useDispatch()

    //handles the different options changes that a user makes
    function handleVendorOptionChange(event) {
        event.preventDefault();

        //gets the option selected by the user and stores it in the state 'selectedVendor'
        dispatch(filterActions.setSelectedVendor(event.target.value))
    }

    function handleRansomwareOptions(event) {
        event.preventDefault();

        //gets the option selected by the user and stores it in the state 'selectedRansomware'
        dispatch(filterActions.setSelectedRansomware(event.target.value))
    }

    //gather all the vendorProjects into the variable
    const allVendorNames = threats.map(threat => threat.vendorProject)

    // Remove any empty or null values
    const cleanNames = allVendorNames.filter(Boolean)

    // Create a set to remove duplicates
    //Ex: if oracle appears twice, it will only keep one instance
    const nonDuplicateVendorNames = new Set(cleanNames);

    // Convert the set back to an array
    //Have 'All' be the first value, and then spread the unique vendor project names
    const completeVendorList = ['All', ...nonDuplicateVendorNames] 

  return (
    <div>
        {/*Stores all options under a dropdown */}
        
       <select value={selectedVendor} onChange={handleVendorOptionChange}>
            {
                completeVendorList.map(vendor => {
                    return <option value={vendor} key={vendor}>{vendor}</option>
                })
            }
       </select>

        <select value={selectedRansomware} onChange={handleRansomwareOptions}>
            <option value="All">All Ransomware</option>
            <option value="Known">Ransomware Known</option>
            <option value="Unknown">Ransomware Unknown</option>
        </select>
    </div>
  )
}
