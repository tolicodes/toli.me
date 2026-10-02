export function parseRoute(hash = "") {
  let parts;
  try {
    parts = hash
      .replace(/^#\/?/, "")
      .split("/")
      .filter(Boolean)
      .map(decodeURIComponent);
  } catch {
    return { type: "map", id: "world" };
  }
  if (parts[0] === "project" && parts[1])
    return { type: "project", id: parts[1], from: parts[2] || "capital" };
  if (parts[0] === "kingdom" && parts[1]) return { type: "map", id: parts[1] };
  if (parts[0] === "capital") return { type: "map", id: "capital" };
  return { type: "map", id: "world" };
}

export function mapHash(id) {
  return id === "world"
    ? "#/"
    : id === "capital"
      ? "#/capital"
      : `#/kingdom/${encodeURIComponent(id)}`;
}

export function projectHash(id, from = "capital") {
  return `#/project/${encodeURIComponent(id)}/${encodeURIComponent(from)}`;
}
