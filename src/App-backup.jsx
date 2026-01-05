import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import LeadershipImpact from './components/LeadershipImpact'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

function App() {
  return (
    <ThemeProvider>
      <div className="App" style={{ minHeight: '100vh' }}>
        <Header />
        <Hero />
        <About />
        <Skills />
        <LeadershipImpact />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </ThemeProvider>
  )
}

export default App
