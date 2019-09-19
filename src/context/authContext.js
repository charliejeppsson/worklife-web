import React from 'react'

export default React.createContext({
  currentUser: {},
  login: (email, password) => {},
  logout: () => {}
})
