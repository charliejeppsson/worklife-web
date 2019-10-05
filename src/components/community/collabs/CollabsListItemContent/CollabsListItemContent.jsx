import React from 'react'
import PropTypes from 'prop-types'

import CollabInfo from '../CollabInfo/CollabInfo'
import './CollabsListItemContent.scss'

export default function CollabsListItemContent(props) {
  const { collab } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'
  
  const collabParticipants = () => (
    collab.participants.map((p) => (
      <img
        key={p.id}
        src={p.avatar || defaultAvatarUrl}
        title={p.firstName + ' ' + (p.lastName || '')}
        alt={p.firstName + ' ' + (p.lastName || '')}
       />
    ))
  )

  return (
    <div className="CollabsListItemContent">
      <CollabInfo duration={collab.duration} compensation={collab.compensation} />

      <div className="CollabsListItemContent__attendants">
        {collabParticipants()}
      </div> 
    </div>
  )
}

CollabsListItemContent.propTypes = {
  collab: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    compensation: PropTypes.number,
    participants: PropTypes.arrayOf(PropTypes.object),
    image: PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      info: PropTypes.string
    }),
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      title: PropTypes.string,
      avatar: PropTypes.string
    }),
    createdAt: PropTypes.string
  })
}
