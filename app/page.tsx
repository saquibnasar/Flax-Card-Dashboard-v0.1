"use client";
import { motion, useScroll } from "framer-motion";
import ChangeTheme from "./ChangeTheme";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import SectionD from "./SectionD";
import SectionE from "./SectionE";
import SectionF from "./SectionF";
import SectionG from "./SectionG";
import Drawer from "./components/Drawer";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="overflow-x-hidden">
      <nav className="w-full z-10">
        <Navbar />
      </nav>

      <motion.div
        style={{ scaleX: scrollYProgress, originX: 0 }}
        className="no-bar sticky top-0 h-2 w-[100%] bg-blue z-30"
      />

      <HeroSection />
      <ChangeTheme />
      <SectionD />
      <SectionE />
      <SectionF />
      <SectionG />
      <Footer />
    </main>
  );
}
