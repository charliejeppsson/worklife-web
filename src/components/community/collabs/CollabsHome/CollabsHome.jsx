import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import CollabsList from '../CollabsList/CollabsList'
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import './CollabsHome.scss'

export default function CollabsHome() {
  const { loading, error, data } = useQuery(COLLABS)

  if (error) return <p>Error :(</p>;

  return (
    <div className="CollabsHome">
      {loading ? <LoadingSpinner /> : <CollabsList collabs={data.collabs} />}
    </div>
  )
}
