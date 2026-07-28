import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Quels types de travaux électriques proposez-vous ?",
    answer: "Nous offrons une gamme complète de services électriques, incluant la rénovation, les nouvelles installations, et la maintenance.",
  },
  {
    question: "Intervenez-vous en cas d'urgence ?",
    answer: "Oui, nous avons une équipe dédiée pour répondre rapidement à toutes vos urgences électriques et de plomberie.",
  },
  {
    question: "Comment se déroule l'installation d'une borne de recharge pour véhicule électrique ?",
    answer: "Nous évaluons vos besoins, proposons la solution adaptée, et réalisons une installation conforme aux normes en vigueur.",
  },
  {
    question: "Pouvez-vous entretenir des installations existantes ?",
    answer: "Absolument. Nous proposons des services de maintenance pour prolonger la durée de vie et assurer la sécurité de vos installations existantes.",
  },
  {
    question: "Offrez-vous des garanties sur vos services ?",
    answer: "Oui, tous nos travaux sont garantis. Nous nous engageons à la qualité et à la durabilité de nos services.",
  },
  {
    question: "Quels types de paiements acceptez-vous ?",
    answer: "Nous acceptons divers modes de paiement, incluant les virements bancaires, les cartes de crédit, et d'autres options flexibles pour votre convenance.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 text-xs uppercase tracking-wider text-primary">
            Questions fréquentes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tout ce qu'il faut <span className="text-gradient">savoir</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass rounded-2xl px-6 border-white/10"
                >
                  <AccordionTrigger className="text-left hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;