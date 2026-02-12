import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MouseFollower.css';

const MouseFollower = () => {
    const followerRef = useRef();
    const auraRef = useRef();

    useEffect(() => {
        const follower = followerRef.current;
        const aura = auraRef.current;

        const moveFollower = (e) => {
            // Smooth cursor dot
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "none"
            });

            // Delayed aura effect
            gsap.to(aura, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power3.out"
            });
        };

        window.addEventListener('mousemove', moveFollower);

        return () => {
            window.removeEventListener('mousemove', moveFollower);
        };
    }, []);

    return (
        <>
            <div className="mouse-follower" ref={followerRef} />
            <div className="mouse-aura" ref={auraRef} />
        </>
    );
};

export default MouseFollower;
