import React from 'react'
import styles from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faInstagram,
faWhatsapp, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footercontent}>
          <div className={styles.footersection}>
            <h3 className={styles.header}>Afalgugn</h3>
            <p>Your trusted platform for reporting, tracking, and reuniting missing persons. Afalgugn connects families, volunteers, and authorities to ensure timely action and support.</p>
          </div>
          
          <div className={styles.footersection}>
            <h3 className={styles.header}>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/reports">Reports</a></li>
              <li><a href="/services">Services</a></li>
            </ul>
          </div>
          
          <div className={styles.footersection}>
            <h3 className={styles.header}>Support</h3>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className={styles.footersection}>
            <h3 className={styles.header}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <a href="#" className={styles.icon}>
                <FontAwesomeIcon icon={faTwitter}/>
              </a>
              <a href="#" className={styles.icon}>
                <FontAwesomeIcon icon={faFacebook}/>
              </a>
              <a href="#" className={styles.icon}>
                <FontAwesomeIcon icon={faYoutube}/>
              </a>
              <a href="#" className={styles.icon}>
                <FontAwesomeIcon icon={faTiktok}/>
              </a>
              <a href="#" className={styles.icon}>
                <FontAwesomeIcon icon={faTelegram}/>
              </a>
              <a href="#" className={styles.icon}>
                <FontAwesomeIcon icon={faInstagram}/>
              </a>
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid #555', paddingTop: '1rem', marginTop: '2rem' }}>
          <p>&copy; 2025 Afalgugn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
