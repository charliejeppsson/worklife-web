import React from 'react'
import SpacesListItem from './SpacesListItem'

export default function SpacesList(props) {
  const { spaces } = props

  const listItems = spaces.map(space => (
    <SpacesListItem key={space.id} space={space} />
  ))

  return (
    <div className="NewsList__container">
      <ul className="NewsList__list">{listItems}</ul>
    </div>
  )
}
