import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { MY_BOOKINGS } from '../../graphql/constants'
import MyBookingsList from './MyBookingsList'
import LoadingSpinner from '../LoadingSpinner'

export default function MyBookingsHome() {
  const { loading, error, data } = useQuery(MY_BOOKINGS)

  if (error) return <p>Error :(</p>

  return (
    <div className="body__container">
      {loading ? <LoadingSpinner /> : <MyBookingsList bookings={data.myBookings} />}
    </div>
  )
}
