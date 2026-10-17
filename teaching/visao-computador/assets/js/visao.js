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
      '11000000','11000000','11000000','11111110',
      '11111110','11000000','11000000','11000000'
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
    dest.style.gridTemplateColumns=`repeat(${a[0].length}, minmax(0, 1fr))`;
    dest.style.aspectRatio=`${a[0].length} / ${a.length}`;
    a.forEach(row=>row.forEach(value=>{
      const v=Math.round(Math.max(0,Math.min(255,value)));
      const cell=document.createElement('span'); cell.className='cv-pixel';
      cell.style.backgroundColor=`rgb(${v},${v},${v})`;
      if(showNumbers){const text=document.createElement('span');text.className='cv-pixel-number'+(v>145?' cv-dark-text':'');text.textContent=String(v);cell.appendChild(text);}
      dest.appendChild(cell);
    }));
  }
  function matrixText(a){return a.map(row=>'[ '+row.map(v=>String(Math.round(v)).padStart(3,' ')).join('  ')+' ]').join('\n');}
  let uploadedPixels=null;
  const activePicture=()=>uploadedPixels || picture($('cv-pattern')?.value || 'eight');
  const upload=$('cv-image-upload');
  upload?.addEventListener('change',()=>{
    const file=upload.files && upload.files[0]; if(!file)return;
    if(!file.type.startsWith('image/')) {window.alert('Escolhe um ficheiro de imagem.');return;}
    const u=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{
      try {
        const canvas=document.createElement('canvas');canvas.width=8;canvas.height=8;
        const ctx=canvas.getContext('2d',{willReadFrequently:true});
        ctx.drawImage(img,0,0,8,8);
        const raw=ctx.getImageData(0,0,8,8).data;
        uploadedPixels=Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>{
          const k=(r*8+c)*4,alpha=raw[k+3]/255;
          const rVal=raw[k]*alpha+255*(1-alpha),gVal=raw[k+1]*alpha+255*(1-alpha),bVal=raw[k+2]*alpha+255*(1-alpha);
          return Math.round(0.2126*rVal+0.7152*gVal+0.0722*bVal);
        }));
        const preview=$('cv-photo-preview'),photo=$('cv-photo');
        if(photo)photo.src=u;
        if(preview)preview.hidden=false;
        renderMatrix();
      } catch(e) {window.alert('Não foi possível ler esta imagem.');URL.revokeObjectURL(u);}
    };
    img.onerror=()=>{window.alert('Não foi possível abrir esta imagem.');URL.revokeObjectURL(u);};
    img.src=u;
  });
  $('cv-image-reset')?.addEventListener('click',()=>{
    uploadedPixels=null;if(upload)upload.value='';
    const preview=$('cv-photo-preview'),photo=$('cv-photo');
    if(preview)preview.hidden=true;
    if(photo){const old=photo.src;photo.removeAttribute('src');if(old.startsWith('blob:'))URL.revokeObjectURL(old);}
    renderMatrix();
  });
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
  function fullMatrixText(a,decimals=0){
    return a.map(row=>'[ '+row.map(x=>decimals?x.toFixed(decimals).padStart(5,' '):String(Math.round(x)).padStart(3,' ')).join(' ')+' ]').join('\n');
  }
  const original8=picture('arrow');
  ['cv-row','cv-col'].forEach(id=>{const sel=$(id);if(sel)for(let k=0;k<8;k++){const o=document.createElement('option');o.value=k;o.textContent=String(k+1);if(k===3)o.selected=true;sel.appendChild(o);}});
  function renderBlur(){
    if(!$('cv-multiply-demo'))return;
    const t=Number($('cv-blur')?.value||0)/100;
    const vertical=($('cv-direction')?.value||'vertical')==='vertical';
    const S=blurMatrix(8,t), B=vertical?multiply(S,original8):multiply(original8,S);
    pixelGrid('cv-blur-original',original8);
    pixelGrid('cv-blur-output',B);
    const out=$('cv-blur-value');if(out)out.textContent=t.toLocaleString('pt-PT',{minimumFractionDigits:1,maximumFractionDigits:1});
    $('cv-matrix-a').textContent=fullMatrixText(original8);
    $('cv-matrix-s').textContent=fullMatrixText(S,2);
    $('cv-matrix-b').textContent=fullMatrixText(B,0);
    const f=$('cv-blur-formula');if(f)f.textContent=vertical?'B = Sₜ × A. A multiplicação à esquerda combina linhas (suavização vertical).':'B = A × Sₜ. A multiplicação à direita combina colunas (suavização horizontal).';
    const r=Number($('cv-row')?.value||0), c=Number($('cv-col')?.value||0);
    const terms=[];
    for(let k=0;k<8;k++){
      const weight=vertical?S[r][k]:S[k][c];
      if(weight>1e-10)terms.push(`(${weight.toFixed(2)} × ${vertical?original8[k][c]:original8[r][k]})`);
    }
    const detail=$('cv-entry-explanation');
    if(detail)detail.textContent=`B[${r+1},${c+1}] = ${terms.join(' + ')} = ${B[r][c].toFixed(2)} ≈ ${Math.round(B[r][c])}.`;
  }
  ['cv-blur','cv-direction','cv-row','cv-col'].forEach(id=>$(id)?.addEventListener('input',renderBlur));
  renderBlur();

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
