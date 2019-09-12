import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export default function NewsListItemEventContent(props) {
  const { collab } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'
  
  const collabParticipants = () => (
    collab.participations.map((p) => (
      <img
        key={p.user.id}
        src={p.user.avatar || defaultAvatarUrl}
        title={p.user.firstName + ' ' + (p.user.lastName || '')}
        alt="Participant"
       />
    ))
  )

  return (
    <div>
      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faClock} />
        <p>{collab.duration}</p>
      </div>

      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faDollarSign} />
        <p>{collab.compensation}</p>
      </div>

      <div className="NewsListItem__content__attendants">
        {collabParticipants()}
      </div> 
    </div>
  )
}
