# Apply this repository update

This is an updated checkout based on the uploaded `brand 2.zip`, commit `d6de4b1`. Copy its contents into your brand working tree, including dot-directories. The archive does not include `.git` or credentials. Preserve your checkout's `.git`, remote settings, and unrelated local work. Review the diff before committing.

Start with `docs/source-audit.md` and `README.md`. Generate/check with the commands in the README. `assets/` contains new supplied assets and derivatives; `logos/` retains compatibility paths. Do not copy all of `assets/` into a web app: use `scripts/brand.py export` for a selected set.

The supplied proprietary fonts are deliberately not part of this candidate; provision separately. The Templates and Social/Profile uploads were empty. This update does not deploy the community site, publish an npm package, or send email.
