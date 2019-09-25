import React from 'react'
import CollabInfo from './CollabInfo'

export default function NewsListItemEventContent(props) {
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
    <div>
      <CollabInfo collab={collab} />

      <div className="NewsListItem__content__attendants">
        {collabParticipants()}
      </div> 
    </div>
  )
}
