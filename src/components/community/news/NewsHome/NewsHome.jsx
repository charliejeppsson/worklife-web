import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { NEWS_POSTS } from '../../../../graphql/queries/newsPost'
import NewsList from '../NewsList/NewsList'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './NewsHome.scss'

export default function NewsHome() {
  const { loading, error, data } = useQuery(NEWS_POSTS)

  if (error) return <p>Error :(</p>

  return (
    <div className="NewsHome">
      {loading ? <LoadingSpinner /> : <NewsList newsPosts={data.newsPosts} />}
    </div>
  )
}
