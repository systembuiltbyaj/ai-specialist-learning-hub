import type { AppliedClient } from "@/app/lib/types";

// Generates a self-contained, brand-styled HTML presentation (one .html file).
// Brand: near-black bg, gold (#f6cb1f) + violet (#5e17eb/#7c5cfc), Inter, uppercase
// display headings, gold→violet gradients. Keyboard + click navigation.

function esc(s: string): string {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildPresentationHtml(client: AppliedClient): string {
  const title = esc(client.name || "Presentation");
  const sub = [client.company, client.link].filter(Boolean).map(esc).join(" · ");

  const titleSlide = `
    <section class="slide title-slide">
      <p class="eyebrow">System-BuiltBy AJ · Presentation</p>
      <h1 class="hero">${title}</h1>
      ${sub ? `<p class="sub">${sub}</p>` : ""}
      <p class="cue">Press → or click to begin</p>
    </section>`;

  const contentSlides = client.slides
    .map((s, i) => {
      const points = s.points
        .filter((p) => p.trim())
        .map((p) => `<li>${esc(p)}</li>`)
        .join("");
      return `
    <section class="slide">
      <span class="num">${String(i + 1).padStart(2, "0")}</span>
      <h2>${esc(s.title)}</h2>
      ${s.goal ? `<p class="goal">${esc(s.goal)}</p>` : ""}
      ${points ? `<ul>${points}</ul>` : ""}
      ${s.say ? `<div class="say"><span class="say-label">Say it</span><p>${esc(s.say)}</p></div>` : ""}
    </section>`;
    })
    .join("");

  const total = client.slides.length + 1;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Presentation — ${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
<style>
  :root{ --bg:#08060e; --gold:#f6cb1f; --violet:#5e17eb; --violet-soft:#7c5cfc; --violet-light:#ac4bff; --text:#f3f1fb; --muted:#9b93be; --line:#2a2250; }
  *{ box-sizing:border-box; margin:0; padding:0; }
  html,body{ height:100%; }
  body{ background:var(--bg); color:var(--text); font-family:'Inter',system-ui,sans-serif; overflow:hidden; }
  body::before{ content:""; position:fixed; inset:0; z-index:0; pointer-events:none;
    background:
      radial-gradient(75% 90% at 50% -10%, rgba(124,58,237,.28), transparent 70%),
      radial-gradient(50% 60% at 88% 12%, rgba(94,23,235,.18), transparent 60%),
      radial-gradient(45% 50% at 6% 85%, rgba(246,203,31,.06), transparent 60%); }
  .deck{ position:relative; z-index:1; height:100%; }
  .slide{ position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center;
    padding:6vh 8vw; opacity:0; transform:translateY(18px) scale(.99); transition:opacity .4s ease, transform .4s ease;
    pointer-events:none; }
  .slide.active{ opacity:1; transform:none; pointer-events:auto; }
  .eyebrow{ font-family:'Inter'; font-size:.72rem; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); margin-bottom:1.4rem; }
  .hero{ font-size:clamp(2.6rem,8vw,6rem); font-weight:900; text-transform:uppercase; letter-spacing:-.02em; line-height:1; }
  .title-slide .hero{ background:linear-gradient(100deg,var(--gold),var(--violet-light)); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .sub{ margin-top:1.2rem; color:var(--muted); font-size:1.05rem; }
  .cue{ margin-top:3rem; color:var(--muted); font-size:.8rem; letter-spacing:.1em; }
  .num{ font-size:.85rem; font-weight:800; color:var(--gold); letter-spacing:.2em; }
  h2{ font-size:clamp(1.8rem,5vw,3.4rem); font-weight:800; text-transform:uppercase; letter-spacing:-.01em; margin-top:.5rem; max-width:18ch; }
  .goal{ margin-top:.8rem; color:var(--violet-light); font-size:1rem; font-style:italic; }
  ul{ margin-top:2rem; list-style:none; display:flex; flex-direction:column; gap:1rem; max-width:60ch; }
  li{ font-size:clamp(1rem,2.2vw,1.4rem); line-height:1.5; padding-left:1.6rem; position:relative; color:rgba(243,241,251,.9); }
  li::before{ content:""; position:absolute; left:0; top:.65em; width:.55rem; height:.55rem; border-radius:50%;
    background:linear-gradient(135deg,var(--gold),var(--violet-soft)); }
  .say{ margin-top:2.2rem; max-width:62ch; border:1px solid var(--line); border-left:3px solid var(--gold);
    background:rgba(255,255,255,.03); border-radius:12px; padding:1rem 1.2rem; }
  .say-label{ font-size:.6rem; font-weight:800; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); }
  .say p{ margin-top:.4rem; font-style:italic; font-size:1.05rem; line-height:1.5; color:rgba(243,241,251,.92); }
  .hud{ position:fixed; left:8vw; right:8vw; bottom:3.2vh; z-index:2; display:flex; align-items:center; gap:1rem; }
  .bar{ flex:1; height:3px; background:rgba(255,255,255,.08); border-radius:99px; overflow:hidden; }
  .bar i{ display:block; height:100%; width:0; background:linear-gradient(90deg,var(--gold),var(--violet-soft)); transition:width .4s ease; }
  .count{ font-size:.72rem; color:var(--muted); font-variant-numeric:tabular-nums; }
  .brand{ position:fixed; left:8vw; bottom:3.2vh; transform:translateY(-1.6rem); font-size:.6rem; letter-spacing:.18em; text-transform:uppercase; color:rgba(155,147,190,.6); z-index:2; }
  .nav{ position:fixed; right:8vw; bottom:5vh; z-index:3; display:flex; gap:.5rem; }
  .nav button{ width:42px; height:42px; border-radius:50%; border:1px solid var(--line); background:rgba(255,255,255,.04); color:var(--text); font-size:1.2rem; cursor:pointer; transition:.2s; }
  .nav button:hover{ border-color:var(--violet-soft); color:#fff; }
</style>
</head>
<body>
  <div class="deck">${titleSlide}${contentSlides}</div>
  <div class="brand">System-BuiltBy AJ</div>
  <div class="hud"><div class="bar"><i id="prog"></i></div><div class="count" id="count">1 / ${total}</div></div>
  <div class="nav"><button id="prev" aria-label="Previous">‹</button><button id="next" aria-label="Next">›</button></div>
<script>
  (function(){
    var slides=[].slice.call(document.querySelectorAll('.slide'));
    var i=0, n=slides.length;
    function show(x){ i=Math.max(0,Math.min(n-1,x));
      slides.forEach(function(s,k){ s.classList.toggle('active',k===i); });
      document.getElementById('count').textContent=(i+1)+' / '+n;
      document.getElementById('prog').style.width=((i)/(n-1)*100)+'%';
    }
    function next(){ show(i+1); }
    function prev(){ show(i-1); }
    document.getElementById('next').addEventListener('click',function(e){e.stopPropagation();next();});
    document.getElementById('prev').addEventListener('click',function(e){e.stopPropagation();prev();});
    document.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();next();}
      else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();prev();}
      else if(e.key==='Home'){show(0);} else if(e.key==='End'){show(n-1);}
    });
    document.body.addEventListener('click',function(e){ if(e.target.closest('.nav'))return; next(); });
    show(0);
  })();
</script>
</body>
</html>`;
}
