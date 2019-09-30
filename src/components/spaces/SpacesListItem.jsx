import React from 'react'
import { useMutation } from '@apollo/react-hooks'
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
import { withAlert } from 'react-alert'

import { CREATE_BOOKING } from '../../graphql/constants'
import LoadingSpinner from '../LoadingSpinner'

function SpacesListItem(props) {
  const { space, selectedDate } = props
  const [createBooking, { data, loading, error }] = useMutation(CREATE_BOOKING)

  const handleNewBooking = () => {
    console.log(`---- New booking: ${selectedDate}, ${space.name}`)
    const formattedDate = new Date(selectedDate)
    console.log('---- Formatted date: ', formattedDate)
    createBooking({ variables: { date: selectedDate, spaceId: space.id } })
  }

  if (loading) { return <LoadingSpinner /> }
  if (error) {
    return props.alert.show('Booking could not be created. Please try again.')
  }
  if (data) {
    console.log('---- data: ', data)
  }

  return (
    <li className="NewsListItem">
      <div className="NewsListItem__image">
        <img src={space.image.url} alt="Space"/>
        {space.image.info ? <span>{space.image.info}</span> : null}
      </div>
      <div className="NewsListItem__content">
        <div>
          <div className="NewsListItem__content__top-row">
            <p className="created-at">
              {space.type.charAt(0).toUpperCase() + space.type.slice(1)}
            </p>
          </div>

          <h2>{space.name}</h2>
        </div>

        <div>
          <div className="NewsListItem__content__utilities">
            {space.coffee && <FontAwesomeIcon icon={faCoffee} />}
            {space.wifi && <FontAwesomeIcon icon={faWifi} />}
            {space.tea && <FontAwesomeIcon icon={faMugHot} />}
            {space.snacks && <FontAwesomeIcon icon={faCookieBite} />}
            {space.meals && <FontAwesomeIcon icon={faUtensils} />}
          </div>

          <div className="NewsListItem__content__details">
            <FontAwesomeIcon icon={faMapPin} />
            <p>{space.address}, {space.city}</p>
          </div>

          <div className="NewsListItem__content__details">
            <FontAwesomeIcon icon={faChair} />
            <p>Capacity: {space.capacity}</p> 
          </div>

          <div className="NewsListItem__content__details">
            <FontAwesomeIcon icon={faClock} />
            <p>{space.opensAt} - {space.closesAt}</p>
          </div>

          <div className="NewsListItem__content__booking-btn">
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

export default withAlert()(SpacesListItem)