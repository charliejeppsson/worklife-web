import React from 'react'
import EventsListItem from './EventsListItem'

export default function EventsList(props) {
  const { events } = props

  const listItems = events.map(event => (
    <EventsListItem key={event.id} event={event} />
  ))

  return (
    <div className="NewsList__container">
      <ul className="NewsList__list">{listItems}</ul>
    </div>
  )
}
