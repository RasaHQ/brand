# Artwork direction

## The new visual vocabulary

The source designs combine warm flat surfaces with concrete, readable product concepts. Their character comes from typography, spacing, layered UI and selective color. Product panels can overlap, cast restrained shadows or sit in shallow perspective. That is different from making glass/refraction or decorative gradients the image's subject.

Use ink `#181210`, cream `#FAF6F0`, bright cream `#FFFBF5` and taupe `#EDE8E0` for the scene. Pink `#E85A91` and soft pink `#FCE7EF` identify selected details; dark pink `#AA1E54` supports readable small text. Introduce mint, yellow or domain colors only when they convey an additional role.

The gray canvas and green review area surrounding designs on `Homepage.svg` are Figma board organization, not brand backgrounds. Transparent checkerboard placeholders are not a visual pattern to reproduce.

## Composition recipes

### Connected skills

One labeled source on the left, three to seven task cards to the right, consistent connector routing. White or bright cards, pink icon tiles, a short name and explicit state. Curved thin taupe connectors remain behind nodes. The supplied Skills export uses a yellow source and mint “Built” chips. Preserve meaning when adapting: unrelated concepts should not be drawn as a dependency graph.

### Workflow panel

One focal action per composition: write a skill, evaluate behavior, review a release, or investigate a recommendation. Place one primary panel in front, with secondary context behind. Show a believable sequence, not a cloud of unrelated dashboard fragments. Keep labels readable at delivery size. For a thumbnail, simplify controls rather than shrinking an entire screenshot.

### Governed system

Show domain ownership and shared controls. The source uses teal for service, blue for finance and orange for sales, with review/permission/test/log rows. These are example categories, not reserved colors for all Rasa products. Keep the role-to-color mapping consistent throughout a single story. Never use a lock or shield to imply a certification not actually held.

### Evidence card

One message in the foreground; large cropped numeral near the outer edge as a supporting shape. Cream/taupe background and restrained pink emphasis. Duplicate the figure in the readable foreground copy. Verify the claim, timeframe and source before publishing. The attached regulated-deployment board contains design copy, not independently validated evidence.

### Editorial title or event cover — proposed extension

A short serif title, a small mono category/date label, a concise sans subtitle and one purposeful diagram. Allow generous negative space. Keep partner logos in a dedicated clear zone. Do not make every word pink or every heading italic. For photography, use a real subject and a quiet crop; real imagery is present in the live hero video, so photography is not categorically excluded.

## Production defaults — proposed

| Output | Starting canvas | Practical adaptation |
| --- | --- | --- |
| Web/social landscape | 1600 × 900 | Keep headline and focal element inside roughly 5% safe margins |
| Open Graph | 1200 × 630 | One idea; check at small preview size |
| Square | 1080 × 1080 | Stack title/diagram; avoid microscopic labels |
| Portrait | 1080 × 1920 | Recompose vertically; reserve space for captions/platform overlays |
| Video | 1920 × 1080 | Frame-driven vector/UI composition; assess on a phone as well as desktop |

These are delivery conveniences, not recovered Figma specifications. Design the composition for each ratio; do not crop a finished landscape diagram into portrait and lose meaning.

Prefer SVG for diagrams and icons, PNG for rasterized UI transparency, and a suitable compressed raster format for photographs. Use sRGB for digital interchange. Check thin strokes at final resolution. Include a background explicitly unless transparency is requested. Optimize SVGs without destroying accessibility labels or IDs used for animation.

## Prompt brief for image generation

Use this for supporting illustrative imagery, not exact UI or logos:

> Create a Rasa-aligned editorial illustration about [specific subject]. Use a warm cream background (#FAF6F0), dark brown-black structure (#181210), light taupe supporting surfaces (#EDE8E0), and a small amount of pink (#E85A91). Compose [specific meaningful objects and relationships] with generous negative space and clean, restrained geometry. Keep the main subject in [position] and leave [area] clear for typography added later. Use flat fills with only subtle localized depth where objects overlap. Deliver at [ratio and dimensions]. No text, lettering, logos, fractals, glass refraction, neon glow, purple gradients, rainbow meshes, robot mascots, brains, or generic circuit-board imagery. Do not invent product screens or customer claims.

For exact product stories, implement the real controls and connectors in SVG/HTML/React instead. Typography and logos are composited from approved assets after generation. Do not ask an image model to reproduce the Rasa logo or write long interface labels.

## Review checklist

- Can a viewer explain what the image communicates in one sentence?
- Are colors serving roles, not merely decoration?
- Does it feel warm, precise and spacious at the actual output size?
- Is the focal text readable with licensed fonts, without fake bold/italic?
- Are UI details truthful, or clearly marked illustrative?
- Are claims and third-party marks approved?
- Are all important labels inside the crop and safe area?
- Does a still frame communicate the core meaning without motion?

`artwork/diagram-starter.svg` is an original editable starter using the extracted colors. It is not a product screenshot or approved logo asset. The color reference sheet uses fallback fonts intentionally.
