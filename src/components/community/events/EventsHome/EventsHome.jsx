import React, { useRef, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { EVENTS } from '../../../../graphql/constants'
import EventForm from '../EventForm/EventForm'
import EventsList from '../EventsList/EventsList'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import useOutsideClick from '../../../../utils/useOutsideClick'
import './EventsHome.scss'

export default function EventsHome() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { loading, error, data } = useQuery(EVENTS)
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef, () => setShowCreateModal(false))

  if (error) return <p>Error :(</p>

  return (
    <div className="EventsHome">
      <button
        className="EventsHome__add-event-btn"
        onClick={() => setShowCreateModal(!showCreateModal)}
      >
        +
      </button>

      {
        showCreateModal ?
          <EventForm
            wrapperRef={wrapperRef}
            closeModal={() => setShowCreateModal(false)}
          />
          : null
      }

      {loading ? <LoadingSpinner /> : <EventsList events={data.events} />}
    </div>
  )
}
