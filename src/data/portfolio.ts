export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
  imageFit?: 'contain';
  screenshots?: { src: string; alt: string }[];
  intro: string;
  role: string;
  nextLabel: string;
  siteUrl?: string;
  siteType?: 'repository';
  status?: 'development';
  description?: string;
};

export const profile = {
  firstName: 'Ehouman Eliezer',
  lastName: 'Yves',
  role: 'Développeur backend · Django & Vue.js',
  city: 'Abidjan · disponible partout',
  availability: 'Ouvert aux projets choisis',
  email: 'ehoumaneliezer@gmail.com',
  intro: 'Je développe des applications web robustes avec Django et Vue.js, du backend aux fonctionnalités utilisées au quotidien.',
  about: 'Je suis développeur web, spécialisé en backend avec Django et dans la création d’applications avec Vue.js. J’aime concevoir des fonctionnalités utiles, structurer les données et construire des API fiables.',
};

export const projects: Project[] = [
  {
    id: 'kawastock', index: '01', title: 'KawaStock', category: 'SaaS · Gestion de stock', year: '2026',
    image: './images/kawastock-logo.png',
    imageAlt: 'Logo bleu de KawaStock représentant des boîtes de stock',
    imageFit: 'contain',
    screenshots: [{ src: './images/kawastock-login.png', alt: 'Formulaire de connexion KawaStock avec aperçu de l’application de gestion de commerce' }],
    intro: 'Une application SaaS multi-boutiques pour gérer les stocks et les ventes.',
    role: 'Développement de l’application', nextLabel: 'Voir le dépôt GitHub',
    siteUrl: 'https://github.com/yvesmemphis/Kawastock',
    siteType: 'repository',
    description: 'KawaStock permet de gérer les produits, fournisseurs, achats, inventaires, utilisateurs et mouvements de stock. Chaque commerce dispose de ses propres rôles et permissions.',
  },
  {
    id: 'sira', index: '02', title: 'Sira', category: 'Logiciel RH · En développement', year: '2026',
    image: './images/sira-logo.png',
    imageAlt: 'Logo vert de l’application Sira',
    imageFit: 'contain',
    screenshots: [
      { src: './images/sira/sira-login.png', alt: 'Formulaire de connexion sécurisé de Sira, application de gestion de présence' },
      { src: './images/sira/sira-dashboard.png', alt: 'Tableau de bord Sira avec indicateurs de présence, ressources humaines et contrats' },
    ],
    intro: 'Un logiciel RH complet en développement, avec gestion des présences, pointage par QR code et de nombreuses autres fonctionnalités.',
    role: 'Développement d’un logiciel RH', nextLabel: 'Voir les captures',
    status: 'development',
    description: 'Sira est un logiciel RH complet toujours en développement. Il prévoit notamment la gestion des présences et le pointage par QR code, ainsi que de nombreuses autres fonctionnalités.',
  },
  {
    id: 'siraflow', index: '03', title: 'SiraFlow', category: 'Outil web · OpenAPI', year: '2026',
    image: 'https://siraflow.vercel.app/assets/hero-openapi.webp',
    imageAlt: 'Illustration SiraFlow, une spécification transformée en carte de routes API',
    intro: 'Un explorateur visuel pour lire, parcourir et tester des contrats OpenAPI et Swagger.',
    role: 'Développement de l’application web', nextLabel: 'Ouvrir SiraFlow',
    siteUrl: 'https://siraflow.vercel.app/',
    description: 'SiraFlow permet de charger une spécification OpenAPI ou Swagger depuis une URL ou un fichier local, puis d’en explorer les routes, opérations, paramètres et réponses.',
  },
  {
    id: 'association-miracle', index: '04', title: 'Association MIRACLE', category: 'Site web · ONG', year: '2026',
    image: 'https://associationmiracle.com/miracle.jpg',
    imageAlt: 'L’association humanitaire MIRACLE et ses actions en Côte d’Ivoire',
    intro: 'Un site solidaire pour faire connaître les actions de MIRACLE autour de l’éducation et de la santé.',
    role: 'Développement du site web', nextLabel: 'Visiter le site',
    siteUrl: 'https://associationmiracle.com/',
    description: 'Le site présente les missions de MIRACLE, ses programmes d’accompagnement scolaire et de santé, ses actualités et les différentes façons de soutenir l’association.',
  },
];

export const skills = ['Python', 'Django', 'Vue.js', 'API REST', 'Bases de données'];

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/yves_mem_phiz/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eliezer-ehouman-47b49139a/' },
  { label: 'GitHub', href: 'https://github.com/yvesmemphis' },
];
