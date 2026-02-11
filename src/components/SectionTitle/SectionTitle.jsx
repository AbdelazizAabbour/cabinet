import React from 'react'
import './SectionTitle.css'

/**
 * Reusable section heading component with subtitle and decorative accent line.
 * @param {string} subtitle - Small text above the title
 * @param {string} title - Main heading text
 * @param {string} description - Optional paragraph below heading
 * @param {boolean} light - Use light variant for dark backgrounds
 * @param {string} align - Text alignment: 'center' (default), 'left'
 */
const SectionTitle = ({ subtitle, title, description, light = false, align = 'center' }) => {
    return (
        <div className={`section-title ${light ? 'section-title--light' : ''} section-title--${align}`}>
            <span className="section-title__subtitle">{subtitle}</span>
            <h2 className="section-title__heading">{title}</h2>
            <div className="section-title__accent" />
            {description && <p className="section-title__desc">{description}</p>}
        </div>
    )
}

export default SectionTitle
