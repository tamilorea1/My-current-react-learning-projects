
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

    //stores all vendor types into this variable
    const selectedVendor = useSelector(state => state.filter.selectedVendor) //initially would be the 'all' option

    //stores all ransomware types into this variable
    const selectedRansomware = useSelector(state => state.filter.selectedRansomware)

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
       
        // If no search term entered (submittedTerm is empty) -> show all information
        // If search term entered -> only show information if the search term matches any of the parameters set  

        const bySearch = submittedTerm === '' || 
                         threat.cveID?.toLowerCase().includes(submittedTerm.toLowerCase()) ||  
                         threat.vendorProject?.toLowerCase().includes(submittedTerm.toLowerCase()) ||
                         threat.product?.toLowerCase().includes(submittedTerm.toLowerCase()) ||
                         threat.vulnerabilityName?.toLowerCase().includes(submittedTerm.toLowerCase())

        //For the vendor dropdown
        //if one of the statements is true it passes
        //If the user selects 'All' it will show all vendors
        //If the user selected a specific vendor, only show threats from that vendor
        const byVendor = selectedVendor === 'All' || threat.vendorProject?.toLowerCase() === selectedVendor.toLowerCase();

        const byRansomware = selectedRansomware === 'All' || threat.knownRansomwareCampaignUse?.toLowerCase() === selectedRansomware.toLowerCase();

        // Return true if all conditions are met
        return bySearch && byVendor && byRansomware;
    })

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
