import React from 'react'
import EventInfo from './EventInfo'

export default function EventListItemContent(props) {
  const { event } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  const eventAttendants = () => (
    event.attendants.map((a) => (
      <img
        alt="Attendant"
        key={a.id}
        src={a.avatar || defaultAvatarUrl}
        title={a.firstName + ' ' + (a.lastName || '')}
       />
    ))
  )

  return (
    <div>
      <EventInfo event={event} />

      <div className="NewsListItem__content__attendants">
        {eventAttendants()}
      </div> 
    </div>
  )
}
