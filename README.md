# all-about-sbom

A beginner's guide to Software Bills of Materials (SBOMs) — what they are, why they matter, and how to use them, for anyone getting started with software supply chain security.

📖 **Read it at [all-about-sbom.org](https://all-about-sbom.org)**


## What's covered

- **[SBOM Basics](https://all-about-sbom.org/sbom_basics)** — what an SBOM is, SBOM extensions, related BOMs
- **[Use Cases](https://all-about-sbom.org/use-cases)** — security management, technical debt, license compliance, supplier transparency
- **[Roles & Implementation](https://all-about-sbom.org/roles)** — producer, distributor, consumer
- **[Tools](https://all-about-sbom.org/tooling)** — SBOM tooling by ecosystem
- **[Regulations & Frameworks](https://all-about-sbom.org/regulations)** — the compliance landscape
- **[Additional References](https://all-about-sbom.org/references)** — further reading

## Contributing

Contributions are welcome — corrections, new pages, and better examples all help.

1. Fork the repo and create a branch.
2. Add or edit a `.md` / `.mdx` file under `src/content/docs/`. The file path
   becomes the page URL, so `src/content/docs/formats/spdx.md` is served at
   `/formats/spdx/`.
3. Give each page frontmatter with at least a `title` and a short `description`.
4. Run `npm run dev` and check the page renders and the sidebar looks right.
5. Open a pull request.

Browse the [open issues](https://github.com/all-about-sbom/all-about-sbom/issues)
if you're looking for somewhere to start.

## Running locally

Requires Node.js 18 or later.

```sh
git clone https://github.com/all-about-sbom/all-about-sbom.git
cd all-about-sbom
npm install
npm run dev
```

| Command                   | Action                                           |
| ------------------------- | ------------------------------------------------ |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Builds the production site to `./dist/`          |
| `npm run preview`         | Previews the build locally before deploying      |
| `npm run astro ...`       | Runs CLI commands like `astro add`, `astro check` |

### Project layout

```
.
├── public/              # static assets (favicons, etc.)
├── src/
│   ├── assets/          # images referenced from Markdown
│   ├── content/
│   │   └── docs/        # every page on the site lives here
│   └── content.config.ts
├── astro.config.mjs     # site config and sidebar structure
├── package.json
└── tsconfig.json
```

## License

<!-- TODO: license not yet determined -->
