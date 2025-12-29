import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Works from './components/Works';
import Brands from './components/Brands';
import Contact from './components/Contact';
import CustomCursor from './components/ui/CustomCursor';
import Noise from './components/ui/Noise';
import SectionWrapper from './components/ui/SectionWrapper';

const App: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-white selection:bg-accent selection:text-black overflow-x-hidden">
      <CustomCursor />
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
  );
};

export default App;