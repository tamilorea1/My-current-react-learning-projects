
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { filterActions } from '../store/filter'



export default function FilteredSection() {

    //gets the initial state of the severity type dropdown which is 'All'
    const selectedSeverity = useSelector(state => state.filter.severityType) 

    //gets the initial state of the hack type dropdown which is 'All'
    const selectedHackType = useSelector(state => state.filter.hackType)

    //used to access all actions from the filter.js file
    const dispatch = useDispatch()

    //handles the different options changes that a user makes
    function handleOptionChange(event) {
        event.preventDefault();

        //gets the option selected by the user and stores it in the state 'selectedSeverity'
        dispatch(filterActions.setSeverityType(event.target.value))
    }

    function handleHackTypeOptions(event) {
        event.preventDefault();

        //gets the option selected by the user and stores it in the state 'selectedHackType'
        dispatch(filterActions.setHackType(event.target.value))
    }

  return (
    <div>
        {/*Stores all options under a dropdown */}
        
        <select value={selectedSeverity} onChange={handleOptionChange}>
            <option value="All">All severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>

        <select value={selectedHackType} onChange={handleHackTypeOptions}>
            <option value="All">All Types</option>
            <option value="Ransomware">Ransomware</option>
            <option value="Phishing">Phishing</option>
            <option value="APT">APT</option>
            <option value="Brute Force">Brute Force</option>
        </select>
    </div>
  )
}
