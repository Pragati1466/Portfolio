import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Game from "@/components/Game";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollReveal delay={0.05}><About /></ScrollReveal>
      <ScrollReveal delay={0.05}><Skills /></ScrollReveal>
      <ScrollReveal delay={0.05}><Projects /></ScrollReveal>
      <ScrollReveal delay={0.05}><Achievements /></ScrollReveal>
      <ScrollReveal delay={0.05}><Game /></ScrollReveal>
      <ScrollReveal delay={0.05}><ContactForm /></ScrollReveal>
      <Footer />
      <BackToTop />
    </>
  );
}
