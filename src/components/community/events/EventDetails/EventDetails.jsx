import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import moment from 'moment'
import PropTypes from 'prop-types'

import { EVENT } from '../../../../graphql/queries/event'
import { ATTEND_EVENT } from '../../../../graphql/mutations/event'
import AuthContext from '../../../../context/authContext'
import ContentSignature from '../../../ContentSignature/ContentSignature'
import EventInfo from '../EventInfo/EventInfo'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './EventDetails.scss'

export default function EventDetails(props) {
  const { eventId } = props.location.state
  const { loading, error, data } = useQuery(
    EVENT,
    { variables: { id: eventId } }
  )
  const attendEvent = useMutation(ATTEND_EVENT)[0]
  const { currentUser } = useContext(AuthContext)
  const alert = useAlert()

  const formatTimestamp = (date) => (
    moment(new Date(date)).format('MMM Do YYYY')
  )

  const renderAttendantsList = (attendants) => (
    attendants.map((attendant) => (
      <ContentSignature key={attendant.id} user={attendant} />
    ))
  )

  const handleEventSignUp = async (e) => {
    e.preventDefault()
    let myAttendance = null
    if (data.event.attendants) {
      myAttendance = data.event.attendants.find((attendant) => (
        parseInt(attendant.id) === currentUser.id) 
      )
    }
    if (myAttendance) {
      alert.show('You already signed up for this event!', { type: 'info' })
    } else {
      await attendEvent({
        variables: { id: data.event.id },
        update: (store, { data: { attendEvent } }) => {
          if (attendEvent.success) {
            updateEventCache(store, attendEvent.event)
            alert.show('Sign-up successful!', { type: 'success' })
          }
        }
      })
    }
  }

  const updateEventCache = (store, updatedEvent) => {
    try { // Update event object in Apollo cache/store (everywhere)
      store.writeQuery({ query: EVENT, data: { event: updatedEvent } })
    } catch(err) {
      console.warn(err)
    }
  }

  if (error) { return <p>Error :(</p> }

  return (
    <div className="EventDetails">
      {
        loading ? <LoadingSpinner />
        : <div className="EventDetails__container">
            <div className="EventDetails__hero">
              <div className="EventDetails__hero__title-background"></div>
              <h1 className="EventDetails__hero__title">{data.event.title}</h1> 
              {
                parseInt(data.event.user.id) !== currentUser.id ?
                  <div className="EventDetails__hero__btn-container">
                    <button
                      className="worklife-btn"
                      onClick={(e) => handleEventSignUp(e)}
                    >
                      Sign up for event
                    </button>
                  </div>
                  : null
              }
              <img src={data.event.image.url} alt={data.event.title} />
            </div>

            <div className="EventDetails__content">
              <p className="EventDetails__timestamp">
                {formatTimestamp(data.event.createdAt)}
              </p>
              <p>{data.event.description}</p> 

              <EventInfo event={data.event} />

              <h2>Host</h2>
              <ContentSignature key={data.event.user.id} user={data.event.user} />
              
              <h2>Attendants</h2>
              {
                data.event.attendants ? 
                  renderAttendantsList(data.event.attendants)
                  : <p>No attendants yet.</p> 
              }
            </div>
          </div>
      }
    </div>
  )
}

EventDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      eventId: PropTypes.string
    })
  })
}
