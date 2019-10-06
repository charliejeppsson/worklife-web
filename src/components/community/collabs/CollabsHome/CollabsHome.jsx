import React, { useRef, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { COLLABS } from '../../../../graphql/constants'
import CollabForm from '../CollabForm/CollabForm'
import CollabsList from '../CollabsList/CollabsList'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import useOutsideClick from '../../../../utils/useOutsideClick'
import './CollabsHome.scss'

export default function CollabsHome() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { loading, error, data } = useQuery(COLLABS)
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef, () => setShowCreateModal(false))

  if (error) return <p>Error :(</p>;

  return (
    <div className="CollabsHome">
      <button
        className="CollabsHome__add-event-btn"
        onClick={() => setShowCreateModal(!showCreateModal)}
      >
        +
      </button>

      {
        showCreateModal ?
          <CollabForm
            wrapperRef={wrapperRef}
            closeModal={() => setShowCreateModal(false)}
          />
          : null
      }

      {loading ? <LoadingSpinner /> : <CollabsList collabs={data.collabs} />}
    </div>
  )
}
