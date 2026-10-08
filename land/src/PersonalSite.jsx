import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, GlobeHemisphereWest, List, Palette, X } from "@phosphor-icons/react";
import { creativeProjects, featuredProjects, publications, travelArchive, writing, popularWriting } from "./personal-content.js";
import { pageHref, readPersonalRoute } from "./personal-routing.js";
import { TravelMap } from "./TravelMap.jsx";
const USTravelMap = lazy(() => import("./USTravelMap.jsx"));
import "./personal-site.css";
import personalPhotos from "./personal-photos.json";

const pageTitles = { home: "Hi, I’m Toli.", publications: "Publications", creative: "Creative", writing: "Writing", travels: "Places I’ve been" };
const navPages = ["publications", "creative", "writing", "travels"];

function OutboundLink({ href, children, className = "", ...props }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>{children}<ArrowUpRight aria-hidden="true" /><span className="personal-sr-only"> (opens in a new tab)</span></a>;
}

export function SiteHeader({ currentPage = "home", initiallyOpen = false }) {
  const [open, setOpen] = useState(initiallyOpen);
  const menuButton = useRef(null);
  useEffect(() => {
    const close = (event) => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return <header className="personal-header">
    <a href="#/" className="personal-wordmark" aria-label="Toli, home" onClick={() => setOpen(false)}>toli.me<span>.</span></a>
    <button ref={menuButton} className="personal-menu-button" aria-expanded={open} aria-controls="personal-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <List size={22} />}<span>{open ? "Close" : "Menu"}</span></button>
    <nav id="personal-navigation" aria-label="Main navigation" className={open ? "is-open" : ""}>
      {navPages.map((page) => <a key={page} href={pageHref(page)} aria-current={currentPage === page ? "page" : undefined} onClick={() => setOpen(false)}>{page === "travels" ? "Travels" : pageTitles[page]}</a>)}
      <OutboundLink href="https://tolicodes.com">Work</OutboundLink>
    </nav>
  </header>;
}

export function FeaturedProject({ project }) {
  return <article className={`personal-feature personal-feature--${project.id}`}>
    <a href={project.href} target="_blank" rel="noopener noreferrer" className={`personal-feature-art ${project.imageClass || ""}`} tabIndex={-1}>
      <img src={project.image} alt={project.imageAlt} width="800" height="800" />
    </a>
    <div className="personal-feature-copy">
      {project.id === "drawn" && <p className="personal-handwritten drawn-signature">Toli*Drawn</p>}
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      {project.subtitle && <p className="personal-project-subtitle">{project.subtitle}</p>}
      <OutboundLink href={project.href} className="personal-text-link">{project.cta}</OutboundLink>
    </div>
  </article>;
}

function WritingList({ items = writing }) {
  return <ul className="personal-writing-list">{items.map((article) => <li key={article.id}><OutboundLink href={article.href}><img src={article.image} alt="" width="320" height="214" loading="lazy" /><span><strong>{article.title}</strong><span className="personal-writing-description">{article.description}</span></span></OutboundLink></li>)}</ul>;
}

const exploreItems = [
  { page: "publications", title: "Publications", copy: "Neurodiverse Guide, Principles", Icon: BookOpen },
  { page: "creative", title: "Creative", copy: "Drawn, Easter Creatures, Las Chicas, Spa Date, Obscure Parody Videos", Icon: Palette },
  { page: "travels", title: "Travels", copy: "A little of the world I’ve explored.", Icon: GlobeHemisphereWest },
];

function CreativePreview() {
  return <section className="personal-home-section" aria-labelledby="creative-heading">
    <div className="personal-section-heading"><div><h2 id="creative-heading">Creative</h2><p className="personal-section-intro">Comics, strange little creatures, art collaborations, and wonderfully obscure videos.</p></div><a className="personal-text-link" href="#/creative">Explore creative <ArrowRight aria-hidden="true" /></a></div>
    <div className="personal-creative-grid">{creativeProjects.slice(0, 3).map((project) => <article key={project.id}>
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={`personal-creative-image ${project.imageClass}`} tabIndex={-1}><img src={project.image} alt={project.imageAlt} width="800" height="800" loading="lazy" /></a>
      <h3><OutboundLink href={project.href}>{project.title}</OutboundLink></h3><p>{project.description}</p>
    </article>)}</div>
    <div className="personal-creative-extras">{creativeProjects.slice(3).map((project) => <article key={project.id}><h3><OutboundLink href={project.href}>{project.title}</OutboundLink></h3><p>{project.description}</p></article>)}</div>
  </section>;
}

export function PhotoGallery({ initiallyExpanded = false }) {
  const grid = (photos) => <div className="personal-photo-grid">{photos.map((photo) => <a key={photo.src} href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`${photo.alt} (opens full photo in a new tab)`}><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" /></a>)}</div>;
  return <section className="personal-home-section" aria-labelledby="photos-heading"><h2 id="photos-heading">Life in pictures</h2><p className="personal-section-intro">Play, adventure, friends, and Promise.</p>{grid(personalPhotos.slice(0, 6))}<details className="personal-more-photos" open={initiallyExpanded || undefined}><summary><span className="when-closed">Show {personalPhotos.length - 6} more photos</span><span className="when-open">Show fewer photos</span></summary>{grid(personalPhotos.slice(6))}</details></section>;
}

export function HomePage() {
  return <>
    <section className="personal-hero" aria-labelledby="personal-title">
      <div className="personal-hero-heading"><p className="personal-handwritten personal-hello">Hi,</p><h1 id="personal-title">Hi, I’m Toli.</h1></div>
      <div className="personal-portrait"><img src="/assets/personal/toli-portrait.webp" width="640" height="640" alt="Toli laughing" /><p className="personal-handwritten">Nice to<br />meet you!</p></div>
      <p className="personal-intro">Stories, strange little creations, and<br className="personal-desktop-break" /> things I’ve learned along the way.</p>
    </section>
    <CreativePreview />
    <section className="personal-home-section personal-popular-writing" aria-labelledby="writing-heading"><div className="personal-section-heading"><div><h2 id="writing-heading">Writing</h2><p className="personal-section-intro">Reader favorites on connection, vulnerability, and the stories we tell ourselves.</p></div><a className="personal-text-link" href="#/writing">All writing <ArrowRight aria-hidden="true" /></a></div><WritingList items={popularWriting} /></section>
    <section className="personal-featured" aria-label="Guides and personal projects">{featuredProjects.filter((project) => project.id !== "drawn").map((project) => <FeaturedProject key={project.id} project={project} />)}</section>
    <PhotoGallery />
    <section className="personal-home-section" aria-labelledby="explore-heading"><h2 id="explore-heading">More to explore</h2><ul className="personal-explore-list">{exploreItems.filter(({page}) => page !== "creative").map(({ page, title, copy, Icon }) => <li key={page}><a href={pageHref(page)}><Icon size={40} weight="duotone" aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight aria-hidden="true" /></a></li>)}</ul></section>
  </>;
}

export function CollectionPage({ page = "creative" }) {
  const projects = page === "publications" ? publications : creativeProjects;
  return <>
    <PageHeading title={pageTitles[page]} intro={page === "publications" ? "Things I’ve learned, gathered into something you can take with you." : "Comics, creatures, collaborations, and a few very personal experiments."} />
    <div className="personal-collection">{projects.map((project) => <article className={`personal-project ${project.image ? "has-image" : ""}`} key={project.id}>
      {project.image && <a href={project.href} target="_blank" rel="noopener noreferrer" className={`personal-project-image ${project.imageClass || ""}`} tabIndex={-1}><img src={project.image} alt={project.imageAlt} loading="lazy" width="800" height="800" /></a>}
      <div><h2>{project.title}</h2><p>{project.description}</p>{project.subtitle && <p className="personal-project-subtitle">{project.subtitle}</p>}<OutboundLink href={project.href} className="personal-text-link">{project.cta}</OutboundLink></div>
    </article>)}</div>
  </>;
}

function PageHeading({ title, intro, children }) {
  return <div className="personal-page-heading"><a className="personal-back" href="#/">← Back home</a><h1 id="personal-title">{title}</h1><p>{intro}</p>{children}</div>;
}

export function WritingPage() {
  return <><PageHeading title="Writing" intro="Thoughts, reflections, and the occasional deep dive." /><div className="personal-all-writing"><WritingList /></div></>;
}

export function TravelPage({ initialView = "world" }) {
  const [view, setView] = useState(initialView);
  const groups = [...new Set(travelArchive.countries.map(({ group }) => group))];
  return <>
    <PageHeading title="Places I’ve been" intro="A little of the world I’ve explored."><p className="personal-travel-note"><GlobeHemisphereWest size={22} weight="duotone" aria-hidden="true" />{view === "world" ? `${travelArchive.countries.length} countries in my travel archive` : "A closer look at my U.S. travels"}</p></PageHeading>
    <div className="personal-travel-views" role="group" aria-label="Travel map view"><button aria-pressed={view === "world"} onClick={() => setView("world")}>World</button><button aria-pressed={view === "us"} onClick={() => setView("us")}>United States</button></div>
    {view === "us" ? <Suspense fallback={<p className="personal-archive-note" role="status">Loading the U.S. map…</p>}><USTravelMap /></Suspense> : <>
    <TravelMap />
    <div className="personal-travel-groups">{groups.map((group, index) => <section key={group} aria-labelledby={`region-${index}`}><p className="personal-eyebrow">{String(index + 1).padStart(2, "0")}</p><h2 id={`region-${index}`}>{group}</h2><ul>{travelArchive.countries.filter((country) => country.group === group).map((country) => <li key={country.id}>{country.name}</li>)}</ul></section>)}</div>
    <p className="personal-archive-note">Started with <OutboundLink href={travelArchive.sourceUrl}>my original travel page</OutboundLink>, with more places added along the way.</p>
    </>}
  </>;
}

export function SiteFooter() {
  return <footer className="personal-footer"><p className="personal-handwritten">Thanks<br />for being here.</p><div><a className="personal-contact" href="mailto:toli@toli.me">Say hello <ArrowUpRight aria-hidden="true" /></a><a href="#/" className="personal-footer-wordmark">toli.me</a><p>Stories, strange little creations, and things I’ve learned along the way.</p></div><img src="/assets/personal/footer-sprig.webp" alt="" width="640" height="427" loading="lazy" /></footer>;
}

export function PersonalSite({ initialPage }) {
  const [page, setPage] = useState(() => initialPage || readPersonalRoute(window.location.hash));
  const main = useRef(null);
  const navigationPending = useRef(false);
  useEffect(() => {
    const onHashChange = () => { navigationPending.current = true; setPage(readPersonalRoute(window.location.hash)); };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  useEffect(() => {
    document.title = `${page === "home" ? "Toli" : pageTitles[page]} · toli.me`;
    if (navigationPending.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      main.current?.focus({ preventScroll: true });
      navigationPending.current = false;
    }
  }, [page]);
  return <div className="personal-site"><a href="#personal-main" className="personal-skip" onClick={(event) => { event.preventDefault(); main.current?.focus(); main.current?.scrollIntoView(); }}>Skip to content</a><div className="personal-container"><SiteHeader key={page} currentPage={page} /><main ref={main} tabIndex={-1} id="personal-main">{page === "home" ? <HomePage /> : page === "writing" ? <WritingPage /> : page === "travels" ? <TravelPage /> : <CollectionPage page={page} />}</main><SiteFooter /></div></div>;
}
