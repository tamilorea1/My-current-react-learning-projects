import { useSelector } from "react-redux"

export const useFilteredThreats = () =>{

    //Gathered all the threats from the mockThreats.js file
    const threats = useSelector(state => state.threats.threats)
    //stores all vendor types into this variable
    const selectedVendor = useSelector(state => state.filter.selectedVendor) //initially would be the 'all' option

    //stores all ransomware types into this variable
    const selectedRansomware = useSelector(state => state.filter.selectedRansomware)

    const submittedTerm = useSelector(state => state.filter.submittedTerm)


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

    return filteredThreats;

}