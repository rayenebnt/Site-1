import { useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";
import Cursor from "./components/Cursor.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Story from "./components/Story.jsx";
import Menu from "./components/Menu.jsx";
import Signature from "./components/Signature.jsx";
import Visit from "./components/Visit.jsx";
import Footer from "./components/Footer.jsx";
import Scene from "./three/Scene.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative grain vignette">
      <Loader visible={loading} />
      <Cursor />

      {/* Persistent 3D scene behind everything */}
      <Scene />

      {/* Content on top */}
      <div className="relative z-[2]">
        <Nav />
        <Hero />
        <Marquee />
        <Story />
        <Menu />
        <Signature />
        <Visit />
        <Footer />
      </div>
    </div>
  );
}
