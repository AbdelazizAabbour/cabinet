import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    FaAward, FaMicroscope, FaHeart, FaClock,
    FaUsers, FaCheckCircle
} from 'react-icons/fa'
import SectionTitle from '../SectionTitle/SectionTitle'
import ScrollReveal from '../ui/ScrollReveal'
import './WhyChooseUs.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { number: 5000, suffix: '+', label: 'Patients Traités', icon: <FaUsers /> },
    { number: 15, suffix: '+', label: "Ans d'Expérience", icon: <FaAward /> },
    { number: 98, suffix: '%', label: 'Taux de Satisfaction', icon: <FaHeart /> },
    { number: 10, suffix: '+', label: 'Spécialités', icon: <FaCheckCircle /> },
]

const features = [
    {
        icon: <FaAward />,
        title: 'Expertise Reconnue',
        desc: "Plus de 15 ans d'expérience dans le domaine de la kinésithérapie et rééducation fonctionnelle."
    },
    {
        icon: <FaMicroscope />,
        title: 'Équipements Modernes',
        desc: 'Appareils de dernière génération pour des diagnostics précis et des traitements efficaces.'
    },
    {
        icon: <FaHeart />,
        title: 'Soins Personnalisés',
        desc: 'Chaque patient bénéficie d\'un plan de traitement unique, adapté à sa condition et ses objectifs.'
    },
    {
        icon: <FaClock />,
        title: 'Disponibilité',
        desc: 'Horaires flexibles et prise de rendez-vous rapide pour répondre à vos besoins urgents.'
    },
]

const WhyChooseUs = () => {
    const containerRef = useRef()
    const statsRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate stat counters
            const statNumbers = document.querySelectorAll('.why-stat__number')
            statNumbers.forEach((el) => {
                const target = parseInt(el.getAttribute('data-target'))
                gsap.fromTo(el,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2.5,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        onUpdate: function () {
                            el.textContent = Math.ceil(parseFloat(el.textContent))
                        }
                    }
                )
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="why-us" className="section why-section" ref={containerRef}>
            <div className="why-section__bg" />

            <div className="container">
                <ScrollReveal animation="fade-up">
                    <SectionTitle
                        subtitle="Pourquoi Nous Choisir"
                        title="L'Excellence au Service de Votre Santé"
                        description="Des raisons concrètes de nous faire confiance pour votre parcours de guérison."
                        light
                    />
                </ScrollReveal>

                {/* Stats Counter Row */}
                <ScrollReveal animation="stagger" staggerTime={0.1} className="why-stats" ref={statsRef}>
                    {stats.map((stat, i) => (
                        <div className="why-stat" key={i}>
                            <div className="why-stat__icon">{stat.icon}</div>
                            <span
                                className="why-stat__number"
                                data-target={stat.number}
                            >
                                0
                            </span>
                            <span className="why-stat__suffix">{stat.suffix}</span>
                            <span className="why-stat__label">{stat.label}</span>
                        </div>
                    ))}
                </ScrollReveal>

                {/* Feature Cards */}
                <ScrollReveal animation="stagger" staggerTime={0.15} delay={0.2} className="why-features">
                    {features.map((feat, i) => (
                        <div className="why-feature" key={i}>
                            <div className="why-feature__icon">{feat.icon}</div>
                            <div className="why-feature__content">
                                <h4>{feat.title}</h4>
                                <p>{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    )
}

export default WhyChooseUs
