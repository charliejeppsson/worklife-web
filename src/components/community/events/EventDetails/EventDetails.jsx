import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'

import ContentSignature from '../../../ContentSignature/ContentSignature'
import EventInfo from '../EventInfo/EventInfo'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './EventDetails.scss'

export default function EventDetails(props) {
  const eventId = useState(props.location.state.eventId)[0]

  const { loading, error, data } = useQuery(gql`
    {
      event(id: ${eventId}) {
        id
        title
        description
        startTime
        endTime
        createdAt
        space {
          name
          address
        }
        attendants {
          id
          firstName
          lastName
          avatar
          title
        }
        image {
          url
          info
        }
        user {
          firstName
          lastName
          title
          avatar
        }
      }
    }
  `)

  if (error) return <p>Error :(</p>;

  const formatTimestamp = (date) => (
    moment(new Date(date)).format('MMM Do YYYY')
  )

  const renderAttendantsList = (attendants) => (
    attendants.map((attendant) => (
      <ContentSignature key={attendant.id} user={attendant} />
    ))
  )

  return (
    <div className="EventDetails">
      {
        loading ? <LoadingSpinner />
        : <div className="EventDetails__container">
            <div className="EventDetails__hero">
              <div className="EventDetails__hero__title-background"></div>
              <h1 className="EventDetails__hero__title">{data.event.title}</h1> 
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
              {renderAttendantsList(data.event.attendants)}
            </div>
          </div>
      }
    </div>
  )
}