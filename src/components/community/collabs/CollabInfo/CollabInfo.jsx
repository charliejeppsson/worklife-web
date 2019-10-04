import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import './CollabInfo.scss'

export default function CollabInfo(props) {
  const { collab } = props

  const formatDuration = duration => {
    const monthAmount = Math.ceil(duration / 30)
    if (monthAmount === 0) {
      return 'Indefinitely'
    } else if (monthAmount === 1) {
      return `${monthAmount} month`
    } else {
      return `${monthAmount} months`
    }
  }

  const formatCompensation = compensation => {
    if (compensation === 0) {
      return 'Unpaid'
    } else {
      return compensation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  }

  return (
    <div>
      <div className="CollabInfo__details">
        <FontAwesomeIcon icon={faClock} />
        <p>{formatDuration(collab.duration)}</p>
      </div>

      <div className="CollabInfo__details">
        <FontAwesomeIcon icon={faDollarSign} />
        <p>{formatCompensation(collab.compensation)}</p>
      </div>
    </div>
  )
}
