import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Works from './components/Works';
import Brands from './components/Brands';
import Contact from './components/Contact';
import Noise from './components/ui/Noise';
import SectionWrapper from './components/ui/SectionWrapper';
import SmoothScroll from './components/ui/SmoothScroll';

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="bg-background min-h-screen text-white selection:bg-accent selection:text-black overflow-x-hidden">
        <Noise />
        <Navbar />
        <main>
          <SectionWrapper id="home">
            <Hero />
          </SectionWrapper>
          <SectionWrapper id="stats">
            <Stats />
          </SectionWrapper>
          <SectionWrapper id="about">
            <About />
          </SectionWrapper>
          <SectionWrapper id="works">
            <Works />
          </SectionWrapper>
          <SectionWrapper id="brands">
            <Brands />
          </SectionWrapper>
        </main>
        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
      </div>
    </SmoothScroll>
  );
};

export default App;