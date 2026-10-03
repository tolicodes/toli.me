import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Plus,
  Minus,
  CornersOut,
  Compass,
  Hand,
  ArrowUpRight,
  Crown,
} from "@phosphor-icons/react";
import {
  ART_WIDTH,
  ART_HEIGHT,
  constrainView,
  distance,
  focusPoint,
  initialView,
  midpoint,
  zoomAt,
} from "./map-math.js";

export function MapCanvas({
  map,
  spots,
  onSelect,
  savedView,
  onSaveView,
  reducedMotion = false,
  showLabels = true,
}) {
  const viewportRef = useRef(null);
  const viewRef = useRef({ x: 0, y: 0, scale: 1 });
  const sizeRef = useRef({ width: 1440, height: 900 });
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const latestSave = useRef(onSaveView);
  const [size, setSize] = useState(sizeRef.current);
  const [view, setView] = useState(viewRef.current);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [flying, setFlying] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [liveText, setLiveText] = useState("");
  const flightTimer = useRef(null);
  const lastInteracted = useRef(false);
  const departureView = useRef(null);
  const initialSavedView = useRef(savedView);

  const updateView = useCallback((next) => {
    viewRef.current = next;
    setView(next);
  }, []);

  useEffect(() => {
    latestSave.current = onSaveView;
  }, [onSaveView]);
  useEffect(
    () => () => {
      latestSave.current?.(map.id, departureView.current || viewRef.current);
      clearTimeout(flightTimer.current);
    },
    [map.id],
  );

  useLayoutEffect(() => {
    const element = viewportRef.current;
    let first = true;
    const observer = new ResizeObserver(() => {
      const next = { width: element.clientWidth, height: element.clientHeight };
      if (!next.width || !next.height) return;
      sizeRef.current = next;
      setSize(next);
      if (first && initialSavedView.current) lastInteracted.current = true;
      updateView(
        first && initialSavedView.current
          ? constrainView(initialSavedView.current, next)
          : first || !lastInteracted.current
            ? initialView(
                next,
                next.width < 700 ? map.mobileCenter || map.center : map.center,
              )
            : constrainView(viewRef.current, next),
      );
      first = false;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [map.id, map.center, updateView]);

  useEffect(() => {
    const element = viewportRef.current;
    const onWheel = (event) => {
      if (flying) return;
      event.preventDefault();
      lastInteracted.current = true;
      const rect = element.getBoundingClientRect();
      updateView(
        zoomAt(
          viewRef.current,
          Math.exp(-event.deltaY * (event.ctrlKey ? 0.007 : 0.0018)),
          { x: event.clientX - rect.left, y: event.clientY - rect.top },
          sizeRef.current,
        ),
      );
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [flying, updateView]);

  const localPoint = (event) => {
    const rect = viewportRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const choose = (spot) => {
    if (flying) return;
    latestSave.current?.(map.id, viewRef.current);
    departureView.current = { ...viewRef.current };
    setHovered(null);
    setFlying(true);
    if (!reducedMotion)
      updateView(focusPoint(viewRef.current, spot, sizeRef.current, 1.28));
    flightTimer.current = setTimeout(
      () => onSelect(spot),
      reducedMotion ? 0 : 320,
    );
  };

  const onPointerDown = (event) => {
    if (flying || event.button > 0) return;
    const point = localPoint(event);
    pointers.current.set(event.pointerId, point);
    if (pointers.current.size === 1)
      gesture.current = {
        start: point,
        moved: false,
        spot: event.target.closest("[data-landmark]")?.dataset.landmark,
      };
    else if (gesture.current) gesture.current.moved = true;
    viewportRef.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    const point = localPoint(event);
    const oldPoints = [...pointers.current.values()];
    const previous = pointers.current.get(event.pointerId);
    pointers.current.set(event.pointerId, point);
    const points = [...pointers.current.values()];
    if (points.length >= 2) {
      const oldMiddle = midpoint(oldPoints[0], oldPoints[1]);
      const newMiddle = midpoint(points[0], points[1]);
      const oldDistance = distance(oldPoints[0], oldPoints[1]);
      const factor =
        oldDistance > 0 ? distance(points[0], points[1]) / oldDistance : 1;
      const next = zoomAt(viewRef.current, factor, oldMiddle, sizeRef.current);
      updateView(
        constrainView(
          {
            ...next,
            x: next.x + newMiddle.x - oldMiddle.x,
            y: next.y + newMiddle.y - oldMiddle.y,
          },
          sizeRef.current,
        ),
      );
      if (gesture.current) gesture.current.moved = true;
    } else {
      if (gesture.current && distance(gesture.current.start, point) > 7)
        gesture.current.moved = true;
      if (gesture.current?.moved)
        updateView(
          constrainView(
            {
              ...viewRef.current,
              x: viewRef.current.x + point.x - previous.x,
              y: viewRef.current.y + point.y - previous.y,
            },
            sizeRef.current,
          ),
        );
    }
    if (gesture.current?.moved) {
      setDragging(true);
      lastInteracted.current = true;
      setHovered(null);
    }
  };

  const finishPointer = (event, canceled = false) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    if (viewportRef.current.hasPointerCapture(event.pointerId))
      viewportRef.current.releasePointerCapture(event.pointerId);
    if (!pointers.current.size) {
      const current = gesture.current;
      gesture.current = null;
      setDragging(false);
      latestSave.current?.(map.id, viewRef.current);
      if (!canceled && current && !current.moved && current.spot) {
        const selected = spots.find((s) => s.id === current.spot);
        if (selected) choose(selected);
      }
    }
  };

  const changeZoom = (factor) => {
    lastInteracted.current = true;
    const next = zoomAt(
      viewRef.current,
      factor,
      { x: size.width / 2, y: size.height / 2 },
      size,
    );
    updateView(next);
    latestSave.current?.(map.id, next);
    setLiveText(`Zoom ${Math.round(next.scale * 100)} percent`);
  };

  const reset = (overview) => {
    lastInteracted.current = false;
    const next = initialView(
      size,
      size.width < 700 ? map.mobileCenter || map.center : map.center,
      overview,
    );
    updateView(next);
    latestSave.current?.(map.id, next);
    setLiveText(overview ? "Showing the whole map" : "Returned to the center");
  };

  const onKeyDown = (event) => {
    if (event.target !== viewportRef.current) return;
    const deltas = {
      ArrowLeft: [90, 0],
      ArrowRight: [-90, 0],
      ArrowUp: [0, 90],
      ArrowDown: [0, -90],
    };
    if (deltas[event.key]) {
      event.preventDefault();
      lastInteracted.current = true;
      const [x, y] = deltas[event.key];
      updateView(
        constrainView(
          {
            ...viewRef.current,
            x: viewRef.current.x + x,
            y: viewRef.current.y + y,
          },
          size,
        ),
      );
    } else if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      changeZoom(1.3);
    } else if (event.key === "-") {
      event.preventDefault();
      changeZoom(1 / 1.3);
    } else if (event.key === "Home") {
      event.preventDefault();
      reset(true);
    }
  };

  return (
    <section
      className={`map-shell ${flying ? "is-flying" : ""}`}
      aria-label={`${map.title} illustrated map`}
    >
      <div
        ref={viewportRef}
        className={`map-viewport ${dragging ? "is-dragging" : ""}`}
        tabIndex={0}
        role="group"
        aria-label="Interactive map. Drag to explore. Pinch or use the zoom buttons. Arrow keys pan, plus and minus zoom."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => finishPointer(e)}
        onPointerCancel={(e) => finishPointer(e, true)}
        onKeyDown={onKeyDown}
      >
        <div
          className={`map-plane ${ready ? "is-loaded" : ""}`}
          style={{
            width: ART_WIDTH,
            height: ART_HEIGHT,
            transform: `translate3d(${view.x}px,${view.y}px,0) scale(${view.scale})`,
          }}
        >
          <img
            className="map-art"
            src={`/assets/maps/${map.id}.webp`}
            alt={`${map.title}: ${map.description}`}
            draggable="false"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setReady(true)}
            onError={() => {
              setFailed(true);
              setReady(false);
            }}
          />
          {spots.map((spot) => {
            const label =
              map.id === "world" && spot.id !== "capital"
                ? spot.subtitle || spot.title
                : spot.title;
            // Keep labels readable at exploration scale, but let a full-map
            // phone overview shrink them enough to preserve spacing.
            const labelScale = Math.max(view.scale, 0.55);
            return (
              <button
                key={spot.id}
                type="button"
                className={`landmark ${hovered === spot.id ? "is-hovered" : ""}`}
                data-landmark={spot.id}
                style={{
                  left: `${spot.x - spot.w / 2}%`,
                  top: `${spot.y - spot.h / 2}%`,
                  width: `${spot.w}%`,
                  height: `${spot.h}%`,
                }}
                aria-label={`${spot.destination === "map" ? "Enter" : "Discover"} ${label}${label !== spot.title ? `, ${spot.title}` : ""}${spot.featured ? ", featured" : ""}`}
                onClick={(event) => {
                  if (event.detail === 0) choose(spot);
                }}
                onMouseEnter={() => !dragging && setHovered(spot.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => {
                  setHovered(spot.id);
                  const element = viewportRef.current;
                  const pointX =
                    (spot.x / 100) * ART_WIDTH * viewRef.current.scale +
                    viewRef.current.x;
                  const pointY =
                    (spot.y / 100) * ART_HEIGHT * viewRef.current.scale +
                    viewRef.current.y;
                  if (
                    pointX < 30 ||
                    pointX > element.clientWidth - 30 ||
                    pointY < 80 ||
                    pointY > element.clientHeight - 80
                  )
                    updateView(
                      focusPoint(viewRef.current, spot, sizeRef.current, 1),
                    );
                }}
                onBlur={() => setHovered(null)}
              >
                <span className="landmark-focus" aria-hidden="true" />
                {showLabels && (
                  <span
                    className={`landmark-label ${map.id === "world" ? "is-kingdom" : ""} ${spot.id === "capital" ? "is-capital" : ""}`}
                    aria-hidden="true"
                    style={{
                      left:
                        spot.labelX == null
                          ? undefined
                          : `${50 + ((spot.labelX - spot.x) / spot.w) * 100}%`,
                      top:
                        spot.labelY == null
                          ? undefined
                          : `${50 + ((spot.labelY - spot.y) / spot.h) * 100}%`,
                      "--label-scale": 1 / labelScale,
                      "--label-width": `${Math.min(220, (spot.w / 100) * ART_WIDTH * labelScale * 0.9)}px`,
                    }}
                  >
                    {spot.id === "capital" && <Crown size={15} weight="fill" />}
                    <span>{label}</span>
                  </span>
                )}
                <span
                  className="landmark-tooltip"
                  style={{ "--inverse-scale": 1 / view.scale }}
                >
                  {spot.featured && <Crown size={14} weight="fill" />}
                  <span>{spot.title}</span>
                  <ArrowUpRight size={14} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {!ready && (
        <div className="map-loading" role="status">
          <Compass size={36} weight="duotone" />
          <span>
            {failed
              ? "This part of the map could not load."
              : "Unfolding the map…"}
          </span>
          {failed && (
            <button type="button" onClick={() => window.location.reload()}>
              Try again
            </button>
          )}
        </div>
      )}
      <nav className="map-tools" aria-label="Map controls">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => changeZoom(1.32)}
          disabled={flying || view.scale >= 3}
        >
          <Plus size={22} />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => changeZoom(1 / 1.32)}
          disabled={flying}
        >
          <Minus size={22} />
        </button>
        <span className="tool-divider" />
        <button
          type="button"
          aria-label="Show whole map"
          title="Show whole map"
          onClick={() => reset(true)}
        >
          <CornersOut size={22} />
        </button>
        <button
          type="button"
          aria-label="Return to map center"
          title="Return to map center"
          onClick={() => reset(false)}
        >
          <Compass size={23} weight="duotone" />
        </button>
      </nav>
      <div className="map-gesture-hint">
        <Hand size={15} />
        <span>Drag to wander · tap to discover</span>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {liveText}
      </span>
    </section>
  );
}
