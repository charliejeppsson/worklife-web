import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import { useAlert } from 'react-alert'
import moment from 'moment'
import PropTypes from 'prop-types'

import { COLLAB } from '../../../../graphql/queries/collab'
import { JOIN_COLLAB } from '../../../../graphql/mutations/collab'
import AuthContext from '../../../../context/authContext'
import CollabInfo from '../CollabInfo/CollabInfo'
import ContentSignature from '../../../ContentSignature/ContentSignature'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './CollabDetails.scss'

export default function CollabDetails(props) {
  const { collabId } = props.location.state
  const { loading, error, data } = useQuery(
    COLLAB,
    { variables: { id: collabId } }
  )
  const joinCollab = useMutation(JOIN_COLLAB)[0]
  const { currentUser } = useContext(AuthContext)
  const alert = useAlert()

  const formatTimestamp = (date) => (
    moment(new Date(date)).format('MMM Do YYYY')
  )

  const renderParticipationsList = (participants) => (
    participants.map((participant) => (
      <ContentSignature key={participant.id} user={participant} />
    ))
  )

  const handleCollabSignUp = async (e) => {
    e.preventDefault()
    let myParticipation = null
    if (data.collab.participants) {
      myParticipation = data.collab.participants.find((participation) => (
        parseInt(participation.id) === currentUser.id) 
      )
    }
    if (myParticipation) {
      alert.show('You already signed up for this collab!', { type: 'info' })
    } else {
      await joinCollab({
        variables: { id: data.collab.id },
        update: (store, { data: { joinCollab } }) => {
          if (joinCollab.success) {
            updateCollabCache(store, joinCollab.collab)
            alert.show('Sign-up successful!', { type: 'success' })
          }
        }
      })
    }
  }

  const updateCollabCache = (store, updatedCollab) => {
    try { // Update collab object in Apollo cache/store (everywhere)
      store.writeQuery({ query: COLLAB, data: { collab: updatedCollab } })
    } catch(err) {
      console.warn(err)
    }
  }

  if (error) { return <p>Error :(</p> }

  return (
    <div className="CollabDetails">
      {
        loading ? <LoadingSpinner />
        : <div className="CollabDetails__container">
            <div className="CollabDetails__hero">
              <div className="CollabDetails__hero__title-background"></div>
              <h1 className="CollabDetails__hero__title">{data.collab.title}</h1> 
              {
                parseInt(data.collab.user.id) !== currentUser.id ?
                  <div className="CollabDetails__hero__btn-container">
                    <button
                      className="worklife-btn"
                      onClick={(e) => handleCollabSignUp(e)}
                    >
                      Sign up for collab
                    </button>
                  </div>
                  : null
              }
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
              {
                data.collab.participants ? 
                  renderParticipationsList(data.collab.participants)
                  : <p>No participants yet.</p> 
              }
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
