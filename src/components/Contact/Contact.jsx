import React, { useState } from 'react'
import {
    FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope,
    FaClock, FaPaperPlane
} from 'react-icons/fa'
import SectionTitle from '../SectionTitle/SectionTitle'
import ScrollReveal from '../ui/ScrollReveal'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', phone: '', message: '' })
        }, 4000)
    }

    return (
        <section id="contact" className="section contact">
            <div className="contact__bg-shape" />

            <div className="container">
                <ScrollReveal animation="fade-up">
                    <SectionTitle
                        subtitle="Contact"
                        title="Prenez Rendez-vous"
                        description="Contactez-nous pour planifier votre consultation ou pour toute question. Nous sommes à votre écoute."
                    />
                </ScrollReveal>

                <div className="contact__grid">
                    {/* Form */}
                    <ScrollReveal animation="slide-right" delay={0.2} className="contact__form-wrapper">
                        <form className="contact__form" onSubmit={handleSubmit}>
                            <div className="contact__form-row">
                                <div className="contact__field">
                                    <label htmlFor="name">Nom complet</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Votre nom"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="votre@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact__field">
                                <label htmlFor="phone">Téléphone</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+212 6XX XXX XXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="contact__field">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Décrivez votre besoin..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary contact__submit ${submitted ? 'contact__submit--sent' : ''}`}
                            >
                                {submitted ? (
                                    <>✓ Message Envoyé</>
                                ) : (
                                    <><FaPaperPlane /> Envoyer le Message</>
                                )}
                            </button>
                        </form>
                    </ScrollReveal>

                    {/* Info */}
                    <ScrollReveal animation="fade-up" delay={0.3} className="contact__info">
                        <div className="contact__info-card">
                            <div className="contact__info-item">
                                <div className="contact__info-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4>Adresse</h4>
                                    <p>32, Bd Chefchaouni<br />Résidence Dar Dounia<br />1er Étage, App N°3<br />Casablanca, Maroc</p>
                                </div>
                            </div>

                            <div className="contact__info-item">
                                <div className="contact__info-icon">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h4>Téléphone</h4>
                                    <a href="tel:+212644574537">+212 644 574 537</a>
                                </div>
                            </div>

                            <div className="contact__info-item">
                                <div className="contact__info-icon contact__info-icon--whatsapp">
                                    <FaWhatsapp />
                                </div>
                                <div>
                                    <h4>WhatsApp</h4>
                                    <a href="https://wa.me/212644574537" target="_blank" rel="noopener noreferrer">
                                        Envoyez-nous un message
                                    </a>
                                </div>
                            </div>

                            <div className="contact__info-item">
                                <div className="contact__info-icon">
                                    <FaClock />
                                </div>
                                <div>
                                    <h4>Horaires</h4>
                                    <p>Lun - Ven : 9h00 - 18h00<br />Samedi : 10h00 - 15h00</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="contact__map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846!2d-7.589!3d33.573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzIzLjEiTiA3wrAzNScyMC4wIlc!5e0!3m2!1sfr!2sma!4v1000000000000!5m2!1sfr!2sma"
                                width="100%"
                                height="200"
                                style={{ border: 0, borderRadius: 'var(--radius-md)' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localisation Cabinet Hannit"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}

export default Contact
