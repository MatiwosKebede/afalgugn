import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const Hero = ()=>{
    return(
        <section  className="text-black text-center flex 
        justify-center w-full mb-[100px]  py-20 px-0 lg:py-20 lg:px-20 in-h-dvh
        bg-[url('httxps://www.familyfriendlymagazine.co.uk/wp-content/uploads/2017/03/family-friendly-beach-tips.jpg')]
        bg-cover bg-no-repeat">
            <div className="flex flex-col justify-center w-full gap-10">
                <div className = "flex flex-col justify-center items-center gap-10" >
                    <h1 className="text-2xl lg:text-5xl font-bold p-0 lg:p-10 text-blue-600">Helping Reunite Missing Persons</h1>
                    <h2 className="text-2xl  font-bold text-emerald-900 p-0 lg:p-10">A dedicated platform for reporting, tracking, and reuniting missing persons with their families and loved ones.</h2>
                    <p className="text-xl font-bold">Afalgugn is a community-driven platform that makes it easier to report missing persons, share verified information, and assist in search and rescue efforts. Families and communities can connect, collaborate, and receive timely updates, helping bring missing loved ones back home safely.</p>
                </div>
                <div>
                    <a href="/signup" className="p-2 bg-green-500 rounded-xl m-5">
                       Get started for free <span><FontAwesomeIcon icon={faChevronRight} /></span>
                    </a>
                </div>
            </div>
        </section>

    )
}
export default Hero
