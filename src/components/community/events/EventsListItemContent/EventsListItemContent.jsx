import React from 'react'
import PropTypes from 'prop-types'

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

EventsListItemContent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    attendants: PropTypes.arrayOf(PropTypes.object),
    image: PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      info: PropTypes.string
    }),
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      title: PropTypes.string,
      avatar: PropTypes.string
    }),
    createdAt: PropTypes.string
  })
}
