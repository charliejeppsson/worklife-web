import React from 'react'
import CollabsListItem from './CollabsListItem'

export default function CollabsList(props) {
  const { collabs } = props

  const listItems = collabs.map(collab => (
    <CollabsListItem key={collab.id} collab={collab} />
  ))

  return (
    <div className="NewsList__container">
      <ul className="NewsList__list">{listItems}</ul>
    </div>
  )
}
