
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { filterActions } from '../store/filter'


export default function Results() {

    const searchedTerm = useSelector(state => state.filter.searchTerm)

    const submittedTerm = useSelector(state => state.filter.submittedTerm)

    const dispatch = useDispatch()

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
        placeholder='Enter a threat type or title' />

        
    </div>
  )
}
