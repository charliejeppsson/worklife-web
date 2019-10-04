import React from 'react'

import EventInfo from '../EventInfo/EventInfo'
import './EventsListItemContent.scss'

export default function EventsListItemContent(props) {
  const { event } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  const eventAttendants = () => (
    event.attendants.map((a) => (
      <img
        key={a.id}
        src={a.avatar || defaultAvatarUrl}
        title={a.firstName + ' ' + (a.lastName || '')}
        alt={a.firstName + ' ' + (a.lastName || '')}
       />
    ))
  )

  return (
    <div className="EventsListItemContent">
      <EventInfo event={event} />

      <div className="EventsListItemContent__attendants">
        {eventAttendants()}
      </div> 
    </div>
  )
}
