export const pages = ["home", "publications", "creative", "writing", "travels"];

export function readPersonalRoute(hash = "") {
  const page = hash.replace(/^#\/?/, "").replace(/\/$/, "") || "home";
  return pages.includes(page) ? page : "home";
}

export function pageHref(page) {
  return page === "home" ? "#/" : `#/${page}`;
}
