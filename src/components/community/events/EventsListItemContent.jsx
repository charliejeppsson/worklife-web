import React from 'react'
import EventInfo from './EventInfo'

export default function EventListItemContent(props) {
  const { event } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  const eventAttendants = () => (
    event.attendances.map((a) => (
      <img
        key={a.user.id}
        src={a.user.avatar || defaultAvatarUrl}
        title={a.user.firstName + ' ' + (a.user.lastName || '')}
        alt="Attendant"
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
