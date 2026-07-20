import { TravelPage } from "./TravelPage.jsx";

const sections = [
  {
    id: "build",
    title: "Things I build",
    blurb: "Software, communities, and the occasional book about both.",
    links: [
      { label: "ToliCodes", note: "Everything code", href: "https://tolicodes.com/" },
      { label: "Frontend Infra Book", note: "Foundations that scale with teams", href: "https://www.feinfra.com/" },
      { label: "Neurodivergent’s Guide to the Workplace", note: "The book I needed at 25", href: "https://os.toli.me/" },
      { label: "NYC LeetCode Squad", note: "Misery loves company", href: "https://lcsquad.com/" },
      { label: "PickleJS", note: "Open-source visual regression tooling", href: "https://www.picklejs.com/" },
      { label: "FB Ads Book", note: "A whole book about ads, yes", href: "https://fbadsbook.com/" },
      { label: "API Scraping", note: "The Codementor guide", href: "https://www.codementor.io/blog/api-scraping-5fq1gtd4ah" },
      { label: "Dropbox Journey", note: "How I got there", href: "https://dropbox.tolicodes.com/" },
      { label: "Portfolio", note: "The greatest hits", href: "https://portfolio.tolicodes.com/" },
      { label: "Accomplishments", note: "A brag sheet, honestly", href: "https://accomplishments.tolicodes.com/" },
      { label: "Paper Resume", note: "For the traditionalists", href: "https://toli.me/resume" },
    ],
  },
  {
    id: "speaking",
    title: "Things I say out loud",
    blurb: "Talks and podcasts about code, community, brains, and kink.",
    links: [
      { label: "Aspergers & Empathy", note: "YouTube talk", href: "https://www.youtube.com/watch?v=z1VNwapOb8E" },
      { label: "Developer Happiness", note: "JavaScript Jabber #358", href: "https://podcasts.apple.com/pl/podcast/jsj-358-pickle-js-tooling-developer-happiness-anatoliy/id1237401284?i=1000433942248" },
      { label: "LeetCode & Community", note: "Self-Taught Devs podcast", href: "https://podcasters.spotify.com/pod/show/self-taught-devs/episodes/72-Leetcode-and-Community-with-Anatoliy-Zaslavskiy-e2k0b2u" },
      { label: "Lifestyle Series: Peanut Butter", note: "Authentically Kinky podcast", href: "https://creators.spotify.com/pod/show/authentically-kinky/episodes/Lifestyle-Series-Peanut-Butter-e3alh48" },
      { label: "PeanutButter Kinky", note: "Spotify episode", href: "https://open.spotify.com/episode/4I4DNjKsjzM5DLF59WcUqf" },
    ],
  },
  {
    id: "writing",
    title: "Things I write down",
    blurb: "Essays about love, brains, energy, and video games — sometimes all four.",
    links: [
      { label: "Getting Back to Love", note: "Medium", href: "https://tolicodes.medium.com/getting-back-to-love-2942d026882b" },
      { label: "Energy Cords & Foreign Energy in Your Aura", note: "Medium", href: "https://tolicodes.medium.com/energy-cords-and-foreign-energy-in-your-aura-7bae5ac3c57c" },
      { label: "Why We Focus on the Negative", note: "Medium", href: "https://tolicodes.medium.com/why-we-focus-on-the-negative-and-how-its-keeping-us-from-happiness-da2224de0899" },
      { label: "Rejection, Breakups, Vulnerability & BDSM", note: "Medium", href: "https://tolicodes.medium.com/rejection-breakups-vulnurability-and-bdsm-b2f80b682373" },
      { label: "The Problem with Boredom and Bipolar", note: "Medium", href: "https://tolicodes.medium.com/the-problem-with-boredom-and-bipolar-442e62ed29ee" },
      { label: "DotA and Consciousness", note: "Medium", href: "https://tolicodes.medium.com/dota-and-conciousness-87609258854a" },
    ],
  },
  {
    id: "play",
    title: "Things I do for fun",
    blurb: "Creative experiments and an unreasonable number of hobbies.",
    links: [
      { label: "Easter Creatures", note: "Creative experiment", href: "https://eastercreatures.carrd.co/" },
      { label: "Las Chicas Art Collective", note: "Art with friends", href: "https://laschicas.tolicodes.com/" },
      { label: "Spa Date", note: "Exactly what it sounds like", href: "https://spadate.toli.me/" },
      { label: "Obscure Parody Vids", note: "You probably won’t get it", href: "https://www.youtube.com/watch?v=484U5bUcnb0" },
      { label: "Fun with DALL·E", note: "AI-assisted comics", href: "https://dalle.toli.me/" },
      { label: "ToliWags", note: "Dogsitting, professionally cute", href: "https://toliwags.com/" },
    ],
  },
  {
    id: "misc",
    title: "Things about me",
    blurb: "The operating manual, in public.",
    links: [
      { label: "Places I’ve Been", note: "14 countries, filled in", href: "/places" },
      { label: "My Goals", note: "Held loosely", href: "https://goals.tolicodes.com/" },
      { label: "Rituals", note: "How the days work", href: "https://rituals.tolicodes.com/" },
      { label: "Travels", note: "The long-form logs", href: "https://travel.tolicodes.com/" },
      { label: "Principles", note: "How I think", href: "https://principles.tolicodes.com/docs/toc" },
      { label: "LinkedIn", note: "The respectable version", href: "https://www.linkedin.com/in/tolicodes/" },
    ],
  },
];

const hobbies = [
  "Acroyoga", "Cuddle parties", "My doggo", "Public speaking", "Swimming",
  "Neurodiversity", "Storytelling", "Weird stuff", "Eco volunteering", "Nature",
  "Parody videos", "Water sports", "Russian bathhouse", "Burning Man",
  "DALL·E play", "Sex positivity", "Hiking", "Biking",
];

const nsfwLinks = [
  { label: "Dating Bounty", note: "The idea controversial enough for the NYT", href: "https://toli.love/" },
  { label: "KinkBuddy", note: "Get kinky (with consent)", href: "https://kinks.toli.love/" },
];

/** Render one ruled ledger row linking out to a thing Toli made. */
function LedgerRow({ link, index }) {
  const external = link.href.startsWith("http");

  return (
    <a
      className="ledger-row"
      href={link.href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <span className="ledger-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="ledger-label">{link.label}</span>
      <span className="ledger-note">{link.note}</span>
      <span className="ledger-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

/** Render one numbered content section of the index. */
function IndexSection({ section, number, children }) {
  return (
    <section className="index-section" id={section.id} aria-labelledby={`${section.id}-title`}>
      <header className="index-section-head">
        <span className="section-number">{number}</span>
        <div>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p>{section.blurb}</p>
        </div>
      </header>
      <div className="ledger">
        {section.links.map((link, index) => (
          <LedgerRow key={link.label} link={link} index={index} />
        ))}
      </div>
      {children}
    </section>
  );
}

/** Render the single-page index that is the redesigned homepage. */
function HomePage() {
  return (
    <>
      <header className="site-head">
        <a className="brand" href="#top">toli.me</a>
        <nav aria-label="Primary">
          <a href="#build">Build</a>
          <a href="#speaking">Speak</a>
          <a href="#writing">Write</a>
          <a href="#play">Play</a>
          <a href="/places">Places</a>
        </nav>
        <a className="say-hi" href="mailto:toli@toli.me">Say hi</a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-name">
          <div className="hero-copy">
            <p className="hero-kicker">The exciting life of</p>
            <h1 id="hero-name">
              Toli<br />Zaslavskiy
            </h1>
            <p className="hero-deck">
              Engineer at Jimini Health. Writer, speaker, acroyogi, and
              professional over-sharer. Everything I make lives on this page —
              organized, numbered, and only lightly censored.
            </p>
            <div className="hero-facts" role="list">
              <span role="listitem"><strong>{sections.reduce((n, s) => n + s.links.length, 0)}</strong> links</span>
              <span role="listitem"><strong>14</strong> countries</span>
              <span role="listitem"><strong>{hobbies.length}</strong> hobbies</span>
              <span role="listitem"><strong>1</strong> doggo</span>
            </div>
          </div>
          <figure className="hero-portrait">
            <img src="/assets/toli-portrait.jpg" alt="Toli Zaslavskiy laughing in the sun" />
            <figcaption>Actual footage of me receiving a code review.</figcaption>
          </figure>
        </section>

        {sections.map((section, index) => (
          <IndexSection key={section.id} number={`0${index + 1}`} section={section}>
            {section.id === "play" && (
              <ul className="hobby-cloud" aria-label="Hobbies">
                {hobbies.map((hobby) => (
                  <li key={hobby}>{hobby}</li>
                ))}
              </ul>
            )}
          </IndexSection>
        ))}

        <section className="warning" aria-labelledby="warning-title">
          <h2 id="warning-title">End of the line?</h2>
          <p>
            <strong>To (potential) employers:</strong> you have reached the end
            of the site. Please turn back now. <strong>Others:</strong> you have
            been warned.
          </p>
          <details className="nsfw">
            <summary>
              <span className="section-number">06</span>
              <span>Things HR shouldn’t click</span>
              <span className="ledger-arrow" aria-hidden="true">↓</span>
            </summary>
            <div className="ledger">
              {nsfwLinks.map((link, index) => (
                <LedgerRow key={link.label} link={link} index={index} />
              ))}
            </div>
          </details>
        </section>
      </main>

      <footer className="site-foot">
        <h2>Wanna be friends?</h2>
        <p>Don’t be shy — I won’t bite. (Unless I have your consent.)</p>
        <a className="foot-email" href="mailto:toli@toli.me">toli@toli.me</a>
        <p className="foot-note">Redesigned with care and an unreasonable number of hairline borders.</p>
      </footer>
    </>
  );
}

/** Render the correct page for the current URL. */
export function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  return path === "/places" ? <TravelPage /> : <HomePage />;
}
