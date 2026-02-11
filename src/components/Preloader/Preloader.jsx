import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../../assets/img/logo.png'
import './Preloader.css'

const Preloader = () => {
    const containerRef = useRef()
    const logoRef = useRef()
    const textRef = useRef()
    const [removed, setRemoved] = useState(false)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setRemoved(true)
                // Enable scroll (Lenis needs to re-enable? Lenis usually ignores pointer-events: none)
                // We can dispatch a custom event if needed, but since preloader overlays everything, it's fine.
            }
        })

        // Logo pulse
        tl.to(logoRef.current, {
            scale: 1.2,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        })

        // Text reveal
        tl.to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.4')

        // Exit
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
            delay: 0.5
        })
    }, [])

    if (removed) return null

    return (
        <div className="preloader" ref={containerRef}>
            <div className="preloader__content">
                <div className="preloader__logo" ref={logoRef}>
                    <img src={logo} alt="Cabinet Hannit" className="preloader__logo-img" />
                </div>
                <div className="preloader__text-wrapper">
                    <span className="preloader__text" ref={textRef} style={{ color: 'black' }} >
                        Cabinet Hannit
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Preloader
