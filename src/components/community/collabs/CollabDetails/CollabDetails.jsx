import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'
import PropTypes from 'prop-types'

import CollabInfo from '../CollabInfo/CollabInfo'
import ContentSignature from '../../../ContentSignature/ContentSignature'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './CollabDetails.scss'

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
    <div className="CollabDetails">
      {
        loading ? <LoadingSpinner />
        : <div className="CollabDetails__container">
            <div className="CollabDetails__hero">
              <div className="CollabDetails__hero__title-background"></div>
              <h1 className="CollabDetails__hero__title">{data.collab.title}</h1> 
              <img src={data.collab.image.url} alt={data.collab.title} />
            </div>

            <div className="CollabDetails__content">
              <p className="CollabDetails__timestamp">
                {formatTimestamp(data.collab.createdAt)}
              </p>
              <p>{data.collab.description}</p> 

              <CollabInfo
                duration={data.collab.duration}
                compensation={data.collab.compensation}
              />

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

CollabDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      collabId: PropTypes.string
    })
  })
}
