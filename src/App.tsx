import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Process } from "./components/Process";
import { Experience } from "./components/Experience";
import { Why } from "./components/Why";
import { Contact } from "./components/Contact";
import { Final } from "./components/Final";

export default function App() {
  return (
    <SmoothScroll>
      <div className="ambient-light" />
      <div className="grain" />
      <CustomCursor />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Process />
        <Experience />
        <Why />
        <Contact />
        <Final />
      </main>
    </SmoothScroll>
  );
}
