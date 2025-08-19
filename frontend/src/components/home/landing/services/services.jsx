import React from 'react'
import style from './Services.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  const services = [
    {
      title: "Report a Missing Person",
      description: "Submit detailed reports of missing persons to help authorities and the community act quickly.",
      icon: "fas fa-user-check",
    },
    {
      title: "Community Alerts",
      description: "Receive real-time notifications and updates about missing persons in your area.",
      icon: "fas fa-bell",
    },
    {
      title: "Volunteer Support",
      description: "Join volunteer efforts to assist in search operations and community awareness campaigns.",
      icon: "fas fa-users",
    },
    {
      title: "Family Assistance",
      description: "Connect with families for support, guidance, and coordinated search efforts.",
      icon: "fas fa-heart",
    },
    {
      title: "Case Tracking",
      description: "Monitor the status of missing person reports and stay informed about ongoing cases.",
      icon: "fas fa-chart-line",
    },
    {
      title: "Awareness Campaigns",
      description: "Participate in community programs and initiatives to raise awareness and prevent disappearances.",
      icon: "fas fa-bullhorn",
    }
  ]

  return (
    <div className={style.page}>
      <div className={style.container}>
        <h2 className="text-2xl font-bold">Our Services</h2>
        <div className={style.pagecontent}>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
            Afalgugn provides tools and community support to help report, track, and reunite missing persons safely and efficiently.
          </p>
          
          <div className={style.container}>
            {services.map((service, index) => (
              <div key={index} className={`shadow-lg w-4/5 lg:w-1/4 p-10`}>
                <div className={style.icon}>
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p style={{ marginBottom: '1.5rem' }}>{service.description}</p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginTop: 'auto'
                }}>
                  <button className={style.primary}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div  className={style.customhelp}>
            <h2 className="text-2xl font-bold">Need a Custom Solution?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              Afalgugn offers personalized assistance for families and communities. Reach out to discuss your specific case or support needs.
            </p>
            <a href="/contact"><button className={style.secondary}>
              Contact Our Team <FontAwesomeIcon icon = {faHeadset}/>
            </button></a>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
