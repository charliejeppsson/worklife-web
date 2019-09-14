import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'

import ContentSignature from '../../ContentSignature'
import EventInfo from './EventInfo'

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
        attendances {
          user {
            id
            firstName
            lastName
            avatar
            title
          }
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

  console.log('DATA: ', data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const formatTimestamp = (date) => (
    moment(new Date(date)).format('MMM Do YYYY')
  )

  const renderAttendantsList = (attendances) => (
    attendances.map((attendance) => (
      <ContentSignature key={attendance.user.id} user={attendance.user} />
    ))
  )

  return (
    <div className="NewsDetails__container">
      <div className="NewsDetails__hero">
        <div className="NewsDetails__hero__title-background"></div>
        <h1 className="NewsDetails__hero__title">{data.event.title}</h1> 
        <img src={data.event.image.url} alt={data.event.title} />
      </div>

      <div className="NewsDetails__content">
        <p className="NewsDetails__timestamp">
          {formatTimestamp(data.event.createdAt)}
        </p>
        <p>{data.event.description}</p> 

        <EventInfo event={data.event} />

        <h2>Host</h2>
        <ContentSignature key={data.event.user.id} user={data.event.user} />
        
        <h2>Attendants</h2>
        {renderAttendantsList(data.event.attendances)}
      </div>
    </div>
  )
}
