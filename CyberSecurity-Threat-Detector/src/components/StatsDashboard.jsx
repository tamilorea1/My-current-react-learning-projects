
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { calculateThreatStats } from '../mockThreats';
import { threatActions } from '../store/threats';
import { functions } from '../firebase';
import { httpsCallable } from 'firebase/functions';
import { useFilteredThreats } from '../hooks/useFilteredThreats';

export default function StatsDashboard() {

    
    const loading = useSelector(state => state.threats.loading)

    const error = useSelector(state => state.threats.error)

    const filteredThreats = useFilteredThreats()

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


  return (
    <div className='stats-dashboard-container'>
        {/* Simple stats display */}
        <div>
            <h3>Total Vulnerabilities</h3>
            <p>{totalVulnerabilities}</p>
        </div>
        <div>
            <h3>Ransomware Related</h3>
            <p>{ransomwareCount}</p>
        </div>
        <div>
            <h3>Critical Due Dates</h3>
            <p>{criticalDueDate}</p>
        </div>


        

          </div>
  )
}
