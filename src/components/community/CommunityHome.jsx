import React from 'react'
import { Redirect } from 'react-router-dom'

export default function CommunityHome() {
  return (
    <Redirect to="/community/news" exact />
  )
}
