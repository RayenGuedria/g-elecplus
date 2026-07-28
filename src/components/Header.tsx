import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Home, Building2, Factory } from "lucide-react";
import logoGelec from "@/assets/logo-gelec.png";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { slugify } from "@/lib/slug";

const services = [
  "Travaux Électriques",
  "Bornes IRVE",
  "Solutions Énergétiques",
  "Pompes à Chaleur",
  "Panneaux Solaires",
  "Plomberie Générale",
  "Maintenance Industrielle",
];

const contactProfiles = [
  { key: "particulier", label: "Particulier", icon: Home },
  { key: "professionnel", label: "Professionnel", icon: Building2 },
  { key: "industriel", label: "Industriel", icon: Factory },
] as const;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "services" | "contact">(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
    setOpenMenu(null);
  };

  const goToContactAs = (key: "particulier" | "professionnel" | "industriel") => {
    window.dispatchEvent(new CustomEvent("set-contact-profile", { detail: key }));
    setTimeout(() => scrollToSection("contact"), 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${scrolled ? "glass-strong" : "glass"}`}>
          <button
            onClick={() => scrollToSection("accueil")}
            className="flex items-center gap-2.5 font-bold text-xl ml-1"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-lg opacity-50" />
              <img src={logoGelec} alt="G-ELEC+ logo" className="relative h-9 w-9 object-contain" />
            </div>
            <span className="text-gradient">G-ELEC+</span>
          </button>

          <nav ref={navRef} className="hidden md:flex items-center gap-1 relative">
            <button
              onClick={() => scrollToSection("accueil")}
              className="px-4 py-2.5 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-xl transition-all"
            >
              Accueil
            </button>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("services")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
                className={`px-4 py-2.5 text-[15px] font-medium rounded-xl transition-all flex items-center gap-1 ${openMenu === "services" ? "bg-foreground/10 text-foreground" : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"}`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === "services" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openMenu === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-64 glass-strong rounded-2xl p-2 shadow-xl"
                  >
                    {services.map((s) => (
                      <button
                        key={s}
                        onClick={() => scrollToSection(`service-${slugify(s)}`)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground/85 hover:bg-foreground/10 hover:text-foreground transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => scrollToSection("faq")}
              className="px-4 py-2.5 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/10 rounded-xl transition-all"
            >
              FAQ
            </button>

            {/* Contact dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("contact")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() => setOpenMenu(openMenu === "contact" ? null : "contact")}
                className={`px-4 py-2.5 text-[15px] font-medium rounded-xl transition-all flex items-center gap-1 ${openMenu === "contact" ? "bg-foreground/10 text-foreground" : "text-foreground/80 hover:text-foreground hover:bg-foreground/10"}`}
              >
                Contact
                <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === "contact" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openMenu === "contact" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-2 w-60 glass-strong rounded-2xl p-2 shadow-xl"
                  >
                    {contactProfiles.map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={p.key}
                          onClick={() => goToContactAs(p.key)}
                          className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-sm text-foreground/85 hover:bg-foreground/10 hover:text-foreground transition-colors"
                        >
                          <span className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow-accent">
                            <Icon className="w-4 h-4 text-accent-foreground" />
                          </span>
                          {p.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="tel:+33623303744"
              className="ml-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground/85 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              +33 6 23 30 37 44
            </a>

            <div className="ml-1"><ThemeToggle /></div>
          </nav>

          <div className="md:hidden flex items-center gap-1">
            <a
              href="tel:+33623303744"
              aria-label="Appeler G-ELEC+"
              className="p-2 rounded-lg text-accent hover:bg-foreground/5"
            >
              <Phone className="w-4 h-4" />
            </a>
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-foreground/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-2"
            >
              <button onClick={() => scrollToSection("accueil")} className="text-left px-4 py-3 rounded-lg hover:bg-foreground/5 text-foreground/90">Accueil</button>
              <div className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">Services</div>
              {services.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollToSection(`service-${slugify(s)}`)}
                  className="text-left pl-6 pr-4 py-2 rounded-lg hover:bg-foreground/5 text-foreground/80 text-sm"
                >
                  {s}
                </button>
              ))}
              <button onClick={() => scrollToSection("faq")} className="text-left px-4 py-3 rounded-lg hover:bg-foreground/5 text-foreground/90">FAQ</button>
              <div className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">Contact</div>
              {contactProfiles.map((p) => (
                <button
                  key={p.key}
                  onClick={() => { goToContactAs(p.key); setIsMenuOpen(false); }}
                  className="text-left pl-6 pr-4 py-2 rounded-lg hover:bg-foreground/5 text-foreground/80 text-sm"
                >
                  {p.label}
                </button>
              ))}
              <a
                href="tel:+33623303744"
                className="mt-2 px-4 py-3 inline-flex items-center gap-2 text-sm font-medium text-foreground/90 hover:text-accent"
              >
                <Phone className="w-4 h-4 text-accent" /> +33 6 23 30 37 44
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;