import React from 'react'
import {
    FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
    FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat
} from 'react-icons/fa'
import ScrollReveal from '../ui/ScrollReveal'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__top-gradient" style={{ height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--cta), var(--primary))', backgroundSize: '200% 100%', animation: 'footer-gradient 4s ease infinite' }} />

            <div className="container">
                <div className="footer__grid">
                    {/* Brand Column */}
                    <ScrollReveal animation="fade-up" className="footer__col">
                        <div className="footer__logo">
                            <div className="footer__logo-icon">
                                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="16" width="32" height="8" rx="4" fill="currentColor" />
                                    <rect x="16" y="4" width="8" height="32" rx="4" fill="currentColor" />
                                </svg>
                            </div>
                            <span className="footer__logo-name">Cabinet Hannit</span>
                        </div>
                        <p className="footer__desc">
                            Votre partenaire de confiance pour une rééducation optimale et un bien-être durable à Casablanca.
                        </p>
                        <div className="footer__socials">
                            <a href="#" className="footer__social-link" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" className="footer__social-link" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" className="footer__social-link" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" className="footer__social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
                        </div>
                    </ScrollReveal>

                    {/* Links Column */}
                    <ScrollReveal animation="fade-up" delay={0.1} className="footer__col">
                        <h4 className="footer__title" style={{ color: 'white' }}>Liens Rapides</h4>
                        <ul className="footer__links">
                            <li><a href="#hero">Accueil</a></li>
                            <li><a href="#about">À propos</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#doctors">Équipe</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </ScrollReveal>

                    {/* Services Column */}
                    <ScrollReveal animation="fade-up" delay={0.2} className="footer__col">
                        <h4 className="footer__title" style={{ color: 'white' }}>Nos Services</h4>
                        <ul className="footer__links">
                            <li><a href="#services">Physiothérapie</a></li>
                            <li><a href="#services">Rééducation fonctionnelle</a></li>
                            <li><a href="#services">Traumatologie sportive</a></li>
                            <li><a href="#services">Drainage lymphatique</a></li>
                            <li><a href="#services">Massage thérapeutique</a></li>
                        </ul>
                    </ScrollReveal>

                    {/* Contact Column */}
                    <ScrollReveal animation="fade-up" delay={0.3} className="footer__col">
                        <h4 className="footer__title" style={{ color: 'white' }}    >Contact</h4>
                        <ul className="footer__contact-info">
                            <li>
                                <FaMapMarkerAlt style={{ color: 'var(--primary)',marginRight: '5px' }} />
                                <span>32, Bd Chefchaouni, Casa</span>
                            </li>   
                            <li>
                                <FaPhone style={{ color: 'var(--primary)',marginRight: '5px' }} /> 
                                <a href="tel:+212644574537">+212 644 574 537</a>
                            </li>
                            <li>
                                <FaEnvelope style={{ color: 'var(--primary)',marginRight: '5px' }} />
                                <a href="mailto:contact@cabinethannit.ma">contact@cabinethannit.ma</a>
                            </li>
                        </ul>
                    </ScrollReveal>
                </div>
            </div>

            <div className="footer__copyright">
                <div className="container footer__copyright-content">
                    <p style={{ color: 'white' }}>&copy; {new Date().getFullYear()} Cabinet Hannit. Tous droits réservés.</p>
                    <p className="footer__credits" style={{ color: 'white', fontSize: '0.8rem', fontWeight: '400',position: 'absolute', bottom: '0', right: '100px' , zIndex: '1' }}>
                        Fait avec <FaHeartbeat className="footer__heart-icon" /> pour votre santé
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
