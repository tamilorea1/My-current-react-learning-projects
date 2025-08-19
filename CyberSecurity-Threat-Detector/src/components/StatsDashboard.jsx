
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { calculateThreatStats } from '../mockThreats';
import { threatActions } from '../store/threats';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';

export default function StatsDashboard() {

    //Gathered all the threats from the mockThreats.js file
    const threats = useSelector(state => state.threats.threats)

    const loading = useSelector(state => state.threats.loading)

    const error = useSelector(state => state.threats.error)

    //stores all severity types into this variable
    const selectedSeverity = useSelector(state => state.filter.severityType) //initially would be the 'all' option
    
    //stores all hack types into this variable
    const selectedHackType = useSelector(state => state.filter.hackType)

    const submittedTerm = useSelector(state => state.filter.submittedTerm)
    
    const dispatch = useDispatch();

    useEffect(() => {
      //data is being loaded
      dispatch(threatActions.setThreatsAtStart())

      // Simulate fetching data from an API
      const fetchData = async () => {
        try {
          const response = await fetch('https://getcisathreats-nllkmt6r6a-uc.a.run.app')

          if (!response.ok) {
            throw new Error('Failed to fetch threats')
          }

          const data = await response.json();

          //vulnerabilities is stored in an array
          //so we need to spread the array into the action payload
          //also slice the number of vulnerabilities from 0 -10 i think when mapping over the filteredThreats
          dispatch(threatActions.setThreatsAtSuccess(data.vulnerabilities || []));

        } catch (error) {
          dispatch(threatActions.setThreatsAtFailure('Nothing'))
        }
      };

      fetchData();

    }, [])

    const filteredThreats = threats.filter((threat) => {
        // //if the hack type dropdown is set to all but the severity dropdown is a specific option chosen by the user
        // //made it lowercase since it is case sensitive
        // const severitySpecific = selectedHackType === 'All' && threat.severity.toLowerCase() === selectedSeverity.toLowerCase()

        // //if the severity type dropdown is set to all but the hack type dropdown is a specific option chosen by the user
        // const hackTypeSpecific = selectedSeverity === 'All' && threat.type === selectedHackType

        // //if both dropdowns are set to all, return everything
        // const bothFiltersAll = selectedSeverity === 'All' && selectedHackType === 'All'

        // //if both dropdowns are specified by the user. Show the result of the filter
        // const bothFiltersSpecific = selectedSeverity !== 'All' && selectedHackType !== 'All' 
        //                             && threat.severity === selectedSeverity.toLowerCase() 
        //                             && threat.type === selectedHackType

        // If no search term entered (submittedTerm is empty) -> don't filter by search, show everything that matches dropdowns
        // If search term entered -> only show threats where the search term is found in sstatus OR type

        const bySearch = submittedTerm === '' || 
                         threat.cveID.toLowerCase().includes(submittedTerm.toLowerCase()) ||  
                         threat.vendorProject.toLowerCase().includes(submittedTerm.toLowerCase())

        // Show threats that match BOTH the search criteria AND the dropdown filter criteria
        // Examples:
        // - No search + "Critical" severity -> all critical threats
        // - "ransomware" search + "All" severity -> all ransomware threats  
        // - "ransomware" search + "Critical" severity -> only critical ransomware threats
        // return bySearch && (severitySpecific || hackTypeSpecific || bothFiltersAll || bothFiltersSpecific)

        return bySearch;
    })

    // const stats = calculateThreatStats(filteredThreats)


  return (
    <div className='stats-dashboard-container'>
        {/* <label>title: {firstThreatTitle}</label> */}
        {/* <label>Total threats: {stats.total} </label>
        <label>Critical: {stats.critical} </label>
        <label>High risk: {stats.high} </label>
        <label>Active: {stats.active} </label> */}
        {/* <label>Investigating: #</label> */}

        {/*If submittedTerm is true, display the status'  */}
        {/*Will be adjusted to displaying good amounts of information */}
        {submittedTerm && (
        <div>
            <p>Status of "{submittedTerm}" threats:</p>
            {filteredThreats.slice(0,10).map((threat, index) => (
              <span key={threat.id || index}> {threat.vendorProject}  {threat.dateAdded}</span>
            ))}
          </div>
        )}
          </div>
  )
}
