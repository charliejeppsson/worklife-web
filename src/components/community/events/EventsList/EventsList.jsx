import React from 'react'
import EventsListItem from '../EventsListItem/EventsListItem'
import './EventsList.scss'

export default function EventsList(props) {
  const { events } = props

  const listItems = events.map(event => (
    <EventsListItem key={event.id} event={event} />
  ))

  return (
    <div className="EventsList__container">
      <ul className="EventsList__list">{listItems}</ul>
    </div>
  )
}
