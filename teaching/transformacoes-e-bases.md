---
layout: default
title: Transformações lineares e mudança de base
permalink: /teaching/transformacoes-e-bases/
---

# Transformações lineares e mudança de base

Uma transformação linear é uma aplicação entre espaços vetoriais. **A transformação não depende das bases escolhidas**; o que muda são as coordenadas dos vetores e a matriz que representa a transformação.

Neste tutorial, pode alterar as bases e observar as respetivas **grelhas**, escolher vetores e comparar a representação de uma mesma transformação em bases diferentes. Avance pelas três etapas ao seu ritmo.

<style>
/* Todos os estilos ficam dentro de #lb-tutorial, sem interferir com o tema Minimal. */
#lb-tutorial{--lb-blue:#267cb9;--lb-teal:#16877e;--lb-violet:#7c64aa;--lb-orange:#bd711d;--lb-line:#dce5ec;--lb-ink:#263746;--lb-sub:#667686;max-width:100%;color:var(--lb-ink);font-size:14px;line-height:1.55;container-type:inline-size;margin:18px 0 20px}
#lb-tutorial *{box-sizing:border-box}
#lb-tutorial [hidden]{display:none!important}
#lb-tutorial .lb-stage-nav{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin-bottom:17px}
#lb-tutorial button,#lb-tutorial input,#lb-tutorial select{font:inherit}
#lb-tutorial .lb-tab{background:#f8fafc;border:1px solid var(--lb-line);border-radius:9px;padding:10px 7px;text-align:center;color:#526777;cursor:pointer;font-size:12px;font-weight:650;line-height:1.35;min-height:45px}
#lb-tutorial .lb-tab.is-active{color:#17598b;background:#ecf5fb;border-color:#8dbbdc;box-shadow:inset 0 -3px 0 #267cb9}
#lb-tutorial .lb-tab:hover{border-color:#8dbbdc}
#lb-tutorial .lb-panel{border:1px solid var(--lb-line);border-radius:12px;background:#fff;padding:16px;margin:12px 0 16px;min-width:0}
#lb-tutorial .lb-panel h3{font-size:16px;margin:0 0 10px;color:#263746;line-height:1.35}
#lb-tutorial .lb-panel p{margin:4px 0 11px}
#lb-tutorial .lb-small{font-size:12px;color:var(--lb-sub)}
#lb-tutorial .lb-intro{background:#f3f8fc;border-left:3px solid var(--lb-blue);border-radius:4px;padding:11px 13px;margin:10px 0 17px}
#lb-tutorial .lb-grid-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}
#lb-tutorial .lb-field{min-width:0}
#lb-tutorial .lb-field label,#lb-tutorial .lb-label{display:block;font-size:12px;font-weight:700;color:#485969;margin:0 0 5px}
#lb-tutorial select,#lb-tutorial input[type=number]{width:100%;min-width:0;padding:9px;border:1px solid #c5d3df;border-radius:7px;background:#fff;color:#243443}
#lb-tutorial .lb-grid-controls select{font-size:12.5px}
#lb-tutorial .lb-inline-controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:11px 0}
#lb-tutorial .lb-check{display:inline-flex;align-items:center;gap:6px;margin:0;color:#485969;font-size:12px;cursor:pointer}
#lb-tutorial .lb-check input{margin:0;accent-color:var(--lb-blue)}
#lb-tutorial .lb-radio{display:inline-flex;gap:6px;align-items:center;font-size:12px;color:#536675;cursor:pointer}
#lb-tutorial .lb-radio input{margin:0;accent-color:var(--lb-blue)}
#lb-tutorial .lb-vector-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;margin:9px 0}
#lb-tutorial .lb-range-line{display:flex;align-items:center;gap:9px}
#lb-tutorial input[type=range]{width:100%;flex:1;min-width:0;accent-color:var(--lb-blue)}
#lb-tutorial .lb-range-line input[type=number]{width:78px;flex:none;text-align:center;font-variant-numeric:tabular-nums}
#lb-tutorial .lb-chip-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:11px}
#lb-tutorial .lb-btn{border:1px solid #cbdce8;border-radius:7px;background:#fff;padding:6px 10px;font-size:12px;color:#267cb9;cursor:pointer;line-height:1.4}
#lb-tutorial .lb-btn:hover{background:#eff7fc}
#lb-tutorial .lb-legend{display:flex;flex-wrap:wrap;gap:11px;align-items:center;font-size:12px;margin:10px 0}
#lb-tutorial .lb-key{display:inline-flex;align-items:center;gap:5px}
#lb-tutorial .lb-dot{width:11px;height:11px;border-radius:3px;display:inline-block;flex:none}
#lb-tutorial .lb-plots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:12px 0}
#lb-tutorial .lb-plots.single{grid-template-columns:minmax(0,1fr);max-width:540px;margin-left:auto;margin-right:auto}
#lb-tutorial .lb-plot-card{border:1px solid #e1e9ef;border-radius:10px;padding:10px;background:#fcfdff;min-width:0}
#lb-tutorial .lb-plot-name{font-size:12px;font-weight:700;color:#3b4d5a;margin:0 0 8px}
#lb-tutorial .lb-svg{display:block;width:100%;height:auto;aspect-ratio:1/1;background:#fbfcff;border:1px solid #e4ecf2;border-radius:7px}
#lb-tutorial .lb-result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:12px}
#lb-tutorial .lb-result{background:#f7f9fc;border:1px solid #e3e9ef;border-radius:8px;padding:9px 11px;min-width:0}
#lb-tutorial .lb-result .lb-caption{font-size:11px;color:#687988;font-weight:650;margin-bottom:4px}
#lb-tutorial .lb-result .lb-number{font-size:17px;font-weight:700;overflow-wrap:anywhere;font-variant-numeric:tabular-nums}
#lb-tutorial .lb-blue{color:var(--lb-blue)}#lb-tutorial .lb-orange{color:var(--lb-orange)}
#lb-tutorial .lb-explain{background:#f1f8f7;border-left:3px solid var(--lb-teal);padding:10px 12px;margin:12px 0;border-radius:4px;font-size:12.5px}
#lb-tutorial .lb-matrix-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#lb-tutorial .lb-mat-card{background:#fafcff;border:1px solid #e3e9ef;padding:11px;border-radius:9px;min-width:0}
#lb-tutorial .lb-mat-label{font-size:12px;font-weight:700;margin-bottom:9px}
#lb-tutorial .lb-mat-holder{display:flex;justify-content:center;min-height:74px;align-items:center;overflow-x:auto}
#lb-tutorial .lb-matrix{display:inline-grid;grid-template-columns:repeat(var(--lb-cols),minmax(25px,auto));gap:6px 12px;padding:7px 10px;border-left:2px solid #637888;border-right:2px solid #637888;border-radius:2px;font-size:16px;line-height:1.3;white-space:nowrap;font-variant-numeric:tabular-nums}
#lb-tutorial .lb-matrix span{text-align:right}
#lb-tutorial .lb-basis-images{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:11px 0}
#lb-tutorial .lb-basis-card{background:#f7f9fc;border-radius:8px;border:1px solid #e2e8ef;padding:10px;font-size:12.5px}
#lb-tutorial .lb-questions details{border:1px solid #e1e8ee;border-radius:8px;margin:8px 0;padding:10px 12px;background:#fafcfe}
#lb-tutorial .lb-questions summary{font-weight:650;color:#267cb9;cursor:pointer;font-size:12.5px}
#lb-tutorial .lb-questions p{font-size:12.5px;margin:8px 0 0}
#lb-tutorial .lb-section-title{font-size:18px;color:#263746;line-height:1.3;font-weight:750;margin:12px 0 7px}
#lb-tutorial .lb-bottom{border-top:1px solid var(--lb-line);margin-top:22px;padding-top:12px;font-size:13px}
#lb-tutorial .lb-bottom a{color:#267cb9}
#lb-tutorial button:focus-visible,#lb-tutorial input:focus-visible,#lb-tutorial select:focus-visible{outline:2px solid var(--lb-blue);outline-offset:2px}
@container (max-width:580px){#lb-tutorial .lb-plots{grid-template-columns:1fr}#lb-tutorial .lb-result-grid,#lb-tutorial .lb-matrix-row{grid-template-columns:1fr}}
@container (max-width:430px){#lb-tutorial .lb-grid-controls,#lb-tutorial .lb-vector-controls{grid-template-columns:1fr}#lb-tutorial .lb-basis-images{grid-template-columns:1fr}#lb-tutorial .lb-panel{padding:12px}#lb-tutorial .lb-tab{font-size:11px;padding:8px 4px}}
@media(max-width:650px){#lb-tutorial .lb-plots{grid-template-columns:1fr}#lb-tutorial .lb-grid-controls{grid-template-columns:1fr}}
</style>

<div id="lb-tutorial">
  <div class="lb-stage-nav" role="group" aria-label="Etapas do tutorial">
    <button class="lb-tab is-active" type="button" data-lb-stage="1" aria-pressed="true">1 · Coordenadas e bases</button>
    <button class="lb-tab" type="button" data-lb-stage="2" aria-pressed="false">2 · Transformações</button>
    <button class="lb-tab" type="button" data-lb-stage="3" aria-pressed="false">3 · Matrizes</button>
  </div>

  <div id="lb-stage-intro" class="lb-intro">Comece por alterar a base do plano: <strong>o vetor permanece no mesmo lugar</strong>, mas a grelha e as suas coordenadas mudam.</div>

  <div class="lb-panel" id="lb-common-controls">
    <h3>Escolher a base e o vetor</h3>
    <div class="lb-grid-controls">
      <div class="lb-field"><label for="lb-base-b">Base B do domínio, ℝ²</label><select id="lb-base-b"></select></div>
      <div class="lb-field" id="lb-c-inputmode"><span class="lb-label">Coordenadas introduzidas relativamente a</span>
        <div class="lb-inline-controls" style="margin:7px 0 0">
          <label class="lb-radio"><input type="radio" name="lb-input-basis" value="canonical" checked> Base canónica</label>
          <label class="lb-radio"><input type="radio" name="lb-input-basis" value="B"> Base B</label>
        </div>
      </div>
    </div>
    <div class="lb-vector-controls">
      <div class="lb-field"><label for="lb-v1">Primeira coordenada <span id="lb-coord-1">x</span></label><div class="lb-range-line"><input type="range" id="lb-v1r" min="-4" max="4" step="0.25" value="2"><input id="lb-v1" type="number" step="any" value="2"></div></div>
      <div class="lb-field"><label for="lb-v2">Segunda coordenada <span id="lb-coord-2">y</span></label><div class="lb-range-line"><input type="range" id="lb-v2r" min="-4" max="4" step="0.25" value="2"><input id="lb-v2" type="number" step="any" value="2"></div></div>
    </div>
    <div class="lb-chip-row" aria-label="Exemplos de vetores">
      <button type="button" class="lb-btn" data-lb-preset="1,0">(1, 0)</button>
      <button type="button" class="lb-btn" data-lb-preset="0,1">(0, 1)</button>
      <button type="button" class="lb-btn" data-lb-preset="2,2">(2, 2)</button>
      <button type="button" class="lb-btn" data-lb-preset="2,-1">(2, −1)</button>
    </div>
    <div class="lb-inline-controls">
      <label class="lb-check"><input id="lb-show-grid" type="checkbox" checked> Grelha da base escolhida</label>
      <label class="lb-check"><input id="lb-show-canonical" type="checkbox"> Sobrepor grelha canónica</label>
      <label class="lb-check"><input id="lb-show-decomp" type="checkbox" checked> Mostrar os passos nas direções da base</label>
    </div>
  </div>

  <div id="lb-stage-one">
    <div class="lb-section-title">O mesmo vetor, coordenadas diferentes</div>
    <p>As linhas da grelha são paralelas aos vetores da base escolhida. Veja como se lê a posição do vetor quando a grelha deixa de ser a habitual.</p>
    <div class="lb-plots single"><div class="lb-plot-card"><div class="lb-plot-name">Plano ℝ² com a base B</div><svg id="lb-plot-single" class="lb-svg" viewBox="0 0 360 345" role="img" aria-label="Grelha da base B e vetor no plano"></svg></div></div>
    <div class="lb-result-grid">
      <div class="lb-result"><div class="lb-caption">Vetor nas coordenadas canónicas</div><div class="lb-number lb-blue" id="lb-out-v-e1">—</div></div>
      <div class="lb-result"><div class="lb-caption">O mesmo vetor nas coordenadas da base B</div><div class="lb-number lb-blue" id="lb-out-v-b1">—</div></div>
    </div>
    <div class="lb-explain" id="lb-one-explanation" aria-live="polite"></div>
  </div>

  <div id="lb-stage-two-three" hidden>
    <div class="lb-panel">
      <h3>Escolher a transformação e a base do contradomínio</h3>
      <div class="lb-grid-controls">
        <div class="lb-field"><label for="lb-dimensions">Espaços vetoriais</label><select id="lb-dimensions"><option value="22">ℝ² → ℝ²</option><option value="23">ℝ² → ℝ³</option></select></div>
        <div class="lb-field"><label for="lb-map">Transformação linear T</label><select id="lb-map"></select></div>
        <div class="lb-field"><label for="lb-base-c">Base C do contradomínio</label><select id="lb-base-c"></select></div>
      </div>
      <div class="lb-explain" id="lb-map-description"></div>
      <div class="lb-chip-row"><button type="button" class="lb-btn" id="lb-example22">Exemplo ℝ² → ℝ²</button><button type="button" class="lb-btn" id="lb-example23">Exemplo ℝ² → ℝ³</button><button type="button" class="lb-btn" id="lb-reset">Repor escolhas iniciais</button></div>
    </div>
    <div class="lb-section-title">O vetor e a sua imagem</div>
    <p>O gráfico da esquerda representa o vetor no domínio; o da direita representa a sua imagem. Cada gráfico utiliza a <strong>grelha da respetiva base</strong>.</p>
    <div class="lb-legend"><span class="lb-key"><i class="lb-dot" style="background:#267cb9"></i> Vetor v</span><span class="lb-key"><i class="lb-dot" style="background:#bd711d"></i> Imagem T(v)</span><span class="lb-key"><i class="lb-dot" style="background:#16877e"></i> Vetor da base 1</span><span class="lb-key"><i class="lb-dot" style="background:#7c64aa"></i> Vetor da base 2</span></div>
    <div class="lb-plots">
      <div class="lb-plot-card"><div class="lb-plot-name">Domínio ℝ² · base B</div><svg id="lb-plot-domain" class="lb-svg" viewBox="0 0 360 345" role="img" aria-label="Grelha do domínio e vetor original"></svg></div>
      <div class="lb-plot-card"><div class="lb-plot-name" id="lb-codomain-title">Contradomínio ℝ² · base C</div><svg id="lb-plot-codomain" class="lb-svg" viewBox="0 0 360 345" role="img" aria-label="Grelha do contradomínio e imagem do vetor"></svg>
      <div class="lb-inline-controls" id="lb-3dview" hidden><label class="lb-small" for="lb-angle">Rodar vista 3D</label><input type="range" id="lb-angle" min="-65" max="65" step="5" value="20"/><span id="lb-angle-text" class="lb-small">20°</span></div>
      </div>
    </div>
    <p class="lb-small" id="lb-3d-note" hidden>O gráfico de ℝ³ é uma projeção do espaço num plano: as distâncias e os ângulos aparentes dependem da perspetiva.</p>
    <div class="lb-result-grid">
      <div class="lb-result"><div class="lb-caption">Coordenadas de v na base B</div><div class="lb-number lb-blue" id="lb-out-v-b">—</div></div>
      <div class="lb-result"><div class="lb-caption">Coordenadas de T(v) na base C</div><div class="lb-number lb-orange" id="lb-out-w-c">—</div></div>
      <div class="lb-result"><div class="lb-caption">v em coordenadas canónicas</div><div class="lb-number lb-blue" id="lb-out-v-e">—</div></div>
      <div class="lb-result"><div class="lb-caption">T(v) em coordenadas canónicas</div><div class="lb-number lb-orange" id="lb-out-w-e">—</div></div>
    </div>
    <div class="lb-explain" id="lb-behaviour" aria-live="polite"></div>
  </div>

  <div id="lb-stage-three" hidden>
    <div class="lb-section-title">A matriz da transformação depende das bases</div>
    <p>A matriz tem <strong>duas colunas</strong>, uma por cada vetor da base B. Cada coluna contém as coordenadas da imagem desse vetor na base C. No gráfico do contradomínio, as imagens T(b₁) e T(b₂) aparecem a laranja-claro.</p>
    <div class="lb-matrix-row">
      <div class="lb-mat-card"><div class="lb-mat-label">Matriz nas bases canónicas</div><div id="lb-matrix-standard" class="lb-mat-holder"></div></div>
      <div class="lb-mat-card"><div class="lb-mat-label">Matriz nas bases B e C</div><div id="lb-matrix-chosen" class="lb-mat-holder"></div></div>
    </div>
    <div class="lb-chip-row"><button class="lb-btn" id="lb-toggle-work" type="button" aria-expanded="false" aria-controls="lb-work">Mostrar como se obtêm as colunas</button></div>
    <div class="lb-panel" id="lb-work" hidden>
      <h3>As imagens dos vetores da base</h3>
      <div class="lb-basis-images">
        <div class="lb-basis-card"><strong>Primeira coluna</strong><p id="lb-work-1"></p></div>
        <div class="lb-basis-card"><strong>Segunda coluna</strong><p id="lb-work-2"></p></div>
      </div>
      <p class="lb-small">Estas duas colunas constituem a matriz da transformação relativa às bases B e C.</p>
    </div>
  </div>

  <div class="lb-section-title">Para pensar</div>
  <div class="lb-questions">
    <details><summary>Se a base mudar, o vetor também muda?</summary><p>Não, se mantivermos o vetor em coordenadas canónicas. Mudam a grelha e as coordenadas na base escolhida. Se mantivermos os mesmos coeficientes relativos à nova base, estaremos então a escolher outro vetor.</p></details>
    <details><summary>O que acontece se mudar apenas a base do contradomínio?</summary><p>A imagem geométrica T(v) mantém-se. Mudam as coordenadas dessa imagem e, em geral, a matriz que representa a transformação.</p></details>
    <details><summary>Por que razão a matriz de ℝ² para ℝ³ tem três linhas e duas colunas?</summary><p>Há uma coluna por cada um dos dois vetores da base do domínio. Como cada imagem tem três coordenadas no contradomínio, cada coluna tem três entradas.</p></details>
  </div>
  <div class="lb-bottom"><a href="{{ '/teaching/' | relative_url }}">← Voltar à página de Ensino</a></div>
</div>

<script>
(function(){
  'use strict';
  const root=document.getElementById('lb-tutorial');if(!root)return;
  const $=id=>root.querySelector('#'+id);
  const colors={blue:'#267cb9',orange:'#bd711d',green:'#16877e',purple:'#7c64aa',axis:'#8799a7',gray:'#e2e8ed',basis:'#95caca',canonical:'#d8dde2'};
  const E2=[[1,0],[0,1]], E3=[[1,0,0],[0,1,0],[0,0,1]];
  const b2=[
    {id:'e',name:'Canónica: (1,0), (0,1)',M:E2},
    {id:'a',name:'Oblíqua: (1,0), (1,1)',M:[[1,1],[0,1]]},
    {id:'b',name:'Oblíqua: (1,1), (0,1)',M:[[1,0],[1,1]]},
    {id:'c',name:'Rodada: (0,1), (−1,0)',M:[[0,-1],[1,0]]},
    {id:'d',name:'Oblíqua: (2,1), (1,1)',M:[[2,1],[1,1]]},
    {id:'f',name:'Alongada: (2,0), (0,1)',M:[[2,0],[0,1]]}
  ];
  const b3=[
    {id:'e',name:'Canónica: e₁, e₂, e₃',M:E3},
    {id:'a',name:'Oblíqua: (1,0,0), (1,1,0), (0,0,1)',M:[[1,1,0],[0,1,0],[0,0,1]]},
    {id:'b',name:'Oblíqua: (1,0,1), (0,1,1), (0,0,1)',M:[[1,0,0],[0,1,0],[1,1,1]]},
    {id:'c',name:'Permutada: e₂, e₃, e₁',M:[[0,0,1],[1,0,0],[0,1,0]]},
    {id:'d',name:'Oblíqua geral: (1,0,0), (1,1,0), (0,1,1)',M:[[1,1,0],[0,1,1],[0,0,1]]}
  ];
  const transformations={
    '22':[
      {id:'shear',name:'Cisalhamento: T(x,y)=(x+y,y)',A:[[1,1],[0,1]]},
      {id:'rotate',name:'Rotação 90°: T(x,y)=(−y,x)',A:[[0,-1],[1,0]]},
      {id:'proj',name:'Projeção: T(x,y)=(x,0)',A:[[1,0],[0,0]]},
      {id:'scale',name:'Escala: T(x,y)=(2x,y/2)',A:[[2,0],[0,.5]]},
      {id:'reflect',name:'Reflexão: T(x,y)=(x,−y)',A:[[1,0],[0,-1]]},
      {id:'identity',name:'Identidade: T(x,y)=(x,y)',A:E2}
    ],
    '23':[
      {id:'lift',name:'Plano inclinado: T(x,y)=(x,y,x+y)',A:[[1,0],[0,1],[1,1]]},
      {id:'include',name:'Inclusão: T(x,y)=(x,y,0)',A:[[1,0],[0,1],[0,0]]},
      {id:'mix',name:'Combinação: T(x,y)=(x+y,x−y,2x)',A:[[1,1],[1,-1],[2,0]]},
      {id:'line',name:'Imagem numa reta: T(x,y)=(x+y,2x+2y,−x−y)',A:[[1,1],[2,2],[-1,-1]]}
    ]
  };
  let stage=1,dimensions='22',inputBasis='canonical';
  const fmt=x=>{if(Math.abs(x)<1e-9)x=0;return Math.abs(x-Math.round(x))<1e-8?String(Math.round(x)):Number(x.toFixed(3)).toString().replace('.',',');};
  const vec=v=>'('+v.map(fmt).join(', ')+')';
  const mv=(M,v)=>M.map(row=>row.reduce((s,x,i)=>s+x*v[i],0));
  const col=(M,i)=>M.map(r=>r[i]);
  const inverse=M=>{
    const n=M.length,t=M.map((row,i)=>[...row,...Array.from({length:n},(_,j)=>Number(i===j))]);
    for(let j=0;j<n;j++){
      let k=j;for(let i=j+1;i<n;i++)if(Math.abs(t[i][j])>Math.abs(t[k][j]))k=i;
      if(Math.abs(t[k][j])<1e-10)throw Error('Base singular');
      [t[k],t[j]]=[t[j],t[k]];const q=t[j][j];for(let z=0;z<n*2;z++)t[j][z]/=q;
      for(let i=0;i<n;i++)if(i!==j){const m=t[i][j];for(let z=0;z<n*2;z++)t[i][z]-=m*t[j][z];}
    }
    return t.map(r=>r.slice(n));
  };
  const cols=M=>M[0].map((_,j)=>col(M,j));
  const getB=()=>b2.find(b=>b.id===$('lb-base-b').value).M;
  const getC=()=>(dimensions==='22'?b2:b3).find(b=>b.id===$('lb-base-c').value).M;
  const getT=()=>transformations[dimensions].find(t=>t.id===$('lb-map').value).A;
  function options(id,arr,current){const n=$(id);n.replaceChildren();arr.forEach(item=>{const o=document.createElement('option');o.value=item.id;o.textContent=item.name;n.appendChild(o);});if(current)n.value=current;}
  function readCoords(){return [1,2].map(i=>{const x=Number($('lb-v'+i).value);return Number.isFinite(x)?x:0;});}
  function writeCoords(v){v.forEach((x,j)=>{const i=j+1;$('lb-v'+i).value=Number(x.toFixed(6));$('lb-v'+i+'r').value=Math.max(-4,Math.min(4,x));});}
  function getState(){const B=getB(),raw=readCoords();const v=inputBasis==='canonical'?raw:mv(B,raw),vb=inputBasis==='canonical'?mv(inverse(B),raw):raw;
    const C=getC(),A=getT(),w=mv(A,v),wc=mv(inverse(C),w),bvec=cols(B),images=bvec.map(b=>mv(A,b));
    return {B,C,A,v,vb,w,wc,bvec,images};
  }
  function line(a,b,color,width=1,dash=''){return `<line x1="${a[0].toFixed(2)}" y1="${a[1].toFixed(2)}" x2="${b[0].toFixed(2)}" y2="${b[1].toFixed(2)}" stroke="${color}" stroke-width="${width}"${dash?' stroke-dasharray="'+dash+'"':''}/>`;}
  function dot(p,color){return `<circle cx="${p[0].toFixed(2)}" cy="${p[1].toFixed(2)}" r="2.5" fill="${color}"/>`;}
  function arrow(project,v,color,label,width=3){const o=project(Array(v.length).fill(0)),p=project(v),dx=p[0]-o[0],dy=p[1]-o[1],d=Math.hypot(dx,dy);
    if(d<1)return dot(o,color)+`<text x="${o[0]+7}" y="${o[1]-8}" fill="${color}" font-size="12">${label}=0</text>`;
    const ux=dx/d,uy=dy/d,px=-uy,py=ux;
    const t1=[p[0]-8*ux+4*px,p[1]-8*uy+4*py],t2=[p[0]-8*ux-4*px,p[1]-8*uy-4*py];
    let tx=Math.max(8,Math.min(328,p[0]+8)),ty=Math.max(15,Math.min(332,p[1]-7));
    return line(o,p,color,width)+`<polygon points="${p.join(',')} ${t1.join(',')} ${t2.join(',')}" fill="${color}"/>`+`<text x="${tx}" y="${ty}" fill="${color}" font-size="12" font-weight="650">${label}</text>`;
  }
  function planeGrid(project,basis,color,opacity,limit=5){
    const [u,v]=basis,add=(a,b)=>a.map((x,j)=>x+b[j]),mul=(a,k)=>a.map(x=>x*k);
    let out=`<g opacity="${opacity}">`;
    for(let k=-limit;k<=limit;k++){
      out+=line(project(add(mul(u,k),mul(v,-limit))),project(add(mul(u,k),mul(v,limit))),color,.95);
      out+=line(project(add(mul(v,k),mul(u,-limit))),project(add(mul(v,k),mul(u,limit))),color,.95);
    }
    return out+'</g>';
  }
  function coordsPath(project,vs,coordinates,color){
    let p=Array(vs[0].length).fill(0),out='<g opacity=".75">';
    coordinates.forEach((k,j)=>{const q=p.map((x,i)=>x+k*vs[j][i]);out+=line(project(p),project(q),color,2,'5 5');p=q;});
    return out+'</g>';
  }
  function plot2(v,basis,bcoords,showVectorColor,label,extras=[]){
    const bb=cols(basis),pts=[v,...bb,...bb.map(x=>x.map(y=>y*2)),...extras];
    const max=Math.max(3.5,...pts.map(p=>Math.max(...p.map(Math.abs))));const S=142/(max*1.16);
    const project=p=>[180+S*p[0],172-S*p[1]],lim=174/S;
    let html='<rect x="0" y="0" width="360" height="345" fill="#fbfcff"/>';
    if($('lb-show-canonical').checked)html+=planeGrid(project,cols(E2),colors.canonical,.95,Math.ceil(lim));
    if($('lb-show-grid').checked)html+=planeGrid(project,bb,colors.basis,.68,Math.ceil(lim/(Math.min(...bb.map(b=>Math.hypot(...b)))||1))+2);
    html+=line(project([-lim,0]),project([lim,0]),colors.axis,1.3)+line(project([0,-lim]),project([0,lim]),colors.axis,1.3);
    if($('lb-show-decomp').checked)html+=coordsPath(project,bb,bcoords,showVectorColor);
    html+=arrow(project,bb[0],colors.green,'b₁',2.5)+arrow(project,bb[1],colors.purple,'b₂',2.5);
    if(extras.length) extras.forEach((w,i)=>{html+=`<g opacity="0.62">${arrow(project,w,'#b99566',i===0?'T(b₁)':'T(b₂)',1.9)}</g>`;});
    html+=arrow(project,v,showVectorColor,label,3.6)+dot(project([0,0]),colors.axis);
    return html;
  }
  function plot3(v,basis,bcoords,angle,extras=[]){
    const bb=cols(basis),r=angle*Math.PI/180;
    const raw=p=>{const X=Math.cos(r)*p[0]-Math.sin(r)*p[1],Y=Math.sin(r)*p[0]+Math.cos(r)*p[1];return [1.0*X-.65*Y,.28*X+.47*Y-1.05*p[2]];};
    const pts=[v,...bb,...bb.map(b=>b.map(t=>t*2)),...extras].map(raw);
    const max=Math.max(3.3,...pts.map(p=>Math.max(...p.map(Math.abs))));const S=142/(max*1.2),project=p=>{const q=raw(p);return [180+q[0]*S,172+q[1]*S];};
    let html='<rect x="0" y="0" width="360" height="345" fill="#fbfcff"/>';
    // Três planos de grelha, para sugerir as três direções independentes.
    function lattice(vectors,color,opacity){let s=`<g opacity="${opacity}">`;
      for(const [i,j] of [[0,1],[0,2],[1,2]]){
        const u=vectors[i],w=vectors[j],add=(a,b)=>a.map((t,k)=>t+b[k]),mul=(a,t)=>a.map(z=>z*t);
        for(let k=-3;k<=3;k++){
          s+=line(project(add(mul(u,k),mul(w,-3))),project(add(mul(u,k),mul(w,3))),color,.8);
          s+=line(project(add(mul(w,k),mul(u,-3))),project(add(mul(w,k),mul(u,3))),color,.8);
        }
      }
      return s+'</g>';
    }
    if($('lb-show-canonical').checked)html+=lattice(cols(E3),colors.canonical,.6);
    if($('lb-show-grid').checked)html+=lattice(bb,colors.basis,.6);
    const ax=cols(E3);ax.forEach((b,j)=>{html+=line(project([0,0,0]),project(b.map(k=>k*3)),colors.axis,1.0);const q=project(b.map(k=>k*3));html+=`<text x="${q[0]+3}" y="${q[1]-3}" font-size="11" fill="${colors.axis}">${['x','y','z'][j]}</text>`;});
    if($('lb-show-decomp').checked)html+=coordsPath(project,bb,bcoords,colors.orange);
    bb.forEach((b,j)=>{html+=arrow(project,b,[colors.green,colors.purple,'#ab8e49'][j],['c₁','c₂','c₃'][j],2.4);});
    if(extras.length)extras.forEach((w,i)=>{html+=`<g opacity="0.60">${arrow(project,w,'#b99566',i===0?'T(b₁)':'T(b₂)',1.8)}</g>`;});
    html+=arrow(project,v,colors.orange,'T(v)',3.7)+dot(project([0,0,0]),colors.axis);
    return html;
  }
  function plot2Codomain(v,basis,bcoords,extras=[]){let out=plot2(v,basis,bcoords,colors.orange,'T(v)',extras);return out.replace(/>b₁</g,'>c₁<').replace(/>b₂</g,'>c₂<');}
  function matrixView(A){return `<div class="lb-matrix" style="--lb-cols:${A[0].length}" role="img" aria-label="Matriz ${A.map(row=>row.map(fmt).join(', ')).join('; ')}">${A.flatMap(row=>row.map(x=>`<span>${fmt(x)}</span>`)).join('')}</div>`;}
  function update(){
    const st=getState(),{B,C,A,v,vb,w,wc,bvec,images}=st;
    $('lb-coord-1').textContent=inputBasis==='canonical'?'x':'α';$('lb-coord-2').textContent=inputBasis==='canonical'?'y':'β';
    $('lb-plot-single').innerHTML=plot2(v,B,vb,colors.blue,'v');
    $('lb-out-v-e1').textContent=vec(v);$('lb-out-v-b1').textContent=vec(vb);
    $('lb-one-explanation').textContent=`${vec(vb)} significa ${fmt(vb[0])} vezes o primeiro vetor da base e ${fmt(vb[1])} vezes o segundo. O vetor geométrico é ${vec(v)} nas coordenadas canónicas.`;
    $('lb-plot-domain').innerHTML=plot2(v,B,vb,colors.blue,'v');
    if(dimensions==='22')$('lb-plot-codomain').innerHTML=plot2Codomain(w,C,wc,stage===3?images:[]);
    else $('lb-plot-codomain').innerHTML=plot3(w,C,wc,Number($('lb-angle').value),stage===3?images:[]);
    $('lb-out-v-b').textContent=vec(vb);$('lb-out-v-e').textContent=vec(v);$('lb-out-w-c').textContent=vec(wc);$('lb-out-w-e').textContent=vec(w);
    $('lb-map-description').textContent=dimensions==='22'?'Neste exemplo, T envia cada vetor do plano para outro vetor do plano.':'Neste exemplo, T envia vetores de ℝ² para vetores de ℝ³.';
    $('lb-behaviour').textContent=inputBasis==='canonical'?'As coordenadas canónicas do vetor são mantidas quando altera B ou C. A grelha e as coordenadas na base escolhida podem mudar, mas o vetor e a sua imagem geométrica não.':'Está a introduzir coordenadas relativas à base B. Se mudar B sem mudar estes números, estará a escolher um novo vetor geométrico.';
    const imagesC=images.map(t=>mv(inverse(C),t));
    const M=imagesC[0].map((_,i)=>imagesC.map(c=>c[i]));
    $('lb-matrix-standard').innerHTML=matrixView(A);$('lb-matrix-chosen').innerHTML=matrixView(M);
    $('lb-work-1').textContent=`b₁ = ${vec(bvec[0])}; T(b₁) = ${vec(images[0])} nas coordenadas canónicas; [T(b₁)] na base C = ${vec(imagesC[0])}.`;
    $('lb-work-2').textContent=`b₂ = ${vec(bvec[1])}; T(b₂) = ${vec(images[1])} nas coordenadas canónicas; [T(b₂)] na base C = ${vec(imagesC[1])}.`;
    $('lb-angle-text').textContent=$('lb-angle').value+'°';
  }
  function setStage(n){stage=n;root.querySelectorAll('[data-lb-stage]').forEach(b=>{const on=Number(b.dataset.lbStage)===stage;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});
    $('lb-stage-one').hidden=stage!==1;$('lb-stage-two-three').hidden=stage===1;$('lb-stage-three').hidden=stage!==3;
    $('lb-stage-intro').innerHTML=stage===1?'Comece por alterar a base do plano: <strong>o vetor permanece no mesmo lugar</strong>, mas a grelha e as suas coordenadas mudam.':stage===2?'Escolha uma transformação e observe a imagem do vetor. Altere as bases para distinguir <strong>o vetor</strong> das <strong>suas coordenadas</strong>.':'Observe como a matriz depende das bases escolhidas. As suas colunas são as coordenadas das imagens dos vetores da base do domínio.';
    update();
  }
  function changeDimensions(d,chosen){dimensions=d;$('lb-dimensions').value=d;options('lb-map',transformations[d],chosen?.map||transformations[d][0].id);options('lb-base-c',d==='22'?b2:b3,chosen?.C||'e');
    $('lb-codomain-title').textContent='Contradomínio '+(d==='22'?'ℝ²':'ℝ³')+' · base C';$('lb-3dview').hidden=d!=='23';$('lb-3d-note').hidden=d!=='23';update();
  }
  options('lb-base-b',b2,'a');changeDimensions('22');
  root.querySelectorAll('[data-lb-stage]').forEach(btn=>btn.addEventListener('click',()=>setStage(Number(btn.dataset.lbStage))));
  ['lb-base-b','lb-base-c','lb-map'].forEach(id=>$(id).addEventListener('change',update));
  $('lb-dimensions').addEventListener('change',()=>changeDimensions($('lb-dimensions').value));
  root.querySelectorAll('input[name="lb-input-basis"]').forEach(r=>r.addEventListener('change',()=>{
    if(!r.checked)return;const old=readCoords(),v=inputBasis==='canonical'?old:mv(getB(),old);inputBasis=r.value;writeCoords(inputBasis==='canonical'?v:mv(inverse(getB()),v));update();
  }));
  for(let i=1;i<=2;i++){
    $('lb-v'+i+'r').addEventListener('input',()=>{$('lb-v'+i).value=$('lb-v'+i+'r').value;update();});
    $('lb-v'+i).addEventListener('input',()=>{const n=Number($('lb-v'+i).value);if(Number.isFinite(n))$('lb-v'+i+'r').value=Math.max(-4,Math.min(4,n));update();});
  }
  root.querySelectorAll('[data-lb-preset]').forEach(btn=>btn.addEventListener('click',()=>{writeCoords(btn.dataset.lbPreset.split(',').map(Number));update();}));
  ['lb-show-grid','lb-show-canonical','lb-show-decomp','lb-angle'].forEach(id=>$(id).addEventListener('input',update));
  $('lb-toggle-work').addEventListener('click',()=>{const open=$('lb-work').hidden;$('lb-work').hidden=!open;$('lb-toggle-work').textContent=open?'Ocultar como se obtêm as colunas':'Mostrar como se obtêm as colunas';$('lb-toggle-work').setAttribute('aria-expanded',String(open));});
  function example(d){$('lb-base-b').value='a';changeDimensions(d,{map:d==='22'?'shear':'lift',C:d==='22'?'b':'d'});root.querySelector('input[name="lb-input-basis"][value="canonical"]').checked=true;inputBasis='canonical';writeCoords([2,2]);update();}
  $('lb-example22').addEventListener('click',()=>example('22'));
  $('lb-example23').addEventListener('click',()=>example('23'));
  $('lb-reset').addEventListener('click',()=>{$('lb-base-b').value='e';changeDimensions('22',{map:'shear',C:'e'});inputBasis='canonical';root.querySelector('input[name="lb-input-basis"][value="canonical"]').checked=true;writeCoords([2,2]);$('lb-show-grid').checked=true;$('lb-show-canonical').checked=false;$('lb-show-decomp').checked=true;update();});
  setStage(1);
})();
</script>
