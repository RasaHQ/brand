# Component implementation reference

Use this reference to choose a recipe, then read the actual CSS before adapting it. This is an implementation guide, not an interactive component library.

[Asset selection](ASSETS.md) · [Component behavior](docs/components.md) · [Web integration](docs/web.md) · [Color values and contrast](docs/colors.md)

## Choose a recipe

| Need | Classes | Implementation rule |
| --- | --- | --- |
| Page wrapper | `rasa-theme` | Import tokens and component CSS once. |
| Main heading | `rasa-display` | One semantic h1; retain responsive sizing. |
| Section heading | `rasa-title` | Use h2 and preserve heading order. |
| Editorial card | `rasa-card`, `rasa-card-title` | Use an article when content stands alone. |
| Main action | `rasa-button` | Anchor for navigation; button for an action. |
| Secondary action | `rasa-button rasa-button--secondary` | Keep a visible boundary and focus state. |
| Pink action | `rasa-button rasa-button--pink` | Ink text on pink. |
| Reading content | `rasa-prose` | Use the long-form adaptation for articles. |
| Input | `rasa-field`, `rasa-input` | Persistent label, unique ID, described errors. |
| Status | `rasa-badge` | Include words; never communicate state by color alone. |

## Responsive typography

Values below come from `design-system/src/tokens.json`; they are not an additional source of truth.

| Recipe | Family / weight | Desktop size / line height | Mobile size / line height |
| --- | --- | --- | --- |
| `display` | serif / 350 | clamp(52px, 5.56vw, 80px) / 1.05 | 42px / 46px |
| `serif-large` | serif / 350 | 60px / 64px | 34px / 38px |
| `section` | serif / 350 | 40px / 44px | 28px / 32px |
| `card` | serif / 400 | 28px / 32px | 28px / 32px |
| `metric` | sans / 500 | 80px / 90px | 42px / 46px |
| `body-large` | sans / 350 | 20px / 24px | 20px / 24px |
| `body` | sans / 350 | 16px / 22px | 16px / 22px |
| `body-small` | sans / 350 | 14px / 18px | 14px / 18px |
| `mono` | mono / 400 | 14px / 20px | 14px / 20px |
| `eyebrow` | mono / 400 | 12px / 16px | 12px / 16px |
| `prose` | sans / 350 | 18px / 1.6 | 18px / 1.6 |

## Copyable markup

```html
<section class="rasa-theme rasa-container rasa-section" aria-labelledby="resources">
  <h2 id="resources" class="rasa-title">Resources for builders</h2>
  <p class="rasa-prose">Replace with the page’s actual description.</p>
  <a class="rasa-button" href="/resources/">Explore resources</a>
</section>
```

This example route is illustrative; use an existing route in the consuming app.

## Source files and acceptance

- [Tokens](design-system/src/tokens.json): shared values and responsive type recipes.
- [CSS recipes](design-system/src/components.css): actual styles and interaction states.
- [Astro hero](examples/astro/BrandHero.astro): supplied logo and pattern composition.
- [Consumer build](examples/astro-smoke/README.md): pinned Astro/Tailwind verification fixture.
- [Newsletter recipe](docs/email.md): email requires inline styles and separate rendering checks.

Inspect desktop and narrow layouts, long content, keyboard focus, contrast, and font/image failures in the consuming app. Markdown documents the contract; it cannot certify rendered behavior. New combinations remain adaptations unless supported by the source evidence.
