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
  /* Experiência 5: mudança de base em R². */
  function plotCanvas(id, vectors, extent=3.5){
    const svg=$(id);if(!svg)return;svg.replaceChildren();
    const width=520,height=330,cx=260,cy=165,unit=43;
    for(let n=-3;n<=3;n++){
      svg.append(svgElement('line',{x1:cx+n*unit,y1:12,x2:cx+n*unit,y2:318,stroke:'#e1e8ef','stroke-width':1}));
      svg.append(svgElement('line',{x1:26,y1:cy+n*unit,x2:494,y2:cy+n*unit,stroke:'#e1e8ef','stroke-width':1}));
    }
    svg.append(svgElement('line',{x1:26,y1:cy,x2:494,y2:cy,stroke:'#869aaa','stroke-width':1.5}));
    svg.append(svgElement('line',{x1:cx,y1:12,x2:cx,y2:318,stroke:'#869aaa','stroke-width':1.5}));
    for(const q of vectors){
      const x=cx+q.x*unit,y=cy-q.y*unit, norm=Math.hypot(q.x,q.y);
      const line=svgElement('line',{x1:cx,y1:cy,x2:x,y2:y,stroke:q.color,'stroke-width':q.width||3,'stroke-linecap':'round'});
      if(q.dash)line.setAttribute('stroke-dasharray','5 5');svg.append(line);
      if(norm>.08){const dx=q.x/norm,dy=-q.y/norm;svg.append(svgElement('polygon',{points:`${x},${y} ${x-10*dx+4*dy},${y-10*dy-4*dx} ${x-10*dx-4*dy},${y-10*dy+4*dx}`,fill:q.color}));}
      const label=svgElement('text',{x:x+8,y:y-7,fill:q.color,'font-size':13,'font-weight':600});label.textContent=q.label;svg.append(label);
    }
  }
  const basisChoices={canonical:[[1,0],[0,1]],diagonal:[[1,-1],[1,1]],scaled:[[2,0],[0,.5]]};
  function renderBasis(){if(!$('cv-basis-demo'))return;
    const m=basisChoices[$('cv-basis-select')?.value]||basisChoices.canonical;
    const x=Number($('cv-vector-x')?.value||0),y=Number($('cv-vector-y')?.value||0);
    const det=m[0][0]*m[1][1]-m[0][1]*m[1][0];
    const a=(m[1][1]*x-m[0][1]*y)/det,b=(-m[1][0]*x+m[0][0]*y)/det;
    plotCanvas('cv-basis-svg',[{x:m[0][0],y:m[1][0],label:'b₁',color:'#218275'},{x:m[0][1],y:m[1][1],label:'b₂',color:'#b56b26'},{x,y,label:'v',color:'#225caa',width:4}]);
    $('cv-vector-x-value').textContent=x.toLocaleString('pt-PT');$('cv-vector-y-value').textContent=y.toLocaleString('pt-PT');
    $('cv-basis-equation').textContent=`v = (${x.toLocaleString('pt-PT')}, ${y.toLocaleString('pt-PT')}) = ${a.toFixed(2).replace('.',',')} b₁ + ${b.toFixed(2).replace('.',',')} b₂. Coordenadas nesta base: (${a.toFixed(2).replace('.',',')}; ${b.toFixed(2).replace('.',',')}).`;
  }
  ['cv-basis-select','cv-vector-x','cv-vector-y'].forEach(id=>$(id)?.addEventListener('input',renderBasis));renderBasis();

  /* Experiência 6: mesmo vetor, imagem por três transformações. */
  const eigenChoices={stretch:[[2,0],[0,.5]],symmetric:[[1.5,.5],[.5,1.5]],rotation:[[0,-1],[1,0]]};
  function renderEigen(){if(!$('cv-eigen-demo'))return;
    const id=$('cv-eigen-matrix')?.value||'stretch',M=eigenChoices[id];
    const deg=Number($('cv-eigen-angle')?.value||0),rad=deg*Math.PI/180;
    const v=[Math.cos(rad),Math.sin(rad)],w=[M[0][0]*v[0]+M[0][1]*v[1],M[1][0]*v[0]+M[1][1]*v[1]];
    const cross=v[0]*w[1]-v[1]*w[0], dot=v[0]*w[0]+v[1]*w[1];
    plotCanvas('cv-eigen-svg',[{x:v[0]*3.1,y:v[1]*3.1,label:'direção inicial',color:'#b6c5d2',dash:true,width:1.5},{x:-v[0]*3.1,y:-v[1]*3.1,label:'',color:'#b6c5d2',dash:true,width:1.5},{x:v[0],y:v[1],label:'v',color:'#225caa',width:4},{x:w[0],y:w[1],label:'Mv',color:'#c3702b',width:4}]);
    $('cv-eigen-angle-value').textContent=`${deg}°`;
    const fmt=x=>(Math.abs(x)<1e-10?0:x).toFixed(2).replace('.',',');
    $('cv-eigen-numbers').textContent=`M = [ ${fmt(M[0][0])}  ${fmt(M[0][1])} ]\n    [ ${fmt(M[1][0])}  ${fmt(M[1][1])} ]\n\nv  = (${fmt(v[0])}; ${fmt(v[1])})\nMv = (${fmt(w[0])}; ${fmt(w[1])})`;
    $('cv-eigen-info').textContent=Math.abs(cross)<.018?`Direção própria! Aqui Mv ≈ ${fmt(dot)} v.`:'O vetor rodou: v e Mv não são paralelos.';
  }
  ['cv-eigen-matrix','cv-eigen-angle'].forEach(id=>$(id)?.addEventListener('input',renderEigen));renderEigen();

  /* Experiência 7: PCA calculada a partir de imagens 8×8 de treino. */
  function trainingImage(i){
    const dx=(i%4)-1.5,dy=Math.floor(i/4)-1.5;
    const thick=.58+((i*7)%5)*.09;
    const v=[];
    for(let y=0;y<8;y++)for(let x=0;x<8;x++){
      const xx=x-3.5-dx*.58,yy=y-3.5-dy*.55;
      const stem=Math.exp(-((xx+1.3)**2)/(2*thick**2))*Math.exp(-((yy+.3)**2)/(2*2.3**2));
      const bar=Math.exp(-((yy+1.6)**2)/(2*(thick*.75)**2))*Math.exp(-((xx-.1)**2)/(2*1.85**2));
      const foot=Math.exp(-((yy-1.8)**2)/(2*.38**2))*Math.exp(-((xx-.1)**2)/(2*1.55**2));
      v.push(Math.max(0,Math.min(255,12+245*Math.min(1,stem+bar*.85+foot*.55))));
    }
    return v;
  }
  function jacobiEigen(S){
    const n=S.length,a=S.map(r=>r.slice()),vec=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
    for(let it=0;it<n*n*45;it++){
      let p=0,q=1,m=0;
      for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const z=Math.abs(a[i][j]);if(z>m){m=z;p=i;q=j;}}
      if(m<1e-9)break;
      const angle=.5*Math.atan2(2*a[p][q],a[q][q]-a[p][p]);
      const c=Math.cos(angle),s=Math.sin(angle);
      // Rotation R with columns (c,-s) and (s,c) on the selected 2-space.
      for(let k=0;k<n;k++)if(k!==p&&k!==q){const ap=a[k][p],aq=a[k][q];a[k][p]=a[p][k]=c*ap-s*aq;a[k][q]=a[q][k]=s*ap+c*aq;}
      const app=a[p][p],aqq=a[q][q],apq=a[p][q];
      a[p][p]=c*c*app-2*c*s*apq+s*s*aqq;
      a[q][q]=s*s*app+2*c*s*apq+c*c*aqq;
      a[p][q]=a[q][p]=0;
      for(let k=0;k<n;k++){const vp=vec[k][p],vq=vec[k][q];vec[k][p]=c*vp-s*vq;vec[k][q]=s*vp+c*vq;}
    }
    return Array.from({length:n},(_,j)=>({value:Math.max(0,a[j][j]),vector:vec.map(row=>row[j])})).sort((x,y)=>y.value-x.value);
  }
  const pcaReady=(()=>{
    if(!$('cv-pca-demo'))return null;
    const images=Array.from({length:16},(_,i)=>trainingImage(i));
    const d=64,n=images.length,mean=Array.from({length:d},(_,j)=>images.reduce((s,r)=>s+r[j],0)/n);
    const centered=images.map(row=>row.map((v,j)=>v-mean[j]));
    const gram=centered.map(a=>centered.map(b=>a.reduce((s,x,j)=>s+x*b[j],0)/(n-1)));
    const eig=jacobiEigen(gram).filter(e=>e.value>1e-8);
    const components=eig.map(e=>{
      const u=Array.from({length:d},(_,j)=>centered.reduce((s,row,i)=>s+row[j]*e.vector[i],0));
      const len=Math.hypot(...u);return u.map(x=>x/len);
    });
    const total=eig.reduce((s,e)=>s+e.value,0);
    const select=$('cv-pca-image');
    for(let i=0;i<n;i++){const opt=document.createElement('option');opt.value=i;opt.textContent=`Imagem ${i+1}`;select.appendChild(opt);}
    const kSlider=$('cv-pca-k');kSlider.max=String(components.length);kSlider.value=String(Math.min(3,components.length));
    return {images,mean,centered,eig,components,total};
  })();
  function renderPCA(){if(!pcaReady)return;
    const {images,mean,centered,eig,components,total}=pcaReady;
    const i=Number($('cv-pca-image')?.value||0),k=Math.min(components.length,Number($('cv-pca-k')?.value||0));
    const original=images[i],rec=mean.slice();
    for(let j=0;j<k;j++){
      const comp=components[j],coefficient=comp.reduce((s,x,z)=>s+x*centered[i][z],0);
      for(let p=0;p<64;p++)rec[p]+=coefficient*comp[p];
    }
    const to2D=x=>Array.from({length:8},(_,row)=>x.slice(row*8,row*8+8));
    pixelGrid('cv-pca-original',to2D(original));pixelGrid('cv-pca-reconstructed',to2D(rec));
    pixelGrid('cv-pca-mean',to2D(mean));
    const u=components[0]||Array(64).fill(0),max=Math.max(...u.map(Math.abs),1e-10);
    pixelGrid('cv-pca-component',to2D(u.map(v=>128+120*v/max)));
    const variance=100*eig.slice(0,k).reduce((s,e)=>s+e.value,0)/total;
    const rmse=Math.sqrt(rec.reduce((s,v,z)=>s+(v-original[z])**2,0)/64);
    $('cv-pca-k-value').textContent=String(k);
    $('cv-pca-meter-fill').style.width=`${variance.toFixed(1)}%`;
    $('cv-pca-stats').textContent=`${k} componentes de ${components.length} possíveis · Variância explicada: ${variance.toFixed(1).replace('.',',')}% · Erro quadrático médio por píxel (raiz): ${rmse.toFixed(2).replace('.',',')} níveis de cinzento.`;
  }
  ['cv-pca-image','cv-pca-k'].forEach(id=>$(id)?.addEventListener('input',renderPCA));renderPCA();

})();
