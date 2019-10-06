import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapPin,
  faClock,
  faChair,
  faWifi,
  faCoffee,
  faMugHot,
  faCookieBite,
  faUtensils
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import { MY_BOOKINGS } from '../../../graphql/queries/booking'
import { CREATE_BOOKING } from '../../../graphql/mutations/booking'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import './SpacesListItem.scss'

export default function SpacesListItem(props) {
  const { space, selectedDate } = props
  const [createBooking, { loading, error }] = useMutation(CREATE_BOOKING)
  const alert = useAlert()

  const handleNewBooking = async () => {
    await createBooking({
      variables: { date: selectedDate, spaceId: space.id },
      // Update myBookings list in Apollo cache/store
      update: (store, { data: { createBooking } }) => {
        try {
          // Read the myBookings data present in the store
          const data = store.readQuery({ query: MY_BOOKINGS })
          // Add the new booking to the myBookings state
          data.myBookings.push(createBooking)
          // Write our extended myBookings list back to the store
          store.writeQuery({
            query: MY_BOOKINGS,
            data: { myBookings: data.myBookings }
          })
        } catch(err) {
          console.warn(err)
        }
      }
    })
  }

  if (loading) { return <li className="SpacesListItem"><LoadingSpinner /></li> }
  if (error) { return alert.show('The booking could not be created.') }

  return (
    <li className="SpacesListItem">
      <div className="SpacesListItem__image">
        <img src={space.image.url} alt="Space"/>
        {space.image.info ? <span>{space.image.info}</span> : null}
      </div>
      <div className="SpacesListItem__content">
        <div>
          <div className="SpacesListItem__content__top-row">
            <p className="created-at">
              {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
            </p>
          </div>

          <h2>{space.name}</h2>
        </div>

        <div>
          <div className="SpacesListItem__content__utilities">
            {space.coffee && <FontAwesomeIcon icon={faCoffee} />}
            {space.wifi && <FontAwesomeIcon icon={faWifi} />}
            {space.tea && <FontAwesomeIcon icon={faMugHot} />}
            {space.snacks && <FontAwesomeIcon icon={faCookieBite} />}
            {space.meals && <FontAwesomeIcon icon={faUtensils} />}
          </div>

          <div className="SpacesListItem__content__details">
            <FontAwesomeIcon icon={faMapPin} />
            <p>{space.address}, {space.city}</p>
          </div>

          <div className="SpacesListItem__content__details">
            <FontAwesomeIcon icon={faChair} />
            <p>Capacity: {space.capacity}</p> 
          </div>

          <div className="SpacesListItem__content__details">
            <FontAwesomeIcon icon={faClock} />
            <p>{space.opensAt} - {space.closesAt}</p>
          </div>

          <div className="SpacesListItem__content__booking-btn">
            <button
              className="worklife-btn"
              onClick={() => handleNewBooking()}
            >
              Reserve your seat
            </button> 
          </div>
        </div>
      </div>
    </li>
  )
}

SpacesListItem.propTypes = {
  selectedDate: PropTypes.string,
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
}
