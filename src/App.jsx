import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Doctors from './components/Doctors/Doctors'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Preloader from './components/Preloader/Preloader'
import { useScroll } from './hooks/useScroll'
import './App.css'

function App() {
    useScroll()

    return (
        <div className="app">
            <Preloader />
            <Navbar />
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Doctors />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
