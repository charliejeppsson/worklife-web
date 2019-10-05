import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import './EventInfo.scss'

export default function EventInfo(props) {
  const { event } = props

  const formatEventDate = date => {
    const dateObject = new Date(date)
    return moment(dateObject).format('h:mm a MMM Do')
  }

  return (
    <div className="EventInfo">
      <div className="EventInfo__details">
        <FontAwesomeIcon icon={faMapPin} />
        <p>{event.space.name}, {event.space.address}</p>
      </div>

      <div className="EventInfo__details">
        <FontAwesomeIcon icon={faClock} />
        <p>{formatEventDate(event.startTime)} - {formatEventDate(event.endTime)}</p>
      </div>
    </div>
  )
}

EventInfo.propTypes = {
  event: PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    space: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.string
    })
  })
}
