import React from 'react'

import MyBookingsListItem from './MyBookingsListItem'

export default function MyBookingsList(props) {
  const { bookings } = props

  const listItems = bookings.map(booking => (
    <MyBookingsListItem key={booking.id} booking={booking} />
  ))
  
  return (
    <div className="NewsList__container">
      {
        bookings.length === 0 ?
          <p>Nothing to see here. Carry on.</p>
          : <ul className="NewsList__list">{listItems}</ul>
      }
    </div>
  )
}
