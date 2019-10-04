import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { MY_BOOKINGS } from '../../../graphql/constants'
import MyBookingsList from '../MyBookingsList/MyBookingsList'
import LoadingSpinner from '../../LoadingSpinner'
import './MyBookingsHome.scss'

export default function MyBookingsHome() {
  const { loading, error, data } = useQuery(MY_BOOKINGS)

  if (error) return <p>Error :(</p>

  return (
    <div className="MyBookingsHome">
      {loading ? <LoadingSpinner /> : <MyBookingsList bookings={data.myBookings} />}
    </div>
  )
}
