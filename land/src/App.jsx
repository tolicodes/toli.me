import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Crown,
  EnvelopeSimple,
  X,
} from "@phosphor-icons/react";
import { Atlas } from "./Atlas.jsx";
import { MapCanvas } from "./MapCanvas.jsx";
import { ProjectStory } from "./ProjectStory.jsx";
import { getMap, getMapSpots, maps, projectById } from "./content.js";
import { mapHash, parseRoute, projectHash } from "./routing.js";
import { focusPoint, initialView } from "./map-math.js";

export function AboutDialog({ onClose, onMap }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    element.showModal();
    return () => {
      element.close();
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="about-dialog"
      aria-labelledby="about-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      <button
        className="icon-button about-close"
        aria-label="Close introduction"
        onClick={onClose}
      >
        <X size={22} />
      </button>
      <Crown size={37} weight="duotone" className="gold" />
      <p className="eyebrow">A small world with a lot inside</p>
      <h2 id="about-title">Hi, I’m Toli.</h2>
      <p>
        A builder, a storyteller, and a collector of curious experiences. This
        is my little corner of the internet, turned into a world you can wander.
      </p>
      <p>
        Every kingdom holds a different part of my life. The Capital is a good
        place to start.
      </p>
      <button className="primary-button" onClick={() => onMap("capital")}>
        <Crown size={20} />
        Meet me in the Capital
        <ArrowRight size={18} />
      </button>
      <p className="about-help">
        Drag to explore. Pinch to zoom. Tap a landmark to discover its story.
      </p>
      <a className="text-link" href="mailto:toli@toli.me">
        Or just say hello <ArrowUpRight size={17} />
      </a>
    </dialog>
  );
}

export function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const [atlas, setAtlas] = useState(null);
  const [about, setAbout] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const savedViews = useRef({});
  const currentMap = getMap(route.type === "map" ? route.id : route.from);
  const project = route.type === "project" ? projectById[route.id] : null;
  useEffect(() => {
    const listener = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.title = `${project?.title || currentMap.title} · toli.me`;
    document.body.classList.toggle("showing-story", Boolean(project));
  }, [project, currentMap]);
  const navigateMap = (id, focusId) => {
    if (focusId) {
      const size = { width: window.innerWidth, height: window.innerHeight };
      const spot = maps[id].spots.find((s) => s.id === focusId);
      if (spot)
        savedViews.current[id] = focusPoint(initialView(size), spot, size, 1.6);
    }
    window.location.hash = mapHash(id);
    setAtlas(null);
    setAbout(false);
  };
  const navigateProject = (item, from = currentMap.id) => {
    window.location.hash = projectHash(item.id, from);
    setAtlas(null);
  };
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          if (project) document.getElementById("main-content")?.focus();
          else setAtlas("all");
        }}
      >
        Skip to {project ? "story" : "the atlas"}
      </a>
      {project ? (
        <ProjectStory
          key={project.id}
          project={project}
          from={currentMap.id}
          onBack={() => navigateMap(currentMap.id)}
          onMap={navigateMap}
          onProject={navigateProject}
        />
      ) : (
        <main id="main-content" className="world-app">
          <MapCanvas
            key={currentMap.id}
            map={currentMap}
            spots={getMapSpots(currentMap.id)}
            reducedMotion={reducedMotion}
            savedView={savedViews.current[currentMap.id]}
            onSaveView={(id, view) => {
              savedViews.current[id] = view;
            }}
            onSelect={(spot) =>
              spot.destination === "map"
                ? navigateMap(spot.id)
                : navigateProject(projectById[spot.id])
            }
          />
          <header className="world-header">
            <div className="brand-lockup">
              <button
                className="wordmark"
                onClick={() => navigateMap("world")}
                aria-label="Toli.me, return to the whole world"
              >
                toli.me<span>•</span>
              </button>
              <span className="brand-note">a curious little world</span>
            </div>
            <nav aria-label="Site navigation">
              <button className="atlas-toggle" onClick={() => setAtlas("all")}>
                <BookOpen size={20} />
                <span>The atlas</span>
              </button>
              <a className="hello-link" href="mailto:toli@toli.me">
                <EnvelopeSimple size={19} />
                <span>Say hello</span>
                <ArrowUpRight size={14} />
              </a>
              <button
                className="icon-button about-toggle"
                aria-label="About Toli Land"
                onClick={() => setAbout(true)}
              >
                <Compass size={23} weight="duotone" />
              </button>
            </nav>
          </header>
          {currentMap.id !== "world" && (
            <button className="world-back" onClick={() => navigateMap("world")}>
              <ArrowLeft size={17} />
              The whole world
            </button>
          )}
          <section className="map-caption">
            <p className="eyebrow">{currentMap.category}</p>
            <h1>{currentMap.title}</h1>
            <p>{currentMap.invitation}</p>
          </section>
          {currentMap.id === "world" ? (
            <button
              className="capital-invitation"
              onClick={() => navigateMap("capital")}
            >
              <Crown size={21} weight="fill" />
              <span>Start in the Capital</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              className="collection-invitation"
              onClick={() =>
                setAtlas(
                  currentMap.id === "capital" ? "featured" : currentMap.id,
                )
              }
            >
              <BookOpen size={19} />
              <span>
                {currentMap.id === "capital"
                  ? "All four favorites"
                  : `Browse ${currentMap.category.toLowerCase()}`}
              </span>
              <ArrowRight size={17} />
            </button>
          )}
          {route.type === "project" && !project && (
            <p className="route-message" role="status">
              That path is uncharted. Let’s start here.
            </p>
          )}
        </main>
      )}
      {atlas && (
        <Atlas
          initialFilter={atlas}
          onClose={() => setAtlas(null)}
          onMap={navigateMap}
          onProject={navigateProject}
        />
      )}
      {about && (
        <AboutDialog onClose={() => setAbout(false)} onMap={navigateMap} />
      )}
      <span className="sr-only" aria-live="polite">
        {project ? `${project.title} story` : `${currentMap.title} map`}
      </span>
    </>
  );
}
