---
layout: default
title: Transformações lineares — o caso de um robô
permalink: /teaching/robot-e-bases/
---

# Uma transformação linear, diferentes matrizes

## Um robô num armazém

Considere-se um robô que se desloca no piso de um armazém. O robô descreve os seus deslocamentos através de dois eixos próprios: um na direção de avanço e outro na direção lateral. O armazém dispõe de outro sistema de coordenadas, com eixos fixos. Admita-se que os eixos do robô estão rodados **30°** no sentido anti-horário relativamente aos eixos do armazém.

A transformação linear que converte as coordenadas de um **deslocamento** do robô nas suas coordenadas segundo os eixos do armazém é

$$
T:\mathbb{R}^2\longrightarrow\mathbb{R}^2,\qquad
T(x,y)=\left(\frac{\sqrt3}{2}x-\frac12 y,\;\frac12 x+\frac{\sqrt3}{2}y\right).
$$

Neste exemplo, consideram-se apenas deslocamentos (e não posições absolutas), pelo que não é necessário introduzir uma translação entre referenciais.

**Objetivo.** Compreender como a escolha das bases no domínio e no contradomínio determina as **colunas da matriz que representa a mesma transformação linear**.

## O teorema

Se $B=(b_1,b_2)$ é uma base do domínio e $C=(c_1,c_2)$ uma base do contradomínio, então

$$
\boxed{[T]_{C\leftarrow B}=\begin{bmatrix}[T(b_1)]_C &[T(b_2)]_C\end{bmatrix}.}
$$

Para obter uma coluna, **aplica-se $T$ a um vetor da base do domínio** e **escreve-se a imagem como combinação linear dos vetores da base do contradomínio**. Os coeficientes dessa combinação formam a coluna pretendida.

<style>
/* CSS totalmente confinado ao exemplo: evita conflitos com o tema Minimal do GitHub Pages. */
#rb-demo{--rb-ink:#243747;--rb-blue:#267cb9;--rb-green:#19877d;--rb-orange:#b96e24;--rb-border:#dce6ef;--rb-muted:#647687;max-width:100%;margin:18px 0 30px;color:var(--rb-ink);font-size:14px;line-height:1.55;container-type:inline-size}
#rb-demo *{box-sizing:border-box}
#rb-demo button,#rb-demo select,#rb-demo input{font:inherit}
#rb-demo button:focus-visible,#rb-demo select:focus-visible,#rb-demo input:focus-visible{outline:3px solid #267cb9;outline-offset:2px}
#rb-demo .rb-subtitle{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#728493;margin:0 0 8px}
#rb-demo .rb-card{border:1px solid var(--rb-border);border-radius:12px;background:#fff;padding:15px;margin:13px 0;min-width:0}
#rb-demo .rb-muted{color:var(--rb-muted);font-size:12px}
#rb-demo .rb-presets{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:9px}
#rb-demo .rb-preset{border:1px solid #d4e0e9;border-radius:8px;background:#fafcfe;color:#36536b;padding:11px 9px;cursor:pointer;text-align:left;line-height:1.35;min-width:0}
#rb-demo .rb-preset strong{display:block;font-size:12.5px;color:#304b5c;margin-bottom:3px}
#rb-demo .rb-preset small{display:block;font-size:11px;color:#708090}
#rb-demo .rb-preset.active{background:#eaf5fc;border-color:#78b0d2;box-shadow:inset 0 0 0 1px #78b0d2}
#rb-demo .rb-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin:12px 0}
#rb-demo .rb-field{min-width:0}
#rb-demo .rb-field label{display:block;font-weight:700;color:#41596a;font-size:12px;margin:0 0 5px}
#rb-demo .rb-field select{display:block;width:100%;min-width:0;color:#213b4e;border:1px solid #bfcfdd;background:white;padding:9px;border-radius:7px;font-size:12px;height:auto}
#rb-demo .rb-process{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin:15px 0}
#rb-demo .rb-stage{display:flex;flex-direction:column;gap:4px;align-items:center;border:1px solid #d9e4ec;background:#f8fafc;color:#6c7b86;padding:8px 3px;border-radius:8px;text-align:center;font-size:11px;line-height:1.3}
#rb-demo .rb-stage.active{color:#1a6398;background:#edf7fc;border-color:#7db6da;font-weight:750}
#rb-demo .rb-stage.done{color:#226e64;background:#eff9f6;border-color:#bee4d8}
#rb-demo .rb-stage .rb-index{font-weight:800;font-size:15px}
#rb-demo .rb-action{border-left:4px solid #4789ba;background:#eff7fc;border-radius:5px;padding:11px 12px;margin:10px 0 0;min-height:76px}
#rb-demo .rb-action strong{display:block;color:#204d70;font-size:13px;margin-bottom:3px}
#rb-demo .rb-action p{margin:0;color:#345166;font-size:12px}
#rb-demo .rb-nav{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:12px 0 0}
#rb-demo .rb-btn{border:1px solid #bed2e1;background:#fff;color:#206b9d;border-radius:8px;padding:9px 13px;cursor:pointer;font-size:12px}
#rb-demo .rb-btn.rb-primary{background:#267cb9;color:#fff;border-color:#267cb9;font-weight:700}
#rb-demo .rb-btn:disabled{opacity:.38;cursor:not-allowed}
#rb-demo .rb-nav .rb-stepnum{font-variant-numeric:tabular-nums;color:#697e8d;font-size:12px;margin-left:auto}
#rb-demo .rb-checks{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px;font-size:12px;color:#405d70;margin:12px 0 4px}
#rb-demo .rb-checks label{display:flex;align-items:center;gap:7px;cursor:pointer}
#rb-demo .rb-checks input{accent-color:#267cb9;margin:0}
#rb-demo .rb-plots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:12px 0}
#rb-demo .rb-plot{border:1px solid #dbe5ed;border-radius:9px;background:#fcfdff;padding:9px;min-width:0}
#rb-demo .rb-plot strong{font-size:12px;color:#304c62;display:block;margin-bottom:7px}
#rb-demo .rb-plot svg{display:block;width:100%;height:auto;aspect-ratio:390/300;border:1px solid #e8eef2;border-radius:5px;background:white}
#rb-demo .rb-plot .rb-caption{font-size:11px;color:#647687;margin-top:7px;min-height:32px;line-height:1.4}
#rb-demo .rb-key{display:flex;flex-wrap:wrap;gap:7px 12px;font-size:11px;color:#566b7d;margin:9px 0}
#rb-demo .rb-key span{display:inline-flex;align-items:center;gap:5px}
#rb-demo .rb-key b{display:inline-block;width:10px;height:10px;border-radius:3px}
#rb-demo .rb-worked{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin:13px 0}
#rb-demo .rb-col{border:1px solid #dce6ed;background:#f9fbfc;border-radius:9px;padding:12px;opacity:.43;min-width:0}
#rb-demo .rb-col.visible{opacity:1}
#rb-demo .rb-col b{font-size:12px;display:block;margin-bottom:8px}
#rb-demo .rb-col:nth-child(1) b{color:#267cb9}
#rb-demo .rb-col:nth-child(2) b{color:#19877d}
#rb-demo .rb-equation{min-height:55px;font-size:12px;color:#364e60;overflow-x:auto;line-height:1.9}
#rb-demo .rb-matrixline{border-top:1px solid #e3ebf1;padding-top:12px;margin-top:12px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
#rb-demo .rb-matrixline .rb-label{font-size:12px;font-weight:750;color:#39566c}
#rb-demo .rb-matrix{display:grid;grid-template-columns:repeat(2,minmax(35px,auto));padding:5px 8px;border-left:2px solid #566e80;border-right:2px solid #566e80;border-radius:2px;gap:0;font-variant-numeric:tabular-nums}
#rb-demo .rb-cell{min-width:38px;padding:5px 6px;text-align:center;font-size:13px}
#rb-demo .rb-cell:nth-child(odd){background:#edf6fc;color:#14639a}
#rb-demo .rb-cell:nth-child(even){background:#ecf9f6;color:#14756c}
#rb-demo .rb-cell.unknown{background:#f8fafc;color:#9aa9b4}
#rb-demo .rb-result{border-left:3px solid #19877d;background:#f1f9f7;border-radius:4px;padding:11px 13px;font-size:12.5px;margin-top:11px}
#rb-demo details{border:1px solid #dce6ed;background:#fbfcfe;border-radius:7px;padding:9px 11px;font-size:12px;margin:9px 0}
#rb-demo summary{cursor:pointer;font-weight:700;color:#246b9d}
#rb-demo details p{margin:8px 0 0}
#rb-demo .rb-foot{border-top:1px solid #e2eaf0;margin-top:18px;padding-top:13px;font-size:12px}
@container (max-width:530px){#rb-demo .rb-plots{grid-template-columns:1fr}#rb-demo .rb-worked{grid-template-columns:1fr}}
@container (max-width:420px){#rb-demo .rb-presets{grid-template-columns:1fr}#rb-demo .rb-fields{grid-template-columns:1fr}#rb-demo .rb-process{grid-template-columns:repeat(2,minmax(0,1fr))}#rb-demo .rb-card{padding:11px}}
@media (max-width:680px){#rb-demo .rb-plots{grid-template-columns:1fr}}
</style>

<div id="rb-demo">
  <div class="rb-card">
    <div class="rb-subtitle">Exemplos orientados</div>
    <div class="rb-presets" role="group" aria-label="Escolha do exemplo">
      <button type="button" class="rb-preset active" data-rb-preset="a"><strong>Exemplo A</strong><small>Bases canónicas</small></button>
      <button type="button" class="rb-preset" data-rb-preset="b"><strong>Exemplo B</strong><small>Alterar a base do contradomínio</small></button>
      <button type="button" class="rb-preset" data-rb-preset="c"><strong>Exemplo C</strong><small>Bases não canónicas</small></button>
    </div>
    <div class="rb-fields">
      <div class="rb-field"><label for="rb-B">Base B do domínio</label><select id="rb-B"><option value="e">Canónica: (1,0), (0,1)</option><option value="o">Oblíqua: (1,0), (1,1)</option></select></div>
      <div class="rb-field"><label for="rb-C">Base C do contradomínio</label><select id="rb-C"><option value="e">Eixos fixos do armazém (canónica)</option><option value="r">Eixos alinhados com o robô</option></select></div>
    </div>
    <p class="rb-muted">A transformação T mantém-se fixa. Pode alterar as duas bases independentemente.</p>
    <div class="rb-process" aria-label="Etapas da construção">
      <div class="rb-stage active" data-rb-stage="1"><span class="rb-index">1</span><span>Identificar as bases</span></div>
      <div class="rb-stage" data-rb-stage="2"><span class="rb-index">2</span><span>Obter T(b₁)</span></div>
      <div class="rb-stage" data-rb-stage="3"><span class="rb-index">3</span><span>Obter T(b₂)</span></div>
      <div class="rb-stage" data-rb-stage="4"><span class="rb-index">4</span><span>Construir a matriz</span></div>
    </div>
    <div class="rb-action" aria-live="polite"><strong id="rb-action-title">1. Identifique as bases.</strong><p id="rb-action-text">Observe os vetores das bases B e C, assim como as grelhas por eles geradas.</p></div>
    <div class="rb-nav"><button type="button" class="rb-btn" id="rb-prev" disabled>Passo anterior</button><button type="button" class="rb-btn rb-primary" id="rb-next">Passo seguinte</button><button type="button" class="rb-btn" id="rb-reset">Reiniciar</button><span class="rb-stepnum" id="rb-progress">Passo 1 de 4</span></div>
  </div>
  <div class="rb-checks"><label><input type="checkbox" id="rb-canonical"> Sobrepor a grelha canónica</label><label><input type="checkbox" id="rb-decomp" checked> Mostrar a decomposição em C</label></div>
  <div class="rb-key"><span><b style="background:#267cb9"></b>Primeiro vetor da base</span><span><b style="background:#19877d"></b>Segundo vetor da base</span><span><b style="background:#b96e24"></b>Imagens pela transformação</span><span><b style="background:#8366aa"></b>Deslocamento de referência</span></div>
  <div class="rb-plots">
    <div class="rb-plot"><strong>Domínio · coordenadas do robô</strong><svg id="rb-domain" viewBox="0 0 390 300" role="img" aria-label="Grelha gerada pela base do domínio e vetores dessa base"></svg><div class="rb-caption" id="rb-domain-note"></div></div>
    <div class="rb-plot"><strong>Contradomínio · deslocamentos no armazém</strong><svg id="rb-codomain" viewBox="0 0 390 300" role="img" aria-label="Grelha gerada pela base do contradomínio e imagens dos vetores da base do domínio"></svg><div class="rb-caption" id="rb-codomain-note"></div></div>
  </div>
  <div class="rb-card">
    <div class="rb-subtitle">Das imagens às colunas da matriz</div>
    <div class="rb-worked"><div class="rb-col" id="rb-col1"><b>1.ª coluna — T(b₁)</b><div class="rb-equation" id="rb-eq1">A imagem será apresentada no passo 2.</div></div><div class="rb-col" id="rb-col2"><b>2.ª coluna — T(b₂)</b><div class="rb-equation" id="rb-eq2">A imagem será apresentada no passo 3.</div></div></div>
    <div class="rb-matrixline"><span class="rb-label">Matriz de T nas bases B e C</span><div class="rb-matrix" id="rb-matrix" aria-live="polite"></div></div>
    <div class="rb-result" id="rb-result">A primeira coluna é obtida a partir de T(b₁), exprimindo a imagem na base C. A segunda obtém-se do mesmo modo a partir de T(b₂).</div>
  </div>
  <div class="rb-card">
    <div class="rb-subtitle">Verificação da compreensão</div>
    <details><summary>Se apenas a base do contradomínio mudar, a transformação T também muda?</summary><p>Não. O deslocamento físico é o mesmo. Alteram-se as coordenadas utilizadas para o descrever e, portanto, a matriz que representa T nessas bases.</p></details>
    <details><summary>O que representam as colunas da matriz?</summary><p>A primeira coluna contém as coordenadas de T(b₁) na base C; a segunda contém as coordenadas de T(b₂) na mesma base. É indispensável utilizar a base do contradomínio para ler essas coordenadas.</p></details>
  </div>
</div>

## Extensão: um robô numa rampa

O mesmo raciocínio permite compreender uma transformação de $\mathbb R^2$ em $\mathbb R^3$. Se um robô se desloca numa rampa inclinada de $30^\circ$, podemos usar duas coordenadas para descrever deslocamentos **ao longo da rampa** e três coordenadas para os representar no espaço:

$$
S:\mathbb R^2\longrightarrow\mathbb R^3,\qquad
S(u,v)=\left(\frac{\sqrt3}{2}u,\,v,\,\frac12u\right).
$$

Com bases canónicas, as imagens dos dois vetores da base do domínio formam as colunas de uma matriz com **três linhas e duas colunas**:

$$
[S]=\begin{pmatrix}\frac{\sqrt3}{2}&0\\0&1\\\frac12&0\end{pmatrix}.
$$

O número de **colunas** é determinado pela dimensão do domínio; o número de **linhas**, pela dimensão do contradomínio. Não é necessário aplicar qualquer regra de multiplicação de matrizes para compreender esta construção.

[← Voltar à página de Docência]({{ '/teaching/' | relative_url }})

<script>
(function(){
 'use strict';
 const root=document.getElementById('rb-demo'); if(!root)return;
 const $=id=>root.querySelector('#'+id), SVGNS='http://www.w3.org/2000/svg';
 const theta=Math.PI/6, cs=Math.cos(theta),sn=Math.sin(theta);
 const col={blue:'#267cb9',green:'#19877d',orange:'#b96e24',violet:'#8366aa'};
 const bases={e:[[1,0],[0,1]],o:[[1,0],[1,1]]};
 const Cbase={e:[[1,0],[0,1]],r:[[cs,sn],[-sn,cs]]};
 const presets={a:['e','e'],b:['e','r'],c:['o','e']};
 let stage=1;
 const rotate=v=>[cs*v[0]-sn*v[1],sn*v[0]+cs*v[1]];
 const mm=(a,v)=>[a[0][0]*v[0]+a[1][0]*v[1],a[0][1]*v[0]+a[1][1]*v[1]];
 function inverseCoords(cols,v){const det=cols[0][0]*cols[1][1]-cols[0][1]*cols[1][0];return [(v[0]*cols[1][1]-v[1]*cols[1][0])/det,(-v[0]*cols[0][1]+v[1]*cols[0][0])/det]}
 const cap=x=>Math.abs(x)<1e-9?0:x, format=x=>{x=cap(x);const near=Math.round(x);if(Math.abs(x-near)<1e-9)return String(near).replace('-','−');return x.toFixed(3).replace('-','−').replace(/0+$/,'').replace(/\.$/,'')};
 const vec=v=>'('+v.map(format).join(', ')+')';
 const bvecs=()=>bases[$('rb-B').value];
 const cvecs=()=>Cbase[$('rb-C').value];
 function exactT(v){if(v[0]===1&&v[1]===0)return ['\\frac{\\sqrt3}{2}','\\frac12'];if(v[0]===0&&v[1]===1)return ['-\\frac12','\\frac{\\sqrt3}{2}'];if(v[0]===1&&v[1]===1)return ['\\frac{\\sqrt3-1}{2}','\\frac{1+\\sqrt3}{2}'];return v.map(x=>format(x))}
 function exactCoords(v){return $('rb-C').value==='r'?v.map(x=>String(x)):exactT(v)}
 function mathVec(v){return '\\begin{pmatrix}'+v.join('\\\\')+'\\end{pmatrix}'}
 function typeset(){if(window.MathJax&&window.MathJax.typesetPromise){window.MathJax.typesetPromise([root]).catch(()=>{})}}
 function svgEl(parent,tag,attrs,text){const e=document.createElementNS(SVGNS,tag);for(const [k,v] of Object.entries(attrs||{}))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;parent.appendChild(e);return e}
 const P=v=>[195+v[0]*51,153-v[1]*51];
 function line(svg,a,b,stroke,width=1,opacity=1,dash=''){const p=P(a),q=P(b);svgEl(svg,'line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],stroke,'stroke-width':width,opacity,...(dash?{'stroke-dasharray':dash}:{})})}
 function arrow(svg,to,color,label,width=3.2,alpha=1){let a=P([0,0]),b=P(to),dx=b[0]-a[0],dy=b[1]-a[1],h=Math.hypot(dx,dy);if(h<1)return;let ux=dx/h,uy=dy/h;line(svg,[0,0],to,color,width,alpha);svgEl(svg,'polygon',{points:[[b[0],b[1]],[b[0]-11*ux-5*uy,b[1]-11*uy+5*ux],[b[0]-11*ux+5*uy,b[1]-11*uy-5*ux]].map(v=>v.join(',')).join(' '),fill:color,opacity:alpha});svgEl(svg,'text',{x:Math.max(9,Math.min(345,b[0]+7)),y:Math.max(17,Math.min(292,b[1]-8)),fill:color,'font-weight':700,'font-size':13,'paint-order':'stroke',stroke:'#fff','stroke-width':3},label)}
 function add(a,b){return [a[0]+b[0],a[1]+b[1]]};const scale=(a,k)=>a.map(x=>x*k);
 function drawGrid(svg,cols,shade,opacity=.30){for(let k=-8;k<=8;k++){line(svg,add(scale(cols[0],-20),scale(cols[1],k)),add(scale(cols[0],20),scale(cols[1],k)),shade,1,opacity);line(svg,add(scale(cols[0],k),scale(cols[1],-20)),add(scale(cols[0],k),scale(cols[1],20)),shade,1,opacity)}}
 function draw(id,isDomain){const svg=$(id);svg.textContent='';const defs=svgEl(svg,'defs');const clip=svgEl(defs,'clipPath',{id:id+'-clip'});svgEl(clip,'rect',{x:1,y:1,width:388,height:298});const g=svgEl(svg,'g',{'clip-path':'url(#'+id+'-clip)'});
 const bs=isDomain?bvecs():cvecs();if($('rb-canonical').checked)drawGrid(g,[[1,0],[0,1]],'#a9b7c2',.17);drawGrid(g,bs,'#8cbdd7',.34);line(g,[-6,0],[6,0],'#bbc5cd',1,.9);line(g,[0,-6],[0,6],'#bbc5cd',1,.9);
 bs.forEach((v,i)=>arrow(g,v,i===0?col.blue:col.green,(isDomain?'b':'c')+(i===0?'₁':'₂')));
 if(!isDomain){const B=bvecs(),C=cvecs();for(let i=0;i<2;i++){if(stage<i+2)continue;const w=rotate(B[i]),coef=inverseCoords(C,w);if($('rb-decomp').checked){line(g,[0,0],scale(C[0],coef[0]),col.blue,2.2,.85,'5 4');line(g,scale(C[0],coef[0]),w,col.green,2.2,.85,'5 4')}arrow(g,w,col.orange,'T(b'+(i?'₂':'₁')+')',3.7,i===0?1:.78)}}
 if(stage===4){const u=[2,1],v=isDomain?u:rotate(u);arrow(g,v,col.violet,isDomain?'v':'T(v)',3.0,.85)}
 svgEl(g,'circle',{cx:195,cy:153,r:3.2,fill:'#506778'});svgEl(g,'text',{x:202,y:169,'font-size':11,fill:'#718493'},'0');}
 const labels=[['1. Identifique as bases.','Observe os vetores das bases B e C e as grelhas geradas por essas bases. Se necessário, selecione outra base em cada lista.'],['2. Determine a imagem do primeiro vetor.','Observe T(b₁) no contradomínio. Expresse este vetor como combinação linear de c₁ e c₂ para obter a primeira coluna.'],['3. Determine a imagem do segundo vetor.','Repita o processo para T(b₂). Os coeficientes relativos à base C constituem a segunda coluna.'],['4. Construa a matriz.','Coloque as coordenadas de T(b₁) e T(b₂) lado a lado, pela mesma ordem dos vetores da base B. Compare as matrizes obtidas ao mudar C.']];
 function render(){const B=bvecs(),C=cvecs();$('rb-action-title').textContent=labels[stage-1][0];$('rb-action-text').textContent=labels[stage-1][1];$('rb-prev').disabled=stage===1;$('rb-next').disabled=stage===4;$('rb-progress').textContent='Passo '+stage+' de 4';$('rb-next').textContent=stage===3?'Concluir a matriz':'Passo seguinte';root.querySelectorAll('[data-rb-stage]').forEach(el=>{let s=+el.dataset.rbStage;el.classList.toggle('active',s===stage);el.classList.toggle('done',s<stage)});
 $('rb-domain-note').textContent='B = ('+vec(B[0])+', '+vec(B[1])+')';$('rb-codomain-note').textContent=$('rb-C').value==='e'?'C = ((1, 0), (0, 1)) · base fixa do armazém':'C = ((√3/2, 1/2), (−1/2, √3/2)) · eixos do robô';
 for(let j=0;j<2;j++){const el=$('rb-eq'+(j+1));$('rb-col'+(j+1)).classList.toggle('visible',stage>=j+2);if(stage<j+2){el.textContent=j===0?'A imagem será apresentada no passo 2.':'A imagem será apresentada no passo 3.'}else{const bb=B[j],im=exactT(bb),co=exactCoords(bb);el.innerHTML='\\(T(b_'+(j+1)+')='+mathVec(im)+'\\)<div style="margin-top:7px">\\([T(b_'+(j+1)+')]_C='+mathVec(co)+'\\)</div>'}}
 const matrix=$('rb-matrix');matrix.textContent='';for(let row=0;row<2;row++)for(let colidx=0;colidx<2;colidx++){const cell=document.createElement('span');cell.className='rb-cell';if(stage>=colidx+2)cell.textContent=format(inverseCoords(C,rotate(B[colidx]))[row]);else{cell.textContent='?';cell.classList.add('unknown')}matrix.appendChild(cell)}
 $('rb-result').textContent=stage===4?'A transformação T é a mesma nos três exemplos. A matriz altera-se quando se alteram as bases porque as suas colunas contêm coordenadas relativas à base C. Os valores mostrados na matriz estão arredondados a três casas decimais quando necessário.':'Cada coluna é constituída pelas coordenadas, na base C, da imagem de um vetor da base B. Revele as duas imagens para construir a matriz.';
 draw('rb-domain',true);draw('rb-codomain',false);typeset()}
 function applyPreset(k){const p=presets[k];$('rb-B').value=p[0];$('rb-C').value=p[1];stage=1;root.querySelectorAll('[data-rb-preset]').forEach(b=>b.classList.toggle('active',b.dataset.rbPreset===k));render()}
 root.querySelectorAll('[data-rb-preset]').forEach(b=>b.addEventListener('click',()=>applyPreset(b.dataset.rbPreset)));
 ['rb-B','rb-C'].forEach(id=>$(id).addEventListener('change',()=>{stage=1;root.querySelectorAll('[data-rb-preset]').forEach(b=>b.classList.remove('active'));render()}));
 ['rb-canonical','rb-decomp'].forEach(id=>$(id).addEventListener('change',render));
 $('rb-next').addEventListener('click',()=>{stage=Math.min(stage+1,4);render()});$('rb-prev').addEventListener('click',()=>{stage=Math.max(stage-1,1);render()});$('rb-reset').addEventListener('click',()=>{stage=1;render()});
 applyPreset('a');
})();
</script>
