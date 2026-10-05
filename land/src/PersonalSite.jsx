import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, GlobeHemisphereWest, List, Palette, X } from "@phosphor-icons/react";
import { creativeProjects, featuredProjects, publications, travelArchive, writing } from "./personal-content.js";
import { pageHref, readPersonalRoute } from "./personal-routing.js";
import { TravelMap } from "./TravelMap.jsx";
import "./personal-site.css";

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
      <OutboundLink href={project.href} className="personal-text-link">{project.cta}</OutboundLink>
    </div>
  </article>;
}

function WritingList({ items = writing }) {
  return <ul className="personal-writing-list">{items.map((article) => <li key={article.id}><OutboundLink href={article.href}>{article.title}</OutboundLink></li>)}</ul>;
}

const exploreItems = [
  { page: "publications", title: "Publications", copy: "Neurodiverse Guide, Principles", Icon: BookOpen },
  { page: "creative", title: "Creative", copy: "Drawn, Easter Creatures, Las Chicas, Spa Date, Obscure Parody Videos", Icon: Palette },
  { page: "travels", title: "Travels", copy: "A little of the world I’ve explored.", Icon: GlobeHemisphereWest },
];

export function HomePage() {
  return <>
    <section className="personal-hero" aria-labelledby="personal-title">
      <div><p className="personal-handwritten personal-hello">Hi,</p><h1 id="personal-title">Hi, I’m Toli.</h1><p className="personal-intro">Stories, strange little creations, and<br className="personal-desktop-break" /> things I’ve learned along the way.</p></div>
      <div className="personal-portrait"><img src="/assets/personal/toli-portrait.webp" width="640" height="640" alt="Toli laughing" /><p className="personal-handwritten">Nice to<br />meet you!</p></div>
    </section>
    <section className="personal-featured" aria-label="A few things to start with">{featuredProjects.map((project) => <FeaturedProject key={project.id} project={project} />)}</section>
    <div className="personal-index-columns">
      <section aria-labelledby="writing-heading"><h2 id="writing-heading">Writing</h2><p className="personal-section-intro">Thoughts, reflections, and the occasional deep dive.</p><WritingList items={writing.slice(0, 3)} /><a className="personal-text-link" href="#/writing">All writing <ArrowRight aria-hidden="true" /></a></section>
      <section aria-labelledby="explore-heading"><h2 id="explore-heading">More to explore</h2><p className="personal-section-intro">Other projects and creations.</p><ul className="personal-explore-list">{exploreItems.map(({ page, title, copy, Icon }) => <li key={page}><a href={pageHref(page)}><Icon size={40} weight="duotone" aria-hidden="true" /><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight aria-hidden="true" /></a></li>)}</ul></section>
    </div>
  </>;
}

export function CollectionPage({ page = "creative" }) {
  const projects = page === "publications" ? publications : creativeProjects;
  return <>
    <PageHeading title={pageTitles[page]} intro={page === "publications" ? "Things I’ve learned, gathered into something you can take with you." : "Comics, creatures, collaborations, and a few very personal experiments."} />
    <div className="personal-collection">{projects.map((project) => <article className={`personal-project ${project.image ? "has-image" : ""}`} key={project.id}>
      {project.image && <a href={project.href} target="_blank" rel="noopener noreferrer" className={`personal-project-image ${project.imageClass || ""}`} tabIndex={-1}><img src={project.image} alt={project.imageAlt} loading="lazy" width="800" height="800" /></a>}
      <div><h2>{project.title}</h2><p>{project.description}</p><OutboundLink href={project.href} className="personal-text-link">{project.cta}</OutboundLink></div>
    </article>)}</div>
  </>;
}

function PageHeading({ title, intro, children }) {
  return <div className="personal-page-heading"><a className="personal-back" href="#/">← Back home</a><h1 id="personal-title">{title}</h1><p>{intro}</p>{children}</div>;
}

export function WritingPage() {
  return <><PageHeading title="Writing" intro="Thoughts, reflections, and the occasional deep dive." /><div className="personal-all-writing"><WritingList /></div></>;
}

export function TravelPage() {
  const groups = [...new Set(travelArchive.countries.map(({ group }) => group))];
  return <>
    <PageHeading title="Places I’ve been" intro="A little of the world I’ve explored."><p className="personal-travel-note"><GlobeHemisphereWest size={22} weight="duotone" aria-hidden="true" />{travelArchive.countries.length} countries in my travel archive</p></PageHeading>
    <TravelMap />
    <div className="personal-travel-groups">{groups.map((group, index) => <section key={group} aria-labelledby={`region-${index}`}><p className="personal-eyebrow">{String(index + 1).padStart(2, "0")}</p><h2 id={`region-${index}`}>{group}</h2><ul>{travelArchive.countries.filter((country) => country.group === group).map((country) => <li key={country.id}>{country.name}</li>)}</ul></section>)}</div>
    <p className="personal-archive-note">Started with <OutboundLink href={travelArchive.sourceUrl}>my original travel page</OutboundLink>, with more places added along the way.</p>
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
