import React, { useState } from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import ContentSignature from '../../ContentSignature'

export default function NewsDetails(props) {
  const newsPostId = useState(props.location.state.newsPostId)[0]

  const { loading, error, data } = useQuery(gql`
    {
      newsPost(id: ${newsPostId}) {
        id
        title
        description
        content
        createdAt
        userId
        user {
          id
          firstName
          lastName
          title
          avatar
        }
        imageId
        image {
          url
          info
        }
        eventId
        event {
          title
          description
          startTime
          endTime
          space {
            name
            address
          }
          attendances {
            user {
              id
              firstName
              lastName
              avatar
            }
          }
        }
        collabId
        collab {
          title
          description
          duration
          compensation
          participations {
            user {
              id
              firstName
              lastName
              avatar
            }
          }
        }
      }
    }
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const formatTimestamp = (date) => (
    moment(new Date(date)).format('MMM Do YYYY')
  )

  return (
    <div className="body__container">
      <div className="NewsDetails__container">
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
    </div>
  )
}
