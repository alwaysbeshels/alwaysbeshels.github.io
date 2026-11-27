import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const required = [
  "index.html",
  "projects/index.html",
  "projects/cest-deja-lenfer/index.html",
  "projects/morning-press/index.html",
  "blog/index.html",
  "blog/welcome-to-shelseas-lab/index.html",
  "timeline/index.html",
  "about/index.html",
  "search/index.html",
  "privacy/index.html",
  "terms/index.html",
  "404.html",
  "fr/index.html",
  "fr/projets/index.html",
  "fr/projets/cest-deja-lenfer/index.html",
  "fr/projets/morning-press/index.html",
  "fr/blogue/index.html",
  "fr/blogue/bienvenue-au-shelseas-lab/index.html",
  "fr/parcours/index.html",
  "fr/a-propos/index.html",
  "fr/recherche/index.html",
  "fr/confidentialite/index.html",
  "fr/conditions/index.html",
  "rss.xml",
  "fr/rss.xml",
  "sitemap-index.xml",
  "robots.txt",
  "site.webmanifest",
  "favicon.svg",
  "assets/brand/logo-full.svg",
  "assets/brand/icon.svg",
  "assets/brand/og-image.png",
  "pagefind/pagefind.js",
];

const missing = required.filter((file) => !fs.existsSync(path.join(dist, file)));
if (missing.length) {
  console.error("Missing build output:\n" + missing.map((file) => `  ${file}`).join("\n"));
  process.exit(1);
}

const allowedRepos = new Set(["morning-press", "alwaysbeshels.github.io"]);

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".xml")) files.push(full);
  }
  return files;
}

const githubUrl = /https?:\/\/github\.com\/[^\s"'<>)]+/gi;
const problems = [];

for (const file of walk(dist)) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(dist, file);
  const isFrench = rel === "fr" || rel.startsWith(`fr${path.sep}`);
  if (rel.endsWith(".html") && rel !== "404.html") {
    const expected = isFrench ? "fr-CA" : "en-CA";
    if (!html.includes(`lang="${expected}"`)) {
      problems.push(`${rel} is missing lang="${expected}"`);
    }
  }
  if (rel.endsWith(".html") && rel !== "404.html" && !rel.endsWith(`${path.sep}search${path.sep}index.html`) && rel !== "search/index.html" && !rel.endsWith(`${path.sep}recherche${path.sep}index.html`.replaceAll("/", path.sep)) && !rel.includes(`${path.sep}recherche${path.sep}`) && !html.includes('data-pagefind-ignore="all"')) {
    for (const token of ['hreflang="en-CA"', 'hreflang="fr-CA"', 'hreflang="x-default"']) {
      if (!html.includes(token)) problems.push(`${rel} is missing ${token}`);
    }
  }

  for (const match of html.matchAll(githubUrl)) {
    let url;
    try {
      url = new URL(match[0].replace(/&amp;/g, "&"));
    } catch {
      problems.push(`${rel} has an unreadable GitHub URL: ${match[0]}`);
      continue;
    }
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] !== "alwaysbeshels") {
      problems.push(`${rel} links to a GitHub account that is not allowlisted: ${url.href}`);
      continue;
    }
    const repo = parts[1];
    if (repo && !allowedRepos.has(repo)) {
      problems.push(`${rel} links to a GitHub repo that is not public-allowlisted: ${url.href}`);
    }
  }
}

const home = fs.readFileSync(path.join(dist, "index.html"), "utf8");
for (const token of ['content="#AC152B"', "assets/brand/og-image.png", "cestdejalenfer.ca"]) {
  if (!home.includes(token)) problems.push(`home is missing ${token}`);
}

const closures = fs.readFileSync(path.join(dist, "projects/cest-deja-lenfer/index.html"), "utf8");
if (!closures.includes("https://cestdejalenfer.ca/")) {
  problems.push("the closures page does not link the live site");
}
if (/github\.com\/alwaysbeshels\/(?!morning-press|alwaysbeshels\.github\.io)/.test(closures)) {
  problems.push("the closures page links a GitHub repo other than the public site or Morning Press");
}

const press = fs.readFileSync(path.join(dist, "projects/morning-press/index.html"), "utf8");
if (!press.includes("https://github.com/alwaysbeshels/morning-press")) {
  problems.push("Morning Press does not link its public repository");
}

const timeline = fs.readFileSync(path.join(dist, "timeline/index.html"), "utf8");
for (const token of ["TODO: role", "TODO: company", "TODO: university"]) {
  if (!timeline.includes(token)) problems.push(`English timeline is missing ${token}`);
}

const parcours = fs.readFileSync(path.join(dist, "fr/parcours/index.html"), "utf8");
for (const token of ["poste", "employeur", "université"]) {
  if (!parcours.includes(token)) problems.push(`French timeline is missing ${token}`);
}

const manifest = JSON.parse(fs.readFileSync(path.join(dist, "site.webmanifest"), "utf8"));
if (manifest.theme_color !== "#AC152B") problems.push("webmanifest theme_color is not #AC152B");

if (!fs.existsSync(path.join(dist, "pagefind"))) {
  problems.push("pagefind output is missing");
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`Checked ${required.length} outputs and GitHub links.`);
