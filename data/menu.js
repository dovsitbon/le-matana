/* =========================================================================
   LE MATANA — La carte
   -------------------------------------------------------------------------
   PRIX À VÉRIFIER : relevés sur une photo de la carte, à faire valider
   par le restaurant avant la mise en ligne.

   Pour modifier un plat : changez "name", "desc" ou "price".
   - price : nombre (15, 16.5…) ou null si le prix est à compléter.
   - tag   : petit badge optionnel ("Signature", "Végétarien"…).
   Pour ajouter un plat : copiez une ligne { ... }, dans la bonne catégorie.
   ========================================================================= */

window.MENU = [
  {
    id: "entrees",
    title: "Entrées",
    items: [
      { name: "Focaccia aglio olio", desc: "Pâte à pizza cuite au feu de bois, ail, huile d'olive, herbes", price: 10 },
      { name: "Focaccia bianca", desc: "Focaccia gratinée au fromage", price: 11 },
      { name: "Carpaccio de saumon", desc: "Fines tranches de saumon, huile d'olive, citron", price: 23, tag: "Signature" },
      { name: "Saumon à la tartare", desc: "Sur un lit d'avocat", price: 22 },
      { name: "Mozza in fiore", desc: "Mozzarella di bufala, tomates", price: 18 },
      { name: "Antipasto fantasia", desc: "Assortiment d'antipasti de la maison", price: 20 },
      { name: "Bâtonnets de mozzarella panés", desc: "", price: 17 },
    ],
  },
  {
    id: "salades",
    title: "Salades",
    note: "Compositions et prix à compléter (environ 22 à 23 €).",
    items: [
      { name: "Chèvre chaud", desc: "", price: null },
      { name: "Impériale", desc: "", price: null },
      { name: "Frutti di mar", desc: "", price: null },
      { name: "Italissima", desc: "", price: null },
      { name: "César", desc: "", price: null },
      { name: "Fromagère", desc: "", price: null },
    ],
  },
  {
    id: "pizzas",
    title: "Pizzas",
    note: "Cuites au feu de bois. Ingrédient supplémentaire 3 € · saumon 4,50 €.",
    items: [
      { name: "Matana", desc: "Tomate, mozzarella, chèvre, miel, noix, roquette", price: null, tag: "Signature" },
      { name: "Margherita", desc: "Tomate, mozzarella, basilic", price: 15 },
      { name: "Napolitana", desc: "", price: 17 },
      { name: "Bianca", desc: "Base crème", price: 16 },
      { name: "Tonno", desc: "Thon", price: 17 },
      { name: "Ruccola", desc: "Roquette", price: 16.5 },
      { name: "Regina", desc: "", price: null },
      { name: "Formaggi", desc: "", price: null },
      { name: "Calzone", desc: "Pizza chausson", price: 17 },
      { name: "Salmone", desc: "Saumon", price: 19 },
      { name: "Mama Lucia", desc: "", price: 18 },
      { name: "Veggie / Quattro stagioni", desc: "", price: 18, tag: "Végétarien" },
      { name: "Bufalina", desc: "Mozzarella di bufala", price: 18 },
      { name: "Al Tartufo", desc: "À la truffe", price: 25 },
    ],
  },
  {
    id: "pates",
    title: "Pâtes",
    note: "Supplément gratiné 2 €.",
    items: [
      { name: "Arrabbiata", desc: "Sauce tomate relevée", price: 18 },
      { name: "Quattro formaggi", desc: "Quatre fromages", price: 18 },
      { name: "Carnavale", desc: "", price: 20 },
      { name: "Al salmone", desc: "Saumon", price: 22 },
      { name: "Al funghi", desc: "Champignons", price: 20 },
      { name: "Al pesto", desc: "Pesto de basilic", price: 19 },
      { name: "Aglio olio", desc: "Ail, huile d'olive", price: 18 },
      { name: "Al tartufo", desc: "Crème de truffe", price: 25, tag: "Signature" },
      { name: "Alla Norma", desc: "Aubergines, tomate", price: 20 },
    ],
  },
  {
    id: "gratins",
    title: "Gratins",
    items: [
      { name: "Norvégien", desc: "Au saumon", price: 22 },
      { name: "Légumes du soleil", desc: "", price: 20 },
      { name: "Dauphinois", desc: "", price: 19 },
      { name: "Millefeuille di melanzane", desc: "Aubergines en millefeuille", price: 19 },
    ],
  },
  {
    id: "poissons",
    title: "Poissons",
    items: [
      { name: "Salmone alla calabrese", desc: "Saumon à la calabraise", price: 26 },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    note: "Carte des desserts à compléter.",
    items: [
      { name: "Crème brûlée", desc: "", price: null },
      { name: "Tiramisu", desc: "", price: null },
    ],
  },
];
