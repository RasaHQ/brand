#!/usr/bin/env python3
"""Generate an adapted 560px email fragment with literal inline Rasa Brand 2026 tokens.

The lead image is the featured article's community card (1200 x 630, rendered with the
rasa-community-cards skill, eyebrow RASA COMMUNITY · MON YYYY)."""
from pathlib import Path
import json
R=Path(__file__).resolve().parents[1];t=json.loads((R/'design-system/src/tokens.json').read_text());c=t['color'];fg=c['taupe']['950'];bg=c['taupe']['100'];muted=c['taupe']['700'];link=c['pink']['600'];border=c['taupe']['300']
fragment=f'''<!-- Adapted recipe, not a supplied approved newsletter. Replace every REPLACE_* placeholder. -->
<table width="100%" bgcolor="{bg}" style="width:100%;background-color:{bg};border:0;" role="presentation" cellspacing="0" cellpadding="0">
<tr><td align="center" style="padding:28px 20px;">
<!--[if mso]><table role="presentation" width="560" cellspacing="0" cellpadding="0"><tr><td><![endif]-->
<table width="100%" style="width:100%;max-width:560px;table-layout:fixed;border:0;" role="presentation" cellspacing="0" cellpadding="0">
<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;color:{fg};word-wrap:break-word;">
<img src="https://example.invalid/REPLACE_LOGO_PNG_URL" alt="Rasa" width="84" style="display:block;width:84px;height:auto;border:0;margin:0 0 24px;">
<p style="font-family:'Courier New',Courier,monospace;font-size:12px;line-height:18px;letter-spacing:1px;color:{muted};margin:0 0 20px;">RASA COMMUNITY · REPLACE_MON_YYYY</p>
<img src="https://example.invalid/REPLACE_CARD_IMAGE_URL" alt="REPLACE_CARD_ALT_TEXT" width="560" style="display:block;width:100%;max-width:560px;height:auto;border:0;margin:0 0 24px;">
<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:400;line-height:38px;margin:0 0 20px;">REPLACE_HEADLINE</h1>
<p style="margin:0 0 16px;">Hi REPLACE_FIRST_NAME_WITH_FALLBACK,</p>
<p style="margin:0 0 24px;">REPLACE_INTRO: One useful idea, release, or tutorial for developers building with Rasa.</p>
<table role="presentation" cellspacing="0" cellpadding="0" style="border:0;margin:0 0 28px;"><tr><td bgcolor="{fg}" style="background-color:{fg};border-radius:4px;text-align:center;mso-padding-alt:14px 24px;"><a href="https://example.invalid/REPLACE_CTA_URL" style="display:inline-block;padding:14px 24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:20px;font-weight:bold;color:{bg};text-decoration:none;">REPLACE_CTA_LABEL</a></td></tr></table>
<h2 style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;line-height:30px;margin:0 0 12px;">Also worth your time.</h2>
<p style="margin:0 0 16px;"><a href="https://example.invalid/REPLACE_SECONDARY_URL" style="color:{link};text-decoration:underline;">REPLACE_SECONDARY_TITLE</a><br>REPLACE_SECONDARY_SUMMARY</p>
<p style="border-top:1px solid {border};padding-top:20px;margin:28px 0 0;color:{muted};font-size:14px;line-height:22px;">REPLACE_SIGNOFF</p>
</td></tr></table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>'''
p=R/'examples/email';p.mkdir(parents=True,exist_ok=True);(p/'hubspot-content.html').write_text(fragment+'\n')
sample=fragment
for key,value in {'REPLACE_MON_YYYY':'NOV 2026','REPLACE_CARD_ALT_TEXT':'Cover card: the featured article headline','REPLACE_HEADLINE':'An agent can agree and still forget.','REPLACE_FIRST_NAME_WITH_FALLBACK':'there','REPLACE_INTRO: One useful idea, release, or tutorial for developers building with Rasa.':'This month’s guide shows how an agent can confirm a detail in conversation and still never save it. Replace this sample with the issue’s main takeaway.','REPLACE_CTA_LABEL':'Read the guide','REPLACE_SECONDARY_TITLE':'A project from the community','REPLACE_SECONDARY_SUMMARY':'Explain what readers can learn from the project in one short sentence.','REPLACE_SIGNOFF':'See you in the community,\nThe Rasa team'}.items():sample=sample.replace(key,value)
(p/'newsletter.html').write_text(f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rasa newsletter recipe preview</title></head><body style="margin:0;padding:0;background-color:{bg};"><div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">REPLACE_PREVIEW_TEXT</div>{sample}<p style="text-align:center;font:12px/18px Arial,sans-serif;color:{muted};padding:20px;">PREVIEW ONLY · Keep your sending platform’s legal and unsubscribe footer in the real campaign.</p></body></html>\n''')
print('Generated standalone newsletter and HubSpot content fragment.')
