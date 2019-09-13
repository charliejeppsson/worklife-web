import React, { useState } from 'react'
import moment from 'moment'
import ContentSignature from '../../ContentSignature'

export default function NewsDetails(props) {
  const newsPost = useState(props.location.state.newsPost)[0]

  const formatTimestamp = (date) => (
    moment(new Date(date)).format('MMM Do YYYY')
  )

  return (
    <div className="NewsDetails__container">
      <div className="NewsDetails__hero">
        <div className="NewsDetails__hero__title-background"></div>
        <h1 className="NewsDetails__hero__title">{newsPost.title}</h1> 
        <img src={newsPost.image.url} alt={newsPost.title} />
      </div>

      <div className="NewsDetails__content">
        <p className="NewsDetails__timestamp">
          {formatTimestamp(newsPost.createdAt)}
        </p>
        <p>{newsPost.content}</p> 

        <ContentSignature user={newsPost.user} />
      </div>
    </div>
  )
}
