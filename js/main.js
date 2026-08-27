const menuBtn=document.querySelector('.mobile-btn');
const nav=document.querySelector('.nav');
if(menuBtn&&nav){
  menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('.case-card[data-cat]').forEach(c=>c.style.display=(f==='all'||c.dataset.cat===f)?'block':'none');
}));

const form=document.getElementById('contactForm');
const notice=document.getElementById('notice');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    notice?.classList.add('show');
    setTimeout(()=>notice?.classList.remove('show'),2300);
    form.reset();
  });
}

// Restore the original high-resolution image sources that were used by the
// earlier HTML/CSS version. The temporary local WebP/SVG files were small
// screenshot crops and became visibly blurred when stretched on large cards.
const originalImages={
  cctv:'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1800&q=88',
  office:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88',
  computer:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1800&q=88',
  network:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88',
  contact:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=88',
  factory:'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=88',
  store:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=88',
  community:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=88',
  home:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=88'
};

function restoreOriginalImagery(){
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const heroByPage={
    'index.html':['.hero.home:before',originalImages.cctv],
    'about.html':['.about-page-hero:before',originalImages.office],
    'computer-service.html':['.computer-title:before',originalImages.computer],
    'security.html':['.security-title:before',originalImages.cctv],
    'network.html':['.network-title:before',originalImages.network],
    'cases.html':['.case-title:before',originalImages.cctv],
    'contact.html':['.contact-title:before',originalImages.contact]
  };
  const hero=heroByPage[page];
  if(hero){
    const style=document.createElement('style');
    style.dataset.originalHero='true';
    style.textContent=`${hero[0]}{background-image:url("${hero[1]}")!important}`;
    document.head.appendChild(style);
  }

  const fileMap={
    'home-office.jpg':originalImages.office,
    'home-office-original.webp':originalImages.office,
    'home-office-original.svg':originalImages.office,
    'computer-hero.webp':originalImages.computer,
    'computer-hero.svg':originalImages.computer,
    'network-hero.webp':originalImages.network,
    'network-hero.svg':originalImages.network,
    'scene-factory.webp':originalImages.factory,
    'scene-factory.svg':originalImages.factory,
    'scene-store.webp':originalImages.store,
    'scene-store.svg':originalImages.store,
    'scene-community.webp':originalImages.community,
    'scene-community.svg':originalImages.community,
    'scene-home.webp':originalImages.home,
    'scene-home.svg':originalImages.home,
    'cases-hero.webp':originalImages.network,
    'cases-hero.svg':originalImages.network,
    'about-hero.webp':originalImages.office,
    'about-hero.svg':originalImages.office,
    'security-hero.webp':originalImages.cctv,
    'security-hero.svg':originalImages.cctv,
    'contact-hero.webp':originalImages.contact,
    'contact-hero.svg':originalImages.contact
  };

  document.querySelectorAll('img[src]').forEach(img=>{
    try{
      const pathname=new URL(img.src,location.href).pathname;
      const filename=pathname.split('/').pop();
      if(fileMap[filename]){
        img.src=fileMap[filename];
        img.removeAttribute('srcset');
        img.loading='eager';
      }
    }catch{}
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  restoreOriginalImagery();
  if(window.lucide)lucide.createIcons({attrs:{'stroke-width':1.8}});
});
