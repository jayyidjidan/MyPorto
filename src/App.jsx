import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";

function App() {

   return (
    <>
      <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
        <Navbar />
      </header>

      <Hero />
    </>
  );
}

export default App;