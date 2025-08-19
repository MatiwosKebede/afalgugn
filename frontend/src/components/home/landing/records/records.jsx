import React from 'react'
import styles from './Records.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap,faUser,faMobile,
faUsers,faChartLine,faShield,faBell,faBookOpen} from '@fortawesome/free-solid-svg-icons';
const Records = ()=> {
    return(
    <section className={styles.features}>
        <div className={styles.container}>
          <h1 className="text-2xl font-bold text-black">Why Choose Afalgugn?</h1>
          <div className={styles.featuresgrid}>
            <div className={`${styles.featurecard} shadow-lg `}>
              <div className={styles.featureicon}>
                <FontAwesomeIcon icon={faGraduationCap}/>
              </div>
              <h3>Reliable Reporting</h3>
              <p>Submit missing person reports quickly and securely, ensuring accurate information reaches our community and authorities.</p>
            </div>
            
            <div className={`${styles.featurecard} shadow-lg `}>
              <div className={styles.featureicon}>
                <FontAwesomeIcon icon={faUser}/>
              </div>
              <h3>Family & Community Support</h3>
              <p>Connect with families and volunteers to collaborate on search efforts and provide timely assistance to those in need.</p>
            </div>
            
            <div className={`${styles.featurecard} shadow-lg `}>
              <div className={`${styles.featureicon} `}>
               <FontAwesomeIcon icon={faMobile}/>
              </div>
              <h3>Mobile Accessibility</h3>
              <p>Access Afalgugn anytime, anywhere on any device to report, track, or check updates about missing persons in your area.</p>
            </div>
            
            <div className={`${styles.featurecard} shadow-lg `}>
              <div className={styles.featureicon}>
               <FontAwesomeIcon icon={faUsers}/>
              </div>
              <h3>Community Collaboration</h3>
              <p>Join a network of volunteers and organizations working together to locate and reunite missing persons with their loved ones.</p>
            </div>
            
            <div className={`${styles.featurecard} shadow-lg `}>
              <div className={styles.featureicon}>
                <FontAwesomeIcon icon={faChartLine}/>
              </div>
              <h3>Progress Tracking</h3>
              <p>Stay updated on ongoing cases with real-time notifications and detailed status reports for each missing person.</p>
            </div>
            
            <div className={`${styles.featurecard} shadow-lg `}>
              <div className={styles.featureicon}>
               <FontAwesomeIcon icon={faShield}/>
              </div>
              <h3>Secure & Verified</h3>
              <p>All reports and user information are verified and protected to ensure accuracy, safety, and privacy throughout the process.</p>
            </div>
          
          </div>
        </div>
      </section>

    )
}
export default Records
