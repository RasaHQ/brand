#!/usr/bin/env python3
"""Render Rasa Community cards from a JSON spec.

usage: python render_card.py spec.json out.png        # one spec
       python render_card.py specs.json outdir/        # list of specs (each may set "out")
       python render_card.py spec.json out.html --html # write HTML only (debug)

Spec format: see references/panels.md. Colours come only from references/tokens.json.
"""
import json, sys, os, html, base64, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
TOK = json.loads((ROOT / "references" / "tokens.json").read_text())
LOGO = (ROOT / "assets" / "logo-full.svg").read_text()
F = TOK["fixed"]
e = lambda s: html.escape(str(s))

CHECK = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CROSS = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'

# Fonts are licensed and never committed (treat them like a .env file). They are looked
# up by name in: this skill's assets/fonts/, $RASA_FONTS_DIR (or RASA_FONTS_DIR in the
# brand repo's .env), then the brand repo's design-system/rasa-brand-2026/fonts/.
# Missing faces fall back to the Google substitutes (Newsreader, Inter, JetBrains Mono),
# embedded from the brand repo's OFL files when available.
_loc = ROOT / "brand-root.txt"  # written beside discovered copies (.claude/skills, .agents/skills, installs)
BRAND = (ROOT / _loc.read_text().strip()).resolve() if _loc.is_file() else ROOT.parent.parent  # else <brand>/skills/<this>
FACES = [("STK Bureau Serif", "STKBureauSerif-Book.woff2"), ("STK Bureau Sans", "STKBureauSans-Book.woff2"), ("STK Bureau Sans Mono", "STKBureauSansMono-Regular.woff2")]
SUBSTITUTES = [("Newsreader", "Newsreader/Newsreader-Regular.ttf"), ("Inter", "Inter/Inter-Regular.ttf"), ("JetBrains Mono", "JetBrains Mono/JetBrainsMono-Regular.ttf")]

def font_dirs():
    dirs = [ROOT / "assets" / "fonts"]
    env = os.environ.get("RASA_FONTS_DIR")
    dotenv = BRAND / ".env"
    if not env and dotenv.is_file():
        for line in dotenv.read_text().splitlines():
            if line.strip().startswith("RASA_FONTS_DIR="):
                env = line.split("=", 1)[1].strip().strip('"').strip("'") or None
    if env: dirs.append(pathlib.Path(env).expanduser())
    dirs.append(BRAND / "design-system" / "rasa-brand-2026" / "fonts")
    return dirs

MISSING = []

def fonts_css():
    out = []
    for fam, fn in FACES:
        p = next((d / fn for d in font_dirs() if (d / fn).is_file()), None)
        if p:
            out.append(f"@font-face{{font-family:'{fam}';src:url(data:font/woff2;base64,{base64.b64encode(p.read_bytes()).decode()}) format('woff2');}}")
        elif fn not in MISSING:
            MISSING.append(fn)
    for fam, rel in SUBSTITUTES:
        p = BRAND / "assets" / "fonts" / "fallback" / rel
        if p.is_file():
            out.append(f"@font-face{{font-family:'{fam}';src:url(data:font/ttf;base64,{base64.b64encode(p.read_bytes()).decode()}) format('truetype');}}")
    return "\n".join(out)

def tag(text, kind="pass"):
    icon = CHECK if kind == "pass" else CROSS
    return f'<div class="tag {kind}">{icon}<span>{e(text)}</span></div>'

# ---------------------------------------------------------------- panels
def p_ledger(p):
    cols = p["columns"]; rows = p["rows"]
    h = '<div class="box tbl"><div class="tr th">' + "".join(f'<span>{e(c)}</span>' for c in cols) + '<span></span></div>'
    for r in rows:
        st = r[3] if len(r) > 3 else "none"
        ic = f'<i class="ok">{CHECK}</i>' if st == "ok" else (f'<i class="bad">{CROSS}</i>' if st == "fail" else "<i></i>")
        h += f'<div class="tr"><span>{e(r[0])}</span><span>{e(r[1])}</span><span class="{"badtxt" if st=="fail" else ""}">{e(r[2])}</span>{ic}</div>'
    h += "</div>"
    return h + (tag(p["tag"], "fail") if p.get("tag") else "")

def p_log(p):
    rows = p["rows"]; fi = p.get("fail_index", len(rows) - 1)
    h = f'<div class="box log"><div class="lbl">{e(p.get("title","LOG"))}</div>'
    for i, (t, who, what) in enumerate(rows):
        bad = i == fi
        h += f'<div class="lr {"bad" if bad else ""}"><span class="mut">{e(t)}</span><span class="who">{e(who)}</span><span class="what">{e(what)}</span>{f"<i>{CROSS}</i>" if bad else ""}</div>'
    return h + "</div>" + (tag(p["tag"], "fail") if p.get("tag") else "")

def window_html(p):
    h = f'<div class="box win"><div class="bar"><b></b><b></b><b></b><span>{e(p.get("title",""))}</span></div><div class="wr">'
    for name, mode, on in p["rows"]:
        h += f'<div class="row {"hi" if on else ""}"><span class="nm">{e(name)}</span><span class="md">{e(mode)}</span><span class="tg {"on" if on else ""}"><i></i></span></div>'
    return h + "</div></div>"

def p_window(p):
    return window_html(p) + (tag(p["tag"]) if p.get("tag") else "")

def p_stacked(p):
    return f'<div class="stack"><div class="back far"></div><div class="back near"></div><div class="front">{window_html(p)}</div></div>'

def p_path(p):
    h = '<div class="box path">'
    for i, (label, st) in enumerate(p["steps"]):
        last = i == len(p["steps"]) - 1
        node = {"done": f'<span class="n done">{CHECK}</span>', "current": '<span class="n cur"><i></i></span>'}.get(st, '<span class="n nxt"></span>')
        now = '<em>now</em>' if st == "current" else ""
        h += f'<div class="ps"><div class="rail">{node}{"" if last else f"<s class={chr(34)}{st}{chr(34)}></s>"}</div><div class="pl {st}">{e(label)}{now}</div></div>'
    return h + "</div>"

def p_route(p):
    n, cur = int(p.get("steps", 5)), int(p.get("current", 2))
    xs = [16 + i * (408 / (n - 1)) for i in range(n)]
    ys = [230, 150, 236, 120, 170, 210][:n]
    svg = '<svg width="440" height="300" viewBox="0 0 440 300">'
    for i in range(n - 1):
        c = F["fg"] if i < cur else F["border"]
        svg += f'<line x1="{xs[i]}" y1="{ys[i]}" x2="{xs[i+1]}" y2="{ys[i+1]}" stroke="{c}" stroke-width="2.5" stroke-linecap="round"/>'
    for i in range(n):
        x, y = xs[i], ys[i]
        if i < cur:
            svg += f'<circle cx="{x}" cy="{y}" r="13" fill="{F["fg"]}"/><path d="M{x-5} {y}l3.5 3.5 6.5-7" stroke="{F["surface"]}" stroke-width="2" fill="none" stroke-linecap="round"/>'
        elif i == cur:
            svg += f'<circle cx="{x}" cy="{y}" r="17" fill="var(--accent-subtle)"/><circle cx="{x}" cy="{y}" r="9" fill="var(--accent)"/>'
        else:
            svg += f'<circle cx="{x}" cy="{y}" r="11" fill="{F["surface"]}" stroke="{F["border"]}" stroke-width="2"/>'
    svg += "</svg>"
    lx, ly = xs[cur], ys[cur] + 30
    return f'<div class="route">{svg}<div class="rlabel" style="left:{lx}px;top:{ly}px"><span>{e(p.get("label_top",""))}</span>{e(p.get("label",""))}</div></div>'

def fan(p, out=False):
    items, hi = p["items"], p.get("highlight", 0)
    n = len(items); H = 86 * n; node_y = H / 2
    svg = f'<svg class="links" width="460" height="{H}">'
    for i in range(n):
        y = 86 * i + 36; c = "var(--accent)" if i == hi else F["border"]; w = 2 if i == hi else 1.5
        if out:
            svg += f'<path d="M58 {node_y} C 130 {node_y} 140 {y} 210 {y}" stroke="{c}" stroke-width="{w}" fill="none"/>'
        else:
            svg += f'<path d="M250 {y} C 320 {y} 330 {node_y} 400 {node_y}" stroke="{c}" stroke-width="{w}" fill="none"/>'
    svg += "</svg>"
    chips = "".join(f'<div class="chip {"hi" if i==hi else ""}" style="top:{86*i+12}px;left:{210 if out else 0}px"><i></i>{e(t)}</div>' for i, t in enumerate(items))
    node = f'<div class="dec" style="top:{node_y-28}px;left:{0 if out else 402}px">{"<i class=sq></i>" if out else CHECK}</div>'
    body = f'<div class="fan" style="height:{H}px">{svg}{chips}{node}</div>'
    return body + (tag(p["tag"]) if p.get("tag") else "")

def p_pipeline(p):
    return f'''<div class="box pipe"><div class="lbl">{e(p.get("title",""))}</div>
<div class="prow"><svg width="28" height="34" viewBox="0 0 48 80" style="flex:none;overflow:visible"><path d="M0 40h8l4-16 6 34 6-44 6 50 6-34 4 10h8" style="stroke:var(--accent)" stroke-width="4" fill="none" stroke-linejoin="round"/></svg>
<span class="ar">→</span><span class="pn">{e(p["input"])}</span><span class="ar">→</span>
<span class="pn core" id="core">{e(p["core"])}<small>{e(p.get("core_sub",""))}</small></span><span class="ar">→</span><span class="pn" id="act">{e(p["action"])}</span></div>
<div class="pret"><span class="pn" id="reply">{e(p["reply"])}</span></div>
<div class="cap">{e(p.get("caption",""))}</div></div>'''

def p_trace(p):
    return f'''<div class="box trace"><div class="thead"><span class="lbl">{e(p.get("title",""))}</span><span class="chip2">{e(p.get("chip",""))}</span></div>
<div class="ts"><i class="tn"></i><div class="msg user"><small>USER</small>{e(p["user"])}</div></div>
<div class="ts"><i class="tn acc"></i><div class="msg tool"><small>TOOL CALL</small><code><b>{e(p["call"].split("(")[0])}</b>({e("(".join(p["call"].split("(")[1:]))}</code><code class="res">{e(p.get("result",""))}</code></div></div>
<div class="ts last"><i class="tn"></i><div class="msg agent"><small>AGENT</small>{e(p["agent"])}</div></div></div>''' + (tag(p["tag"]) if p.get("tag") else "")

def p_terminal(p):
    lines = "".join(f'<div class="{"cm" if l.startswith("#") else ""}">{("<b>$</b>" + e(l[1:])) if l.startswith("$") else e(l)}</div>' for l in p["lines"])
    return f'<div class="term"><div class="bar"><b></b><b></b><b></b><span>{e(p.get("title",""))}</span></div><div class="tl">{lines}</div></div>' + (tag(p["tag"]) if p.get("tag") else "")

def p_scorecard(p):
    # Rebuilt to the Rasa Brand 2026 visual layer: a product-window style result list.
    # Labels are uppercase Sans (Mono only for code-like names such as models), counts are
    # Sans Medium, and the finding is a notice: tinted fill + 8px accent dot, no edge stripe.
    hi = p.get("highlight", -1)
    rows = ""
    for i, (m, ok, tot) in enumerate(p["rows"]):
        pct = 100 * ok / tot
        rows += f'<div class="sr{" hi" if i==hi else ""}"><span class="mchip">{e(m)}</span><span class="bar2"><i style="width:{pct}%"></i><s style="width:{100-pct}%"></s></span><span class="sc">{ok}/{tot}</span></div>'
    return f'<div class="box score"><div class="shead"><span>{e(p.get("title",""))}</span><span>PASSED</span></div><div class="srows">{rows}</div><div class="finding"><span class="ftitle">FINDING</span><span class="fbody">{e(p.get("finding",""))}</span></div></div>'

def p_matrix(p):
    hi = p.get("highlight", -1)
    head = '<span></span>' + "".join(f'<span><em class="{"hi" if i==hi else ""}">{e(c)}</em></span>' for i, c in enumerate(p["columns"]))
    rows = ""
    for r, cells in enumerate(p["rows"]):
        cs = "".join(f'<span>{ {"p": f"<i class=ok>{CHECK}</i>", "f": f"<i class=bad>{CROSS}</i>"}.get(c, "<i class=nr></i>") }</span>' for c in cells)
        rows += f'<div class="mr"><span class="mut">case {r+1:02d}</span>{cs}</div>'
    cols = len(p["columns"])
    return f'<div class="box matrix" style="--cols:{cols}"><div class="mr mh">{head}</div>{rows}</div>' + (tag(p["tag"], "fail") if p.get("tag") else "")

def p_metric(p):
    vals, hi = p["values"], p.get("highlight", 0)
    mx = max(vals); bars = ""
    for i, v in enumerate(vals):
        h = 170 * v / mx
        lab = f'<b class="dot"></b><span class="vl">{e(p.get("value_label",""))}</span>' if i == hi else ""
        bars += f'<div class="mb {"hi" if i==hi else ""}" style="height:{h}px">{lab}</div>'
    return f'<div class="box metric"><div class="thead"><span class="lbl">{e(p.get("title",""))}</span><span class="lbl">{e(p.get("unit",""))}</span></div><div class="bars">{bars}</div><div class="cap">{e(p.get("caption",""))}</div></div>'

def p_chat(p):
    return f'''<div class="box chat"><div class="cm u"><span>{e(p["user"])}</span><i class="av"><b></b><s></s></i></div>
<div class="cm a"><i class="wv"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h1M5 5v6M8 3v10M11 5v6M14 8h0" stroke="{F["surface"]}" stroke-width="1.8" stroke-linecap="round"/></svg></i><span>{e(p["agent"])}</span></div>
<div class="inp"><span>Type a message…</span><i class="mic"></i><i class="send">↑</i></div></div>'''

def p_schedule(p):
    hi = p.get("highlight", 0)
    rows = "".join(f'<div class="sh {"hi" if i==hi else ""}"><span>{e(a)}</span><span class="m">{e(b)}</span></div>' for i, (a, b) in enumerate(p["rows"]))
    return f'<div class="box sched"><div class="thead"><span class="lbl">{e(p.get("left",""))}</span><span class="lbl">{e(p.get("right",""))}</span></div>{rows}</div>'

def p_said(p):
    return f'''<div class="said"><svg class="links" width="460" height="300"><path d="M78 150 C 110 150 110 60 150 60" stroke="var(--accent)" stroke-width="1.5" fill="none"/><path d="M78 150 C 110 150 110 236 150 236" stroke="var(--accent)" stroke-width="1.5" fill="none"/></svg>
<div class="agent-node"><i></i></div>
<div class="sd s1"><small>SAID</small><div class="b light">{e(p["said"])}</div>{tag(p.get("said_tag","reply test passes"))}</div>
<div class="sd s2"><small>DID</small><div class="b dark"><b>$</b> {e(p["did"])}</div>{tag(p.get("did_tag","command test fails"),"fail")}</div></div>'''

def p_timeline(p):
    return f'''<div class="tline"><small class="ln">{e(p.get("top_label","AGENT"))}</small>
<div class="tbar"><span class="played">{e(p["top_played"])}</span><span class="cut">{e(p["top_cut"])}</span></div>
<div class="ctag">{tag(p.get("cut_tag",""),"fail")}</div>
<small class="ln">{e(p.get("bottom_label","CALLER"))}</small>
<div class="bb"><span>{e(p["bottom_text"])}</span></div><div class="ctag">{tag(p.get("bottom_tag",""))}</div>
<div class="axis"><span>TIME →</span></div><i class="cutline"></i></div>'''

def p_geometric(p, tiles=False):
    il = lambda k: f'var(--illo-{k})'
    if tiles:
        spec = [("light","arch","neutral"),("tint","lines","pop_1"),("light","ring","pop_2"),("tint","dot","pop_1"),("pop_2","dot","light"),("light","half","neutral"),("light","ring2","neutral"),("tint","arch","light"),("neutral","dot","light")]
        cells = ""
        for bg, sh, fc in spec:
            c = il(fc)
            shape = {"arch": f'<path d="M16 112 A48 48 0 0 1 112 112 Z" fill="{c}"/>', "half": f'<path d="M16 16 A48 48 0 0 0 112 16 Z" fill="{c}"/>',
                     "dot": f'<circle cx="64" cy="64" r="22" fill="{c}"/>', "lines": "".join(f'<rect x="{46+k*16}" y="32" width="6" height="64" rx="3" fill="{c}"/>' for k in range(3)),
                     "ring": f'<path d="M0 40 A88 88 0 0 1 88 128" stroke="{c}" stroke-width="11" fill="none"/>', "ring2": f'<path d="M128 88 A88 88 0 0 1 40 0" stroke="{c}" stroke-width="11" fill="none"/>'}[sh]
            cells += f'<svg width="128" height="128" style="background:{il(bg)};border-radius:20px">{shape}</svg>'
        return f'<div class="grid">{cells}</div>'
    order = ["neutral","tint","pop_1","light","pop_2","neutral","pop_3","neutral","pop_4"]
    shapes = ["c","qtl","sq","qbr","c","half","sq","qtl","c"]
    cells = ""
    for k, s in zip(order, shapes):
        st = {"c": "border-radius:50%", "sq": "border-radius:20px", "qtl": "border-top-left-radius:128px", "qbr": "border-bottom-right-radius:128px", "half": "border-radius:0 0 64px 64px;height:64px;align-self:start"}[s]
        cells += f'<div style="width:128px;height:128px;background:{il(k)};{st}"></div>'
    return f'<div class="grid">{cells}</div>'

PANELS = {"ledger": p_ledger, "log": p_log, "window": p_window, "stacked": p_stacked, "path": p_path, "route": p_route,
          "converge": lambda p: fan(p, False), "branch": lambda p: fan(p, True), "pipeline": p_pipeline, "trace": p_trace,
          "terminal": p_terminal, "scorecard": p_scorecard, "matrix": p_matrix, "metric": p_metric, "chat": p_chat,
          "schedule": p_schedule, "said_vs_did": p_said, "timeline": p_timeline,
          "geometric": lambda p: p_geometric(p), "tiles": lambda p: p_geometric(p, True)}

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:630px;overflow:hidden;font-family:'STK Bureau Sans',system-ui,sans-serif;color:%(fg)s}
.mono,.lbl,small,.tag,.mut,.who,code,.chip,.chip2,.mchip,.sc,.m,.cap,.tl,.bar span,.nm,.md,.rlabel span,.pn{font-family:'STK Bureau Sans Mono',ui-monospace,monospace}
.card{display:flex;width:1200px;height:630px}
.title{position:relative;width:640px;height:630px;background:var(--title);display:flex;flex-direction:column;justify-content:center;padding:0 48px}
.eyebrow{position:absolute;left:48px;top:48px;font-family:'STK Bureau Sans Mono',monospace;font-size:22px;letter-spacing:.08em;color:var(--eyebrow)}
h1{font-family:'STK Bureau Serif',Georgia,serif;font-weight:400;line-height:1;letter-spacing:-.02em;font-size:96px}
.dek{font-size:28px;line-height:1.3;color:%(fg_muted)s;margin-top:24px}
.logo{position:absolute;left:48px;bottom:48px;color:%(fg)s;display:flex;align-items:center;gap:24px}
.logo svg{width:84px;height:auto;flex:none}.footer{font-family:'STK Bureau Sans Mono',monospace;font-size:15px;color:%(fg_muted)s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:420px}
.panel{width:560px;height:630px;background:var(--panel);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;position:relative}
.box{width:440px;background:%(surface)s;border-radius:16px;padding:20px 24px}
.lbl,small{font-size:12px;letter-spacing:.08em;color:%(fg_muted)s;display:block}
.tag{display:inline-flex;align-items:center;gap:6px;font-size:13px;padding:5px 10px;border-radius:999px}
.tag.pass{background:%(pass_bg)s;color:%(pass)s}.tag.fail{background:%(fail_bg)s;color:%(fail)s}
.tr{display:grid;grid-template-columns:132px 112px 112px 1fr;align-items:center;padding:18px 0;border-bottom:1px solid %(border_subtle)s;font-family:'STK Bureau Sans Mono',monospace;font-size:18px}
.tr:last-child{border:0}.th{font-size:13px;color:%(fg_muted)s;letter-spacing:.08em;padding:12px 0}
.tr i{justify-self:end;display:flex}.ok{color:%(pass)s}.bad{color:%(fail)s}.badtxt{color:%(fail)s}
.log .lr{display:grid;grid-template-columns:78px 78px 1fr 20px;align-items:center;padding:15px 0;border-bottom:1px solid %(border_subtle)s;font-size:17px}
.log .lr span{font-family:'STK Bureau Sans Mono',monospace}.mut,.who{font-size:14px;color:%(fg_muted)s}
.log .lr:nth-last-child(2){border:0}.log .lr.bad{background:%(fail_bg)s;border-radius:8px;padding:15px 12px;border:0}.log .lr.bad span,.log .lr.bad i{color:%(fail)s}
.win{padding:0;overflow:hidden}.bar{display:flex;align-items:center;gap:8px;padding:14px 20px;background:%(inverted)s}
.bar b{width:8px;height:8px;border-radius:50%%;background:%(fg_inverted_subtle)s}.bar span{margin-left:8px;font-size:13px;letter-spacing:.08em;color:%(fg_inverted_subtle)s}
.wr{padding:8px 20px}.row{display:flex;align-items:center;gap:12px;padding:18px 0;border-bottom:1px solid %(border_subtle)s}
.row.hi{background:var(--accent-subtle);border-radius:8px;padding:18px 12px;border:0}.row:has(+.hi){border:0}.row:last-child{border:0}
.nm{flex:1;font-size:18px}.md{font-size:15px;color:%(fg_muted)s}.row.hi .md{color:var(--accent-fg)}
.tg{width:40px;height:24px;border-radius:12px;background:%(border_subtle)s;display:flex;align-items:center;padding:3px}.tg i{width:18px;height:18px;border-radius:50%%;background:%(surface)s}
.tg.on{background:var(--accent);justify-content:flex-end}
.stack{position:relative;width:488px;height:290px}.stack .back{position:absolute;width:440px;height:241px;border-radius:16px}
.far{left:48px;top:0;background:var(--stack-far)}.near{left:24px;top:24px;background:var(--stack-near)}.front{position:absolute;left:0;top:48px}
.path{padding:24px 28px}.ps{display:flex;gap:16px}.rail{display:flex;flex-direction:column;align-items:center;width:24px}
.n{width:24px;height:24px;border-radius:50%%;display:flex;align-items:center;justify-content:center;flex:none}.n.done{background:%(fg)s;color:%(surface)s}.n.done svg{width:13px}
.n.cur{background:var(--accent)}.n.cur i{width:8px;height:8px;border-radius:50%%;background:%(surface)s}.n.nxt{border:1.5px solid %(border)s;background:%(surface)s}
.rail s{width:1.5px;height:34px;background:%(border)s}.rail s.done{background:%(fg)s}.pl{font-family:'STK Bureau Sans Mono',monospace;font-size:18px;padding-top:1px;display:flex;gap:10px;align-items:center;height:24px}
.pl.next{color:%(fg_muted)s}.pl em{font-style:normal;font-size:13px;padding:3px 8px;border-radius:6px;background:var(--accent-subtle);color:var(--accent-fg)}
.route{position:relative;width:440px;height:330px}.rlabel{position:absolute;transform:translateX(-50%%);background:%(surface)s;border:1px solid %(border_subtle)s;border-radius:10px;padding:10px 14px;font-size:16px;white-space:nowrap}
.rlabel span{display:block;font-size:11px;color:%(fg_muted)s;letter-spacing:.08em;margin-bottom:4px}
.fan{position:relative;width:460px}.links{position:absolute;left:0;top:0}
.chip{position:absolute;width:250px;height:48px;background:%(surface)s;border-radius:10px;display:flex;align-items:center;gap:12px;padding-left:16px;font-size:16px}
.chip i{width:14px;height:14px;border-radius:3px;background:var(--accent-subtle)}.chip.hi{outline:1.5px solid var(--accent);outline-offset:-1.5px}.chip.hi i{background:var(--accent)}
.dec{position:absolute;width:56px;height:56px;border-radius:14px;background:%(fg)s;color:%(surface)s;display:flex;align-items:center;justify-content:center}.dec svg{width:22px;height:22px}.sq{width:18px;height:18px;border-radius:4px;background:%(surface)s}
.pipe{width:460px}.pipe .prow{display:flex;align-items:center;gap:6px;margin:18px 0 10px}.ar{color:%(border)s}
.pn{border:1.5px solid %(border)s;border-radius:10px;padding:10px 10px;font-size:13px;background:%(surface)s;white-space:nowrap}
.pn.core{background:%(fg)s;color:%(fg_inverted)s;border-color:%(fg)s;font-family:'STK Bureau Sans',sans-serif;font-size:18px;text-align:center;padding:10px 14px}.pn.core small{color:var(--accent-on-dark);font-size:10px;margin-top:2px}
.pipe{position:relative}.pret{position:relative;height:44px;margin:26px 0 18px}.pret .pn{position:absolute;top:0}
.cap{font-size:11px;letter-spacing:.06em;color:%(fg_muted)s}
.trace{display:flex;flex-direction:column;gap:14px}.thead{display:flex;justify-content:space-between;align-items:center}
.chip2{font-size:12px;letter-spacing:.06em;background:%(info_bg)s;color:%(info)s;padding:3px 8px;border-radius:6px}
.ts{display:flex;gap:14px;position:relative}.ts:not(.last)::before{content:'';position:absolute;left:5px;top:26px;bottom:-14px;width:1.5px;background:%(border_subtle)s}
.tn{width:11px;height:11px;border-radius:50%%;border:1.5px solid %(border)s;background:%(surface)s;margin-top:14px;flex:none}.tn.acc{background:var(--accent);border-color:var(--accent)}
.msg{flex:1;border-radius:10px;padding:12px 14px;font-size:17px;line-height:1.35}.msg small{font-size:11px;margin-bottom:4px}
.user{background:%(muted)s}.agent{border:1px solid %(border_subtle)s}.tool{background:%(inverted)s;color:%(fg_inverted)s}.tool small{color:%(fg_inverted_subtle)s}
.tool code{display:block;font-size:15px}.tool code b{font-weight:400;color:var(--accent-on-dark)}.tool .res{color:%(fg_inverted_subtle)s}
.term{width:440px;background:%(inverted)s;border-radius:16px;overflow:hidden}.term .bar{border-bottom:1px solid %(border_inverted)s}
.tl{padding:22px;display:flex;flex-direction:column;gap:10px;font-size:17px;color:%(fg_inverted)s}.tl .cm{color:%(fg_inverted_subtle)s}.tl b{font-weight:400;color:var(--accent-on-dark)}
.score{display:flex;flex-direction:column;gap:16px}.shead{display:flex;justify-content:space-between;font-family:'STK Bureau Sans',sans-serif;font-weight:500;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:%(fg_muted)s}
.srows{display:flex;flex-direction:column}.sr{display:flex;align-items:center;gap:14px;padding:10px 0;border-bottom:1px solid %(border_subtle)s}.sr:last-child{border-bottom:0}
.mchip{width:96px;text-align:center;font-size:14px;padding:5px 0;border-radius:8px;background:%(muted)s;color:%(fg)s}.sr.hi .mchip{background:var(--accent-subtle);color:var(--accent-fg)}
.bar2{flex:1;height:10px;border-radius:5px;overflow:hidden;display:flex;background:%(border_subtle)s}
.bar2 i{background:%(pass)s}.bar2 s{background:%(fail)s}.sc{width:56px;text-align:right;font-family:'STK Bureau Sans',sans-serif;font-weight:500;font-size:16px;color:%(fg)s}
.finding{display:flex;flex-direction:column;gap:4px;background:%(subtle)s;border-radius:12px;padding:14px 16px}.ftitle{display:inline-flex;align-items:center;gap:8px;font-family:'STK Bureau Sans',sans-serif;font-weight:500;font-size:12px;letter-spacing:.04em;color:%(fg_muted)s}
.ftitle::before{content:"";width:8px;height:8px;border-radius:50%%;background:var(--accent);flex:none}.fbody{font-size:16px;line-height:1.35;color:%(fg)s}
.matrix{padding:16px 20px}.mr{display:grid;grid-template-columns:84px repeat(var(--cols),1fr);align-items:center;padding:9px 0;border-bottom:1px solid %(border_subtle)s;justify-items:center}
.mr>span:first-child{justify-self:start}.mr:last-child{border:0}.mh{border:0;padding-bottom:10px}.mh em{font-style:normal;font-family:'STK Bureau Sans Mono',monospace;font-size:12px;padding:4px 8px;border-radius:6px;background:%(muted)s}
.mh em.hi{background:var(--accent);color:%(fg_inverted)s}.mr i{display:flex}.mr i.ok{color:%(fg)s}.nr{width:14px;height:14px;border-radius:50%%;border:1.5px solid %(border)s}
.metric{display:flex;flex-direction:column;gap:14px}.bars{height:210px;display:flex;align-items:flex-end;gap:14px;border-bottom:1.5px solid %(fg)s}
.mb{flex:1;background:%(muted)s;border-radius:6px 6px 0 0;position:relative}.mb.hi{background:var(--accent)}
.dot{position:absolute;width:12px;height:12px;border-radius:50%%;background:%(fg)s;left:50%%;top:-22px;transform:translateX(-50%%)}.vl{position:absolute;left:100%%;top:-4px;margin-left:8px;font-family:'STK Bureau Sans Mono',monospace;font-size:15px;color:var(--accent-fg);white-space:nowrap}
.chat{width:460px;padding:24px;display:flex;flex-direction:column;gap:18px}.cm{display:flex;gap:12px;align-items:center;padding:14px 16px;border-radius:16px;font-size:17px;line-height:1.35;max-width:340px}
.cm.u{align-self:flex-end;background:%(muted)s}.cm.a{background:var(--accent-subtle)}
.av{width:30px;height:30px;border-radius:50%%;background:%(fg)s;flex:none;position:relative;overflow:hidden}.av b{position:absolute;width:10px;height:10px;border-radius:50%%;background:%(surface)s;left:10px;top:6px}.av s{position:absolute;width:19px;height:15px;border-radius:50%%;background:%(surface)s;left:5.5px;top:18px}
.wv{width:30px;height:30px;border-radius:8px;background:var(--accent);flex:none;display:flex;align-items:center;justify-content:center}
.inp{display:flex;align-items:center;gap:8px;background:%(subtle)s;border-radius:14px;padding:12px 14px;margin-top:14px;color:%(fg_muted)s;font-size:15px}.inp span{flex:1}
.mic{width:26px;height:26px;border-radius:6px;background:%(emphasized)s}.send{width:26px;height:26px;border-radius:6px;background:%(fg)s;color:%(surface)s;font-style:normal;display:flex;align-items:center;justify-content:center}
.sched{width:420px;display:flex;flex-direction:column;gap:6px}.sh{display:flex;justify-content:space-between;padding:13px 12px;border-bottom:1px solid %(border_subtle)s;font-size:17px}
.sh:last-child{border:0}.sh.hi{background:var(--accent-subtle);color:var(--accent-fg);border-radius:8px;border:0}.sh .m{font-size:17px}
.said{position:relative;width:460px;height:300px}.agent-node{position:absolute;left:22px;top:122px;width:56px;height:56px;border-radius:14px;background:var(--accent);display:flex;align-items:center;justify-content:center}
.agent-node i{width:18px;height:18px;border-radius:4px;background:%(fg)s}.sd{position:absolute;left:150px;display:flex;flex-direction:column;gap:8px;align-items:flex-start}
.s1{top:12px}.s2{top:186px}.b{padding:12px 16px;border-radius:10px;font-size:16px}.b.light{background:%(surface)s}.b.dark{background:%(fg)s;color:%(fg_inverted)s;font-family:'STK Bureau Sans Mono',monospace}.b.dark b{color:var(--accent-on-dark);font-weight:400}
.sd small{color:var(--accent-fg)}
.tline{position:relative;width:448px;display:flex;flex-direction:column;gap:12px}.tline .ln{color:var(--accent-fg)}
.tbar{display:flex;height:64px;border-radius:10px;overflow:hidden;font-size:18px}.played{background:var(--accent);color:%(fg_inverted)s;padding:0 16px;display:flex;align-items:center;width:194px}
.cut{flex:1;background:%(surface)s;color:%(border)s;padding:0 8px;display:flex;align-items:center}.ctag{padding-left:206px}
.bb{padding-left:206px}.bb span{display:inline-block;background:%(fg)s;color:%(fg_inverted)s;padding:14px 18px;border-radius:10px;font-size:18px}
.axis{border-top:1px solid %(fg)s;padding-top:8px;text-align:right;font-family:'STK Bureau Sans Mono',monospace;font-size:12px;margin-top:20px}
.cutline{position:absolute;left:194px;top:24px;bottom:28px;border-left:1.5px dashed %(fg)s}
.grid{display:grid;grid-template-columns:repeat(3,128px);gap:12px}
.show{width:1200px;height:400px;background:var(--panel);padding:48px 56px;display:flex;flex-direction:column;justify-content:space-between;font-family:'STK Bureau Sans Mono',monospace}
.show .top{display:flex;justify-content:space-between;font-size:22px;letter-spacing:.08em;color:var(--on-panel)}.show .flow{display:flex;align-items:center;gap:20px}
.show .st{flex:1;text-align:center;padding:28px 20px;border-radius:16px;background:%(surface)s;font-size:28px}.show .st.core{outline:2px solid var(--accent);outline-offset:-2px}
.show .ar{font-size:28px;color:var(--on-panel-muted)}.show .cap{font-size:18px;color:var(--on-panel-muted);letter-spacing:0}
""" % F

def mode_vars(m):
    t = TOK["modes"][m]
    v = {"title": t["title_bg"], "panel": t["panel"], "eyebrow": t["eyebrow"], "accent": t["accent"], "accent-subtle": t["accent_subtle"],
         "accent-fg": t["accent_fg"], "accent-on-dark": t["accent_on_dark"], "stack-near": t["stack_near"], "stack-far": t["stack_far"],
         "on-panel": t["on_panel"], "on-panel-muted": t["on_panel_muted"]}
    v.update({f"illo-{k}": c for k, c in t["illo"].items()})
    return ";".join(f"--{k}:{c}" for k, c in v.items())

FIT = """() => {
 const pipe=document.querySelector('.pipe');
 if(pipe){const R=el=>el.getBoundingClientRect(), b=R(pipe), core=R(pipe.querySelector('#core')), act=R(pipe.querySelector('#act')), rep=pipe.querySelector('#reply');
  rep.style.left=(core.left+core.width/2-b.left-rep.offsetWidth/2)+'px'; const r=R(rep);
  const x=act.left+act.width/2-b.left, y0=act.bottom-b.top+3, y=r.top+r.height/2-b.top, x1=r.right-b.left+3;
  const ns='http://www.w3.org/2000/svg', svg=document.createElementNS(ns,'svg'); svg.setAttribute('width',b.width); svg.setAttribute('height',b.height);
  svg.style.cssText='position:absolute;left:0;top:0;overflow:visible;pointer-events:none';
  const c=getComputedStyle(document.body).getPropertyValue('--accent').trim();
  svg.innerHTML=`<path d="M${x} ${y0} V${y} H${x1+6}" stroke="${c}" stroke-width="2" fill="none" stroke-linejoin="round"/><path d="M${x1+12} ${y-5} L${x1+4} ${y} L${x1+12} ${y+5}" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  pipe.appendChild(svg);}
 const h=document.querySelector('h1'); if(!h) return 0; const want=h.dataset.size;
 const lines=()=>Math.round(h.getBoundingClientRect().height/parseFloat(getComputedStyle(h).fontSize));
 if(want==='regular'||(want==='auto'&&lines()>2)) h.style.fontSize='72px';
 return lines();}"""

def build(spec):
    m = spec.get("mode", "default-light")
    if m not in TOK["modes"]: raise SystemExit(f"unknown mode {m}")
    if spec.get("type") == "showcase":
        s = spec["steps"]
        flow = f'<span class="st">{e(s[0])}</span><span class="ar">→</span><span class="st core">{e(s[1])}</span><span class="ar">→</span><span class="st">{e(s[2])}</span>'
        body = f'<div class="show"><div class="top"><span>{e(spec["category"])}</span><span>{e(spec.get("number",""))}</span></div><div class="flow">{flow}</div><div class="cap">{e(spec.get("caption",""))}</div></div>'
        size = (1200, 400)
    else:
        p = spec["panel"]
        if p["type"] not in PANELS: raise SystemExit(f"unknown panel {p['type']}")
        dek = f'<p class="dek">{e(spec["dek"])}</p>' if spec.get("dek") else ""
        foot = f'<span class="footer">{e(spec["footer"])}</span>' if spec.get("footer") else ""
        body = f'''<div class="card"><div class="title"><div class="eyebrow">{e(spec["eyebrow"])}</div>
<div><h1 data-size="{e(spec.get("size","auto"))}">{e(spec["headline"])}</h1>{dek}</div>
<div class="logo">{LOGO}{foot}</div></div><div class="panel">{PANELS[p["type"]](p)}</div></div>'''
        size = (1200, 630)
    doc = f'<!doctype html><html><head><meta charset="utf-8"><style>{fonts_css()}{CSS}</style></head><body style="{mode_vars(m)};width:{size[0]}px;height:{size[1]}px">{body}</body></html>'
    for a, b in (("'STK Bureau Sans Mono',", "'STK Bureau Sans Mono','JetBrains Mono',"), ("'STK Bureau Sans',", "'STK Bureau Sans','Inter',"), ("'STK Bureau Serif',", "'STK Bureau Serif','Newsreader',")):
        doc = doc.replace(a, b)
    return doc, size

def render(specs, out, html_only=False):
    jobs = []
    for i, s in enumerate(specs):
        doc, size = build(s)
        if len(specs) == 1 and not out.endswith("/"): path = out
        else:
            os.makedirs(out, exist_ok=True); path = os.path.join(out, s.get("out", f"card-{i+1:02d}.png"))
        jobs.append((doc, size, path))
    if html_only:
        for doc, _, path in jobs: pathlib.Path(path).with_suffix(".html").write_text(doc)
        return
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page()
        for doc, size, path in jobs:
            pg.set_viewport_size({"width": size[0], "height": size[1]}); pg.set_content(doc); pg.wait_for_timeout(100)
            lines = pg.evaluate(FIT); pg.wait_for_timeout(50)
            if lines and int(lines) > 5: print(f"WARNING {path}: headline is {lines} lines — shorten it")
            pg.screenshot(path=path, clip={"x": 0, "y": 0, "width": size[0], "height": size[1]}); print("wrote", path)
        b.close()
    if MISSING:
        print("NOTE: STK Bureau not provisioned (" + ", ".join(MISSING) + "); rendered with the Google substitutes. See design-system/rasa-brand-2026/fonts/README.md.")

if __name__ == "__main__":
    if len(sys.argv) < 3: sys.exit(__doc__)
    data = json.loads(pathlib.Path(sys.argv[1]).read_text())
    render(data if isinstance(data, list) else [data], sys.argv[2], "--html" in sys.argv)
