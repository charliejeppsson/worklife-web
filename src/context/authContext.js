import React from 'react'

export default React.createContext({
  currentUser: {},
  setCurrentUser: () => {},
  authLoading: false,
  setAuthLoading: () => {},
  authError: null,
  setAuthError: () => {}
})
