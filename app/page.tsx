import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import AboutMe from "./components/AboutMe";
import Work from "./components/work";
import Toolkit from "./components/toolkit";
import Contact from "./components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutMe />
      <Work />
      <div className="principles-contact">
        <Toolkit />
        <Contact />
      </div>
    </>
  );
}
