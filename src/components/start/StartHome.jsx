import React, { useState } from 'react'

import AuthContext from '../../context/authContext'
import logoHorizontal from '../../assets/images/worklife-logo-2.png'

export default function StartHome() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <AuthContext.Consumer>
      {({ login }) => (
        <div className="StartHome__container">
          <img className="NavBar__logo" src={logoHorizontal} alt="Logo"/>

          <input
            id="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
          <input
            id="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          
          <div className="flex mt3">
            <button onClick={() => login(email, password)}>
              Sign in
            </button>
          </div>
        </div>
      )}
    </AuthContext.Consumer>
  )
}
