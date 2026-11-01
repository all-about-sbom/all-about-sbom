# All About SBOM: Developer Guidelines

Use this guide when adding or revising documentation, components, styles,
illustrations, or navigation.

## Audience and Purpose

All About SBOM provides a neutral, accessible starting point for people who are new to SBOMs but need to work with them. It helps readers navigate information that is often fragmented, highly technical, or commercially focused, offering a clear overview of core concepts with further detail on dedicated pages.

The audience includes decision-makers across software production who need a high-level understanding, as well as technical stakeholders, such as developers and security and supply-chain teams, who need practical implementation guidance.

Therefore, content should be beginner-friendly and accurate, introducing core concepts before exploring details on subpages. The subpages should provide actionable guidance to support both informed decisions and practical implementation.

The website complements existing resources rather than replacing them. Contributors should link to useful documentation, guidelines, and tool directories instead of duplicating their content.

## Editorial Voice

Use an informational tone: state what is known, explain how it applies, and
avoid addressing the reader as a participant in a conversation. The writing
must remain understandable to readers who are unfamiliar with SBOMs and useful
to readers making technical or organizational decisions.

- Define a term the first time it is needed; do not assume specialist
  knowledge.
- State the subject and main point in the opening sentence of each paragraph.
- Use first- or second-person pronouns only in an instruction where they
  prevent ambiguity; otherwise name the person, team, organization, or system
  performing the action.
- Delete promotional claims, filler, and unsupported assertions. Define
  necessary technical terms at first use.
- Write calls to action as short verb phrases, such as “Review use cases” or
  “View the specification.”
- Embed references directly in the relevant sentence. Make descriptive words
  clickable instead of adding numbered references that point to a link list at
  the bottom of the page.
- The website should be vendor neutral. Do not focus on one standard or a specific product. Provide neutral, but actionable guidance.

| Avoid | Prefer |
| --- | --- |
| “Let’s explore how SBOMs work.” | “This section describes how SBOMs work.” |
| “You can use an SBOM to find vulnerable components.” | “An SBOM helps identify vulnerable components.” |
| “Click here to learn more.” | “See [SBOM formats](/sbom_basics/#formats) for format details.” |
| “Start your SBOM journey.” | “Begin with the SBOM basics.” |

## Components and Embedded Content

Use the existing Starlight components instead of creating a new visual pattern.
Import only the components used on the page:

```mdx
import { Aside, CardGrid, LinkButton, LinkCard, Steps, Tabs, TabItem } from '@astrojs/starlight/components';
```

### Navigation Cards

Use `LinkCard` inside `CardGrid` to link to related pages. Keep the title
short and describe the destination, not the action required from the reader.

```mdx
<CardGrid>
  <LinkCard
    title="SBOM formats"
    href="/sbom_basics/#formats"
    description="Compare the structure and typical use of SPDX and CycloneDX."
  />
</CardGrid>
```

Use `BrandCard` for an informational card that needs one of the project icons
from `public/brand/icons/`. Use the icon name without the `.svg` suffix.
Icons are decorative inside the card, so the title and body must provide the
meaning.

```mdx
import { CardGrid } from '@astrojs/starlight/components';
import BrandCard from '../../components/BrandCard.astro';

<CardGrid>
  <BrandCard title="Aggregation" icon="merge">
    Combine upstream SBOMs into a view of the complete product.
  </BrandCard>
</CardGrid>
```

### Callouts and Actions

Use `Aside` for a short clarification, warning, or practical note. Do not put
essential content only in a callout.

```mdx
<Aside type="caution" title="An SBOM is not a vulnerability report">
  An SBOM is a snapshot of software composition. Vulnerability data changes
  independently.
</Aside>
```

Use `LinkButton` for a prominent next step. Use a descriptive label and a
site-relative URL.

```mdx
<LinkButton href="/use-cases/" variant="primary" icon="right-arrow">
  Review use cases
</LinkButton>
```

### Procedures and Comparisons

Use `Steps` for an ordered process where sequence matters:

```mdx
<Steps>
  1. **Generate** an SBOM for the release.
  2. **Validate** the format and required fields.
  3. **Distribute** the SBOM with the corresponding release.
</Steps>
```

Use `Tabs` and `TabItem` when the same guidance differs by role, organization
size, or another clear category. Do not use tabs to hide unrelated content.

### Links, symbols, and diagrams

Embed links in descriptive words. Use site-relative links for internal pages
and direct links to authoritative external sources:

```mdx
See the [NTIA minimum elements](https://www.ntia.gov/report/ntia-minimum-elements-software-bill-materials)
for the information an SBOM should contain.
```

Use Starlight icons for interface actions, such as `right-arrow` on a
`LinkButton`. Use local project icons only through the existing `BrandCard`
pattern. Do not introduce emoji, numbered reference markers, or decorative
symbols as substitutes for labels.

Use a short code block for small abstract data or dependency relationships.
Use a diagram only when it explains a relationship more clearly than prose,
and provide a text alternative or concise accessible description.

## Project Structure and Pages

The project is an Astro site using Starlight for documentation:

| Location | Purpose |
| --- | --- |
| `src/content/docs/` | Markdown and MDX pages; the file path determines the URL. |
| `src/components/` | Shared Astro components, including `BrandCard.astro`. |
| `src/styles/custom.css` | Project-specific layout and component styles. |
| `src/styles/theme-twilight-indigo.css` | Theme tokens, typography, colors, and card styling. |
| `src/assets/` | Imported assets processed by Astro. |
| `public/` | Files served at their URL, including icons and downloadable resources. |
| `src/pages/` | Custom Astro routes, such as the 404 page. |
| `astro.config.mjs` | Starlight, Markdown, Mermaid, styles, and site configuration. |
| `src/routeData.ts` | Route-specific data and navigation behavior. |

### Add a Page

1. Choose the content section and URL. Use a directory with `index.mdx` for
   pages that may later have child pages, for example
   `src/content/docs/use-cases/new-topic/index.mdx`. Use a standalone `.mdx`
   file for a page without child pages, for example
   `src/content/docs/references.mdx`.
2. Add frontmatter with a specific title and one-sentence description:

   ```mdx
   ---
   title: "Specific page title"
   description: "A concise description of the page subject and its value."
   ---
   ```

3. Add a short introduction, then organize the content from basic concepts to
   detailed guidance.
4. Add Starlight components only when they improve navigation or
   comprehension. Follow the patterns in the Components and embedded content
   section.
5. Use lowercase, descriptive, and stable URL segments. Avoid dates,
   abbreviations, and unnecessary nesting.
6. Run the validation checks described below and confirm that the new route is
   generated without warnings.

### Modify an Existing Page

1. Read the complete page before changing its structure or wording.
2. Check related pages for duplicate explanations, references, and links that
   may also need updating.
3. Preserve the existing frontmatter unless the title, URL, or page scope has
   changed.
4. Keep existing component and CSS patterns. Change shared styles only when
   the behavior should change across multiple pages.
5. Remove outdated content, imports, links, and styles instead of leaving
   unused remnants.
6. Check the rendered page in both themes and at narrow and wide viewport
   sizes when the change affects layout or components.

### Sources and Maintenance

- Prefer primary sources, such as standards bodies, government agencies, and
  project documentation.
- Link claims about standards, regulations, vulnerabilities, versions, or tool
  capabilities to an authoritative source.
- Distinguish requirements, recommendations, and examples.
- Review external links and time-sensitive claims when editing the surrounding
  content. Remove or replace obsolete sources.
- Do not copy substantial text, images, or diagrams from external sources.
  Confirm reuse rights and include required attribution for new assets.

### Validation

Run these commands before submitting a change:

```bash
git diff --check
npm run build
```

For content or navigation changes, inspect each affected route and test every
new internal link. For layout changes, check narrow and wide viewports and
both light and dark themes. Resolve build warnings rather than treating a
successful exit code as sufficient.

## Accessibility

Accessibility is part of every content and design change. Pages must remain
usable with a keyboard, screen reader, zoom, and reduced-motion preference.

- Use headings in logical order. Do not skip levels to change text size.
- Use descriptive link text. Avoid “click here” and bare URLs in prose.
- Preserve visible keyboard focus for links, buttons, tabs, and other controls.
- Use semantic HTML and existing Starlight components instead of styling plain
  elements to behave like controls.
- Provide concise `alt` text for informative images and diagrams. Use `alt=""`
  for decorative images, and do not repeat adjacent text.
- Provide a text explanation when a diagram, dependency tree, or other visual
  conveys information that is not available in the surrounding text.
- Do not use color as the only way to distinguish status, categories, or
  meaning. Check contrast in both themes.
- Keep cards, tables, code blocks, tabs, and navigation usable at narrow widths
  and when the page is zoomed.
- Avoid unnecessary animation and respect the user's reduced-motion preference.
- Give controls an accessible name. Use `aria-label` only when visible text
  does not already provide one.