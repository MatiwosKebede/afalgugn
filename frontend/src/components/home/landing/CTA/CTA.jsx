import React from 'react'
import styles from './Cta.module.css'

const Cta = () => {
    return(
         <section style={{background:"transparent", padding: '20px 0', textAlign: 'center' }} className={styles.container}>
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Ready to Help Reunite Missing Persons?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
            Join the Afalgugn community and take part in reporting, tracking, and supporting efforts to bring missing persons back home safely.
          </p>
          <a href="/signup" className={styles.primary} style={{ marginRight: '1rem' }}>
            Get Started
          </a>
          <a href="/tutorials" className={styles.secondary} style={{ background: 'transparent', border: '2px solid #667eea' }}>
            Learn How to Help
          </a>
        </div>
      </section>
    )
}

export default Cta
