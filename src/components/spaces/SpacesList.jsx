import React, { useState } from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import SpacesListItem from './SpacesListItem'

export default function SpacesList(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  )
  const [onlyAvailable, setOnlyAvailable] = useState(true)

  const { spaces } = props

  const listItems = spaces.map(space => (
    <SpacesListItem key={space.id} space={space} selectedDate={selectedDate} />
  ))

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(`Search term: ${searchTerm}, date: ${selectedDate}, onlyAvailable: ${onlyAvailable}`)
  }

  return (
    <div className="NewsList__container">
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

        <select
          id="spaces-availability"
          className="SpacesList__search-form__availability-input"
          value={onlyAvailable}
          onChange={(e) => setOnlyAvailable(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value={false}>All</option>
          <option value={true}>Available</option>
        </select>

        <button className="worklife-btn search-btn" onClick={handleSearch}>
          Search
        </button>
      </form>

      <ul className="NewsList__list">{listItems}</ul>
    </div>
  )
}
