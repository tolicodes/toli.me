// Selected personal-site scope, October 3, 2026. Original destinations and
// writing titles are preserved from docs/content-inventory.json. Drawn was
// added in the later scope decision; Principles' maintained repository now
// identifies https://principles.toli.me as its canonical public site.
const drawn = {
  id: "drawn",
  title: "Drawn",
  description: "Life, in comic form.",
  href: "https://drawn.toli.me/",
  cta: "Read the comics",
  image: "/assets/personal/drawn-toli-banters-sober-ish.webp",
  imageAlt: "Sober-ish, a published Toli Banters comic showing a colorful conversation on a sofa.",
  imageClass: "drawn",
};

const guide = {
  id: "neurodiverse-guide",
  title: "Neurodiverse Guide",
  description: "Making work work for different minds.",
  href: "https://os.toli.me",
  cta: "Read the guide",
  image: "/assets/personal/guide-character.webp",
  imageAlt: "An illustrated Neurodiverse Guide book with welcoming arms and walking boots.",
  imageClass: "guide",
};

const datingBounty = {
  id: "dating-bounty",
  title: "Dating Bounty",
  description: "A very personal side project.",
  href: "https://love.toli.me/",
  cta: "Take a look",
  image: "/assets/personal/dating-bounty.webp",
  imageAlt: "A cheerful pink envelope character with a heart seal and a little matchmaking note.",
  imageClass: "dating",
};

export const featuredProjects = [drawn, guide, datingBounty];

export const publications = [
  guide,
  {
    id: "principles",
    title: "Principles",
    description: "A collaborative book about approaching life’s obstacles.",
    href: "https://principles.toli.me",
    cta: "Read the book",
  },
];

export const creativeProjects = [
  drawn,
  {
    id: "easter-creatures",
    title: "Easter Creatures",
    description: "Creature drawings, hidden eggs, and a Miami art experiment.",
    href: "https://eastercreatures.carrd.co/",
    cta: "Meet the creatures",
    image: "/assets/personal/easter-creatures.webp",
    imageAlt: "Original Easter Creatures sketch of a top-hatted creature holding a hot drink, with balloons and a small companion.",
    imageClass: "easter",
  },
  {
    id: "las-chicas",
    title: "Las Chicas",
    description: "A visit to an art collective and printmaking workshop in Granada, Nicaragua.",
    href: "https://laschicas.tolicodes.com/",
    cta: "Visit the workshop",
    image: "/assets/personal/las-chicas.webp",
    imageAlt: "Las Chicas artists in their Granada workshop holding Dropbox Growth prints behind a display of handmade art.",
    imageClass: "las-chicas",
  },
  {
    id: "spa-date",
    title: "Spa Date",
    description: "A playful invitation to a spa date.",
    href: "https://spadate.toli.me",
    cta: "Take a look",
  },
  {
    id: "obscure-parody-vids",
    title: "Obscure Parody Videos",
    description: "A detour into the wonderfully obscure.",
    href: "https://www.youtube.com/watch?v=484U5bUcnb0",
    cta: "Watch the video",
  },
];

export const writing = [
  {
    id: "getting-back-to-love",
    title: "Getting Back to Love",
    description: "Reflections on finding a way back to love.",
    href: "https://tolicodes.medium.com/getting-back-to-love-2942d026882b",
    cta: "Read the essay",
  },
  {
    id: "energy-cords",
    title: "Energy Cords and Foreign Energy in your Aura",
    description: "An exploration of energy cords and the aura.",
    href: "https://tolicodes.medium.com/energy-cords-and-foreign-energy-in-your-aura-7bae5ac3c57c",
    cta: "Read the essay",
  },
  {
    id: "focus-on-negative",
    title: "Why We Focus on the Negative and How Can We Change It",
    description: "On negative focus and the possibility of changing it.",
    href: "https://tolicodes.medium.com/why-we-focus-on-the-negative-and-how-its-keeping-us-from-happiness-da2224de0899",
    cta: "Read the essay",
  },
  {
    id: "rejection-breakups",
    title: "Rejection, Breakups, Vulnerability, and BDSM",
    description: "A personal essay on rejection, vulnerability, and connection.",
    href: "https://tolicodes.medium.com/rejection-breakups-vulnurability-and-bdsm-b2f80b682373",
    cta: "Read the essay",
  },
  {
    id: "boredom-bipolar",
    title: "The Problem with Boredom and Bipolar",
    description: "A personal reflection on boredom and bipolar.",
    href: "https://tolicodes.medium.com/the-problem-with-boredom-and-bipolar-442e62ed29ee",
    cta: "Read the essay",
  },
  {
    id: "dota-consciousness",
    title: "DOTA and Consciousness",
    description: "An essay connecting DOTA and consciousness.",
    href: "https://tolicodes.medium.com/dota-and-conciousness-87609258854a",
    cta: "Read the essay",
  },
];

// Copied from docs/travel-import/travel-data.json, verified October 3, 2026
// against the original travel page's explicit visited list and map permalink.
// This is the source archive, not a newly verified lifetime tally. Ambiguous
// Hawaii/June 2020 mentions, template text and unverified trip dates stay out.
export const travelArchive = {
  title: "Places I’ve been",
  intro: "A little of the world I’ve explored.",
  sourceUrl: "https://travel.tolicodes.com/",
  countries: [
    { id: "ca", name: "Canada", group: "Americas" },
    { id: "cr", name: "Costa Rica", group: "Americas" },
    { id: "ni", name: "Nicaragua", group: "Americas" },
    { id: "us", name: "United States", group: "Americas" },
    { id: "fi", name: "Finland", group: "Europe" },
    { id: "fr", name: "France", group: "Europe" },
    { id: "it", name: "Italy", group: "Europe" },
    { id: "ru", name: "Russia", group: "Europe & Asia" },
    { id: "tz", name: "Tanzania", group: "Africa" },
    { id: "il", name: "Israel", group: "Asia" },
    { id: "my", name: "Malaysia", group: "Asia" },
    { id: "th", name: "Thailand", group: "Asia" },
    { id: "vn", name: "Vietnam", group: "Asia" },
    { id: "au", name: "Australia", group: "Oceania" },
  ],
};
