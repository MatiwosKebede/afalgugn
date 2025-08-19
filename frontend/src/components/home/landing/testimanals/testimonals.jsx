import React from 'react';
import styles from './Testimonals.module.css';

const Testimonal = () => {
  return (
    <div className={styles.cotainer}>
      <h1 className="text-center text-2xl font-bold">Testimonials</h1>
      <div className={styles.testimonals}>
        <div className={`${styles.eachtestimonal} ${styles.dawit}`}>
          <div className={styles.avaterco}>
            <img className={styles.avater}  />
            <h3>Dawit Lulie</h3>
          </div>
          <h4>Volunteer Coordinator</h4>
          <p>
            Afalgugn has transformed how we locate and support missing persons. The platform’s reports and notifications allow our team to act faster and coordinate effectively with families and volunteers.
          </p>
        </div>

        <div className={`${styles.eachtestimonal} ${styles.dawit}`}>
          <div className={styles.avaterco}>
            <img className={styles.avater}  />
            <h3>Lidia Teshome</h3>
          </div>
          <h4>Community Organizer</h4>
          <p>
            Afalgugn makes community collaboration effortless. Volunteers and families can share updates, track cases, and stay informed in real-time. It has greatly improved our outreach and support efforts.
          </p>
        </div>

        <div className={`${styles.eachtestimonal} ${styles.dawit}`}>
          <div className={styles.avaterco}>
            <img className={styles.avater} />
            <h3>Henok Alemu</h3>
          </div>
          <h4>Case Manager</h4>
          <p>
            Afalgugn has been invaluable for managing missing person cases. From tracking reports to coordinating volunteers, the platform keeps everyone aligned and helps reunite families faster.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Testimonal;
