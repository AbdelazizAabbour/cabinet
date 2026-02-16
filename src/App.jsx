import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Footer from './components/Footer/Footer'
import Preloader from './components/Preloader/Preloader'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import MouseFollower from './components/ui/MouseFollower/MouseFollower'
import { useScroll } from './hooks/useScroll'
import './App.css'

function App() {
    useScroll()

    return (
        <Router>
            <div className="app">
                <MouseFollower />
                <Preloader />
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
                <ScrollToTop />
            </div>
        </Router>
    )
}

export default App
