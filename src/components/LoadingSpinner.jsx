import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function LoadingSpinner() {
  return (
    <div className="LoadingSpinner__container">
      <FontAwesomeIcon icon={faSpinner} />
    </div> 
  )
}
