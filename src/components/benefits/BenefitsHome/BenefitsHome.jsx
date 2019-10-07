import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { BENEFITS } from '../../../graphql/queries/benefit'
import BenefitsList from '../BenefitsList/BenefitsList'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import './BenefitsHome.scss'

export default function BenefitsHome() {
  const { loading, error, data } = useQuery(BENEFITS)

  if (error) return <p>Error :(</p>

  return (
    <div className="BenefitsHome">
      {loading ? <LoadingSpinner /> : <BenefitsList benefits={data.benefits} />}
    </div>
  )
}
