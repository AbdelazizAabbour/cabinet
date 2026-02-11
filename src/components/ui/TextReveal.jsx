import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TextReveal = ({ text, className = '', delay = 0 }) => {
    const containerRef = useRef()

    useEffect(() => {
        const chars = containerRef.current.querySelectorAll('.char')

        gsap.fromTo(chars,
            {
                opacity: 0,
                y: 20,
                rotateX: -90,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.02,
                delay: delay,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
    }, [delay])

    // Split text into characters manually
    const splitText = text.split('').map((char, index) => (
        <span
            key={index}
            className="char"
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
            {char}
        </span>
    ))

    return (
        <div ref={containerRef} className={className} style={{ perspective: '400px', overflow: 'hidden' }}>
            {splitText}
        </div>
    )
}

export default TextReveal
