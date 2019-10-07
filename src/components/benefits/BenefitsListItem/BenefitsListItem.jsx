import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import './BenefitsListItem.scss'

export default function BenefitsListItem(props) {
  const { benefit } = props

  const formatCreatedAt = date => {
    const dateObject = new Date(date)
    return moment(dateObject).fromNow()
  }

  return (
    <li className="BenefitsListItem">
      <div className="BenefitsListItem__image">
        <img src={benefit.image.url} alt="News"/>
        {benefit.image.info ? <span>{benefit.image.info}</span> : null}
      </div>
      <div className="BenefitsListItem__content">
        <div>
          <div className="BenefitsListItem__content__top-row">
            <p className="created-at">{formatCreatedAt(benefit.createdAt)}</p>
          </div>
          <h2>{benefit.title}</h2>
          <p className="BenefitsListItem__content__description">
            {benefit.description}
          </p>
        </div>
      </div>
    </li>
  )
}

BenefitsListItem.propTypes = {
  benefit: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    company: PropTypes.string,
    image: PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      info: PropTypes.string
    }),
    createdAt: PropTypes.string
  })
}
