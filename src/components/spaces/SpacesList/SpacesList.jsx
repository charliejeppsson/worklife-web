import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import moment from 'moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import PropTypes from 'prop-types'

import { SEARCH_SPACES } from '../../../graphql/queries/space'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import SpacesListItem from '../SpacesListItem/SpacesListItem'
import './SpacesList.scss'

export default function SpacesList() {
  const todaysDate = moment(new Date()).format('YYYY-MM-DD')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(todaysDate)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  useEffect(() => { performSearch() }, [])

  const performSearch = async () => {
    setLoading(true)
    const searchResult = await client.query({
      query: SEARCH_SPACES,
      variables: { name: searchTerm, date: selectedDate }
    })
    setLoading(false)
    setError(searchResult.error)
    setData(searchResult.data)
  }

  const listItems = (spaces) => spaces.map(space => (
    <SpacesListItem key={space.id} space={space} selectedDate={selectedDate} />
  ))

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch()
  }

  if (error) return <p>Error :(</p>

  return (
    <div className="SpacesList">
      <form className="SpacesList__search-form" onSubmit={handleSearch}>
        <input
          type="search"
          id="spaces-search"
          className="SpacesList__search-form__text-input"
          placeholder="E.g. Indigo Stockholm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> 

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            variant="inline"
            disableToolbar
          />
        </MuiPickersUtilsProvider>

        <button className="worklife-btn search-btn" onClick={handleSearch}>
          Search
        </button>
      </form>
      
      {
        loading ? <LoadingSpinner /> :
          <ul className="SpacesList__list">
            {
              data.searchSpaces && data.searchSpaces.length ?
                listItems(data.searchSpaces)
                : <p>No spaces found :(</p>
            }
          </ul>
      }
    </div>
  )
}

SpacesList.propTypes = {
  spaces: PropTypes.arrayOf(PropTypes.object)
}
