import inventory from "../docs/content-inventory.json";
import detailCopy from "../docs/featured-detail-copy.json";
import motifs from "../docs/landmark-brainstorm.json";
import siteCopy from "../docs/site-copy.json";

export const featuredIds = [
  "picklejs",
  "frontend-infra-book",
  "nyc-leetcode-squad",
  "easter-creatures",
];

const spot = (id, x, y, w = 21, h = 25, title) => ({ id, x, y, w, h, title });

export const maps = {
  world: {
    id: "world",
    title: "Toli Land",
    category: "The whole wide world",
    description:
      "A world of things I make, ideas I share, and life along the way.",
    invitation: "Take the scenic route.",
    center: [0.5, 0.48],
    spots: [
      spot("capital", 50, 45, 37, 40),
      spot("work", 21, 19, 25, 29),
      spot("publications", 77, 20, 29, 32),
      spot("writing", 14, 45, 24, 28),
      spot("speaking", 86, 45, 24, 28),
      spot("creative", 19, 75, 27, 30),
      spot("hobbies", 81, 77, 29, 30),
      spot("misc", 50, 83, 24, 25),
    ],
  },
  capital: {
    id: "capital",
    title: "The Capital",
    category: "A few favorites",
    description:
      "A little introduction to the things I build, share, and dream up.",
    invitation: "Good places to begin.",
    center: [0.5, 0.48],
    mobileCenter: [0.29, 0.48],
    spots: [
      spot("picklejs", 19, 47, 26, 49),
      spot("nyc-leetcode-squad", 37, 22, 26, 32),
      spot("frontend-infra-book", 73, 26, 34, 37),
      spot("easter-creatures", 81, 59, 27, 40),
    ],
  },
  work: {
    id: "work",
    title: "Builder’s Bay",
    category: "Work",
    description:
      "Code, community, experiments, and the people behind the work.",
    invitation: "Something is always being built here.",
    center: [0.49, 0.45],
    spots: [
      spot("tolicodes", 20, 19, 23, 29),
      spot("accomplishments", 50, 13, 18, 20),
      spot("picklejs", 85, 20, 22, 32),
      spot("nyc-leetcode-squad", 49, 45, 29, 36),
      spot("neurodiverse-guide-work", 14, 46, 23, 27),
      spot("dropbox-journey", 87, 49, 22, 28),
      spot("intuit-interview", 17, 74, 25, 26),
      spot("paper-resume", 49, 83, 24, 24),
      spot("portfolio", 82, 78, 25, 29),
    ],
  },
  publications: {
    id: "publications",
    title: "The Great Library",
    category: "Publications",
    description: "Books, guides, and ideas with room to unfold.",
    invitation: "Every book opens a little world.",
    center: [0.5, 0.37],
    spots: [
      spot("frontend-infra-book", 50, 27, 39, 41),
      spot("fb-ads-book", 18, 51, 29, 37),
      spot("api-scraping", 83, 53, 28, 38),
      spot("neurodiverse-guide-publication", 50, 76, 34, 32),
    ],
  },
  creative: {
    id: "creative",
    title: "The Art Gardens",
    category: "Creative",
    description:
      "Odd little creatures, shared imagination, and unexpected places to play.",
    invitation: "Leave a little room for the wonderful.",
    center: [0.49, 0.48],
    spots: [
      spot("easter-creatures", 33, 35, 42, 51),
      spot("las-chicas", 77, 33, 37, 45),
      spot("spa-date", 60, 72, 44, 43),
    ],
  },
  speaking: {
    id: "speaking",
    title: "Speaker’s Summit",
    category: "Speaking",
    description: "Conversations about technology, community, and being human.",
    invitation: "Pull up a chair.",
    center: [0.5, 0.46],
    spots: [
      spot("aspergers-empathy", 20, 29, 30, 34),
      spot("developer-happiness", 50, 18, 29, 32),
      spot("leetcode-squad-podcast", 84, 31, 29, 34),
      spot("autism-kink", 25, 69, 34, 34),
      spot("lifestyle-kink-interview", 79, 70, 34, 34),
    ],
  },
  writing: {
    id: "writing",
    title: "Story Grove",
    category: "Writing",
    description:
      "Thoughts on connection, perspective, and the strange experience of being alive.",
    invitation: "Follow a thought somewhere.",
    center: [0.5, 0.45],
    spots: [
      spot("getting-back-to-love", 50, 23, 32, 34),
      spot("energy-cords", 19, 42, 28, 32, "Energy Cords"),
      spot("focus-on-negative", 84, 36, 29, 32, "A Different Perspective"),
      spot("rejection-breakups", 21, 69, 29, 32, "Vulnerability"),
      spot("boredom-bipolar", 50, 64, 28, 32, "Boredom & Bipolar"),
      spot("dota-consciousness", 83, 68, 29, 33, "DOTA & Consciousness"),
    ],
  },
  hobbies: {
    id: "hobbies",
    title: "Adventure Isles",
    category: "Hobbies",
    description:
      "Life beyond the screen. Movement, nature, play, and good company.",
    invitation: "There’s more than one way to play.",
    center: [0.5, 0.47],
    spots: [
      ...[
        "acroyoga",
        "cuddle-parties",
        "my-doggo",
        "public-speaking",
        "swimming",
        "neurodiversity",
      ].map((id, i) => spot(id, [10, 27, 43, 58, 74, 90][i], 22, 14, 24)),
      ...[
        "storytelling",
        "weird-stuff",
        "volunteering-eco",
        "nature",
        "parody-videos",
        "water-sports",
      ].map((id, i) => spot(id, [10, 27, 43, 58, 74, 90][i], 49, 14, 24)),
      ...[
        "russian-bathhouse",
        "burning-man",
        "dall-e-play",
        "sex-positivity",
        "hiking",
        "biking",
      ].map((id, i) => spot(id, [10, 27, 43, 58, 74, 90][i], 79, 14, 24)),
    ],
  },
  misc: {
    id: "misc",
    title: "Curiosity Cove",
    category: "Misc",
    description:
      "A treasure chest of plans, places, principles, and curious detours.",
    invitation: "See what washes ashore.",
    center: [0.5, 0.45],
    spots: [
      spot("my-goals", 20, 22, 23, 27),
      spot("rituals", 50, 20, 23, 26),
      spot("travels", 80, 22, 25, 27),
      spot("principles", 20, 46, 25, 25),
      spot("toliwags", 50, 46, 26, 25),
      spot("fun-with-dalle", 82, 46, 25, 25),
      spot("dating-bounty", 18, 72, 25, 28),
      spot("kinkbuddy", 50, 72, 25, 28),
      spot("obscure-parody-vids", 82, 73, 25, 30),
    ],
  },
};

export const kingdomIds = [
  "work",
  "publications",
  "speaking",
  "creative",
  "writing",
  "hobbies",
  "misc",
];

export const projects = inventory.map((entry) => {
  const copy = detailCopy[entry.id];
  const isFeatured = featuredIds.includes(entry.id);
  const defaultLabel =
    {
      book: "Read the book",
      article: "Read the story",
      essay: "Read the essay",
      guide: "Open the guide",
      podcast: "Listen to the conversation",
      video: "Watch the video",
      community: "Meet the community",
      resume: "Open the résumé",
    }[entry.kind] || "Explore the project";
  let links =
    copy?.links || (entry.url ? [{ label: defaultLabel, url: entry.url }] : []);
  // The old PickleJS domain is no longer resolving. Lead with the maintained origin story.
  if (entry.id === "picklejs")
    links = [
      {
        label: "Read the origin story",
        url: "https://feinfra.com/scaling-fe-teams-my-hover-story/",
      },
    ];
  const title = entry.id === "rituals" ? "Rituals" : entry.title;
  return {
    ...entry,
    title,
    featured: isFeatured,
    motif: motifs[entry.id],
    summary: copy?.summary || siteCopy[entry.id] || entry.description,
    eyebrow: copy?.eyebrow || maps[entry.kingdom].category,
    chapters: copy?.chapters || [],
    links,
    artwork: isFeatured
      ? `/assets/projects/${entry.id}.webp`
      : `/assets/maps/${entry.kingdom}.webp`,
    landmark: maps[entry.kingdom].spots.find((s) => s.id === entry.id),
  };
});

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));

export function getMap(id) {
  return maps[id] || maps.world;
}

export function getMapSpots(id) {
  const map = getMap(id);
  return map.spots.map((point) => {
    const target = map.id === "world" ? maps[point.id] : projectById[point.id];
    return {
      ...point,
      title: point.title || target?.title || point.id,
      subtitle: target?.category || target?.eyebrow,
      featured: point.id === "capital" || target?.featured,
      destination: map.id === "world" ? "map" : "project",
    };
  });
}
