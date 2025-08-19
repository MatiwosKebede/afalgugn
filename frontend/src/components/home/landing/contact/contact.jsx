// pages/contact.jsx
import styles from './Contact.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <div className={styles.container}>
        <h2 className={styles.heading}>Contact Us</h2>
        <p className={styles.subheading}>We're here to help and answer any questions you might have. Reach out to us through any channel below.</p>
      <section className={styles.contactSection}>

        <div className={styles.contactGrid}>
          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
            <p>+251-912-345-678</p>
          </div>

          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            <p>support@medget.com</p>
          </div>

          <div className={styles.contactItem}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </section>
    </div>
  );
}
