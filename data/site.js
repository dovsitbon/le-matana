/* =========================================================================
   LE MATANA — Informations générales du restaurant
   -------------------------------------------------------------------------
   Modifiez ici le téléphone, les horaires, les liens de livraison, etc.
   Le site se met à jour automatiquement (aucune autre modification requise),
   SAUF les horaires du bloc Schema.org dans index.html (SEO) : pensez à les
   aligner (rechercher "openingHoursSpecification").
   ========================================================================= */

window.SITE = {
  name: "Le Matana",
  phone: "01 46 55 04 07",
  phoneIntl: "+33146550407",
  // À CONFIRMER : adresse e-mail utilisée par le formulaire de réservation (mailto)
  email: "contact@lematana.fr",

  address: {
    street: "103 rue Gabriel Péri",
    zip: "92120",
    city: "Montrouge",
  },

  // Formulaire de réservation :
  // - laissez vide ("") pour ouvrir le logiciel de messagerie (mailto) ;
  // - ou collez l'identifiant Formspree (ex. "xyzabcd") pour un envoi direct.
  formspreeId: "",

  /* ---------------------------------------------------------------------
     HORAIRES — À CONFIRMER avec le gérant
     Une ligne par jour. "closed: true" = fermé.
     "note" s'affiche en petit sous l'horaire.
     --------------------------------------------------------------------- */
  hours: [
    { day: "Lundi",    open: "18h30", close: "23h00" },
    { day: "Mardi",    open: "18h30", close: "23h00" },
    { day: "Mercredi", open: "18h30", close: "23h00" },
    { day: "Jeudi",    open: "18h30", close: "23h00" },
    { day: "Vendredi", closed: true, note: "Chabbat" },
    { day: "Samedi",   closed: true, note: "Chabbat" },
    { day: "Dimanche", open: "18h30", close: "23h00" },
  ],
  hoursNote: "Service du soir à partir de 18h30. Horaires des fêtes juives : nous consulter.",

  // Certification cachère — À CONFIRMER (nom exact de l'organisme)
  kosherCertification: "[Nom de la certification à confirmer]",

  // Avis Google (ne pas inventer d'avis : uniquement la note et le lien)
  google: {
    rating: "4,5",
    count: 69,
    url: "https://www.google.com/maps/search/?api=1&query=Le+Matana+103+rue+Gabriel+P%C3%A9ri+92120+Montrouge",
  },

  // Livraison — liens à remplacer par les vraies pages du restaurant
  delivery: {
    deliveroo: "#", // À CONFIRMER : lien de la page Deliveroo
    ubereats: "#",  // À CONFIRMER : lien de la page Uber Eats
  },

  // Réseaux sociaux — À CONFIRMER
  social: {
    instagram: "#",
    facebook: "#",
  },
};
