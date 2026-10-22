document.querySelectorAll('.hand,.case-note,.eyebrow,.topics,.media-tag').forEach(element=>{
 const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
 while(walker.nextNode())walker.currentNode.textContent=walker.currentNode.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
});
const dialog=document.getElementById('player');
document.querySelectorAll('[data-embed]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('video').forEach(video=>video.pause());
 document.getElementById('player-title').textContent=button.dataset.title;
 const original=button.closest('article')?.querySelector('a[href*="instagram.com"]');
 const originalLink=document.getElementById('player-original');
 originalLink.href=original?.href||button.dataset.embed.replace('/p/','/reel/').replace('/embed/','/');
 const frame=document.createElement('iframe');frame.src=button.dataset.embed;frame.title=button.dataset.title;frame.referrerPolicy='no-referrer';frame.allow='autoplay; fullscreen; encrypted-media';frame.allowFullscreen=true;
 document.getElementById('player-content').replaceChildren(frame);dialog.showModal();
}));
document.getElementById('close-player').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.getElementById('player-content').replaceChildren());
dialog.addEventListener('click',event=>{const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()});
document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v)other.pause()})));
