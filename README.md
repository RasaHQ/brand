# Rasa Brand Guidelines

Welcome to the official Rasa brand repository. This resource provides all the assets and guidelines needed to represent the Rasa brand consistently and professionally.

## 📋 Table of Contents

- [Logo Usage](#-logo-usage)
- [Typography](#-typography)
- [Color Palette](#-color-palette)
- [Visual Elements](#-visual-elements)
- [Repository Structure](#-repository-structure)
- [Quick Start](#-quick-start)
- [Support](#-support)

---

## 🎨 Logo Usage

### Logo Variants

Rasa offers two primary logo configurations:

- **Horizontal (Rectangular)**: Primary logo mark, preferred for most applications
- **Square**: For constrained layouts or situations where the horizontal format isn't aesthetically suitable

Each configuration is available in three colorways:

- **Purple** (Primary): Use this version by default
- **Black**: For limited color contexts or when brand purple is already prominent
- **White**: For dark backgrounds

### Available Formats

```
logos/
├── horizontal/
│   ├── png/          # Web and digital use
│   ├── svg/          # Scalable for web and digital
│   └── print-cmyk/   # Print production (EPS files)
├── square/
│   ├── png/          # Web and digital use
│   ├── svg/          # Scalable for web and digital
│   └── print-cmyk/   # Print production (EPS files)
└── original-ai/      # Source files (Adobe Illustrator)
```

### Logo Guidelines

**Clear Space**  
Maintain clear space around the logo equal to the width of the speech bubble line. This space extends from the bottom edge of the speech bubble and must remain free of patterns, typography, or other graphic elements.

**Do's**
- ✓ Use the purple horizontal logo as your first choice
- ✓ Ensure sufficient contrast between logo and background
- ✓ Maintain proper clear space around all logo placements
- ✓ Use provided file formats without modification

**Don'ts**
- ✗ Never alter, distort, or redraw the logo
- ✗ Never place the logo over busy images or competing patterns
- ✗ Never use colors other than the three approved versions

### Logo Pairing

When pairing the Rasa logo with another brand mark, use a simple 'X' between logos. The 'X' should be proportionate to the Rasa logo—neither larger nor smaller.

---

## 🔤 Typography

### Primary Typeface: Söhne

Our primary marketing typeface for all brand communications.

- **Söhne Buch**: Body copy
- **Söhne Kraftig**: Headings (preferred weight for emphasis)
- **Söhne Dreiviertelfett**: Use sparingly for additional emphasis

**Applications:** Web, documents, print, and all graphic assets

### Accent Typeface: Söhne Mono

A technical accent typeface that nods to Rasa's developer-focused heritage.

**Use for:**
- UI elements
- Code snippets
- Technical documentation
- Moments requiring a structured aesthetic

**Use sparingly** to maintain impact and hierarchy.

### Substitute Typeface: IBM Plex Sans

When Söhne is unavailable (e.g., Google Slides), use **IBM Plex Sans** from Google Fonts as an alternative.

---

## 🎨 Color Palette

### Primary Palette

<table>
<tr>
<td><strong>Rasa Purple</strong><br>(Primary Brand Color)</td>
<td>
RGB: 90, 23, 238<br>
HEX: <code>#5a17ee</code><br>
CMYK: 97, 100, 0, 0<br>
PMS: 2368C
</td>
</tr>
<tr>
<td><strong>Rasa Navy</strong></td>
<td>
RGB: 8, 3, 39<br>
HEX: <code>#080327</code><br>
CMYK: 96, 88, 27, 77<br>
PMS: Black 6C
</td>
</tr>
<tr>
<td><strong>Rasa Grey</strong></td>
<td>
RGB: 223, 232, 255<br>
HEX: <code>#dfe8ff</code><br>
CMYK: 12, 9, 0, 0<br>
PMS: 642C
</td>
</tr>
<tr>
<td><strong>White</strong></td>
<td>
RGB: 255, 255, 255<br>
HEX: <code>#eff1ff</code><br>
CMYK: 0, 0, 0, 0<br>
PMS: 00C White
</td>
</tr>
</table>

**Usage Note:** Purple is our primary color, but it should not dominate. Use it thoughtfully and balance with other brand colors for visual harmony.

### Secondary Palette

Supporting colors for specific use cases:

| Color | HEX | Use Case |
|-------|-----|----------|
| **Lighter Purple** | `#7d7aec` | Backgrounds, secondary elements, subtle emphasis |
| **Orange** | `#FFD594` | Draw attention, highlight key points, optimism and energy |
| **Aqua** | `#71EFF3` | Clarity and approachability, highlights, illustrations |
| **Green** | `#20D58A` | Success outcomes, growth indicators, affirmative elements |
| **Red** | `#CE3381` | Critical alerts, negative data points, emphasis |

### Product Neutrals

Digital product use only—these neutrals provide visual balance:

| Color | RGB | HEX |
|-------|-----|-----|
| **Black** | 40, 37, 37 | `#282525` |
| **Grey 3** | 44, 57, 81 | `#2C3951` |
| **Grey 2** | 109, 112, 139 | `#6D708B` |
| **Grey 1** | 210, 216, 234 | `#D2D8EA` |
| **Light Grey** | 242, 244, 250 | `#F2F4FA` |

---

## ✨ Visual Elements

### Gradient Backgrounds

Gradients are essential to Rasa's visual identity, adding depth, movement, and modernity. They create dimension in illustrations, backgrounds, and interface elements.

**Key Characteristics:**
- Combine primary and supporting colors
- Balance vibrancy with subtlety
- Never overwhelm other brand elements

**Available Backgrounds:** See `backgrounds/` directory for pre-made gradient assets.

### Refracted Glass Effect

Rasa layers gradients under refracted or textured glass elements to add:
- Tactility and depth
- Dimensionality
- Visual intrigue
- Modern, polished aesthetic

This technique softens bold color transitions and creates an organic, "alive" feeling rather than flat or synthetic.

### Metaphor Illustrations

Conceptual illustrations that bring abstract ideas to life (dialogue, learning, intelligence).

**Usage Principles:**
- Use sparingly
- Serve to clarify, not decorate
- Maintain clean, modern aesthetic
- Never overly literal or whimsical
- Align with message tone

**Available Assets:** See `metaphor-illustrations/` directory.

### Icons

Rasa uses **Phosphor icons** for their clean, minimal aesthetic.

**Guidelines:**
- Use to clarify meaning, not embellish
- Maintain consistent style and stroke weight
- Ensure visual cohesion across all applications

---

## 📁 Repository Structure

```
rasa-brand/
├── backgrounds/              # Gradient background assets
│   └── *.png
├── logos/
│   ├── horizontal/          # Primary rectangular logo
│   │   ├── png/            # Digital/web formats
│   │   ├── svg/            # Scalable vector formats
│   │   └── print-cmyk/     # Print-ready CMYK (EPS)
│   ├── square/             # Square logo variant
│   │   ├── png/
│   │   ├── svg/
│   │   └── print-cmyk/
│   └── original-ai/        # Source Adobe Illustrator files
├── metaphor-illustrations/  # Conceptual illustration assets
│   └── *.png
└── README.md               # This file
```

---

## 🚀 Quick Start

### For Digital/Web Use

1. **Logo:** Use PNG or SVG files from `logos/horizontal/` or `logos/square/`
2. **Color:** Start with Rasa Purple (`#5a17ee`) balanced with neutral colors
3. **Typography:** Use Söhne font family (IBM Plex Sans if unavailable)
4. **Backgrounds:** Select from pre-made gradients in `backgrounds/`

### For Print Production

1. **Logo:** Use EPS files from `logos/*/print-cmyk/`
2. **Color:** Reference CMYK and PMS values in color palette
3. **Proofing:** Always proof colors with your print provider

### For Presentations

1. **Logo:** Use PNG files for compatibility
2. **Typography:** Use IBM Plex Sans from Google Fonts
3. **Colors:** Copy hex values directly from this guide

---

## 📞 Support

### Questions?

For brand guideline questions, usage approvals, or additional assets:

- **Internal Team:** Contact the Rasa Marketing team
- **External Partners:** Reach out to your Rasa point of contact

### License & Usage

All Rasa brand assets are proprietary and protected by trademark and copyright law. Use of these assets requires explicit permission from Rasa. Unauthorized use, modification, or distribution is prohibited.

---

<p align="center">
  <strong>Rasa Brand Guidelines</strong><br>
</p>