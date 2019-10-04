import React from 'react'

import CollabsListItem from '../CollabsListItem/CollabsListItem'
import './CollabsList.scss'

export default function CollabsList(props) {
  const { collabs } = props

  const listItems = collabs.map(collab => (
    <CollabsListItem key={collab.id} collab={collab} />
  ))

  return <ul className="CollabsList__list">{listItems}</ul>
}
