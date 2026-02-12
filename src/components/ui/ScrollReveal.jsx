import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable component to trigger animations when children enter the viewport.
 * @param {string} animation - 'fade-up', 'fade-in', 'scale-up', 'stagger'
 * @param {number} delay - Delay in seconds
 * @param {number} duration - Animation duration
 * @param {number} staggertime - Time between staggered children animations
 */
const ScrollReveal = ({
    children,
    animation = 'fade-up',
    delay = 0,
    duration = 0.8,
    staggerTime = 0.1,
    className = ''
}) => {
    const ref = useRef()

    useEffect(() => {
        const el = ref.current

        // Animation configurations
        const configs = {
            'fade-up': {
                from: { opacity: 0, y: 50 },
                to: { opacity: 1, y: 0 }
            },
            'fade-in': {
                from: { opacity: 0 },
                to: { opacity: 1 }
            },
            'scale-up': {
                from: { opacity: 0, scale: 0.8 },
                to: { opacity: 1, scale: 1 }
            },
            'slide-right': {
                from: { opacity: 0, x: -50 },
                to: { opacity: 1, x: 0 }
            },
            'blur-in': {
                from: { opacity: 0, filter: 'blur(10px)', scale: 0.95 },
                to: { opacity: 1, filter: 'blur(0px)', scale: 1 }
            },
            'reveal-left': {
                from: { opacity: 0, x: -100, clipPath: 'inset(0 100% 0 0)' },
                to: { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
            },
            'reveal-right': {
                from: { opacity: 0, x: 100, clipPath: 'inset(0 0 0 100%)' },
                to: { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)' }
            }
        }

        const config = configs[animation] || configs['fade-up']

        // Check if children should be staggered (if container has multiple direct children)
        const isStagger = animation === 'stagger'

        if (isStagger) {
            gsap.fromTo(el.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: duration,
                    stagger: staggerTime,
                    delay: delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        } else {
            gsap.fromTo(el,
                config.from,
                {
                    ...config.to,
                    duration: duration,
                    delay: delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }
    }, [animation, delay, duration, staggerTime])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}

export default ScrollReveal
