document.addEventListener("DOMContentLoaded",()=>{

const loader=document.getElementById("loader");
if(loader) setTimeout(()=>loader.classList.add("done"),1900);

const glow=document.querySelector(".cursor-glow");
const dot=document.querySelector(".cursor-dot");
document.addEventListener("mousemove",e=>{
 if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}
 if(dot){dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px"}
});

const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}
 })
},{threshold:.12});
reveals.forEach(e=>observer.observe(e));

const counters=document.querySelectorAll("[data-count]");
const counterObs=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=+el.dataset.count,start=performance.now(),duration=1300;
  const tick=t=>{
   const p=Math.min((t-start)/duration,1),ease=1-Math.pow(1-p,3);
   el.textContent=Math.floor(target*ease);
   if(p<1)requestAnimationFrame(tick);else el.textContent=target;
  };
  requestAnimationFrame(tick);counterObs.unobserve(el);
 })
},{threshold:.7});
counters.forEach(e=>counterObs.observe(e));

const menu=document.querySelector(".menu-button"),nav=document.querySelector(".nav-links");
if(menu&&nav){
 menu.addEventListener("click",()=>{
  menu.classList.toggle("open");nav.classList.toggle("mobile");
 });
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menu.classList.remove("open");nav.classList.remove("mobile");
 }));
}

document.querySelectorAll(".tilt").forEach(card=>{
 card.addEventListener("mousemove",e=>{
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(1100px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`;
 });
 card.addEventListener("mouseleave",()=>card.style.transform="perspective(1100px) rotateY(0) rotateX(0)");
});

document.querySelectorAll(".project-visual").forEach(v=>{
 v.addEventListener("mousemove",e=>{
  const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  const s=v.querySelector("strong");if(s)s.style.transform=`translate(${x*25}px,${y*25}px) scale(1.03)`;
 });
 v.addEventListener("mouseleave",()=>{const s=v.querySelector("strong");if(s)s.style.transform="translate(0,0) scale(1)"});
});

const form=document.querySelector(".contact-form");
if(form){
 form.addEventListener("submit",e=>{
  e.preventDefault();
  const msg=form.querySelector(".form-message");
  if(msg)msg.textContent="✓ Nachricht wurde vorbereitet. Verbinde das Formular später mit deinem Mail-Service.";
  form.reset();
 });
}

const canvas=document.getElementById("particles");
if(canvas){
 const ctx=canvas.getContext("2d");
 let w,h,particles=[];
 const resize=()=>{w=canvas.width=canvas.offsetWidth;h=canvas.height=canvas.offsetHeight;particles=Array.from({length:65},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.5+.3}))};
 resize();window.addEventListener("resize",resize);
 const draw=()=>{
  ctx.clearRect(0,0,w,h);
  particles.forEach((p,i)=>{
   p.x+=p.vx;p.y+=p.vy;
   if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;
   ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(190,170,255,.5)";ctx.fill();
   for(let j=i+1;j<particles.length;j++){
    const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
    if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(150,120,255,${(1-d/120)*.09})`;ctx.stroke()}
   }
  });
  requestAnimationFrame(draw);
 };
 draw();
}

document.addEventListener("keydown",e=>{
 if(e.key.toLowerCase()==="l" && e.ctrlKey){
  document.body.style.setProperty("--accent","#00f0ff");
  setTimeout(()=>document.body.style.setProperty("--accent","#8255ff"),2500);
 }
});

});