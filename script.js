const CONFIG = {
  top: "20/10 của cậu đây, mở quà đi chứ còn chờ gì nữa? 😎”.",
  wish: [
    "Gửi cậu ",
    "Nhân ngày 20/10, chúc cậu luôn xinh đẹp, vui vẻ, tự tin và gặp thật nhiều điều may mắn. Mong rằng mỗi ngày của cậu đều có thật nhiều niềm vui, luôn được yêu thương, trân trọng và làm những điều mình thích.",
    "Chúc cậu học tập thật tốt, sớm đạt được những ước mơ của mình, luôn giữ được nụ cười rạng rỡ và sự đáng yêu vốn có.",
    "Mong rằng dù sau này mỗi người có một hành trình riêng, chúng ta vẫn sẽ có thật nhiều kỷ niệm đẹp, những lần gặp gỡ vui vẻ và những câu chuyện để cùng nhau nhớ lại.",
    "Cảm ơn cậu vì đã xuất hiện và khiến những ngày bình thường trở nên vui vẻ hơn.",
    "Happy Vietnamese Women's Day 20/10!"
  ],
  letter: "<b>Gửi cậu </b><br><br>Món quà này tuy nhỏ thôi, nhưng hy vọng có thể mang đến cho cậu  một chút niềm vui trong ngày đặc biệt.<br><br>Chúc cậu luôn hạnh phúc, luôn được là chính mình và luôn gặp những người thật lòng trân trọng mình.<br><br>20/10 thật vui vẻ nhé! 🌷<br><i>— Một người bạn muốn gửi đến cậu những điều tốt đẹp nhất.</i>",
  final: "Bạn xứng đáng với tất cả những điều dịu dàng nhất trên thế giới này.",
  music: "assets/music.mp3" // đặt file MP3 của bạn vào đây; chưa có thì web vẫn chạy bình thường
};
/* ============================== */
const $=s=>document.querySelector(s), reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#giftTop').textContent=CONFIG.top; $('#giftSub').textContent=CONFIG.sub;
$('#wishCard').innerHTML=CONFIG.wish.map(t=>`<p>${t}</p>`).join('');
$('#letterCard').innerHTML=CONFIG.letter; $('#final').textContent=CONFIG.final;

/* nền: cánh hoa, tim, sao lấp lánh */
const cv=$('#fx'),cx=cv.getContext('2d');let W,H;
const sz=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};sz();addEventListener('resize',sz);
const PC=['#ff9fc4','#ffc2d9','#e6c9ff','#ffd9a8'];
const ps=Array.from({length:reduce?0:28},(_,i)=>({k:i%7<4?0:i%7<5?1:2,x:Math.random()*W,y:Math.random()*H,s:6+Math.random()*9,v:.3+Math.random()*.7,d:Math.random()*6,c:PC[i%4],r:Math.random()*6}));
function heart(s){cx.beginPath();cx.moveTo(0,s*.4);cx.bezierCurveTo(-s,-s*.3,-s*.4,-s,0,-s*.4);cx.bezierCurveTo(s*.4,-s,s,-s*.3,0,s*.4);cx.fill()}
(function loop(t=0){cx.clearRect(0,0,W,H);for(const p of ps){p.y+=p.v*(p.k===2?.4:1);p.x+=Math.sin(t/1500+p.d)*.6;p.r+=.01;if(p.y>H+20){p.y=-20;p.x=Math.random()*W}
cx.save();cx.translate(p.x,p.y);cx.fillStyle=p.k===2?'#fff1b8':p.c;
if(p.k===0){cx.rotate(p.r);cx.globalAlpha=.7;cx.beginPath();cx.ellipse(0,0,p.s*.55,p.s,0,0,6.3);cx.fill()}
else if(p.k===1){cx.globalAlpha=.6;cx.rotate(Math.sin(p.r)*.4);heart(p.s)}
else{cx.globalAlpha=.4+.5*Math.abs(Math.sin(t/600+p.d));cx.shadowColor='#ffe08a';cx.shadowBlur=10;cx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?p.s*.25:p.s*.8;cx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}cx.fill()}
cx.restore()}requestAnimationFrame(loop)})();

/* hiệu ứng tung hạt */
function burst(x,y,list=['🌸','💗','✨','⭐','🌷'],n=22){
  if(reduce)n=6;
  for(let i=0;i<n;i++){const e=document.createElement('span');e.textContent=list[i%list.length];
    e.style.cssText=`position:fixed;left:${x}px;top:${y}px;z-index:15;pointer-events:none;font-size:${14+Math.random()*16}px`;
    document.body.appendChild(e);const a=Math.random()*6.28,r=60+Math.random()*140;
    e.animate([{transform:'translate(0,0) scale(.4)',opacity:1},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r-40}px) scale(1.2)`,opacity:1,offset:.6},{transform:`translate(${Math.cos(a)*r}px,${Math.sin(a)*r+80}px) scale(.8)`,opacity:0}],{duration:1500+Math.random()*600,easing:'ease-out'}).onfinish=()=>e.remove();}
}
const center=el=>{const r=el.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};

/* chuyển màn hình */
function go(id){document.querySelector('.screen.active').classList.remove('active');const s=document.getElementById(id);s.classList.add('active');scrollTo(0,0);
  if(id==='s-garden')plant(); }
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));

/* nhạc: bắt đầu sau lần chạm đầu tiên */
const mb=$('#music');let audio=null,wanted=true;
fetch(CONFIG.music,{method:'HEAD'}).then(r=>{if(!r.ok)throw 0;audio=new Audio(CONFIG.music);audio.loop=true;audio.volume=.45;mb.hidden=false}).catch(()=>{});
function playMusic(){if(audio&&wanted)audio.play().then(()=>mb.classList.add('on')).catch(()=>{})}
mb.onclick=()=>{if(!audio)return;if(audio.paused){wanted=true;audio.play();mb.classList.add('on')}else{wanted=false;audio.pause();mb.classList.remove('on')}};

/* 1. hộp quà */
const box=$('#box');let opened=false;
box.onclick=()=>{if(opened)return;opened=true;playMusic();box.classList.add('shake');
  setTimeout(()=>{box.classList.remove('shake');box.classList.add('open');const[x,y]=center(box);burst(x,y-40,undefined,34)},500);
  setTimeout(()=>go('s-wish'),2300)};

/* 2. lời chúc */
$('#sendWish').onclick=e=>{const[x,y]=center(e.currentTarget);burst(x,y,['💗','💖','🌷','✨'],24)};

/* 3. vườn hoa */
const cols=[['#ff8fb8','#ffd1e3'],['#c9a6f5','#ecdcff'],['#ffb347','#ffe0a8'],['#ff7aa2','#ffc2d4'],['#f48fd3','#ffd3f1']];
function flower([a,b]){let p='';for(let i=0;i<8;i++)p+=`<ellipse cx="50" cy="20" rx="12" ry="22" fill="${i%2?a:b}" transform="rotate(${i*45} 50 50)" opacity=".9"/>`;
  for(let i=0;i<6;i++)p+=`<ellipse cx="50" cy="31" rx="8" ry="15" fill="#fff" opacity=".45" transform="rotate(${i*60+20} 50 50)"/>`;
  return `<svg viewBox="0 0 100 190"><path d="M50 60 Q46 120 50 190" stroke="#6bb27a" stroke-width="5" fill="none"/><path d="M50 140 q-26 -4 -30 -26 q24 2 30 26" fill="#7cc58c"/><path d="M50 160 q24 -4 28 -24 q-22 2 -28 24" fill="#8fd09e"/>${p}<circle cx="50" cy="50" r="9" fill="#ffd36e"/><circle cx="47" cy="47" r="3" fill="#fff8" /></svg>`}
function plant(){const g=$('#garden');if(g.children.length)return;
  for(let i=0;i<7;i++){const b=document.createElement('button');b.className='fl';b.setAttribute('aria-label','Bông hoa');
    b.style.cssText=`left:${10+i*13.3}%;height:${150+(i%3)*30}px;width:${60+(i%2)*14}px;animation-delay:${i*.25}s,${i*.25+1.2}s`;
    b.innerHTML=flower(cols[i%5]);
    b.onclick=()=>{b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');const[x,y]=center(b);burst(x,y-b.offsetHeight/3,['✨','💗','🌸'],12)};
    g.appendChild(b)}}

/* 5. phong bì */
const env=$('#env'),lc=$('#letterCard');
env.onclick=()=>{if(env.classList.contains('open'))return;env.classList.add('open');$('#envHint').hidden=true;playMusic();
  setTimeout(()=>{const[x,y]=center(env);for(let k=0;k<3;k++)setTimeout(()=>burst(x,y,['💗','💖','💕'],12),k*400)},500);
  setTimeout(()=>{env.classList.add('done');lc.hidden=false},1300);
  setTimeout(()=>{$('#final').classList.add('show');$('#replay').hidden=false},2600)};
$('#replay').onclick=()=>{env.classList.remove('open','done');lc.hidden=true;$('#envHint').hidden=false;$('#final').classList.remove('show');$('#replay').hidden=true;
  opened=false;box.classList.remove('open');go('s-gift')};