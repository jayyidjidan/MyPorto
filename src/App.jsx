import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Project from "./components/sections/Project"
import Skill from "./components/sections/Skill";

function App() {
  return (
    <>
      <header className="fixed right-6 top-6 z-50 lg:left-1/2 lg:right-auto lg:-translate-x-1/2">
        <Navbar />
      </header>

      <Hero />
      <Project/>
      <Skill/>
    </>
  );
}

export default App;