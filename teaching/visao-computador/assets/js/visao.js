/* Da Álgebra Linear à Visão por Computador — demonstrações sem dependências. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const shapes = {
    eight: [
      '00111100','01100110','01100110','00111100',
      '01100110','01100110','01100110','00111100'
    ],
    arrow: [
      '00010000','00111000','01111100','11111110',
      '00010000','00010000','00010000','00010000'
    ],
    smile: [
      '00111100','01000010','10100101','10000001',
      '10100101','10011001','01000010','00111100'
    ]
  };
  const picture = name => shapes[name].map((row,r) => [...row].map((c,k) => c==='1' ? (r+k)%3===0 ? 230 : 255 : 15));
  const transpose = a => a[0].map((_,i)=>a.map(row=>row[i]));
  function pixelGrid(id, a, showNumbers=false) {
    const dest=$(id); if(!dest)return;
    dest.replaceChildren();
    a.forEach(row=>row.forEach(value=>{
      const v=Math.round(Math.max(0,Math.min(255,value)));
      const cell=document.createElement('span'); cell.className='cv-pixel';
      cell.style.backgroundColor=`rgb(${v},${v},${v})`;
      if(showNumbers){const text=document.createElement('span');text.className='cv-pixel-number'+(v>145?' cv-dark-text':'');text.textContent=String(v);cell.appendChild(text);}
      dest.appendChild(cell);
    }));
  }
  function matrixText(a){return a.map(row=>'[ '+row.map(v=>String(Math.round(v)).padStart(3,' ')).join('  ')+' ]').join('\n');}
  const activePicture=()=>picture($('cv-pattern')?.value || 'eight');
  function renderMatrix(){const a=activePicture();pixelGrid('cv-pixels',a,$('cv-numbers')?.checked);const v=$('cv-values');if(v)v.textContent=matrixText(a);}
  $('cv-pattern')?.addEventListener('change',renderMatrix);
  $('cv-numbers')?.addEventListener('change',renderMatrix);
  renderMatrix();

  let isTransposed=false;
  function renderTranspose(){const a=picture('arrow');pixelGrid('cv-transpose-original',a);pixelGrid('cv-transpose-result',isTransposed?transpose(a):a);const label=$('cv-transpose-label');if(label)label.textContent=isTransposed?'Resultado: transposta Aᵗ':'Resultado: matriz original A';const b=$('cv-transpose');if(b)b.textContent=isTransposed?'Transpor novamente':'Aplicar transposição';}
  $('cv-transpose')?.addEventListener('click',()=>{isTransposed=!isTransposed;renderTranspose();});
  $('cv-transpose-reset')?.addEventListener('click',()=>{isTransposed=false;renderTranspose();});
  renderTranspose();

  function blurMatrix(n,t){return Array.from({length:n},(_,r)=>Array.from({length:n},(_,c)=>{
    if(t===0)return r===c?1:0;
    if(r===0)return c===0?1-t/2:c===1?t/2:0;
    if(r===n-1)return c===n-1?1-t/2:c===n-2?t/2:0;
    return c===r?1-t:c===r-1||c===r+1?t/2:0;
  }));}
  function multiply(a,b){return a.map(row=>b[0].map((_,j)=>row.reduce((s,v,k)=>s+v*b[k][j],0)));}
  function renderBlur(){if(!$('cv-multiply-demo'))return;const a=picture('eight');const t=Number($('cv-blur')?.value||0)/100;pixelGrid('cv-blur-original',a);pixelGrid('cv-blur-output',multiply(blurMatrix(8,t),a));const out=$('cv-blur-value');if(out)out.value=`${Math.round(t*100)}%`;}
  $('cv-blur')?.addEventListener('input',renderBlur);renderBlur();

  const shape=[[-1,-.7],[.8,-.7],[.8,-.1],[.25,-.1],[.25,.75],[-1,.75]];
  const transforms={identity:[[1,0],[0,1]],rotation:[[0,-1],[1,0]],mirror:[[-1,0],[0,1]],stretch:[[1.5,0],[0,1]]};
  function svgElement(tag,attrs){const el=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));return el;}
  function drawTransform(){const root=$('cv-transform-svg');if(!root)return;root.replaceChildren();const M=transforms[$('cv-transform-choice')?.value]||transforms.identity;
    const panels=[{origin:105,matrix:transforms.identity,color:'#3175b6'},{origin:315,matrix:M,color:'#bf6c34'}];
    panels.forEach(({origin,matrix,color})=>{
      const cx=origin,cy=129,scale=55;
      root.append(svgElement('line',{x1:cx-82,y1:cy,x2:cx+82,y2:cy,stroke:'#a5b3c0'}));
      root.append(svgElement('line',{x1:cx,y1:cy-90,x2:cx,y2:cy+90,stroke:'#a5b3c0'}));
      const coords=shape.map(([x,y])=>[matrix[0][0]*x+matrix[0][1]*y,matrix[1][0]*x+matrix[1][1]*y]);
      const poly=svgElement('polygon',{points:coords.map(([x,y])=>`${cx+x*scale},${cy-y*scale}`).join(' '),stroke:color,'stroke-width':2,fill:color,'fill-opacity':'.18'});root.append(poly);
      coords.forEach(([x,y])=>root.append(svgElement('circle',{cx:cx+x*scale,cy:cy-y*scale,r:3,fill:color})));
    });
    const t1=svgElement('text',{x:105,y:244,'text-anchor':'middle',fill:'#425d79','font-size':13});t1.textContent='Original';root.append(t1);
    const t2=svgElement('text',{x:315,y:244,'text-anchor':'middle',fill:'#425d79','font-size':13});t2.textContent='Transformada';root.append(t2);
  }
  $('cv-transform-choice')?.addEventListener('change',drawTransform);drawTransform();
})();
