import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import logo from '../../assets/img/logo.png' // User requested logo
import './Navbar.css'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef()
    const logoRef = useRef()
    const linksRef = useRef([])
    const ctaRef = useRef()

    useEffect(() => {
        // Entrance animation
        const tl = gsap.timeline({ delay: 0.5 })
        tl.fromTo(logoRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        )
        tl.fromTo(linksRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
            '-=0.4'
        )
        tl.fromTo(ctaRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
            '-=0.2'
        )

        // Scroll listener
        const handleScroll = () => {
            setScrolled(window.scrollY > 80)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { label: 'Accueil', href: '#hero' },
        { label: 'À propos', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Pourquoi nous', href: '#why-us' },
        { label: 'Équipe', href: '#doctors' },
        { label: 'Contact', href: '#contact' },
    ]

    const handleLinkClick = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__container">
                {/* Logo */}
                <a href="#hero" className="navbar__logo" ref={logoRef}>
                    <img src={logo} alt="Cabinet Hannit" className="navbar__logo-img" />
                    <div className="navbar__logo-text">
                        <span className="navbar__logo-name" >Cabinet Hannit</span>
                        <span className="navbar__logo-tagline">Kinésithérapie</span>
                    </div>
                </a>

                {/* Desktop Nav Links */}
                <ul className="navbar__links">
                    {navLinks.map((link, i) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                ref={el => linksRef.current[i] = el}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="navbar__link"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="navbar__cta" ref={ctaRef}>
                    <a href="tel:+212644574537" className="navbar__phone">
                        <FiPhone /> +212 644 574 537
                    </a>
                    <a
                        href="https://wa.me/212644574537"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary navbar__btn"
                    >
                        <FaWhatsapp /> Rendez-vous
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="navbar__toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
                <ul className="navbar__mobile-links">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="navbar__mobile-link"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a
                    href="https://wa.me/212644574537"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary navbar__mobile-btn"
                >
                    <FaWhatsapp /> Prendre Rendez-vous
                </a>
            </div>
        </nav>
    )
}

export default Navbar
