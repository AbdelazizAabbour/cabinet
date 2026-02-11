import React from 'react'
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa'
import SectionTitle from '../SectionTitle/SectionTitle'
import ScrollReveal from '../ui/ScrollReveal'
import './Doctors.css'

const doctors = [
    {
        name: 'Dr. Hannit',
        role: 'Kinésithérapeute Principal',
        specialty: 'Rééducation Fonctionnelle',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=600&fit=crop',
    },
    {
        name: 'Dr. Amina El Fassi',
        role: 'Kinésithérapeute',
        specialty: 'Traumatologie Sportive',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop',
    },
    {
        name: 'Dr. Youssef Benali',
        role: 'Physiothérapeute',
        specialty: 'Rhumatologie',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=600&fit=crop',
    },
]

const Doctors = () => {
    return (
        <section id="doctors" className="section doctors">
            <div className="container">
                <ScrollReveal animation="fade-up">
                    <SectionTitle
                        subtitle="Notre Équipe"
                        title="Des Spécialistes Dévoués"
                        description="Une équipe de professionnels qualifiés, passionnés par votre bien-être et votre récupération."
                    />
                </ScrollReveal>

                <ScrollReveal animation="stagger" staggerTime={0.2} className="doctors__grid">
                    {doctors.map((doc, i) => (
                        <div className="doctor-card" key={i}>
                            <div className="doctor-card__image">
                                <img src={doc.image} alt={doc.name} loading="lazy" />
                                <div className="doctor-card__overlay">
                                    <div className="doctor-card__social">
                                        <a href="#" className="doctor-card__social-link" aria-label="LinkedIn">
                                            <FaLinkedinIn />
                                        </a>
                                        <a href="#" className="doctor-card__social-link" aria-label="Email">
                                            <FaEnvelope />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="doctor-card__info">
                                <h3 className="doctor-card__name">{doc.name}</h3>
                                <span className="doctor-card__role">{doc.role}</span>
                                <span className="doctor-card__specialty">{doc.specialty}</span>
                            </div>
                        </div>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    )
}

export default Doctors
