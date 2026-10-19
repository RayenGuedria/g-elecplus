import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MapPin, Phone, Mail, Clock, Send, Home, Building2, Factory } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PhoneInput } from "./PhoneInput";
import { CitySelect } from "./CitySelect";

type ProfileKey = "particulier" | "professionnel" | "industriel";

const profiles: {
  key: ProfileKey;
  label: string;
  icon: typeof Home;
  headline: string;
  subtitle: string;
}[] = [
  {
    key: "particulier",
    label: "Particulier",
    icon: Home,
    headline: "Obtenez votre devis gratuit en 24h",
    subtitle: "Une équipe à l'écoute pour votre maison ou appartement.",
  },
  {
    key: "professionnel",
    label: "Professionnel",
    icon: Building2,
    headline: "Un interlocuteur dédié pour vos projets",
    subtitle: "Réactivité et expertise pour vos locaux et chantiers.",
  },
  {
    key: "industriel",
    label: "Industriel",
    icon: Factory,
    headline: "Expertise technique pour vos sites industriels",
    subtitle: "Maintenance, installations neuves et audits sur site.",
  },
];

const Contact = () => {
  const [profile, setProfile] = useState<ProfileKey>("particulier");
  const [urgency, setUrgency] = useState(false);

  useEffect(() => {
    const onSet = (e: Event) => {
      const detail = (e as CustomEvent).detail as ProfileKey;
      if (detail) setProfile(detail);
    };
    window.addEventListener("set-contact-profile", onSet as EventListener);
    return () => window.removeEventListener("set-contact-profile", onSet as EventListener);
  }, []);

  const infos = [
    { icon: MapPin, title: "Adresse", lines: ["273 Avenue Carnot,", "Conflans Sainte Honorine"] },
    { icon: Phone, title: "Téléphone", lines: ["+33 6 23 30 37 44"] },
    { icon: Mail, title: "Email", lines: ["contact@g-elecplus.fr"] },
    { icon: Clock, title: "Horaires", lines: ["Lun-Sam : 8h - 18h", "Dimanche : Fermé"] },
  ];

  const current = profiles.find((p) => p.key === profile);

  return (
    <section id="contact" className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 text-xs uppercase tracking-wider text-accent">
            Parlons projet
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            On vous <span className="text-gradient">répond vite</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choisissez votre profil — chaque formulaire est adapté à votre projet.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Profile selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {profiles.map((p) => {
              const Icon = p.icon;
              const active = profile === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setProfile(p.key)}
                  className={`group relative rounded-2xl p-5 text-left transition-all border-2 ${
                    active
                      ? "border-accent bg-accent/10 shadow-glow-accent"
                      : "border-white/10 glass hover:border-accent/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        active ? "bg-gradient-accent shadow-glow-accent" : "bg-background/60"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? "text-accent-foreground" : "text-accent"}`} />
                    </div>
                    <div>
                      <div className="font-semibold">{p.label}</div>
                      <div className="text-xs text-muted-foreground">{p.subtitle}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main form block - large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-6 md:p-10"
          >
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{current.headline}</h3>
                  <p className="text-muted-foreground mb-6">{current.subtitle}</p>

                  <form
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="space-y-4"
                  >
                    <input type="hidden" name="access_key" value="82812c81-026d-4fb3-8bea-0dcf0ac89f05" />
                    <input type="hidden" name="profil" value={current.label} />
                    <input type="hidden" name="subject" value={`Nouveau message ${current.label} — G-ELEC+`} />
                    <input type="hidden" name="from_name" value="Site G-ELEC+" />
                    <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                    {/* Honeypot anti-spam */}
                    <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                    {current.key === "particulier" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="name" autoComplete="name" placeholder="Nom complet" required className="bg-background/50 border-white/10 h-12" />
                        <PhoneInput name="phone" required />
                        <Input type="email" name="email" autoComplete="email" placeholder="Email" required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Adresse email valide requise" className="bg-background/50 border-white/10 h-12" />
                        <CitySelect name="city" placeholder="Ville" required />
                        <Input name="address" autoComplete="street-address" placeholder="Adresse complète (n°, rue, code postal)" required className="bg-background/50 border-white/10 h-12 md:col-span-2" />
                        <Select name="service">
                          <SelectTrigger className="bg-background/50 border-white/10 h-12 md:col-span-2">
                            <SelectValue placeholder="Service souhaité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solaire">Panneaux solaires</SelectItem>
                            <SelectItem value="pac">Pompe à chaleur</SelectItem>
                            <SelectItem value="irve">Borne IRVE</SelectItem>
                            <SelectItem value="electricite">Travaux électriques</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea name="message" placeholder="Décrivez votre projet" rows={4} required className="bg-background/50 border-white/10 md:col-span-2" />
                      </div>
                    )}

                    {current.key === "professionnel" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="company" autoComplete="organization" placeholder="Nom de l'entreprise" required className="bg-background/50 border-white/10 h-12" />
                        <Input name="name" autoComplete="name" placeholder="Nom du contact" required className="bg-background/50 border-white/10 h-12" />
                        <PhoneInput name="phone" required />
                        <Input type="email" name="email" autoComplete="email" placeholder="Email professionnel" required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Adresse email valide requise" className="bg-background/50 border-white/10 h-12" />
                        <CitySelect name="city" placeholder="Ville" required />
                        <Input name="address" autoComplete="street-address" placeholder="Adresse complète (n°, rue, code postal)" required className="bg-background/50 border-white/10 h-12" />
                        <Select name="project_type">
                          <SelectTrigger className="bg-background/50 border-white/10 h-12 md:col-span-2">
                            <SelectValue placeholder="Type de projet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="renovation">Rénovation électrique</SelectItem>
                            <SelectItem value="irve">Bornes de recharge</SelectItem>
                            <SelectItem value="solaire">Installation solaire</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="md:col-span-2 flex items-center justify-between rounded-xl border border-white/10 bg-background/40 px-4 py-3">
                          <div>
                            <div className="font-medium">Projet urgent</div>
                            <div className="text-xs text-muted-foreground">Activez pour une prise en charge prioritaire</div>
                          </div>
                          <Switch checked={urgency} onCheckedChange={setUrgency} name="urgency" />
                          <input type="hidden" name="urgent" value={urgency ? "Oui" : "Non"} />
                        </div>
                        <Textarea name="message" placeholder="Détails du projet" rows={4} className="bg-background/50 border-white/10 md:col-span-2" />
                      </div>
                    )}

                    {current.key === "industriel" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="company" autoComplete="organization" placeholder="Société" required className="bg-background/50 border-white/10 h-12" />
                        <CitySelect name="site" placeholder="Localisation du site" required />
                        <Input name="address" autoComplete="street-address" placeholder="Adresse complète du site (n°, rue)" required className="bg-background/50 border-white/10 h-12 md:col-span-2" />
                        <Input name="postal_code" autoComplete="postal-code" placeholder="Code postal" required inputMode="numeric" pattern="\d{4,5}" className="bg-background/50 border-white/10 h-12" />
                        <Select name="scope">
                          <SelectTrigger className="bg-background/50 border-white/10 h-12">
                            <SelectValue placeholder="Périmètre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="installation">Nouvelle installation</SelectItem>
                            <SelectItem value="audit">Audit technique</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input type="email" name="email" autoComplete="email" placeholder="Email" required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Adresse email valide requise" className="bg-background/50 border-white/10 h-12 md:col-span-2" />
                        <Textarea name="message" placeholder="Contexte technique" rows={4} className="bg-background/50 border-white/10 md:col-span-2" />
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-accent text-accent-foreground hover:opacity-90 shadow-glow-accent"
                    >
                      Envoyer <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info boxes underneath */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {infos.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center mb-3 shadow-glow-accent">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h4 className="font-semibold mb-1 text-sm">{info.title}</h4>
                  <div className="text-xs text-muted-foreground">
                    {info.lines.map((l) => <p key={l}>{l}</p>)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 max-w-5xl mx-auto glass rounded-3xl p-2 overflow-hidden"
        >
          <div className="w-full h-[420px] rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d163.5576976064638!2d2.0926916985770108!3d49.012046787461216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e68aba018bfebf%3A0x48848b0b2f8058ff!2s273%20Av.%20Carnot%2C%2078700%20Conflans-Sainte-Honorine%2C%20France!5e0!3m2!1sen!2stn!4v1725054240540!5m2!1sen!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="G-ELEC+ Location"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;