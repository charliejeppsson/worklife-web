import React from 'react'

export default React.createContext({
  currentUser: {},
  setCurrentUser: () => {},
  currentUserLoading: false,
  setCurrentUserLoading: () => {},
  currentUserError: null,
  setCurrentUserError: () => {}
})
