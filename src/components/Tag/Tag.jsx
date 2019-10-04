import React from 'react'
import './Tag.scss'

export default function Tag(props) {
  const { title } = props

  return (
    <div className={`Tag__container Tag__container--${title.toLowerCase()}`}>
      <p>{title}</p> 
    </div>
  )
}


