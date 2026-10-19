import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import logoGelec from "@/assets/logo-gelec.png";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

type Props = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

const LegalLayout = ({ title, updated, children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal top bar */}
      <header className="sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between rounded-2xl px-5 py-3 glass-strong">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-lg opacity-50" />
                <img src={logoGelec} alt="G-ELEC+ logo" className="relative h-9 w-9 object-contain" />
              </div>
              <span className="text-gradient">G-ELEC+</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground/85 hover:text-accent transition-colors px-3 py-2 rounded-xl hover:bg-foreground/10"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Retour à l'accueil</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 text-xs uppercase tracking-wider text-accent">
                Informations légales
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
              <p className="text-sm text-muted-foreground">Dernière mise à jour : {updated}</p>
            </div>

            <div className="glass rounded-3xl p-6 md:p-10 legal-content text-foreground/85 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
