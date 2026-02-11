import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { FaHeartbeat, FaShieldAlt, FaUserMd } from 'react-icons/fa'
import SectionTitle from '../SectionTitle/SectionTitle'
import ScrollReveal from '../ui/ScrollReveal'
import TextReveal from '../ui/TextReveal'
import './About.css'

const About = () => {
    const containerRef = useRef()
    const imageRef = useRef()

    useLayoutEffect(() => {
        // Parallax effect for image
        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="about" className="section about" ref={containerRef}>
            <div className="container about__container">
                {/* Image Side */}
                <ScrollReveal animation="slide-right" duration={1.2} className="about__image-wrapper">
                    <div className="about__image">
                        <img
                            ref={imageRef}
                            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=1000&fit=crop"
                            alt="Cabinet de kinésithérapie moderne"
                            loading="lazy"
                        />
                        <div className="about__image-overlay" />
                    </div>

                    {/* Floating Badge */}
                    <div className="about__badge glass">
                        <div className="about__badge-icon">
                            <FaHeartbeat />
                        </div>
                        <div>
                            <span className="about__badge-number">15+</span>
                            <span className="about__badge-label">Ans d'expérience</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Content Side */}
                <div className="about__content">
                    <SectionTitle
                        subtitle="À propos"
                        title={<TextReveal text="Un Cabinet Dédié à Votre Bien-être" />}
                        align="left"
                    />

                    <ScrollReveal animation="fade-up" delay={0.2}>
                        <p className="about__text">
                            Le <strong>Cabinet Hannit</strong> est un centre spécialisé en kinésithérapie
                            et rééducation fonctionnelle à Casablanca. Depuis plus de 15 ans, nous accompagnons
                            nos patients dans leur parcours de guérison avec professionnalisme et dévouement.
                        </p>

                        <p className="about__text">
                            Notre approche personnalisée, combinée à des équipements modernes de dernière
                            génération, nous permet d'offrir des soins de qualité supérieure adaptés
                            à chaque patient.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal animation="stagger" staggerTime={0.15} delay={0.4} className="about__features">
                        <div className="about__feature">
                            <div className="about__feature-icon">
                                <FaUserMd />
                            </div>
                            <div>
                                <h4>Équipe Qualifiée</h4>
                                <p>Kinésithérapeutes diplômés et expérimentés</p>
                            </div>
                        </div>

                        <div className="about__feature">
                            <div className="about__feature-icon">
                                <FaShieldAlt />
                            </div>
                            <div>
                                <h4>Soins Certifiés</h4>
                                <p>Protocoles médicaux reconnus et éprouvés</p>
                            </div>
                        </div>

                        <div className="about__feature">
                            <div className="about__feature-icon">
                                <FaHeartbeat />
                            </div>
                            <div>
                                <h4>Suivi Personnalisé</h4>
                                <p>Un plan de traitement adapté à vos besoins</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}

export default About
