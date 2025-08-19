import React, { useState } from 'react'
import style from './Faq.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faLightbulb, faHeadset, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const FAQ = () => {
   const faqData = [
    {
      question: "How do I report a missing person?",
      answer: "You can report a missing person directly on Afalgugn by filling out the detailed report form. Ensure all information is accurate to help authorities and volunteers act quickly."
    },
    {
      question: "Can I track ongoing cases?",
      answer: "Yes, Afalgugn provides real-time updates and status tracking for all reported missing persons. You will receive notifications about any changes or developments."
    },
    {
      question: "Is my information safe and private?",
      answer: "Absolutely. Afalgugn verifies reports and protects user data to ensure privacy and security. Only verified volunteers and authorities have access to sensitive information."
    },
  ];

  const [activeIndex , setActiveIndex] = useState(null);
  const toggle = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  }

  return (
      <div className={style.container}>
        <h2 className="text-center text-2xl font-bold">Frequently Asked Questions</h2>
        <div className={style.pagecontent}>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', color: '#666' }}>
            Find answers to common questions about Afalgugn and how to report, track, and reunite missing persons.
          </p>
          
          <div className={style.faqs}>
            {faqData.map((item, index) => (
              <div key={index} className={`${style.faqitem} noselect`} >
                <div onClick={() => toggle(index)} className={style.faquestion}>
                  <p><FontAwesomeIcon style={{color:"green"}} icon={faQuestionCircle} /> {item.question}</p>
                  <p style={{color:"rgb(112, 111, 111)",cursor:'pointer'}}>
                    {activeIndex === index ? 
                      <FontAwesomeIcon icon={faChevronUp}/> :
                      <FontAwesomeIcon icon={faChevronDown}/>
                    }
                  </p>
                </div>
                <div className={`${style.answer} ${activeIndex === index ? style.show : ''}`}>
                  <FontAwesomeIcon style={{color:"red"}} icon={faLightbulb} /> {item.answer}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
  )
}

export default FAQ
