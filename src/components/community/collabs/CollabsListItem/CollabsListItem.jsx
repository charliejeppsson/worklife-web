import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import CollabsListItemContent from '../CollabsListItemContent/CollabsListItemContent'
import './CollabsListItem.scss'

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
      <li className="CollabsListItem">
        <div className="CollabsListItem__image">
          <img src={collab.image.url} alt="Collab"/>
          {collab.image.info ? <span>{collab.image.info}</span> : null}
        </div>
        <div className="CollabsListItem__content">
          <div>
            <div className="CollabsListItem__content__top-row">
              <p className="created-at">{formatCreatedAt(collab.createdAt)}</p>
            </div>

            <h2>{collab.title}</h2>

            <p className="CollabsListItem__content__description">
              {collab.description}
            </p>
          </div>
        
          <CollabsListItemContent collab={collab} />
        </div>
      </li>
    </Link>
  )
}

CollabsListItem.propTypes = {
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
