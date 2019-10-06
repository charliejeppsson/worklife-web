import React, { useState } from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

import { NEWS_POST } from '../../../../graphql/queries/newsPost'
import ContentSignature from '../../../ContentSignature/ContentSignature'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './NewsDetails.scss'

export default function NewsDetails(props) {
  const newsPostId = useState(props.location.state.newsPostId)[0]
  const { loading, error, data } = useQuery(NEWS_POST, {
    variables: { id: newsPostId }
  })

  const formatTimestamp = (date) => (
    moment(new Date(date)).format('MMM Do YYYY')
  )

  if (error) return <p>Error :(</p>

  return (
    <div className="NewsDetails">
      {
        loading ? <LoadingSpinner />
        : <div className="NewsDetails__container">
            <div className="NewsDetails__hero">
              <div className="NewsDetails__hero__title-background"></div>
              <h1 className="NewsDetails__hero__title">{data.newsPost.title}</h1> 
              <img src={data.newsPost.image.url} alt={data.newsPost.title} />
            </div>

            <div className="NewsDetails__content">
              <p className="NewsDetails__timestamp">
                {formatTimestamp(data.newsPost.createdAt)}
              </p>
              <p>{data.newsPost.content}</p> 

              <ContentSignature user={data.newsPost.user} />
            </div>
          </div>
      }
    </div>
  )
}

NewsDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      newsPostId: PropTypes.string
    })
  })
}
