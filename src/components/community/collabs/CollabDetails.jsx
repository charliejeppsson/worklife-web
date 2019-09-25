import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'

import ContentSignature from '../../ContentSignature'
import CollabInfo from './CollabInfo'
import LoadingSpinner from '../../LoadingSpinner'

export default function CollabDetails(props) {
  const collabId = useState(props.location.state.collabId)[0]

  const { loading, error, data } = useQuery(gql`
    {
      collab(id: ${collabId}) {
        id
        title
        description
        duration
        compensation
        createdAt
        participants {
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

  const renderParticipationsList = (participants) => (
    participants.map((participant) => (
      <ContentSignature key={participant.id} user={participant} />
    ))
  )

  return (
    <div className="body__container">
      {
        loading ? <LoadingSpinner />
        : <div className="NewsDetails__container">
            <div className="NewsDetails__hero">
              <div className="NewsDetails__hero__title-background"></div>
              <h1 className="NewsDetails__hero__title">{data.collab.title}</h1> 
              <img src={data.collab.image.url} alt={data.collab.title} />
            </div>

            <div className="NewsDetails__content">
              <p className="NewsDetails__timestamp">
                {formatTimestamp(data.collab.createdAt)}
              </p>
              <p>{data.collab.description}</p> 

              <CollabInfo collab={data.collab} />

              <h2>Initiator</h2>
              <ContentSignature key={data.collab.user.id} user={data.collab.user} />
              
              <h2>Participants</h2>
              {renderParticipationsList(data.collab.participants)}
            </div>
          </div>
      }
    </div>
  )
}
