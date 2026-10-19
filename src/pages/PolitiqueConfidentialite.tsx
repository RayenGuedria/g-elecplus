import LegalLayout from "@/components/LegalLayout";

const PolitiqueConfidentialite = () => {
  return (
    <LegalLayout title="Politique de confidentialité" updated="19 octobre 2026">
      <p>
        G-ELEC+ accorde une grande importance à la protection de vos données personnelles. La
        présente politique décrit comment nous collectons, utilisons et protégeons vos données
        lorsque vous utilisez le site <strong>g-elecplus.fr</strong>, conformément au Règlement
        Général sur la Protection des Données (RGPD, Règlement UE 2016/679) et à la loi
        « Informatique et Libertés ».
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est G-ELEC+, dont le siège social est situé au
        273 Avenue Carnot, 78700 Conflans-Sainte-Honorine, France.
        <br />
        Contact : <a href="mailto:contact@g-elecplus.fr">contact@g-elecplus.fr</a> —{" "}
        <a href="tel:+33623303744">+33 6 23 30 37 44</a>
      </p>

      <h2>2. Données collectées</h2>
      <p>
        Nous collectons uniquement les données que vous nous transmettez volontairement via notre
        formulaire de contact, à savoir selon votre profil :
      </p>
      <ul>
        <li>Nom et prénom / nom du contact</li>
        <li>Nom de l'entreprise ou de la société (professionnels et industriels)</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone</li>
        <li>Adresse postale et ville du projet ou du site</li>
        <li>Nature du service souhaité et description de votre projet</li>
      </ul>
      <p>
        Aucune donnée dite « sensible » au sens du RGPD n'est collectée. Les champs sont limités
        à ce qui est strictement nécessaire au traitement de votre demande (principe de
        minimisation).
      </p>

      <h2>3. Finalités du traitement</h2>
      <ul>
        <li>Répondre à vos demandes de devis et de renseignements ;</li>
        <li>Vous recontacter dans le cadre de votre projet ;</li>
        <li>Établir une proposition commerciale adaptée à votre besoin.</li>
      </ul>

      <h2>4. Base légale</h2>
      <p>
        Le traitement repose sur votre <strong>consentement</strong> (article 6.1.a du RGPD),
        recueilli lors de l'envoi du formulaire, ainsi que sur l'exécution de mesures
        précontractuelles prises à votre demande (article 6.1.b).
      </p>

      <h2>5. Destinataires des données</h2>
      <p>
        Vos données sont destinées exclusivement aux équipes de G-ELEC+ en charge du traitement
        de votre demande. L'acheminement des messages du formulaire est assuré par notre
        sous-traitant technique <strong>Web3Forms</strong>, qui transmet le contenu du formulaire
        par email sans le stocker de façon permanente. Vos données ne sont ni vendues, ni louées,
        ni cédées à des tiers à des fins commerciales.
      </p>

      <h2>6. Durée de conservation</h2>
      <p>
        Vos données sont conservées pour la durée nécessaire au traitement de votre demande, puis
        archivées ou supprimées au plus tard <strong>3 ans</strong> après notre dernier contact,
        sauf obligation légale de conservation plus longue (obligations comptables ou fiscales).
      </p>

      <h2>7. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits suivants sur vos données :
      </p>
      <ul>
        <li>Droit d'accès, de rectification et d'effacement ;</li>
        <li>Droit à la limitation et à l'opposition au traitement ;</li>
        <li>Droit à la portabilité de vos données ;</li>
        <li>Droit de retirer votre consentement à tout moment.</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à{" "}
        <a href="mailto:contact@g-elecplus.fr">contact@g-elecplus.fr</a>. Vous pouvez également
        introduire une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>)
        si vous estimez que vos droits ne sont pas respectés.
      </p>

      <h2>8. Cookies et traceurs</h2>
      <p>
        Le site n'utilise pas de cookies publicitaires ni de traceurs à des fins de suivi
        marketing. Un stockage local (localStorage) est utilisé uniquement pour mémoriser votre
        préférence de thème (clair / sombre). La carte de localisation est intégrée via Google
        Maps, susceptible de déposer ses propres cookies lors de son chargement ; vous pouvez
        vous y opposer via les paramètres de votre navigateur.
      </p>

      <h2>9. Sécurité</h2>
      <p>
        G-ELEC+ met en œuvre les mesures techniques et organisationnelles appropriées pour
        protéger vos données contre tout accès, altération ou divulgation non autorisés. Les
        échanges avec le site sont chiffrés via le protocole HTTPS.
      </p>

      <h2>10. Contact</h2>
      <p>
        Pour toute question relative à la présente politique de confidentialité, vous pouvez nous
        écrire à <a href="mailto:contact@g-elecplus.fr">contact@g-elecplus.fr</a>.
      </p>
    </LegalLayout>
  );
};

export default PolitiqueConfidentialite;
