import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import EventsListItemContent from './EventsListItemContent'

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
      <li className="NewsListItem">
        <div className="NewsListItem__image">
          <img src={event.image.url} alt="Event"/>
          {event.image.info ? <span>{event.image.info}</span> : null}
        </div>
        <div className="NewsListItem__content">
          <div>
            <div className="NewsListItem__content__top-row">
              <p className="created-at">{formatCreatedAt(event.createdAt)}</p>
            </div>

            <h2>{event.title}</h2>

            <p className="NewsListItem__content__description">
              {event.description}
            </p>
          </div>
        
          <EventsListItemContent event={event} />
        </div>
      </li>
    </Link>
  )
}
