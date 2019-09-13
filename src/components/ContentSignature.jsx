import React from 'react'

export default function ContentSignature(props) {
  const { user } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  return (
    <div className="ContentSignature__container">
      <img
        className="ContentSignature__image"
        src={user.avatar || defaultAvatarUrl}
        title={user.firstName + ' ' + user.lastName}
        alt={user.firstName + ' ' + user.lastName}
      />
      <div className="ContentSignature__info">
        <span className="ContentSignature__name">
          {user.firstName} {user.lastName}
          <br />
        </span>

        <span>{user.title}</span>
      </div>
    </div>
  )
}
