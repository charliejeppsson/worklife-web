import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import NewsHome from './components/NewsHome'
import CommunityHome from './components/CommunityHome'
import ConferenceHome from './components/ConferenceHome'
import SelectionHome from './components/SelectionHome'

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={NewsHome} />
      <Route path="/news" component={NewsHome} />
      <Route path="/community/" component={CommunityHome} />
      <Route path="/conference/" component={ConferenceHome} />
      <Route path="/selection/" component={SelectionHome} />
    </Router>
  )
}

export default App
