import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import logoGelec from "@/assets/logo-gelec.png";

const Footer = () => {
  return (
    <footer className="relative border-t border-border py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/15 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img src={logoGelec} alt="G-ELEC+ logo" className="h-8 w-8 object-contain" />
              <h3 className="text-2xl font-bold text-gradient">G-ELEC+</h3>
            </div>
            <p className="text-foreground/80 max-w-sm leading-relaxed">
              Votre partenaire de confiance pour tous vos projets électriques et
              énergétiques en Île-de-France.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5 text-foreground">Contact</h4>
            <div className="space-y-4 text-foreground/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                <span>273 Avenue Carnot, Conflans Sainte Honorine</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+33 6 23 30 37 44</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>contact@g-elecplus.fr</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-5 text-foreground">Horaires</h4>
            <div className="flex items-start gap-3 text-foreground/80 mb-7">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p>Lun-Sam : 8h - 18h</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
            <h4 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">Suivez-nous</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all hover:-translate-y-1"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4 text-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-foreground/70">
          <p>© {new Date().getFullYear()} G-ELEC+. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;