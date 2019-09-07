import React from 'react'
import NewsList from './NewsList'
import newsPosts from '../../fakeData/newsPosts'

export default function NewsHome() {
  return (
    <div className="body__container">
      <NewsList newsPosts={newsPosts} />
    </div>
  )
}
