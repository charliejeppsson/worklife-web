import React from 'react'
import PropTypes from 'prop-types'

import NewsListItem from '../NewsListItem/NewsListItem'
import './NewsList.scss'

export default function NewsList(props) {
  const { newsPosts } = props

  const listItems = newsPosts.map(newsPost => (
    <NewsListItem key={newsPost.id} newsPost={newsPost} />
  ))

  return <ul className="NewsList__list">{listItems}</ul>
}

NewsList.propTypes = {
  newsPosts: PropTypes.arrayOf(PropTypes.object)
}
