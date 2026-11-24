fetch('products.json').then(r=>r.json()).then(d=>{
  const s=d.shop||{};document.getElementById('name').textContent=s.name||'';document.getElementById('tag').textContent=s.tagline||'';
  const ps=d.products||[];const cats=['الكل',...new Set(ps.map(p=>p.category).filter(Boolean))];let cur='الكل';
  const cEl=document.getElementById('cats'),lEl=document.getElementById('list');
  const fmt=n=>Number(n).toLocaleString('ar-EG')+' جنيه مصري';
  const wa=p=>'https://wa.me/'+s.whatsapp+'?text='+encodeURIComponent('أهلًا '+s.name+'، عايز أستفسر عن: '+p.title+' ('+fmt(p.price)+'). محتاج أعرف التوفر وتكلفة الشحن قبل التأكيد.');
  const rel=u=>String(u||'').replace(/^\//,'');const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  function draw(){
    cEl.innerHTML='';cats.forEach(c=>{const b=document.createElement('button');b.textContent=c;if(c===cur)b.className='on';b.onclick=()=>{cur=c;draw()};cEl.appendChild(b)});
    lEl.innerHTML=ps.filter(p=>cur==='الكل'||p.category===cur).map(p=>{
      const g=(p.gallery||[]).map(u=>'<img src="'+esc(rel(u))+'" alt="" onclick="this.closest(\'.card\').querySelector(\'.main\').src=this.src">').join('');
      return '<article class="card">'+(p.photo?'<img class="main" src="'+esc(rel(p.photo))+'" alt="'+esc(p.title)+'">':'')+(g?'<div class="thumbs"><img src="'+esc(rel(p.photo))+'" alt="" onclick="this.closest(\'.card\').querySelector(\'.main\').src=this.src">'+g+'</div>':'')+
      '<h3>'+esc(p.title)+'</h3><p>'+esc(p.detail)+'</p><p class="price">'+fmt(p.price)+'</p><a class="btn" href="'+wa(p)+'">اطلب على واتساب</a></article>'}).join('');
  }
  draw();
});
