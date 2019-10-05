import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { EVENTS } from '../../../../graphql/constants'
import EventForm from '../EventForm/EventForm'
import EventsList from '../EventsList/EventsList'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './EventsHome.scss'

export default function EventsHome() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { loading, error, data } = useQuery(EVENTS)

  if (error) return <p>Error :(</p>

  return (
    <div className="EventsHome">
      <button
        className="EventsHome__add-event-btn"
        onClick={() => setShowCreateModal(!showCreateModal)}
      >
        +
      </button>

      {showCreateModal ? <EventForm toggleModal={setShowCreateModal} /> : null}
      {loading ? <LoadingSpinner /> : <EventsList events={data.events} />}
    </div>
  )
}
