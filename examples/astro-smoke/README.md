# Astro and Tailwind consumer check

This fixture validates the actual example with Astro 7.4.0 and Tailwind 4.3.3 (lockfile pinned), using Node 24. It is not the rasa.community source repository.

From the brand repository root:

```sh
python3 scripts/brand.py export --id logos.digital.rasa-logo-horizontal-ink.svg --id patterns.primary.web.soundwave-01-light.webp --target /tmp/rasa-brand-smoke-public
# Copy that selected brand folder into examples/astro-smoke/public/brand before visual inspection.
npm ci --prefix examples/astro-smoke
npm run build --prefix examples/astro-smoke
```

Because the exporter protects the brand checkout from app exports, export to a temporary consumer directory, then copy the selected files into the fixture's public/brand folder. Deploy the built dist through a static server for visual review. These dependencies are test-only; consuming sites keep their own versions. Do not deploy this specimen as the actual community site.
