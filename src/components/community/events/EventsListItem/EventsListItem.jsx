import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import EventsListItemContent from '../EventsListItemContent/EventsListItemContent'
import './EventsListItem.scss'

export default function EventsListItem(props) {
  const { event } = props

  const formatCreatedAt = date => {
    const dateObject = new Date(date)
    return moment(dateObject).fromNow()
  }

  return (
    <Link to={{
      pathname: "/community/events/" + event.id,
      state: { eventId: event.id }
    }}>
      <li className="EventsListItem">
        <div className="EventsListItem__image">
          <img src={event.image.url} alt="Event"/>
          {event.image.info ? <span>{event.image.info}</span> : null}
        </div>
        <div className="EventsListItem__content">
          <div>
            <div className="EventsListItem__content__top-row">
              <p className="created-at">{formatCreatedAt(event.createdAt)}</p>
            </div>

            <h2>{event.title}</h2>

            <p className="EventsListItem__content__description">
              {event.description}
            </p>
          </div>
        
          <EventsListItemContent event={event} />
        </div>
      </li>
    </Link>
  )
}

EventsListItem.propTypes = {
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
