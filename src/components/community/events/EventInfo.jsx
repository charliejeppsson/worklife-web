import React from 'react'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export default function EventInfo(props) {
  const { event } = props

  const formatEventDate = date => {
    const dateObject = new Date(date)
    return moment(dateObject).format('h:mm a MMM Do')
  }

  return (
    <div>
      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faMapPin} />
        <p>{event.space.name}, {event.space.address}</p>
      </div>

      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faClock} />
        <p>{formatEventDate(event.startTime)} - {formatEventDate(event.endTime)}</p>
      </div>
    </div>
  )
}
