import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import HeroScene from "./HeroScene";
import { Component, ReactNode } from "react";

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch() {}
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-accent/15 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      {/* Interactive 3D background covering the whole hero */}
      <div className="absolute inset-0 z-0">
        <SceneBoundary
          fallback={
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl animate-float" />
            </div>
          }
        >
          <HeroScene />
        </SceneBoundary>
      </div>

      {/* Soft readability veil */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-background/40 via-background/10 to-background/60" />

      {/* Centered copy */}
      <div className="container mx-auto px-4 relative z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05]"
          >
            Vos projets,{" "}
            <span className="text-gradient">notre expertise</span>
            <span className="text-primary">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Chez G-ELEC+, nous concevons des installations électriques et énergétiques
            durables — du dépannage rapide aux projets les plus complexes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center pointer-events-auto"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("services")}
              className="group bg-gradient-accent text-accent-foreground hover:opacity-90 shadow-glow"
            >
              Découvrir nos services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="glass border-white/10 hover:bg-white/5"
            >
              <Zap className="mr-2 w-4 h-4 text-primary" />
              Nous contacter
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;