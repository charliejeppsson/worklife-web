import React from 'react'
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
      <CollabInfo collab={collab} />

      <div className="CollabsListItemContent__attendants">
        {collabParticipants()}
      </div> 
    </div>
  )
}
