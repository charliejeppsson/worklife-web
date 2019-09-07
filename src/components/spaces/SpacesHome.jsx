import React from 'react'
import { Redirect } from 'react-router-dom'

export default function SpacesHome() {
  return (
    <Redirect to="/spaces/new-booking" />
  )
}
