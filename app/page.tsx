import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import AboutMe from "./components/AboutMe";
import WorkReel from "./components/WorkReel";
import Principles from "./components/Principles";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutMe />
      <WorkReel />
      <div className="principles-contact">
        <Principles />
        <Contact />
      </div>
    </>
  );
}
