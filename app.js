const SHOP={name:'عالم سمسم',tagline:'كل اللي يسعد طفلك في مكان واحد',whatsapp:'201151400305'};
fetch('products.json').then(r=>r.json()).then(d=>{
  const s=Object.assign({},SHOP,d.shop||{});
  document.getElementById('name').textContent=s.name||'';
  document.getElementById('tag').textContent=s.tagline||'';
  const fn=document.getElementById('foot-name');if(fn)fn.textContent=s.name||'';
  const ps=d.products||[];
  const cats=['الكل',...new Set(ps.map(p=>p.category).filter(Boolean))];let cur='الكل';
  const cEl=document.getElementById('cats'),lEl=document.getElementById('list');
  const fmt=n=>Number(n).toLocaleString('ar-EG');
  const wa=p=>'https://wa.me/'+s.whatsapp+'?text='+encodeURIComponent('أهلًا '+s.name+'، عايز أستفسر عن: '+p.title+' ('+fmt(p.price)+' جنيه مصري). محتاج أعرف التوفر وتكلفة الشحن قبل التأكيد.');
  const rel=u=>String(u||'').replace(/^\//,'');
  const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const waSvg='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.9a11.6 11.6 0 0 0 4.5 4.2c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.4-.2z"/></svg>';
  const tracked=p=>p.stock!==undefined&&p.stock!==null&&p.stock!=='';
  const soldOut=p=>tracked(p)&&Number(p.stock)<=0;
  const st=document.createElement('style');
  st.textContent='.stk{display:inline-block;padding:2px 10px;border-radius:999px;font-weight:700;font-size:13px}.stk.in{background:#e6f7ec;color:#157a3c}.stk.out{background:#fde8e8;color:#b42318}.ph .stk{position:absolute;top:10px;right:10px;z-index:3}.ph .cat-chip{left:10px;right:auto;z-index:2}.stk.out{font-size:0}.stk.out:after{content:"غير متوفر";font-size:13px}.btn-off{background:#d0d0d0!important;color:#666!important;cursor:not-allowed;pointer-events:none;text-align:center}.card:has(.stk.out) .ph img{opacity:.55}';
  document.head.appendChild(st);
  function draw(){
    cEl.innerHTML='';
    cats.forEach(c=>{
      const b=document.createElement('button');
      b.textContent=c;b.setAttribute('role','tab');
      if(c===cur)b.className='on';
      b.onclick=()=>{cur=c;draw()};
      cEl.appendChild(b);
    });
    lEl.innerHTML=ps.filter(p=>cur==='الكل'||p.category===cur).map(p=>{
      const g=(p.gallery||[]).map(u=>'<img src="'+esc(rel(u))+'" alt="" loading="lazy" onclick="this.closest(\'.card\').querySelector(\'.main\').src=this.src">').join('');
      return '<article class="card">'
        +(p.photo?'<div class="ph"><img class="main" src="'+esc(rel(p.photo))+'" alt="'+esc(p.title)+'">'+(p.category?'<span class="cat-chip">'+esc(p.category)+'</span>':'')+(tracked(p)?'<span class="stk '+(soldOut(p)?'out':'in')+'">'+(soldOut(p)?'غير متوفر':'متوفر')+'</span>':'')+'</div>':'')
        +(g?'<div class="thumbs"><img src="'+esc(rel(p.photo))+'" alt="" onclick="this.closest(\'.card\').querySelector(\'.main\').src=this.src">'+g+'</div>':'')
        +'<h3>'+esc(p.title)+'</h3>'+'<p>'+esc(p.detail)+'</p>'
        +'<p class="price">'+fmt(p.price)+' <small>جنيه مصري</small></p>'
        +(soldOut(p)?'<span class="btn btn-off">نفد حاليًا</span>':'<a class="btn" href="'+wa(p)+'" target="_blank" rel="noopener">'+waSvg+'اطلب على واتساب</a>')+'</article>';
    }).join('');
  }
  draw();
}).catch(()=>{
  document.getElementById('list').innerHTML='<p class="mut">حصلت مشكلة في تحميل المنتجات. جرّب تحدّث الصفحة.</p>';
});
