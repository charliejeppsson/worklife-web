import React from 'react'
import moment from 'moment'

import users from '../../fakeData/users'
import events from '../../fakeData/events'
import collabs from '../../fakeData/collabs'
import NewsListItemEventContent from './NewsListItemEventContent'
import NewsListItemCollabContent from './NewsListItemCollabContent'
import Tag from '../Tag'

export default function NewsListItem(props) {
  const { newsPost } = props

  const defaultAvatarUrl = 'https://res.cloudinary.com/charliejeppsson/image/upload/v1567786133/avatar-placeholder_lf2gzx.png'

  const event = events.find((event) => event.id === newsPost.eventId)
  const author = users.find((user) => user.id === newsPost.userId)
  const collab = collabs.find((collab) => collab.id === newsPost.collabId)

  const formatCreatedAt = date => {
    const dateObject = new Date(date)
    return moment(dateObject).fromNow()
  }

  return (
    <li className="NewsListItem">
      <div className="NewsListItem__image">
        <img src={newsPost.image.url} />
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
          {
            !newsPost.eventId ?
              <p className="NewsListItem__content__description">
                {newsPost.description}
              </p>
              : null
          }
        </div>
        
        { // If regular news post
          !newsPost.eventId && !newsPost.collabId ?
            <div className="NewsListItem__content__author">
              <img
                className="author-image"
                src={author.imageUrl || defaultAvatarUrl}
                title={author.firstName + ' ' + author.lastName}
              />
              <div className="author-info">
                <span className="author-name">
                  {author.firstName} {author.lastName}
                  <br />
                </span>

                <span>{author.title}</span>
              </div>
            </div>
            : null
        }

        {newsPost.eventId ? <NewsListItemEventContent event={event} /> : null}
        {newsPost.collabId ? <NewsListItemCollabContent collab={collab}/> : null}
      </div>
    </li>
  )
}
