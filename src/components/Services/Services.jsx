import React, { useRef } from 'react'
import {
    FaWalking, FaBone, FaRunning, FaProcedures,
    FaHandHoldingMedical, FaBrain
} from 'react-icons/fa'
import SectionTitle from '../SectionTitle/SectionTitle'
import ScrollReveal from '../ui/ScrollReveal'
import './Services.css'

const services = [
    {
        icon: <FaWalking />,
        title: 'Physiothérapie',
        desc: 'Traitements spécialisés pour restaurer la mobilité et soulager la douleur grâce à des techniques manuelles et instrumentales avancées.',
        color: '#D81B60' // Rose / Magenta
    },
    {
        icon: <FaBone />,
        title: 'Rééducation Fonctionnelle',
        desc: 'Programmes personnalisés de rééducation pour retrouver votre autonomie et améliorer vos capacités fonctionnelles.',
        color: '#E91E63' // Soft Rose
    },
    {
        icon: <FaRunning />,
        title: 'Blessures Sportives',
        desc: 'Prise en charge complète des traumatismes sportifs avec protocoles de récupération optimisés pour un retour rapide.',
        color: '#7B1FA2' // Purple
    },
    {
        icon: <FaProcedures />,
        title: 'Rééducation Post-Chirurgicale',
        desc: 'Accompagnement post-opératoire adapté pour une récupération optimale après toute intervention chirurgicale.',
        color: '#D81B60' // Rose / Magenta
    },
    {
        icon: <FaHandHoldingMedical />,
        title: 'Traumatologie',
        desc: 'Traitement des traumatismes musculo-squelettiques – fractures, entorses, luxations – avec des méthodes éprouvées.',
        color: '#E91E63' // Soft Rose
    },
    {
        icon: <FaBrain />,
        title: 'Rhumatologie & Neurologie',
        desc: 'Soins spécialisés pour les pathologies rhumatismales et neurologiques, adaptés à chaque condition.',
        color: '#7B1FA2' // Purple
    }
]

const Services = () => {
    const containerRef = useRef()

    const handleMouseMove = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            duration: 0.5,
            ease: 'power3.out',
            perspective: 1000
        })

        // Move the icon slightly more for parallax
        const icon = card.querySelector('.service-card__icon')
        gsap.to(icon, {
            x: (x - centerX) * 0.1,
            y: (y - centerY) * 0.1,
            duration: 0.5,
            ease: 'power3.out'
        })
    }

    const handleMouseLeave = (e) => {
        gsap.to(e.currentTarget, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)'
        })

        const icon = e.currentTarget.querySelector('.service-card__icon')
        gsap.to(icon, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.3)'
        })
    }

    return (
        <section id="services" className="section services" ref={containerRef}>
            {/* Background decorations */}
            <div className="services__bg-shape services__bg-shape--1" />
            <div className="services__bg-shape services__bg-shape--2" />

            <div className="container">
                <ScrollReveal animation="fade-up">
                    <SectionTitle
                        subtitle="Nos Services"
                        title="Découvrez Nos Soins Spécialisés"
                        description="Des traitements de qualité supérieure adaptés à vos besoins pour une récupération optimale."
                    />
                </ScrollReveal>

                <ScrollReveal animation="stagger" staggerTime={0.1} className="services__grid">
                    {services.map((service, index) => (
                        <div
                            className="service-card"
                            key={index}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className="service-card__icon"
                                style={{
                                    background: `linear-gradient(135deg, ${service.color}15, ${service.color}08)`,
                                    color: service.color
                                }}
                            >
                                {service.icon}
                            </div>
                            <h3 className="service-card__title">{service.title}</h3>
                            <p className="service-card__desc">{service.desc}</p>
                            <div
                                className="service-card__accent"
                                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                            />
                        </div>
                    ))}
                </ScrollReveal>

                {/* CTA Banner */}
                <ScrollReveal animation="scale-up" delay={0.2} className="services__cta">
                    <div className="services__cta-content">
                        <h3>Besoin d'un rendez-vous urgent ?</h3>
                        <p>Appelez-nous directement pour une prise en charge rapide</p>
                    </div>
                    <a href="tel:+212644574537" className="btn btn-primary">
                        +212 644 574 537
                    </a>
                </ScrollReveal>
            </div>
        </section>
    )
}

export default Services
