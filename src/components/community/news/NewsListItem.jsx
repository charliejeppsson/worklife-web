import React from 'react'
import moment from 'moment'

import EventsListItemContent from '../events/EventsListItemContent'
import CollabsListItemContent from '../collabs/CollabsListItemContent'
import Tag from '../../Tag'

export default function NewsListItem(props) {
  const { newsPost } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  const formatCreatedAt = date => {
    const dateObject = new Date(date)
    return moment(dateObject).fromNow()
  }

  return (
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
            <div className="NewsListItem__content__author">
              <img
                className="author-image"
                src={newsPost.user.avatar || defaultAvatarUrl}
                title={newsPost.user.firstName + ' ' + newsPost.user.lastName}
                alt="Author"
              />
              <div className="author-info">
                <span className="author-name">
                  {newsPost.user.firstName} {newsPost.user.lastName}
                  <br />
                </span>

                <span>{newsPost.user.title}</span>
              </div>
            </div>
            : null
        }

        {newsPost.eventId ? <EventsListItemContent event={newsPost.event} /> : null}
        {newsPost.collabId ? <CollabsListItemContent collab={newsPost.collab}/> : null}
      </div>
    </li>
  )
}
