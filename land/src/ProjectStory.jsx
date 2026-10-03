import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Crown,
  LinkSimple,
  MapPin,
} from "@phosphor-icons/react";
import { featuredIds, maps, projectById } from "./content.js";

export function ProjectStory({
  project,
  from = "capital",
  onBack,
  onMap,
  onProject,
}) {
  const [chapter, setChapter] = useState(0);
  const [copied, setCopied] = useState(false);
  const heading = useRef(null);
  useEffect(() => {
    setChapter(0);
    setCopied(false);
    window.scrollTo(0, 0);
    heading.current?.focus({ preventScroll: true });
  }, [project.id]);
  const current = project.chapters[chapter];
  const isBook = project.id === "frontend-infra-book";
  const related = featuredIds
    .filter((id) => id !== project.id)
    .slice(0, 3)
    .map((id) => projectById[id]);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="project-page">
      <header className="story-topbar">
        <button onClick={onBack} className="back-link">
          <ArrowLeft size={19} />
          <span>{maps[from]?.title || "The Capital"}</span>
        </button>
        <button className="wordmark" onClick={() => onMap("world")}>
          toli.me<span>•</span>
        </button>
        <button
          className="icon-button copy-link"
          aria-label={copied ? "Link copied" : "Copy link to this place"}
          onClick={copyLink}
        >
          {copied ? <Check size={21} /> : <LinkSimple size={21} />}
        </button>
      </header>
      <main id="main-content" tabIndex={-1} className="story-layout">
        <div
          className={`story-art ${project.featured ? "" : "is-landmark"}`}
          style={{
            "--landmark-x": project.landmark?.x || 50,
            "--landmark-y": project.landmark?.y || 50,
          }}
        >
          <img
            src={project.artwork}
            alt={
              project.featured || project.id === "dota-consciousness"
                ? project.motif
                : `The illustrated ${maps[project.kingdom].title} kingdom`
            }
            fetchPriority="high"
          />
          <button
            className="art-location"
            onClick={() => onMap(project.kingdom, project.id)}
          >
            <MapPin size={18} />
            <span>Find it in {maps[project.kingdom].title}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
        <article className="story-copy">
          <div className="story-eyebrow">
            {project.featured ? (
              <>
                <Crown size={17} weight="fill" />A favorite from the Capital
              </>
            ) : (
              maps[project.kingdom].category
            )}
            {project.mature && (
              <span className="mature-label">After hours</span>
            )}
          </div>
          <h1 ref={heading} tabIndex={-1}>
            {project.title}
          </h1>
          <p className="story-summary">
            {project.summary ||
              `A little part of my world, from ${maps[project.kingdom].category.toLowerCase()}.`}
          </p>
          <div className="story-actions">
            {project.links.map((link, i) => (
              <a
                key={link.url}
                className={i === 0 ? "primary-button" : "text-link"}
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight size={19} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
            {!project.links.length && (
              <a className="primary-button" href="mailto:toli@toli.me">
                Say hello
                <ArrowUpRight size={19} />
              </a>
            )}
            <button className="text-link" onClick={onBack}>
              <ArrowLeft size={17} />
              Back to the map
            </button>
          </div>
          {current ? (
            <section
              className="chapter-book"
              aria-label={isBook ? "Inside the storybook" : "The story"}
            >
              <div className="chapter-topline">
                <span>
                  <BookOpen size={16} />
                  {isBook ? "Inside the storybook" : "The story behind it"}
                </span>
                <span>
                  {String(chapter + 1).padStart(2, "0")} /{" "}
                  {String(project.chapters.length).padStart(2, "0")}
                </span>
              </div>
              <div key={chapter} className="chapter-content" aria-live="polite">
                <h2>{current.title}</h2>
                <p>{current.body}</p>
              </div>
              <nav className="chapter-navigation" aria-label="Story chapters">
                <span>{isBook ? "Turn a page" : "Keep exploring"}</span>
                <div>
                  <button
                    aria-label="Previous chapter"
                    disabled={chapter === 0}
                    onClick={() => setChapter((c) => c - 1)}
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    aria-label="Next chapter"
                    disabled={chapter === project.chapters.length - 1}
                    onClick={() => setChapter((c) => c + 1)}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </nav>
            </section>
          ) : (
            <div className="story-note">
              <p className="eyebrow">
                {project.kind === "interest"
                  ? "A little part of my world"
                  : "Follow this path"}
              </p>
              <p>
                {project.links.length
                  ? "The next chapter lives beyond this map. Come take a look."
                  : "Some places are here simply because they make life more interesting. If this is your kind of thing too, say hello."}
              </p>
            </div>
          )}

          <p className="story-signoff">
            A little curiosity goes a long way.<span>— Toli</span>
          </p>
        </article>
      </main>
      <section className="next-paths" aria-labelledby="next-paths-title">
        <div>
          <p className="eyebrow">While you’re wandering</p>
          <h2 id="next-paths-title">One more little detour?</h2>
        </div>
        <div className="related-places">
          {related.map((item) => (
            <button key={item.id} onClick={() => onProject(item, "capital")}>
              <img src={item.artwork} alt="" loading="lazy" />
              <span>
                {item.title}
                <ArrowUpRight size={15} />
              </span>
            </button>
          ))}
        </div>
      </section>
      <footer className="site-footer">
        <span>Made of curiosity, code, and a few delightful detours.</span>
        <a href="mailto:toli@toli.me">
          Say hello <ArrowUpRight size={16} />
        </a>
      </footer>
    </div>
  );
}
