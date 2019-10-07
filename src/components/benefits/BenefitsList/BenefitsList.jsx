import React from 'react'
import PropTypes from 'prop-types'

import BenefitsListItem from '../BenefitsListItem/BenefitsListItem'
import './BenefitsList.scss'

export default function BenefitsList(props) {
  const { benefits } = props

  const listItems = benefits.map(benefit => (
    <BenefitsListItem key={benefit.id} benefit={benefit} />
  ))

  return <ul className="BenefitsList__list">{listItems}</ul>
}

BenefitsList.propTypes = {
  benefits: PropTypes.arrayOf(PropTypes.object)
}
