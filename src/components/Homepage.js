import React from 'react'
import Nav from './Nav'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import '../App.css'
const Homepage = () => {
  return (
    <div className="app-grid">
      <Nav />
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Homepage