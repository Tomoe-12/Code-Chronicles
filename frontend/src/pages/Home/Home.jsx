import PopularPost from "./PopularPost"
import Hero from "./Hero"
import Testimonials from "./Testimonials"
import Step from "./Step"
import ContactMe from "./FeedBack"

const home = () => {
  return (
    <>
      <Hero />
      <PopularPost />
      <Step/>
      <Testimonials />
      <ContactMe/>
    </>
  )
}

export default home