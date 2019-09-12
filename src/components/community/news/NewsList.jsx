import React from 'react'
import NewsListItem from './NewsListItem'

export default function NewsList(props) {
  const { newsPosts } = props

  const listItems = newsPosts.map(newsPost => (
    <NewsListItem key={newsPost.id} newsPost={newsPost} />
  ))

  return (
    <div className="NewsList__container">
      <ul className="NewsList__list">{listItems}</ul>
    </div>
  )
}
