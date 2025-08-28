
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { calculateThreatStats } from '../mockThreats';
import { threatActions } from '../store/threats';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { useFilteredThreats } from '../hooks/useFilteredThreats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faVirus, faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import LoadingScreen from './LoadingScreen';
import Error from './Error';

export default function StatsDashboard() {

    
    const loading = useSelector(state => state.threats.loading)

    const error = useSelector(state => state.threats.error)

    const filteredThreats = useFilteredThreats()

    const dispatch = useDispatch();

    
    
      
      // Simulate fetching data from an API
      const fetchData = async () => {
        //data is being loaded
        dispatch(threatActions.setThreatsAtStart())
        try {
            // throw new Error('Testing error handling!')

          const response = await fetch('https://getcisathreats-nllkmt6r6a-uc.a.run.app')

          if (!response.ok) {
            throw new Error('Failed to fetch threats')
          }

          const data = await response.json();

          // Add a small delay to show the loading state
          await new Promise(resolve => setTimeout(resolve, 1000));

          //vulnerabilities is stored in an array
          //so we need to spread the array into the action payload
          //also slice the number of vulnerabilities from 0 -10 i think when mapping over the filteredThreats
          // dispatch(threatActions.setThreatsAtSuccess(data.vulnerabilities || []));

          // Make sure we have data before dispatching success
          if (data && Array.isArray(data.vulnerabilities)) {
            console.log(`Successfully loaded ${data.vulnerabilities.length} vulnerabilities`)
            dispatch(threatActions.setThreatsAtSuccess(data.vulnerabilities));
          } else if (data && data.vulnerabilities) {
            // If vulnerabilities exists but isn't an array, handle it
            console.log('Vulnerabilities data exists but is not an array:', data.vulnerabilities)
            dispatch(threatActions.setThreatsAtSuccess([]));
          } else {
            // If no vulnerabilities data at all
            console.log('No vulnerabilities data found in response')
            dispatch(threatActions.setThreatsAtSuccess([]));
          }

        } catch (error) {
          dispatch(threatActions.setThreatsAtFailure(`Failed to load threats: ${error.message}`))
        }
      };


    
      useEffect(() => {
        fetchData()
      }, [dispatch])


    

    const totalVulnerabilities = filteredThreats.length;

    const ransomwareCount = filteredThreats.filter(threat => threat.knownRansomwareCampaignUse === 'Known').length

    //apply this later
    const unknownRansomwareCount = filteredThreats.filter(threat => threat.knownRansomwareCampaignUse === 'Unknown').length

    //gives today the date object, which stores the current day
    const today = new Date();

    //done the same here
    const nextWeek = new Date();

    // Set the date to one week from today
    //If today is Monday, next week will be the following Monday
    nextWeek.setDate(today.getDate() + 7);

    const criticalDueDate = filteredThreats.filter(threat => {
      //sets the dueDate to the same one in our API 
      //property name dueDate
      const dueDate = new Date(threat.dueDate);

      //is the duedate between today and next week?
      //return the length at the end
      //Ex: if today is Monday, and the dueDate is next Monday, it should be included
      return dueDate >= today && dueDate <= nextWeek;
    }).length;


    if (loading) {
      return <LoadingScreen/>
    }
    
    if (error) {
      return <Error error={error} onRetry={fetchData}/>
    }


  return (
    <div className='stats-dashboard-container'>
        {/* Simple stats display */}
        <div className='stats-field'>
            <div className='stats-content'>
              <h3>Total Vulnerabilities</h3>
              <p>{totalVulnerabilities}</p>
            </div>
            <FontAwesomeIcon 
            className='stats-icon' 
            icon={faBullseye} 
            style={{color: "#2119ffff",}} />
        </div>

        <div className='stats-field'>
            <div className='stats-content'> 
               <h3>Ransomware Related</h3>
                <p className='ransomware-p'>{ransomwareCount}</p>
            </div>
           
            <FontAwesomeIcon 
            className='stats-icon' 
            icon={faVirus} 
            style={{color: "#f00000ff",}} />

        </div>

        <div className='stats-field'>
            <div className='stats-content'>
              <h3>Critical Due Dates</h3>
              <p className='due-date-p'>{criticalDueDate}</p>
            </div>
            
            <FontAwesomeIcon 
            className='stats-icon' 
            icon={faHourglassStart} 
            style={{color: "#5c0c00ff",}} />

        </div>
      </div>
  )
}
