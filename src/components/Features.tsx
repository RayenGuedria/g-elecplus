import { motion } from "framer-motion";
import { Settings, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Settings,
    title: "Solutions Personnalisées",
    description:
      "Chaque projet est unique. Nous adaptons nos solutions à vos besoins, votre budget et vos contraintes.",
  },
  {
    icon: Zap,
    title: "Intervention Rapide",
    description:
      "Une équipe réactive disponible pour vos dépannages et urgences, partout en Île-de-France.",
  },
  {
    icon: Shield,
    title: "Maintenance Préventive",
    description:
      "Programmes sur-mesure pour prolonger la durée de vie de vos installations et éviter les pannes.",
  },
];

const Features = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 text-xs uppercase tracking-wider text-accent">
            Pourquoi G-ELEC+
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Une approche <span className="text-gradient">différente</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-8 text-center group hover:border-primary/40 transition-colors"
              >
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-accent blur-xl opacity-50 group-hover:opacity-90 transition-opacity" />
                  <div className="relative w-full h-full rounded-full bg-gradient-accent flex items-center justify-center animate-float">
                    <Icon className="w-9 h-9 text-accent-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;