import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import CollabsListItemContent from './CollabsListItemContent'

export default function CollabsListItem(props) {
  const { collab } = props

  const formatCreatedAt = date => {
    const dateObject = new Date(date)
    return moment(dateObject).fromNow()
  }

  return (
    <Link to={{
      pathname: "/community/collabs/" + collab.id,
      state: { collabId: collab.id }
    }}>
      <li className="NewsListItem">
        <div className="NewsListItem__image">
          <img src={collab.image.url} alt="Collab"/>
          {collab.image.info ? <span>{collab.image.info}</span> : null}
        </div>
        <div className="NewsListItem__content">
          <div>
            <div className="NewsListItem__content__top-row">
              <p className="created-at">{formatCreatedAt(collab.createdAt)}</p>
            </div>

            <h2>{collab.title}</h2>

            <p className="NewsListItem__content__description">
              {collab.description}
            </p>
          </div>
        
          <CollabsListItemContent collab={collab} />
        </div>
      </li>
    </Link>
  )
}
