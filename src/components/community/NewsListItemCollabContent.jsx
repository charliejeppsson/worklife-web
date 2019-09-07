import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import users from '../../fakeData/users'
import participations from '../../fakeData/participations'

export default function NewsListItemEventContent(props) {
  const { collab } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'
  
  const collabParticipants = (collabId) => {
    const collabParticipations = participations.filter((participation) => (
      participation.collabId === collabId
    ))
    return collabParticipations.map((participation) => {
      const participant = users.find((user) => user.id === participation.userId)
      return <img
        key={participant.id}
        src={participant.imageUrl || defaultAvatarUrl}
        title={participant.firstName + ' ' + participant.lastName}
        alt="attendant photo"
       />
    })
  }

  return (
    <div>
      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faClock} />
        <p>{collab.duration}</p>
      </div>

      <div className="NewsListItem__content__details">
        <FontAwesomeIcon icon={faDollarSign} />
        <p>{collab.pay}</p>
      </div>

      <div className="NewsListItem__content__attendants">
        {collabParticipants(collab.id)}
      </div> 
    </div>
  )
}
