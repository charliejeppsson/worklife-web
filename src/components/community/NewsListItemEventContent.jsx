import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export default function NewsListItemEventContent(props) {
  const { event } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  const eventAttendants = () => {
    const attendants = event.attendances.map((a) => a.user)
    return attendants.map((attendant) => (
      <img
        key={attendant.id}
        src={attendant.avatar || defaultAvatarUrl}
        title={attendant.firstName + ' ' + (attendant.lastName || '')}
        alt="attendant photo"
       />
    ))
  } 

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

      <div className="NewsListItem__content__attendants">
        {eventAttendants()}
      </div> 
    </div>
  )
}
