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

const spot = (id, x, y, w = 21, h = 25, title, labelY) => ({
  id,
  x,
  y,
  w,
  h,
  title,
  labelY,
});

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
      spot("capital", 50, 48, 29, 31, undefined, 61),
      spot("work", 25, 20, 24, 29, undefined, 34),
      spot("publications", 76, 20, 27, 33, undefined, 36),
      spot("writing", 13, 45, 24, 30, undefined, 64),
      spot("speaking", 88, 47, 19, 30, undefined, 64),
      spot("creative", 21, 76, 26, 29, undefined, 92),
      spot("hobbies", 79, 77, 27, 26, undefined, 92),
      spot("misc", 50, 80, 24, 29, undefined, 96),
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
      spot("picklejs", 18, 54, 26, 53, undefined, 82),
      spot("nyc-leetcode-squad", 38, 22, 26, 28, undefined, 36),
      spot("frontend-infra-book", 73, 28, 32, 36, undefined, 48),
      spot("easter-creatures", 82, 63, 25, 38, undefined, 84),
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
      spot("tolicodes", 20, 21, 23, 28, undefined, 35),
      spot("accomplishments", 50, 15, 18, 26, undefined, 29),
      spot("picklejs", 83, 21, 20, 33, undefined, 39),
      spot("nyc-leetcode-squad", 50, 45, 25, 29, undefined, 59),
      spot("neurodiverse-guide-work", 15, 48, 25, 26, undefined, 64),
      spot("dropbox-journey", 85, 51, 24, 28, undefined, 65),
      spot("intuit-interview", 22, 79, 28, 24, undefined, 93),
      spot("paper-resume", 50, 81, 21, 27, undefined, 95),
      spot("portfolio", 79, 78, 27, 30, undefined, 95),
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
      spot("frontend-infra-book", 49, 25, 33, 35, undefined, 46),
      spot("fb-ads-book", 20, 52, 28, 34, undefined, 69),
      spot("api-scraping", 83, 53, 28, 34, undefined, 69),
      spot("neurodiverse-guide-publication", 50, 76, 31, 29, undefined, 91),
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
      spot("easter-creatures", 30, 35, 29, 41, undefined, 58),
      spot("las-chicas", 75, 33, 31, 35, undefined, 54),
      spot("spa-date", 58, 75, 38, 35, undefined, 94),
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
      spot("aspergers-empathy", 20, 33, 26, 23, undefined, 47),
      spot("developer-happiness", 50, 18, 25, 28, undefined, 35),
      spot("leetcode-squad-podcast", 83, 35, 23, 28, undefined, 51),
      spot("autism-kink", 26, 69, 24, 28, undefined, 85),
      spot("lifestyle-kink-interview", 78, 73, 33, 25, undefined, 89),
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
      spot("getting-back-to-love", 50, 23, 25, 26, undefined, 36),
      spot("energy-cords", 20, 38, 27, 24, "Energy Cords", 49),
      spot("focus-on-negative", 82, 35, 26, 22, "A Different Perspective", 45),
      spot("rejection-breakups", 21, 68, 26, 28, "Vulnerability", 83),
      spot("boredom-bipolar", 50, 66, 24, 28, "Boredom & Bipolar", 82),
      spot("dota-consciousness", 81, 69, 25, 37, "DOTA & Consciousness", 89),
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
      ].map((id, i) =>
        spot(id, [10, 27, 43, 58, 74, 90][i], 22, 14, 24, undefined, 31),
      ),
      ...[
        "storytelling",
        "weird-stuff",
        "volunteering-eco",
        "nature",
        "parody-videos",
        "water-sports",
      ].map((id, i) =>
        spot(id, [10, 27, 43, 58, 74, 90][i], 48, 14, 24, undefined, 57),
      ),
      ...[
        "russian-bathhouse",
        "burning-man",
        "dall-e-play",
        "sex-positivity",
        "hiking",
        "biking",
      ].map((id, i) =>
        spot(
          id,
          [10, 27, 43, 58, 74, 90][i],
          76,
          i === 0 ? 18 : 14,
          24,
          undefined,
          i === 0 ? 84.5 : 86,
        ),
      ),
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
      spot("my-goals", 20, 22, 23, 27, undefined, 36),
      spot("rituals", 50, 22, 25, 28, undefined, 36),
      spot("travels", 80, 22, 25, 27, undefined, 37),
      spot("principles", 19, 48, 24, 29, undefined, 63),
      spot("toliwags", 51, 48, 26, 29, undefined, 63),
      spot("fun-with-dalle", 83, 48, 25, 29, undefined, 64),
      spot("dating-bounty", 18, 75, 25, 28, undefined, 89),
      spot("kinkbuddy", 50, 74, 25, 26, undefined, 89),
      spot("obscure-parody-vids", 82, 75, 25, 28, undefined, 90),
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
        url: "https://feinfra.toli.me/scaling-fe-teams-my-hover-story/",
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
    artworkIsMap: !isFeatured || entry.id === "picklejs",
    artwork:
      isFeatured && entry.id !== "picklejs"
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
