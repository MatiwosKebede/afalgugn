import React from 'react'
import Nav from './landing/nav/nav'
import Hero from './landing/hero/hero'
import Records from './landing/records/records'
import Services from './landing/services/services'
import Testimonals from './landing/testimanals/testimonals'
import Faq from './landing/faq/faq'
import Cta from './landing/CTA/CTA'
import Footer from './landing/footer/footer'
import RecentPosts from './landing/recent-reports'
const Home = ()=>{
    return (
   <div>
     <Nav/>
     <div className="flex flex-col gap-[100px]">
     <Hero/>
     <RecentPosts/>
     <Records/>
     <Services/>
     <Testimonals/>
     <Faq/>
     <Cta/>
     <Footer/> 

     </div>
   </div>
    )
}
export default Home