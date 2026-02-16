import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { FaCalendarAlt, FaChevronDown } from 'react-icons/fa'
import ThreeBackground from '../ThreeBackground/ThreeBackground'
import TextReveal from '../ui/TextReveal'
import './Hero.css'

const Hero = () => {
    const heroRef = useRef()
    const contentRef = useRef()
    const btnsRef = useRef()
    const badgeRef = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 })

        // Badge Zoom In
        tl.fromTo(badgeRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
        )

        // Buttons Stagger
        tl.fromTo(btnsRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
            '+=0.8' // Wait for TextReveal
        )

        // Scroll Icon Float
        gsap.fromTo(scrollRef.current,
            { y: 0, opacity: 0.5 },
            { y: 10, opacity: 1, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }
        )
    }, [])

    const handleMagnetic = (e) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power3.out"
        });
    };

    const resetMagnetic = (e) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
    };

    return (
        <section id="hero" className="hero" ref={heroRef}>
            {/* 3D Background */}
            <ThreeBackground />

            {/* Overlay */}
            <div className="hero__overlay" />
            <div className="hero__vignette" />

            <div className="container hero__container">
                <div className="hero__content" ref={contentRef}>

                    <div className="hero__badge" ref={badgeRef}>
                        <span className="hero__badge-text">Innovation Médicale à Casablanca</span>
                    </div>

                    <div className="hero__title-wrapper">
                        <h1 className="hero__title">
                            <div className="hero__title-line">
                                <TextReveal text="Récupération" delay={0.8} />
                            </div>
                            <div className="hero__title-line">
                                <span className="hero__title-accent">
                                    <TextReveal text="Accélérée" delay={1.0} className="text-accent" />
                                </span>
                            </div>
                        </h1>
                    </div>

                    <p className="hero__desc">
                        <TextReveal
                            text="Kinésithérapie avancée et rééducation fonctionnelle personnalisée."
                            delay={1.4}
                            className="hero__desc-text"
                        />
                    </p>

                    <div className="hero__btns" ref={btnsRef}>
                        <a
                            href="https://wa.me/212644574537"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary hero__btn hero__btn--glow"
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                        >
                            <FaCalendarAlt /> Prendre Rendez-vous
                        </a>
                        <Link
                            to="/services"
                            className="btn btn-glass hero__btn"
                            onMouseMove={handleMagnetic}
                            onMouseLeave={resetMagnetic}
                        >
                            Découvrir nos soins
                        </Link>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero__scroll-indicator" ref={scrollRef}>
                <span className="hero__scroll-text">Découvrir</span>
                <FaChevronDown className="hero__scroll-icon" />
            </div>
        </section>
    )
}

export default Hero
