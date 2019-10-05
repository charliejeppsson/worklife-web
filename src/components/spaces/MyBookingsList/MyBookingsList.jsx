import React from 'react'
import PropTypes from 'prop-types'

import MyBookingsListItem from '../MyBookingsListItem/MyBookingsListItem'
import './MyBookingsList.scss'

export default function MyBookingsList(props) {
  const { bookings } = props

  const listItems = bookings.map(booking => (
    <MyBookingsListItem key={booking.id} booking={booking} />
  ))
  
  return (
    <div className="MyBookingsList">
      {
        bookings.length === 0 ?
          <p>Nothing to see here. Carry on.</p>
          : <ul className="MyBookingsList__list">{listItems}</ul>
      }
    </div>
  )
}

MyBookingsList.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.object)
}
