import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Crown,
  MagnifyingGlass,
  Shuffle,
  X,
} from "@phosphor-icons/react";
import { kingdomIds, maps, projects } from "./content.js";

export function Atlas({ onClose, onMap, onProject, initialFilter = "all" }) {
  const dialog = useRef(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(initialFilter);
  const [afterHours, setAfterHours] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    element.showModal();
    element.querySelector("input").focus();
    return () => {
      element.close();
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);
  const matches = useMemo(
    () =>
      projects.filter(
        (item) =>
          (afterHours || !item.mature) &&
          (filter === "all" ||
            (filter === "featured" && item.featured) ||
            item.kingdom === filter) &&
          `${item.title} ${item.description} ${maps[item.kingdom].category}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [query, filter, afterHours],
  );
  return (
    <dialog
      ref={dialog}
      className="atlas-dialog"
      aria-labelledby="atlas-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      <div className="atlas-inner">
        <header className="dialog-heading">
          <div>
            <p className="eyebrow">Every path leads somewhere</p>
            <h2 id="atlas-title">The atlas</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close atlas"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </header>
        <label className="atlas-search">
          <MagnifyingGlass size={22} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a project, idea, or rabbit hole…"
            aria-label="Search the atlas"
          />
        </label>
        {!query && (
          <nav className="quick-travel" aria-label="Quick travel">
            <button onClick={() => onMap("world")}>
              <span>The whole world</span>
              <ArrowRight size={17} />
            </button>
            <button onClick={() => onMap("capital")} className="capital-travel">
              <span>
                <Crown size={17} weight="fill" /> The Capital
              </span>
              <ArrowRight size={17} />
            </button>
            {kingdomIds.map((id, index) => (
              <button key={id} onClick={() => onMap(id)}>
                <span>
                  <small>0{index + 1}</small>
                  {maps[id].category}
                </span>
                <ArrowRight size={16} />
              </button>
            ))}
          </nav>
        )}
        <div className="atlas-filter">
          <label htmlFor="atlas-filter">Places to discover</label>
          <select
            id="atlas-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All kingdoms</option>
            <option value="featured">Capital favorites</option>
            {kingdomIds.map((id) => (
              <option key={id} value={id}>
                {maps[id].category}
              </option>
            ))}
          </select>
        </div>
        <div className="atlas-results" aria-live="polite">
          {matches.map((item) => (
            <button key={item.id} onClick={() => onProject(item)}>
              <span>
                <strong>{item.title}</strong>
                <small>
                  {maps[item.kingdom].category}
                  {item.mature ? " · After hours" : ""}
                </small>
              </span>
              {item.featured ? (
                <Crown size={19} className="gold" weight="duotone" />
              ) : (
                <ArrowRight size={18} />
              )}
            </button>
          ))}
          {!matches.length && (
            <div className="atlas-empty">
              <h3>An uncharted corner.</h3>
              <p>No places match this search yet.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                Show all places <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
        <label className="after-hours">
          <input
            type="checkbox"
            checked={afterHours}
            onChange={(e) => setAfterHours(e.target.checked)}
          />
          Include the after-hours corners
        </label>
        <footer className="atlas-footer">
          <button
            className="primary-button"
            disabled={!matches.length}
            onClick={() =>
              onProject(matches[Math.floor(Math.random() * matches.length)])
            }
          >
            <Shuffle size={20} />
            Take a detour
            <ArrowRight size={18} />
          </button>
          <p>Four favorites. Seven kingdoms. Plenty of rabbit holes.</p>
        </footer>
      </div>
    </dialog>
  );
}
