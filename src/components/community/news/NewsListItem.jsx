import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import EventsListItemContent from '../events/EventsListItemContent'
import CollabsListItemContent from '../collabs/CollabsListItemContent'
import Tag from '../../Tag/Tag'
import ContentSignature from '../../ContentSignature/ContentSignature'

export default function NewsListItem(props) {
  const { newsPost } = props

  const formatCreatedAt = date => {
    const dateObject = new Date(date)
    return moment(dateObject).fromNow()
  }

  return (
    <Link to={{
      pathname: "/community/news/" + newsPost.id,
      state: { newsPostId: newsPost.id }
    }}>
      <li className="NewsListItem">
        <div className="NewsListItem__image">
          <img src={newsPost.image.url} alt="News"/>
          {newsPost.image.info ? <span>{newsPost.image.info}</span> : null}
        </div>
        <div className="NewsListItem__content">
          <div>
            <div className="NewsListItem__content__top-row">
              <p className="created-at">{formatCreatedAt(newsPost.createdAt)}</p>
              {newsPost.eventId ? <Tag title="Event" /> : null}
              {newsPost.collabId ? <Tag title="Collab" /> : null}
              {!newsPost.eventId && !newsPost.collabId ? <Tag title="News" /> : null}
            </div>
            <h2>{newsPost.title}</h2>
            <p className="NewsListItem__content__description">
              {newsPost.description}
            </p>
          </div>
          
          { // If regular news post
            !newsPost.eventId && !newsPost.collabId ?
              <ContentSignature user={newsPost.user} /> 
              : null
          }

          {newsPost.eventId ? <EventsListItemContent event={newsPost.event} /> : null}
          {newsPost.collabId ? <CollabsListItemContent collab={newsPost.collab}/> : null}
        </div>
      </li>
    </Link>
  )
}
