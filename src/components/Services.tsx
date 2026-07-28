import { motion } from "framer-motion";
import { Zap, Car, Leaf, Thermometer, Sun, Wrench, Factory, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slug";
import imgElectrical from "@/assets/service-electrical.png";
import imgCharger from "@/assets/service-charger.png";
import imgEnergy from "@/assets/service-energy.png";
import imgHeatpump from "@/assets/service-heatpump.png";
import imgSolar from "@/assets/service-solar.png";
import imgPlumbing from "@/assets/service-plumbing.png";
import imgMaintenance from "@/assets/service-maintenance.png";

type Service = {
  icon: typeof Zap;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  image: string;
  color: string;
  emissive: string;
  light: string;
};

const services: Service[] = [
  {
    icon: Zap,
    title: "Travaux Électriques",
    tag: "Rénovation & Neuf",
    description:
      "Du tableau électrique à la mise aux normes complète, nous concevons des installations fiables, sécurisées et pensées pour durer — qu'il s'agisse d'un appartement, d'une maison ou d'un local professionnel.",
    highlights: ["Mise aux normes NF C 15-100", "Tableaux électriques sur-mesure", "Diagnostic & dépannage rapide"],
    image: imgElectrical,
    color: "#0ea5e9",
    emissive: "#06b6d4",
    light: "#22d3ee",
  },
  {
    icon: Car,
    title: "Bornes IRVE",
    tag: "Mobilité électrique",
    description:
      "Installateur certifié IRVE, nous déployons des bornes de recharge intelligentes pour particuliers, copropriétés et flottes professionnelles. Éligibles aux aides et conformes aux dernières exigences.",
    highlights: ["Certifié IRVE", "Bornes 7 à 22 kW", "Compatible toutes marques"],
    image: imgCharger,
    color: "#10b981",
    emissive: "#34d399",
    light: "#6ee7b7",
  },
  {
    icon: Leaf,
    title: "Solutions Énergétiques",
    tag: "Éco-performance",
    description:
      "Audit, pilotage intelligent, gestion d'énergie — nous identifions les gisements d'économies et déployons les bonnes solutions pour réduire votre consommation sans sacrifier le confort.",
    highlights: ["Audit énergétique complet", "Domotique & pilotage", "Optimisation des coûts"],
    image: imgEnergy,
    color: "#22d3ee",
    emissive: "#67e8f9",
    light: "#a5f3fc",
  },
  {
    icon: Thermometer,
    title: "Pompes à Chaleur",
    tag: "Confort thermique",
    description:
      "PAC air-eau, air-air ou géothermique : nous dimensionnons et installons des systèmes haute performance, silencieux et économes — éligibles MaPrimeRénov' et aux CEE.",
    highlights: ["Dimensionnement précis", "Installation Qualifelec", "Aides de l'État incluses"],
    image: imgHeatpump,
    color: "#3b82f6",
    emissive: "#60a5fa",
    light: "#93c5fd",
  },
  {
    icon: Sun,
    title: "Panneaux Solaires",
    tag: "Énergies renouvelables",
    description:
      "Production photovoltaïque en autoconsommation ou revente, dimensionnée selon votre toit et votre consommation. Monitoring temps réel et garantie longue durée sur tous les composants.",
    highlights: ["Autoconsommation & revente", "Monitoring inclus", "Garantie 20 ans panneaux"],
    image: imgSolar,
    color: "#f59e0b",
    emissive: "#fbbf24",
    light: "#fcd34d",
  },
  {
    icon: Wrench,
    title: "Plomberie Générale",
    tag: "Dépannage & Installation",
    description:
      "Fuites, rénovation de salle de bain, installations sanitaires neuves : notre équipe intervient rapidement avec le souci du travail bien fait, du diagnostic à la mise en service.",
    highlights: ["Intervention rapide", "Rénovation sanitaire", "Devis transparent"],
    image: imgPlumbing,
    color: "#06b6d4",
    emissive: "#22d3ee",
    light: "#67e8f9",
  },
  {
    icon: Factory,
    title: "Maintenance Industrielle",
    tag: "Pros & Industriels",
    description:
      "Contrats de maintenance préventive et curative pour vos équipements électriques industriels. Disponibilité, traçabilité et continuité d'exploitation au cœur de notre démarche.",
    highlights: ["Contrats sur-mesure", "Préventif & curatif", "Astreinte technique"],
    image: imgMaintenance,
    color: "#8b5cf6",
    emissive: "#a78bfa",
    light: "#c4b5fd",
  },
];

const ServiceSlide = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon;
  const reversed = index % 2 === 1;

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id={`service-${slugify(service.title)}`} className="relative py-20 md:py-28 overflow-hidden scroll-mt-24">
      {/* Bold per-service background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${service.color}26 0%, ${service.light}14 50%, ${service.emissive}1f 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background: `radial-gradient(ellipse 70% 60% at ${reversed ? "85%" : "15%"} 50%, ${service.color}40, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}80, transparent)` }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}40, transparent)` }}
      />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
        >
            <div className="relative h-[360px] md:h-[460px] lg:h-[560px] flex items-center justify-center">
              <div
                className="absolute w-[78%] h-[78%] rounded-full blur-3xl opacity-60 animate-glow-pulse"
                style={{ background: `radial-gradient(circle, ${service.color}55, transparent 70%)` }}
              />
              <motion.img
                src={service.image}
                alt={service.title}
                loading="lazy"
                width={1024}
                height={1024}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full object-contain animate-float drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                style={{ filter: `drop-shadow(0 20px 40px ${service.color}55)` }}
              />
            </div>

            {/* Copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs uppercase tracking-wider border"
                style={{ color: service.color, borderColor: `${service.color}55`, background: `${service.color}12` }}
              >
                <Icon className="w-3.5 h-3.5" />
                {service.tag}
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05]">
                {service.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-3 text-foreground/90"
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${service.color}30`, border: `1px solid ${service.color}60` }}
                    >
                      <Check className="w-3.5 h-3.5" style={{ color: service.color }} />
                    </span>
                    <span className="text-base">{h}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                size="lg"
                className="group border text-foreground"
                variant="outline"
                style={{
                  background: `linear-gradient(135deg, ${service.color}1a, ${service.light}0d)`,
                  borderColor: `${service.color}66`,
                  boxShadow: `0 0 30px ${service.color}33`,
                }}
              >
                Nous contacter
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Section intro */}
      <div className="container mx-auto px-4 relative pt-24 md:pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 text-xs uppercase tracking-wider text-primary">
            Nos expertises
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Une <span className="text-gradient">gamme complète</span> de services
          </h2>
          <p className="text-lg text-muted-foreground">
            Sept expertises, une seule équipe. Découvrez chaque savoir-faire en détail.
          </p>
        </motion.div>
      </div>

      {/* Each service as its own slide */}
      {services.map((service, index) => (
        <ServiceSlide key={service.title} service={service} index={index} />
      ))}
    </section>
  );
};

export default Services;