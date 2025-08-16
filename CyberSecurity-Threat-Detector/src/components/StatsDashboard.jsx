
import React from 'react'
import {useSelector} from 'react-redux'
import { calculateThreatStats } from '../mockThreats';


export default function StatsDashboard() {

    //Gathered all the threats from the mockThreats.js file
    const threats = useSelector(state => state.threats.threats)

    //stores all severity types into this variable
    const selectedSeverity = useSelector(state => state.filter.severityType) //initially would be the 'all' option
    
    //stores all hack types into this variable
    const selectedHackType = useSelector(state => state.filter.hackType)

    

    const filteredThreats = threats.filter((threat) => {
        //if the hack type dropdown is set to all but the severity dropdown is a specific option chosen by the user
        //made it lowercase since it is case sensitive
        const severitySpecific = selectedHackType === 'All' && threat.severity === selectedSeverity.toLowerCase()

        //if the severity type dropdown is set to all but the hack type dropdown is a specific option chosen by the user

        const hackTypeSpecific = selectedSeverity === 'All' && threat.type === selectedHackType

        //if both dropdowns are set to all, return everything
        const bothFiltersAll = selectedSeverity === 'All' && selectedHackType === 'All'

        //if both dropdowns are not all and they're both specified by the user. Show the result of the filter
        const bothFiltersSpecific = selectedSeverity !== 'All' && selectedHackType !== 'All' 
                                    && threat.severity === selectedSeverity.toLowerCase() 
                                    && threat.type === selectedHackType

        return severitySpecific || hackTypeSpecific || bothFiltersAll || bothFiltersSpecific
    })

    const stats = calculateThreatStats(filteredThreats)


  return (
    <div className='stats-dashboard-container'>
        {/* <label>title: {firstThreatTitle}</label> */}
        <label>Total threats: {stats.total} </label>
        <label>Critical: {stats.critical} </label>
        <label>High risk: {stats.high} </label>
        <label>Active: {stats.active} </label>
        {/* <label>Investigating: #</label> */}
    </div>
  )
}
