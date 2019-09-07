import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import users from '../../fakeData/users'
import attendances from '../../fakeData/attendances'
import spaces from '../../fakeData/spaces'

export default function NewsListItemEventContent(props) {
  const { event } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  const eventSpace = (spaceId) => spaces.find((space) => space.id === spaceId)

  const eventAttendants = (eventId) => {
    const eventAttendances = attendances.filter((attendance) => (
      attendance.eventId === eventId
    ))
    return eventAttendances.map((attendance) => {
      const attendant = users.find((user) => user.id === attendance.userId)
      return <img
        key={attendant.id}
        src={attendant.imageUrl || defaultAvatarUrl}
        title={attendant.firstName + ' ' + (attendant.lastName || '')}
        alt="attendant photo"
       />
    })
  } 

  const formatEventDate = date => {
    const dateObject = new Date(date)
    return moment(dateObject).format('h:mm a MMMM Do')
  }

  return (
    <div>
      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faMapPin} />
        <p>{eventSpace(event.spaceId).name}, {eventSpace(event.spaceId).address}</p>
      </div>

      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faClock} />
        <p>{formatEventDate(event.startTime)} - {formatEventDate(event.endTime)}</p>
      </div>

      <div className="NewsListItem__content__attendants">
        {eventAttendants(event.id)}
      </div> 
    </div>
  )
}
