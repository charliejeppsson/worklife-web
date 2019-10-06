import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faClock, faChair } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import { MY_BOOKINGS } from '../../../graphql/queries/booking'
import { CANCEL_BOOKING } from '../../../graphql/mutations/booking'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import './MyBookingsListItem.scss'

export default function MyBookingsListItem(props) {
  const { booking } = props
  const [cancelBooking, { loading, error }] = useMutation(CANCEL_BOOKING)
  const alert = useAlert()

  const formatBookingDate = date => {
    const dateObject = new Date(date)
    return moment(dateObject).format('YYYY-MM-DD')
  }

  const handleCancelBooking = async () => {
    await cancelBooking({
      variables: { id: booking.id },
      update: (store, { data: { cancelBooking } }) => {
        try {
          // Read the myBookings data present in the store
          const data = store.readQuery({ query: MY_BOOKINGS })
          // Remove the booking from the myBookings state
          if (cancelBooking.success) {
            // Filter the deleted booking out of the cached data 
            const updatedMyBookings = data.myBookings
              .filter(b => b.id !== booking.id)
            // Write our new myBookings list back to the store
            store.writeQuery({
              query: MY_BOOKINGS,
              data: { myBookings: updatedMyBookings }
            })
          }
        } catch(err) {
          console.warn(err)
        }
      }
    })
  }

  if (loading) { return <li className="MyBookingsListItem"><LoadingSpinner /></li> }
  if (error) { return alert.show('The booking could not be cancelled.') }

  return (
    <li className="MyBookingsListItem">
      <div className="MyBookingsListItem__image">
        <img src={booking.space.image.url} alt="Space"/>
        {booking.space.image.info ? <span>{booking.space.image.info}</span> : null}
      </div>
      <div className="MyBookingsListItem__content">
        <div>
          <div className="MyBookingsListItem__content__top-row">
            <p className="created-at">{formatBookingDate(booking.date)}</p>
          </div>

          <h2>{booking.space.name}</h2>
        </div>

        <div>
          <div className="MyBookingsListItem__content__details">
            <FontAwesomeIcon icon={faMapPin} />
            <p>{booking.space.address}, {booking.space.city}</p>
          </div>

          <div className="MyBookingsListItem__content__details">
            <FontAwesomeIcon icon={faChair} />
            <p>Capacity: {booking.space.capacity}</p> 
          </div>

          <div className="MyBookingsListItem__content__details">
            <FontAwesomeIcon icon={faClock} />
            <p>{booking.space.opensAt} - {booking.space.closesAt}</p>
          </div>

          <div className="MyBookingsListItem__content__booking-btn">
            <button
              className="worklife-btn"
              onClick={handleCancelBooking}
            >
              Cancel booking
            </button> 
          </div>
        </div>
      </div>
    </li>
  )
}

MyBookingsListItem.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    userId: PropTypes.string,
    space: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      address: PropTypes.string,
      city: PropTypes.string,
      type: PropTypes.string,
      capacity: PropTypes.number,
      opensAt: PropTypes.string,
      closesAt: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string,
        info: PropTypes.string
      })
    })
  })
}
